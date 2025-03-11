import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';

interface FeelingNodeData {
  label: string;
  feeling?: string;
}

const FeelingNodeComponent: React.FC<NodeProps<FeelingNodeData>> = ({ data }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="feeling-node"
      style={{
        padding: '8px',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        backgroundColor: 'rgba(233, 30, 99, 0.7)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(233, 30, 99, 0.5)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        fontSize: '0.7rem'
      }}
    >
      <Handle type="target" position={Position.Right} />
      {data.label}
    </motion.div>
  );
};

export default FeelingNodeComponent;