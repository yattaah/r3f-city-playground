import { useGLTF, OrbitControls, Environment, meshBounds, CameraControls } from "@react-three/drei";
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { useRef } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {N8AOPass} from "n8ao"
import { EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"




function City() {

  const cameraControls = useRef()
  const { camera } = useThree()

  const cameraTarget = useRef(null);
  const isAnimating = useRef(false);


  useFrame(() => {

    /////// CAMERA TRANSITION
    if (!cameraTarget.current) return

    camera.position.lerp(cameraTarget.current.position, 0.05)
    cameraControls.current.target.lerp(cameraTarget.current.lookAt, 0.05)
    cameraControls.current.update()

    // STOP CONDITION
    if (
      camera.position.distanceTo(cameraTarget.current.position) < 0.01
    ) {
      cameraTarget.current = null
      isAnimating.current = false
      cameraControls.current.enabled = true
    }


  })

    // const model = useLoader(GLTFLoader, "./models/city.glb")
    const model = useGLTF("./models/city.glb")

    const cube = useRef();

    const eventHandlerCube = (event) => {
      event.stopPropagation();
      cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`);
      // console.log(" ---- POSITION")
      // console.log(event.position);
      // console.log(cube.current.material.color)

      console.log(event);
      console.log("X: " + event.x)
    }

    const buildingDoubleClickHandler = (event) => {
          // console.log(event.object)
          event.stopPropagation();
          event.object.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`)
          console.log("----- POSITION");
          console.log(event.object.position);

          const objectPosition = event.object.position.clone()

          cameraTarget.current = {
          position: objectPosition.clone().add(new THREE.Vector3(2, 2, 2)),
          lookAt: objectPosition.clone()
  }

  isAnimating.current = true
  cameraControls.current.enabled = false

  // // Move camera slightly away from the object (important!)
  // camera.position.set(
  //   objectPosition.x + 2,
  //   objectPosition.y + 2,
  //   objectPosition.z + 2
  // )

  // // Look at the object
  // camera.lookAt(objectPosition)

  // Update OrbitControls target
  // cameraControls.current.target.copy(objectPosition)
  // cameraControls.current.update()

    }

    

  return (
    <>
    <EffectComposer>
{/* const composer = new EffectComposer(renderer);
    // N8AOPass replaces RenderPass
    const n8aopass = new N8AOPass(
            scene,
            camera,
            width,
            height
        ); */}
    composer.addPass(n8aopass);
      </EffectComposer>




      <OrbitControls ref={cameraControls}/>
      {/* <CameraControls /> */}
      <Environment background preset="city" />
      <mesh>
        {/* <boxGeometry args={[2, 1]} /> */}
      </mesh>

      <mesh 
        ref = {cube} 
        position-y = {1} 
        onDoubleClick={eventHandlerCube} 
        raycast={meshBounds}
        onPointerEnter = {() => {document.body.style.cursor = "pointer"}}
        onPointerLeave = {() => {document.body.style.cursor = "default"}}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.15} color="red"/>
      </mesh>


      <primitive 
        object={model.scene} 
        onDoubleClick = {buildingDoubleClickHandler}
      />

      
    </>
  );
}



export default City;
