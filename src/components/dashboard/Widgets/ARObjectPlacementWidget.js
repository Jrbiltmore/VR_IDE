import React, { useState, useEffect } from 'react';
import 'aframe';
import 'aframe-extras';
import 'aframe-physics-system';
import 'aframe-ar';

const ARObjectPlacementWidget = () => {
  const [selectedObject, setSelectedObject] = useState('box');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Any setup for the widget can go here
  }, []);

  const handleObjectChange = (e) => {
    setSelectedObject(e.target.value);
  };

  const handleScaleChange = (e) => {
    setScale(e.target.value);
  };

  const handleRotationChange = (axis, value) => {
    setRotation({ ...rotation, [axis]: value });
  };

  return (
    <div className="widget ar-object-placement">
      <h3>AR Object Placement</h3>
      <div>
        <label>Select Object:</label>
        <select value={selectedObject} onChange={handleObjectChange}>
          <option value="box">Box</option>
          <option value="sphere">Sphere</option>
          <option value="cylinder">Cylinder</option>
          <option value="torus">Torus</option>
        </select>
      </div>
      <div>
        <label>Scale:</label>
        <input
          type="number"
          value={scale}
          onChange={handleScaleChange}
          min="0.1"
          step="0.1"
        />
      </div>
      <div>
        <label>Rotation:</label>
        <input
          type="number"
          value={rotation.x}
          onChange={(e) => handleRotationChange('x', e.target.value)}
          placeholder="X"
        />
        <input
          type="number"
          value={rotation.y}
          onChange={(e) => handleRotationChange('y', e.target.value)}
          placeholder="Y"
        />
        <input
          type="number"
          value={rotation.z}
          onChange={(e) => handleRotationChange('z', e.target.value)}
          placeholder="Z"
        />
      </div>
      <div style={{ width: '100%', height: '60vh' }}>
        <a-scene embedded arjs='sourceType: webcam;'>
          <a-marker preset="hiro">
            <a-entity
              geometry={`primitive: ${selectedObject}`}
              material="color: yellow"
              scale={`${scale} ${scale} ${scale}`}
              rotation={`${rotation.x} ${rotation.y} ${rotation.z}`}
            ></a-entity>
          </a-marker>
          <a-marker-camera preset="hiro"></a-marker-camera>
        </a-scene>
      </div>
    </div>
  );
};

export default ARObjectPlacementWidget;
