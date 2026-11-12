import "./style.css";

import * as THREE from "three"
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js"

const scene = new THREE.Scene()

const h = innerHeight;
const w = innerWidth;

const camera = new THREE.PerspectiveCamera(75, w / h, .1, 1000);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
  antialias: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight, false)

const orbit = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)

const pointL = new THREE.PointLight(0xffffff, 2, 0, 1);
pointL.position.setX(8).setY(8).setZ(8);

scene.add(pointL, new THREE.PointLightHelper(pointL, 1, 0xffffff))

// const textureLoader = new THREE.TextureLoader();
// const metalnessMap = textureLoader.load("./metal2.png")

// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     metalness: 0.8,
//     metalnessMap: metalnessMap,
//     roughnessMap: metalnessMap,
//     roughness: 0
//   })
// )

// scene.add(cube)

const loader = new GLTFLoader();

loader.load(
  "./model/source/cat.glb",

  (gltf) => {
    console.log(gltf)
    // const model = gltf.scene;

    // scene.add(model)

    // model.position.set(0, 0, 0);
    // model.scale.set(1, 1, 1)

  },
  (progress) => {
    console.log(
      (progress.loaded / progress.total) * 100,
      "%"
    );
  },

  (error) => {
    console.log('Error model: ', error)
  }
)

function render() {

  // cube.rotation.x += .001;
  // cube.rotation.y += .001;
  // cube.rotation.z += .001;

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()