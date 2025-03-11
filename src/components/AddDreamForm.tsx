import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDreamStore } from '../store/dreamStore';
import '../styles/AddDreamForm.css';

interface AddDreamFormProps {
  onClose: () => void;
}

const AddDreamForm: React.FC<AddDreamFormProps> = ({ onClose }) => {
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [feelingInput, setFeelingInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [feelings, setFeelings] = useState<string[]>([]);
  
  const { addDream } = useDreamStore();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleAddFeeling = () => {
    if (feelingInput.trim() && !feelings.includes(feelingInput.trim())) {
      setFeelings([...feelings, feelingInput.trim()]);
      setFeelingInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      addDream({
        description: description.trim(),
        tags,
        feelings
      });
      onClose();
    }
  };

  return (
    <motion.div 
      className="form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="dream-form"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2>Add New Dream</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Dream Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your dream..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="input-with-button">
              <input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
              />
              <button type="button" onClick={handleAddTag}>+</button>
            </div>
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                  <button 
                    type="button" 
                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feelings">Feelings</label>
            <div className="input-with-button">
              <input
                id="feelings"
                value={feelingInput}
                onChange={(e) => setFeelingInput(e.target.value)}
                placeholder="How did you feel?"
              />
              <button type="button" onClick={handleAddFeeling}>+</button>
            </div>
            <div className="feelings-container">
              {feelings.map((feeling, index) => (
                <span key={index} className="feeling">
                  {feeling}
                  <button 
                    type="button" 
                    onClick={() => setFeelings(feelings.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Add Dream</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddDreamForm;