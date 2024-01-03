// Using THREEjs REACTjs Fiber Canvas
import {Suspense, useEffect, useState} from 'react';

import { Canvas } from '@react-three/fiber';

import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';


const Computers = () => {

  const computer = useGLTF('./desktop_pc/scene.gltf');
  // glTF (Graphics Library Transmission Format or GL Transmission Format and formerly known as WebGL Transmissions Format or WebGL TF) 
  // is a standard file format for three-dimensional scenes and models

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />

      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}

      />
      <primitive 
        object={computer.scene}  
        scale={0.75}
        position={[0, -3.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />

    </mesh>
  );
};

const ComputersCanvas = () => {
  return(
    <Canvas 
      frameloop='demand'
      shadows
      // fov: field of view
      camera={{position: [20, 3, 5], fov: 25}}
      gl = {{ preserveDrawingBuffer: true}}
    >
      {/* loading the model : using react props: CanvasLoader */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI /2}
          minPolarAngle={Math.PI /2}
        />
        <Computers/>
      </Suspense>

      <Preload all />

    </Canvas>
  );
};

export default ComputersCanvas;