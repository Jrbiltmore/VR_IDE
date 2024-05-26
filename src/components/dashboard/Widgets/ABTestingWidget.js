import React, { useState } from 'react';

const initialExperiments = [
  { id: 1, name: 'UI Layout Test', variantA: 'Layout A', variantB: 'Layout B', result: 'In Progress' },
  { id: 2, name: 'Color Scheme Test', variantA: 'Blue', variantB: 'Green', result: 'Completed' },
];

const ABTestingWidget = () => {
  const [experiments, setExperiments] = useState(initialExperiments);
  const [newExperimentName, setNewExperimentName] = useState('');
  const [newVariantA, setNewVariantA] = useState('');
  const [newVariantB, setNewVariantB] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const handleAddExperiment = () => {
    const newExperiment = {
      id: experiments.length + 1,
      name: newExperimentName,
      variantA: newVariantA,
      variantB: newVariantB,
      result: 'In Progress'
    };
    setExperiments([...experiments, newExperiment]);
    setNewExperimentName('');
    setNewVariantA('');
    setNewVariantB('');
  };

  const handleSelectExperiment = (experiment) => {
    setSelectedExperiment(experiment);
  };

  const handleUpdateResult = (id, result) => {
    setExperiments(experiments.map(exp => 
      exp.id === id ? { ...exp, result } : exp
    ));
  };

  return (
    <div className="widget ab-testing">
      <h3>A/B Testing</h3>
      <div>
        <input
          type="text"
          placeholder="Experiment Name"
          value={newExperimentName}
          onChange={(e) => setNewExperimentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Variant A"
          value={newVariantA}
          onChange={(e) => setNewVariantA(e.target.value)}
        />
        <input
          type="text"
          placeholder="Variant B"
          value={newVariantB}
          onChange={(e) => setNewVariantB(e.target.value)}
        />
        <button onClick={handleAddExperiment}>Add Experiment</button>
      </div>
      <ul>
        {experiments.map(experiment => (
          <li key={experiment.id} onClick={() => handleSelectExperiment(experiment)}>
            {experiment.name} - {experiment.result}
          </li>
        ))}
      </ul>
      {selectedExperiment && (
        <div className="experiment-details">
          <h4>Experiment Details</h4>
          <p><strong>Name:</strong> {selectedExperiment.name}</p>
          <p><strong>Variant A:</strong> {selectedExperiment.variantA}</p>
          <p><strong>Variant B:</strong> {selectedExperiment.variantB}</p>
          <p><strong>Result:</strong> {selectedExperiment.result}</p>
          <button onClick={() => handleUpdateResult(selectedExperiment.id, 'Completed')}>Mark as Completed</button>
          <button onClick={() => handleUpdateResult(selectedExperiment.id, 'Failed')}>Mark as Failed</button>
        </div>
      )}
    </div>
  );
};

export default ABTestingWidget;
