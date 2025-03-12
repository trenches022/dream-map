import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DreamGraph from '../components/DreamGraph';
import AddDreamForm from '../components/AddDreamForm';
import { useDreamStore } from '../store/dreamStore';
import '../styles/DreamMapPage.css';

const DreamMapPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { dreams, removeDream } = useDreamStore(); 

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
        <button className="add-dream-btn" onClick={() => setShowForm(true)}>
          Add Dream
        </button>
      </motion.div>

      <div className="dream-list">
        <h3>Saved Dreams ({dreams.length})</h3>
        {dreams.length === 0 ? (
          <p>No dreams added yet.</p>
        ) : (
          <ul>
            {dreams.map((dream) => (
              <li key={dream.id}>
                {dream.description}{' '}
                <button
                  onClick={() => removeDream(dream.id)}
                  style={{ color: 'red', marginLeft: '10px' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <DreamGraph />

      <AnimatePresence>
        {showForm && <AddDreamForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default DreamMapPage;