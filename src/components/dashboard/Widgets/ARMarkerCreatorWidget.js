import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';

const ARMarkerCreatorWidget = () => {
  const [markerName, setMarkerName] = useState('');
  const [markerPattern, setMarkerPattern] = useState(null);
  const [generatedMarkerUrl, setGeneratedMarkerUrl] = useState(null);
  const canvasRef = useRef(null);

  const handlePatternUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkerPattern(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMarker = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = markerPattern;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      setGeneratedMarkerUrl(canvas.toDataURL('image/png'));
    };
  };

  const downloadMarker = () => {
    if (generatedMarkerUrl) {
      saveAs(generatedMarkerUrl, `${markerName}.patt`);
    }
  };

  return (
    <div className="widget ar-marker-creator">
      <h3>AR Marker Creator</h3>
      <div>
        <label>Marker Name:</label>
        <input
          type="text"
          value={markerName}
          onChange={(e) => setMarkerName(e.target.value)}
        />
      </div>
      <div>
        <label>Upload Pattern:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePatternUpload}
        />
      </div>
      <button onClick={generateMarker}>Generate Marker</button>
      {generatedMarkerUrl && (
        <div>
          <h4>Generated Marker</h4>
          <img src={generatedMarkerUrl} alt="Generated Marker" />
          <button onClick={downloadMarker}>Download Marker</button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width="512"
        height="512"
        style={{ display: 'none' }}
      ></canvas>
    </div>
  );
};

export default ARMarkerCreatorWidget;
