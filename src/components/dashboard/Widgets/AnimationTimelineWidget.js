import React, { useState } from 'react';

// Example keyframes for an animation
const initialKeyframes = [
  { time: 0, value: 'Initial State' },
  { time: 1, value: 'Move Up' },
  { time: 2, value: 'Move Down' },
  { time: 3, value: 'End State' }
];

const AnimationTimelineWidget = () => {
  const [keyframes, setKeyframes] = useState(initialKeyframes);
  const [selectedKeyframe, setSelectedKeyframe] = useState(null);
  const [newKeyframeTime, setNewKeyframeTime] = useState('');
  const [newKeyframeValue, setNewKeyframeValue] = useState('');

  const handleAddKeyframe = () => {
    const newKeyframe = {
      time: parseFloat(newKeyframeTime),
      value: newKeyframeValue
    };
    setKeyframes([...keyframes, newKeyframe]);
    setNewKeyframeTime('');
    setNewKeyframeValue('');
  };

  const handleDeleteKeyframe = (index) => {
    setKeyframes(keyframes.filter((_, i) => i !== index));
  };

  const handleSelectKeyframe = (index) => {
    setSelectedKeyframe(index);
  };

  const handleUpdateKeyframe = (index, time, value) => {
    const updatedKeyframes = keyframes.map((kf, i) => 
      i === index ? { time: parseFloat(time), value } : kf
    );
    setKeyframes(updatedKeyframes);
  };

  return (
    <div className="widget animation-timeline">
      <h3>Animation Timeline</h3>
      <div>
        <input
          type="number"
          placeholder="Time"
          value={newKeyframeTime}
          onChange={(e) => setNewKeyframeTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={newKeyframeValue}
          onChange={(e) => setNewKeyframeValue(e.target.value)}
        />
        <button onClick={handleAddKeyframe}>Add Keyframe</button>
      </div>
      <ul>
        {keyframes.map((kf, index) => (
          <li key={index}>
            <span onClick={() => handleSelectKeyframe(index)}>
              {kf.time}s: {kf.value}
            </span>
            <button onClick={() => handleDeleteKeyframe(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedKeyframe !== null && (
        <div className="keyframe-details">
          <h4>Keyframe Details</h4>
          <input
            type="number"
            value={keyframes[selectedKeyframe].time}
            onChange={(e) =>
              handleUpdateKeyframe(selectedKeyframe, e.target.value, keyframes[selectedKeyframe].value)
            }
          />
          <input
            type="text"
            value={keyframes[selectedKeyframe].value}
            onChange={(e) =>
              handleUpdateKeyframe(selectedKeyframe, keyframes[selectedKeyframe].time, e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
};

export default AnimationTimelineWidget;
