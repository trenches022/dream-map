import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';

interface TagNodeData {
  label: string;
  tag?: string;
}

const TagNodeComponent: React.FC<NodeProps<TagNodeData>> = ({ data }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="tag-node"
      style={{
        padding: '8px 16px',
        borderRadius: '12px',
        backgroundColor: 'rgba(0, 137, 123, 0.7)',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(0, 137, 123, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        fontSize: '0.75rem',
        fontWeight: 'bold'
      }}
    >
      <Handle type="target" position={Position.Left} />
      #{data.label}
    </motion.div>
  );
};

export default TagNodeComponent;