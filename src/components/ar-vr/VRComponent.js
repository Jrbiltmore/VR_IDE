// VRComponents.js

import React, { useEffect } from 'react';
import 'aframe';
import 'aframe-extras';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'aframe-physics-system';
import 'aframe-ui-widgets';  // Example of a UI widgets library
import 'networked-aframe';  // For multiplayer support

const VRComponents = () => {
  useEffect(() => {
    // Custom component example
    AFRAME.registerComponent('custom-event', {
      init: function () {
        this.el.addEventListener('click', function (evt) {
          alert('Element clicked!');
        });
      }
    });

    // Hover color change component
    AFRAME.registerComponent('hover-color', {
      schema: { type: 'color' },
      init: function () {
        const data = this.data;
        const el = this.el;
        const defaultColor = el.getAttribute('material').color;
        el.addEventListener('mouseenter', function () {
          el.setAttribute('color', data);
        });
        el.addEventListener('mouseleave', function () {
          el.setAttribute('color', defaultColor);
        });
      }
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <a-scene embedded physics="debug: true" vr-mode-ui="enabled: true">
        <a-assets>
          <img id="skyTexture" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg" alt="Sky" />
          <a-asset-item id="treeModel" src="path/to/tree-model.glb"></a-asset-item>
          <audio id="bgSound" src="path/to/background-sound.mp3" preload="auto"></audio>
        </a-assets>

        <a-sky src="#skyTexture"></a-sky>

        <a-entity 
          geometry="primitive: box" 
          material="color: yellow" 
          position="0 1 -3"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 4000"
          custom-event
        ></a-entity>

        <a-entity 
          geometry="primitive: sphere; radius: 1.25" 
          material="color: #EF2D5E" 
          position="1 1 -5"
          animation="property: position; to: 1 2 -5; loop: true; dur: 2000; dir: alternate"
        ></a-entity>

        <a-entity 
          geometry="primitive: plane; width: 4; height: 4" 
          material="color: #7BC8A4" 
          rotation="-90 0 0" 
          position="0 0 -4"
        ></a-entity>

        <a-entity 
          text="value: Hello A-Frame!; color: #FFFFFF; align: center"
          position="0 2.5 -5"
        ></a-entity>

        <a-entity 
          gltf-model="#treeModel" 
          scale="0.5 0.5 0.5" 
          position="-2 0.5 -3"
          animation="property: rotation; to: 0 360 0; loop: true; dur: 8000"
        ></a-entity>

        <a-entity 
          light="type: ambient; color: #CCC"
        ></a-entity>

        <a-entity 
          light="type: directional; color: #FFF; intensity: 0.5" 
          position="-1 2 1"
        ></a-entity>

        <a-entity 
          dynamic-body="shape: box; mass: 5"
          geometry="primitive: box"
          material="color: blue"
          position="0 2 -3"
        ></a-entity>

        <a-entity 
          particle-system="preset: snow; particleCount: 2000"
          position="0 3 -5"
        ></a-entity>

        <a-entity 
          sound="src: #bgSound; autoplay: true; loop: true"
          position="0 1.6 0"
        ></a-entity>

        <a-entity camera position="0 1.6 0">
          <a-cursor></a-cursor>
        </a-entity>

        <a-entity 
          geometry="primitive: text; value: Click Me; color: red"
          position="0 1 -4"
          custom-event
        ></a-entity>

        <a-entity 
          geometry="primitive: cone; radius-bottom: 1; radius-top: 0.5; height: 2"
          material="color: green"
          position="-3 1 -6"
        ></a-entity>

        <a-entity 
          geometry="primitive: torus; radius: 1; tube: 0.2"
          material="color: purple"
          position="3 1 -4"
        ></a-entity>

        <a-entity 
          geometry="primitive: cylinder; radius: 0.5; height: 1.5"
          material="color: orange"
          position="-1 0.75 -2"
        ></a-entity>

        <a-entity 
          geometry="primitive: lathe; segments: 18; points: 0 0 0.1, 0 1 0.2, 0.2 1 0.1, 0.3 2 0.1, 0.4 2 0.1, 0.4 2.1 0.1, 0.3 2.1 0.1"
          material="color: cyan"
          position="2 1 -5"
        ></a-entity>

        <a-entity 
          geometry="primitive: extrude; depth: 0.5; shape: 0 0, 1 0, 1 1, 0 1"
          material="color: pink"
          position="-2 1 -3"
        ></a-entity>

        <a-entity 
          gltf-model="url(path/to/animated-model.glb)"
          position="2 0 -3"
          animation-mixer
        ></a-entity>

        <a-entity 
          id="player"
          camera
          wasd-controls
          position="0 1.6 0"
        >
          <a-cursor></a-cursor>
        </a-entity>

        <a-entity 
          geometry="primitive: ring; radius-inner: 0.5; radius-outer: 1"
          material="color: #29B6F6; shader: flat"
          position="1 1 -2"
          hover-color="red"
        ></a-entity>

        <a-entity 
          laser-controls="hand: left"
          raycaster="objects: .clickable"
        ></a-entity>

        <a-entity 
          laser-controls="hand: right"
          raycaster="objects: .clickable"
        ></a-entity>

        <a-entity
          geometry="primitive: dodecahedron; radius: 1"
          material="color: gold"
          position="-4 2 -5"
        ></a-entity>

        <a-entity
          geometry="primitive: octahedron; radius: 1"
          material="color: lime"
          position="4 2 -5"
        ></a-entity>

        <a-entity
          geometry="primitive: tetrahedron; radius: 1"
          material="color: magenta"
          position="0 3 -7"
        ></a-entity>

        <a-entity
          id="canvas"
          ui-canvas
          width="1024"
          height="768"
          position="0 2 -4"
        >
          <a-entity
            ui-button
            value="Click Me"
            position="0 0 0.1"
            width="200"
            height="100"
            onclick="alert('Button clicked!')"
          ></a-entity>
        </a-entity>

        <a-entity
          networked="template:#avatar-template; attachTemplateToLocal:false"
          position="0 1.6 0"
        ></a-entity>

        <script id="avatar-template" type="text/html">
          <a-entity>
            <a-box color="#4CC3D9"></a-box>
          </a-entity>
        </script>

        <a-sky
          gradient-sky="horizon: 0.3; colorTop: #000; colorBottom: #00F"
        ></a-sky>
      </a-scene>
    </div>
  );
};

export default VRComponents;
