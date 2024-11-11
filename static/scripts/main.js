// import three js
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

// check to see if browser or device can rende 3d
if (WebGL.isWebGL2Available()) {
  // Add these variables at the top of your script
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let targetRotationZ = 0;
  let isMouseDown = true;
  let mouseXOnMouseDown = 0;
  let mouseYOnMouseDown = 0;

  // Add event listeners for mouse interaction
  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    if (isMouseDown) {
      // Calculate rotation based on mouse movement from click position
      targetRotationX = mouseY * Math.PI;
      targetRotationY = mouseX * Math.PI;
      // Z rotation based on distance from center
      targetRotationZ = Math.sqrt(mouseX * mouseX + mouseY * mouseY) * Math.PI;
    }
  });

  /*document.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    mouseXOnMouseDown = (event.clientX / window.innerWidth) * 2 - 1;
    mouseYOnMouseDown = (event.clientY / window.innerHeight) * 2 - 1;
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });*/

  // Add wheel event for additional Z-axis control
  document.addEventListener("wheel", (event) => {
    targetRotationZ += event.deltaY * 0.001;
  });
  const scene = new THREE.Scene();
  //using the PerspectiveCamera, needs FOV, aspect ratio, near and far
  // FOV is field of view, o the extent of the scene that is seen, value in degrees
  // Aspect ratio is almost width of element / height
  // values closer to camera than near, or farther from camera than far will not be rendered

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );

  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  // the renderer
  const renderer = new THREE.WebGLRenderer();

  // set the size at which we want to render, common to use width and height of area
  // we ant to fill
  // can set third parameter, updateStyle, with false to render at lower resolution
  renderer.setSize(window.innerWidth, window.innerHeight);

  // adding to body
  document.body.appendChild(renderer.domElement);

  // creating a cube
  // object that holds all verticies and faces of the cube
  const geometry = new THREE.CylinderGeometry(1, 1.2, 3, 40);
  // adding a material to it to add color
  const material = new THREE.MeshBasicMaterial({
    color: 0xf0e3cc,
    wireframe: false,
  });
  // creates a mesh, combine geometry and material
  const cube = new THREE.Mesh(geometry, material);

  // Create the outline cylinder
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide,
    wireframe: true,
  });
  const outlineGeometry = new THREE.CylinderGeometry(1.05, 1.25, 3.1, 40);
  const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);

  // default adds to the coordintes (0,0,0)
  scene.add(cube);
  scene.add(outlineMesh);

  const lineMat = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(lineGeo, lineMat);

  scene.add(line);

  function animate() {
    cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;
    cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;
    cube.rotation.z += (targetRotationZ - cube.rotation.z) * 0.05;


    outlineMesh.rotation.copy(cube.rotation);

    //if (camera.position.z > -10) camera.position.z -= 0.2;
    //else camera.position.z = 100;

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById("container").appendChild(warning);
}
console.log("Hello there");
