import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DreamGraph from '../components/DreamGraph';
import AddDreamForm from '../components/AddDreamForm';
import '../styles/DreamMapPage.css';

const DreamMapPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="dreampage-container">
      <motion.div
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome to the Dream Map</h1>
        <h2>Capture the magic of your dreams and explore their connections.</h2>
        <button 
          className="add-dream-btn" 
          onClick={() => setShowForm(true)}
        >
          Add Dream
        </button>
      </motion.div>

      <DreamGraph />

      <AnimatePresence>
        {showForm && <AddDreamForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default DreamMapPage;
