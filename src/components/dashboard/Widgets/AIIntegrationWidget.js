import React, { useState, useEffect } from 'react';

const initialAIModels = [
  { id: 1, name: 'Object Detection', status: 'Idle', accuracy: 0.95 },
  { id: 2, name: 'Speech Recognition', status: 'Training', accuracy: 0.89 },
  { id: 3, name: 'Gesture Recognition', status: 'Deployed', accuracy: 0.92 }
];

const AIIntegrationWidget = () => {
  const [aiModels, setAiModels] = useState(initialAIModels);
  const [selectedModel, setSelectedModel] = useState(null);
  const [newModelName, setNewModelName] = useState('');
  const [trainingProgress, setTrainingProgress] = useState(0);

  useEffect(() => {
    if (selectedModel && selectedModel.status === 'Training') {
      const interval = setInterval(() => {
        setTrainingProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            updateModelStatus(selectedModel.id, 'Deployed');
            return 100;
          }
          return newProgress;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedModel]);

  const updateModelStatus = (id, status) => {
    setAiModels(aiModels.map(model =>
      model.id === id ? { ...model, status } : model
    ));
  };

  const handleAddModel = () => {
    const newModel = {
      id: aiModels.length + 1,
      name: newModelName,
      status: 'Idle',
      accuracy: 0
    };
    setAiModels([...aiModels, newModel]);
    setNewModelName('');
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setTrainingProgress(model.status === 'Training' ? 50 : 0);
  };

  return (
    <div className="widget ai-integration">
      <h3>AI Integration</h3>
      <div>
        <input
          type="text"
          placeholder="New Model Name"
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
        />
        <button onClick={handleAddModel}>Add Model</button>
      </div>
      <ul>
        {aiModels.map(model => (
          <li key={model.id} onClick={() => handleSelectModel(model)}>
            {model.name} - {model.status} (Accuracy: {model.accuracy})
          </li>
        ))}
      </ul>
      {selectedModel && (
        <div className="model-details">
          <h4>Model Details</h4>
          <p><strong>Name:</strong> {selectedModel.name}</p>
          <p><strong>Status:</strong> {selectedModel.status}</p>
          <p><strong>Accuracy:</strong> {selectedModel.accuracy}</p>
          {selectedModel.status === 'Training' && (
            <div>
              <p>Training Progress: {trainingProgress.toFixed(2)}%</p>
              <progress value={trainingProgress} max="100"></progress>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIIntegrationWidget;
