import { useGLTF, OrbitControls, Environment, meshBounds } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { useRef } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


function City() {

    // const model = useLoader(GLTFLoader, "./models/city.glb")
    const model = useGLTF("./models/city.glb")

    const cube = useRef();

    const eventHandler = (event) => {
      event.stopPropagation();
      cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`);
      // console.log(cube.current.material.color)

      console.log(event);
      console.log("X: " + event.x)
    }

    const buildingClickHandler = (event) => {

    }

  return (
    <>
      <OrbitControls />
      <Environment background preset="city" />
      <mesh>
        {/* <boxGeometry args={[2, 1]} /> */}
      </mesh>

      <mesh 
        ref = {cube} 
        position-y = {1} 
        onDoubleClick={eventHandler} 
        raycast={meshBounds}
        onPointerEnter = {() => {document.body.style.cursor = "pointer"}}
        onPointerLeave = {() => {document.body.style.cursor = "default"}}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.15} color="red"/>
      </mesh>


      <primitive 
        object={model.scene} 
        onDoubleClick = {(event) => {
          console.log(event.object)
          event.stopPropagation();
          event.object.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`)
        }}
      />

      
    </>
  );
}

export default City;
