// ARComponent.js

import React, { useEffect } from 'react';
import 'aframe';
import 'arjs';
import 'aframe-extras';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-physics-system';

const ARComponent = () => {
  useEffect(() => {
    // Any additional setup for AR can go here
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <a-scene embedded arjs='sourceType: webcam;'>
        <a-marker preset="hiro">
          <a-box 
            position="0 0.5 0" 
            material="color: yellow;"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"
          ></a-box>
          <a-sphere 
            position="1 1 0" 
            radius="0.5" 
            color="#EF2D5E" 
            animation="property: scale; to: 1.5 1.5 1.5; loop: true; dur: 2000; dir: alternate"
          ></a-sphere>
          <a-plane 
            position="0 0 0" 
            rotation="-90 0 0" 
            width="4" 
            height="4" 
            color="#7BC8A4"
          ></a-plane>
          <a-text 
            value="Hello AR.js!" 
            align="center" 
            position="0 1.5 0" 
            color="#FFFFFF"
          ></a-text>
        </a-marker>
        <a-marker preset="kanji">
          <a-cone 
            position="0 0.5 0" 
            radius-bottom="0.5" 
            radius-top="0.25" 
            height="1" 
            color="#FFC65D"
          ></a-cone>
          <a-cylinder 
            position="-1 0.75 0" 
            radius="0.25" 
            height="1.5" 
            color="#FFC65D"
            animation="property: position; to: -1 1 0; loop: true; dur: 1000; dir: alternate"
          ></a-cylinder>
        </a-marker>
        <a-marker type='pattern' url='path/to/your/custom/pattern-marker.patt'>
          <a-torus 
            position="0 1 0" 
            radius="0.5" 
            tube="0.1" 
            color="#FF6347"
            particle-system="preset: dust; particleCount: 1000"
          ></a-torus>
        </a-marker>
        <a-marker-camera preset="hiro"></a-marker-camera>
      </a-scene>
    </div>
  );
};

export default ARComponent;
