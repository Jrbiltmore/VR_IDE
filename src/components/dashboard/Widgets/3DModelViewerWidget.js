import React, { useRef, useEffect, useState } from 'react';
import 'aframe';
import 'aframe-extras';
import 'aframe-animation-component';

const 3DModelViewerWidget = ({ modelUrl }) => {
  const sceneRef = useRef(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (sceneRef.current) {
      const scene = sceneRef.current;
      scene.addEventListener('wheel', handleZoom);
    }
    return () => {
      if (sceneRef.current) {
        const scene = sceneRef.current;
        scene.removeEventListener('wheel', handleZoom);
      }
    };
  }, []);

  const handleZoom = (event) => {
    event.preventDefault();
    const zoomChange = event.deltaY * -0.01;
    setZoomLevel((prevZoomLevel) => Math.min(Math.max(prevZoomLevel + zoomChange, 0.5), 2));
  };

  return (
    <div className="widget 3d-model-viewer">
      <h3>3D Model Viewer</h3>
      <div>
        <label>Rotation Speed:</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(e.target.value)}
        />
      </div>
      <div style={{ width: '100%', height: '60vh' }}>
        <a-scene ref={sceneRef} embedded>
          <a-assets>
            <a-asset-item id="model" src={modelUrl}></a-asset-item>
          </a-assets>

          <a-entity
            gltf-model="#model"
            position={`0 0 ${-3 * zoomLevel}`}
            rotation="0 0 0"
            animation={`property: rotation; to: 0 360 0; loop: true; dur: ${10000 / rotationSpeed}`}
          ></a-entity>
          <a-camera position="0 1.6 0">
            <a-cursor></a-cursor>
          </a-camera>
        </a-scene>
      </div>
    </div>
  );
};

export default 3DModelViewerWidget;
