import React, { useState, useRef, useEffect } from 'react';
import 'aframe';
import 'aframe-extras';

const 3DSketchingWidget = () => {
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#FF0000');
  const [brushSize, setBrushSize] = useState(0.1);
  const sceneRef = useRef(null);
  const drawingEntityRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const scene = sceneRef.current;
      scene.addEventListener('mousedown', startDrawing);
      scene.addEventListener('mouseup', stopDrawing);
      scene.addEventListener('mouseleave', stopDrawing);
    }
    return () => {
      if (sceneRef.current) {
        const scene = sceneRef.current;
        scene.removeEventListener('mousedown', startDrawing);
        scene.removeEventListener('mouseup', stopDrawing);
        scene.removeEventListener('mouseleave', stopDrawing);
      }
    };
  }, []);

  const startDrawing = () => {
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const handleDraw = (event) => {
    if (!drawing) return;
    const { detail } = event;
    const position = `${detail.intersection.point.x} ${detail.intersection.point.y} ${detail.intersection.point.z}`;
    const entity = document.createElement('a-sphere');
    entity.setAttribute('position', position);
    entity.setAttribute('radius', brushSize);
    entity.setAttribute('color', color);
    drawingEntityRef.current.appendChild(entity);
  };

  return (
    <div className="widget 3d-sketching">
      <h3>3D Sketching</h3>
      <div>
        <label>Brush Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div>
        <label>Brush Size:</label>
        <input
          type="number"
          value={brushSize}
          min="0.01"
          step="0.01"
          onChange={(e) => setBrushSize(e.target.value)}
        />
      </div>
      <div style={{ width: '100%', height: '60vh' }}>
        <a-scene ref={sceneRef} embedded>
          <a-assets>
            {/* Preload any assets here */}
          </a-assets>
          <a-entity ref={drawingEntityRef} cursor-listener onClick={handleDraw}>
            <a-camera position="0 1.6 0">
              <a-cursor></a-cursor>
            </a-camera>
          </a-entity>
        </a-scene>
      </div>
    </div>
  );
};

export default 3DSketchingWidget;
