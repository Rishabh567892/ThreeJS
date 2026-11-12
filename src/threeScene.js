import * as THREE from "three"

export function initThreeScene() {
  const canvas = document.querySelector("canvas")

  if (!canvas) {
    throw new Error("Canvas element not found")
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )
  camera.position.z = 8

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight, false)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 4, 5),
    new THREE.MeshStandardMaterial(),
  )
  scene.add(cube)

  function render() {
    cube.rotation.x += 0.005
    cube.rotation.y += 0.005
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight, false)
  })

  render()
}
