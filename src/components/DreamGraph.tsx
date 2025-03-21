import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  NodeTypes,
  NodeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDreamStore } from '../store/dreamStore';
import { DreamNode, DreamEdge } from '../types/graph';
import DreamNodeComponent from './DreamNodeComponent';
import TagNodeComponent from './TagNodeComponent';
import FeelingNodeComponent from './FeelingNodeComponent';

const nodeTypes: NodeTypes = {
  dreamNode: DreamNodeComponent,
  tagNode: TagNodeComponent,
  feelingNode: FeelingNodeComponent,
};

const DreamGraph: React.FC = () => {
  const { dreams, nodePositions, updateNodePosition } = useDreamStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const getUniqueTagsAndFeelings = useCallback(() => {
    const uniqueTags = new Set<string>();
    const uniqueFeelings = new Set<string>();

    dreams.forEach((dream) => {
      dream.tags.forEach((tag) => uniqueTags.add(tag));
      dream.feelings.forEach((feeling) => uniqueFeelings.add(feeling));
    });

    return {
      tags: Array.from(uniqueTags),
      feelings: Array.from(uniqueFeelings),
    };
  }, [dreams]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      changes.forEach((change) => {
        if (change.type === 'position' && change.position) {
          const { id, position } = change;
          updateNodePosition(id, position.x, position.y); 
        }
      });
    },
    [onNodesChange, updateNodePosition]
  );

  useEffect(() => {
    if (dreams.length === 0) return;

    const { tags, feelings } = getUniqueTagsAndFeelings();
    const newNodes: DreamNode[] = [];
    const newEdges: DreamEdge[] = [];

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    dreams.forEach((dream, index) => {
      let x, y;
      const nodeId = `dream-${dream.id}`;
      if (nodePositions[nodeId]) {
        x = nodePositions[nodeId].x;
        y = nodePositions[nodeId].y;
      } else {
        if (index === 0) {
          x = centerX - 300;
          y = centerY;
        } else if (index === 1) {
          x = centerX + 300;
          y = centerY;
        } else {
          x = centerX + 300 + (index - 1) * 200;
          y = centerY;
        }
      }
      newNodes.push({
        id: nodeId,
        type: 'dreamNode',
        data: { label: dream.description, dream },
        position: { x, y },
      });
    });

    tags.forEach((tag, index) => {
      const dream = dreams.find((d) => d.tags.includes(tag));
      if (dream) {
        const dreamIndex = dreams.indexOf(dream);
        const nodeId = `tag-${tag}`;
        let x, y;
        if (nodePositions[nodeId]) {
          x = nodePositions[nodeId].x;
          y = nodePositions[nodeId].y;
        } else {
          const xOffset = dreamIndex === 0 ? -200 : dreamIndex === 1 ? 200 : 200 + (dreamIndex - 1) * 200;
          const yOffset = -150 - (index * 50);
          x = centerX + xOffset;
          y = centerY + yOffset;
        }
        newNodes.push({
          id: nodeId,
          type: 'tagNode',
          data: { label: tag, tag },
          position: { x, y },
        });
      }
    });

    feelings.forEach((feeling, index) => {
      const dream = dreams.find((d) => d.feelings.includes(feeling));
      if (dream) {
        const dreamIndex = dreams.indexOf(dream);
        const nodeId = `feeling-${feeling}`;
        let x, y;
        if (nodePositions[nodeId]) {
          x = nodePositions[nodeId].x;
          y = nodePositions[nodeId].y;
        } else {
          const xOffset = dreamIndex === 0 ? -200 : dreamIndex === 1 ? 200 : 200 + (dreamIndex - 1) * 200;
          const yOffset = 150 + (index * 50);
          x = centerX + xOffset;
          y = centerY + yOffset;
        }
        newNodes.push({
          id: nodeId,
          type: 'feelingNode',
          data: { label: feeling, feeling },
          position: { x, y },
        });
      }
    });

    dreams.forEach((dream) => {
      dream.tags.forEach((tag) => {
        newEdges.push({
          id: `${dream.id}-${tag}`,
          source: `dream-${dream.id}`,
          target: `tag-${tag}`,
          type: 'smoothstep',
          animated: true,
        });
      });

      dream.feelings.forEach((feeling) => {
        newEdges.push({
          id: `${dream.id}-${feeling}`,
          source: `dream-${dream.id}`,
          target: `feeling-${feeling}`,
          type: 'smoothstep',
        });
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [dreams, getUniqueTagsAndFeelings, nodePositions, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', zIndex: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange} 
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DreamGraph;