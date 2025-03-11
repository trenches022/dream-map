import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  NodeTypes,
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
  const { dreams } = useDreamStore();
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

  useEffect(() => {
    if (dreams.length === 0) return;

    const { tags, feelings } = getUniqueTagsAndFeelings();
    const newNodes: DreamNode[] = [];
    const newEdges: DreamEdge[] = [];

    const centerX = window.innerWidth / 2;
    const baseY = window.innerHeight / 2;

    dreams.forEach((dream, index) => {
      const y = baseY + index * 150;
      newNodes.push({
        id: `dream-${dream.id}`,
        type: 'dreamNode',
        data: { label: dream.description, dream },
        position: { x: centerX - 100, y }, 
      });
    });

    tags.forEach((tag, index) => {
      const y = baseY - 200 - index * 50; 
      newNodes.push({
        id: `tag-${tag}`,
        type: 'tagNode',
        data: { label: tag, tag },
        position: { x: centerX - 50, y }, 
      });
    });

    feelings.forEach((feeling, index) => {
      const y = baseY + dreams.length * 150 + 50 + index * 50; 
      newNodes.push({
        id: `feeling-${feeling}`,
        type: 'feelingNode',
        data: { label: feeling, feeling },
        position: { x: centerX - 50, y },
      });
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
  }, [dreams, getUniqueTagsAndFeelings, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
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