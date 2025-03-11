import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { IDream } from '../store/dreamStore';

interface DreamNodeData {
  label: string;
  dream?: IDream;
}

const DreamNodeComponent: React.FC<NodeProps<DreamNodeData>> = ({ data }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="dream-node"
      style={{
        padding: '10px',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        backgroundColor: 'rgba(123, 31, 162, 0.7)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 0 15px rgba(123, 31, 162, 0.5)',
        border: '2px solid rgba(255, 255, 255, 0.5)',
        overflow: 'hidden',
        fontSize: '0.8rem'
      }}
    >
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      {data.label}
    </motion.div>
  );
};

export default DreamNodeComponent;