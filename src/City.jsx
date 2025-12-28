import { useGLTF, OrbitControls, Environment, meshBounds, CameraControls, Billboard, Text, Html } from "@react-three/drei";
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {N8AOPass} from "n8ao"
import { EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"



///////////////// MAIN CITY COMPONENT /////////////////
function City() {

  const cameraControls = useRef()
  const { camera } = useThree()

  const cameraTarget = useRef(null);
  const isAnimating = useRef(false);

  /////// INITIAL CAMERA ///////
  useThree(({camera}) => {
    camera.position.x = 5;
    camera.position.y = 4;

    // !!! lookAt not working correctly
    camera.lookAt(20, 10, 0);
  });


  /////// USE FRAME ///////
  useFrame(() => {

    /////// CAMERA TRANSITION ///////
    if (isAnimating.current == true) {

    camera.position.lerp(cameraTarget.current.position, 0.05)
    cameraControls.current.target.lerp(cameraTarget.current.lookAt, 0.05)
    cameraControls.current.update()

    if (camera.position.distanceTo(cameraTarget.current.position) < 0.2) {
      cameraTarget.current = null
      cameraControls.current.enabled = true
      isAnimating.current = false
    }

    }
  })

    /////// MODEL LOADING ///////
    const model = useGLTF("./models/city.glb")

    const eventHandlerCube = (event) => {
      event.stopPropagation();
      cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`);
      console.log(event);
      console.log("X: " + event.x)
    }


    /////// EVENT HANDLER ///////
    const buildingDoubleClickHandler = (event) => {
          event.stopPropagation();
          event.object.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`)
          console.log(event.object.name);
          console.log(event.object.position);

          const objectPosition = event.object.position.clone()

          cameraTarget.current = {
          position: objectPosition.clone().add(new THREE.Vector3(1.5, 1.8, 2)),
          lookAt: objectPosition.clone()
  }

          // set states to disable camera controls
          isAnimating.current = true
          cameraControls.current.enabled = false


    }

    

  return (
    <>

      <OrbitControls ref={cameraControls}/>
      <Environment background preset="city" />

      <primitive 
        object={model.scene} 
        onDoubleClick = {buildingDoubleClickHandler}
        // onPointerEnter = {() => {document.body.style.cursor = "pointer"}}
        // onPointerLeave = {() => {document.body.style.cursor = "default"}}
      />

      {/* <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
        position={[0, 2, 0]}
      >
        <Text fontSize={1}>I'm a billboard</Text>
      </Billboard> */}

    </>
  );
}



export default City;
