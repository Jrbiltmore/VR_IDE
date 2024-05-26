import React, { useState, useEffect } from 'react';

// Sample assets for demonstration
const sampleAssets = [
  { id: 1, name: 'Tree Model', type: '3D Model', size: '1.2 MB' },
  { id: 2, name: 'Background Music', type: 'Audio', size: '3.5 MB' },
  { id: 3, name: 'Brick Texture', type: 'Texture', size: '500 KB' }
];

const AssetManagerWidget = () => {
  const [assets, setAssets] = useState(sampleAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [filter, setFilter] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newAsset = {
        id: assets.length + 1,
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      };
      setAssets([...assets, newAsset]);
    }
  };

  const handleDelete = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  useEffect(() => {
    // Any setup for the widget can go here
  }, []);

  return (
    <div className="widget asset-manager">
      <h3>Asset Manager</h3>
      <input
        type="file"
        onChange={handleUpload}
      />
      <input
        type="text"
        placeholder="Filter assets..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {assets.filter((asset) => asset.name.includes(filter)).map((asset) => (
          <li key={asset.id}>
            <span onClick={() => setSelectedAsset(asset)}>{asset.name}</span>
            <button onClick={() => handleDelete(asset.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedAsset && (
        <div className="asset-details">
          <h4>Asset Details</h4>
          <p><strong>Name:</strong> {selectedAsset.name}</p>
          <p><strong>Type:</strong> {selectedAsset.type}</p>
          <p><strong>Size:</strong> {selectedAsset.size}</p>
        </div>
      )}
    </div>
  );
};

export default AssetManagerWidget;
