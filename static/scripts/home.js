// static/js/three-background.js
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

function initThreeBackground() {
  if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById("three-container").appendChild(warning);
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let targetRotationZ = 0;
  let isMouseDown = true;

  // Scene setup
  const scene = new THREE.Scene();
  const container = document.getElementById("three-container");
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    1,
    500,
  );

  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0xffcdc4, 0.5); // Matching brand pink with some transparency
  container.appendChild(renderer.domElement);

  // Marshmallow creation
  const geometry = new THREE.CylinderGeometry(1, 1.2, 2.6, 40);
  const material = new THREE.MeshBasicMaterial({
    color: 0xf0e3cc,
    wireframe: false,
  });
  const marshmallow = new THREE.Mesh(geometry, material);

  // Marshmallow creation
  const geometryStick = new THREE.CylinderGeometry(0.08, 0.2, 8, 40);
  const materialStick = new THREE.MeshBasicMaterial({
    color: 0x3e2723,
    wireframe: false,
  });
  const marshmallowStick = new THREE.Mesh(geometryStick, materialStick);
  //marshmallowStick.translateY(-2); // Moves the stick down

  // Outline
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: 0x3e2723, // Brand brown color
    side: THREE.BackSide,
  });
  const outlineGeometry = new THREE.CylinderGeometry(1.05, 1.25, 2.7, 40);
  const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);

  // Create circle outlines for top and bottom faces
  const circleLineMaterial = new THREE.LineBasicMaterial({
    color: 0x3e2723,
    linewidth: 2,
  });

  // Helper function to create circle points
  function createCirclePoints(radius, segments) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.sin(theta) * radius,
          0,
          Math.cos(theta) * radius,
        ),
      );
    }
    // Close the circle by adding the first point again
    points.push(points[0].clone());
    return points;
  }

  // Top circle outline
  const topCircle = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(createCirclePoints(1, 40)),
    circleLineMaterial,
  );
  topCircle.position.y = 1.3; // Half the height of the cylinder
  topCircle.rotation.x = Math.PI;

  // Bottom circle outline
  const bottomCircle = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(createCirclePoints(1.2, 40)),
    circleLineMaterial,
  );
  bottomCircle.position.y = -1.3; // Negative half the height of the cylinder
  bottomCircle.rotation.x = Math.PI;

  // Create a group to hold all the meshes
  const marshmallowGroup = new THREE.Group();
  marshmallowGroup.add(marshmallow);
  marshmallowGroup.add(outlineMesh);
  marshmallowGroup.add(topCircle);
  marshmallowGroup.add(bottomCircle);
  marshmallowGroup.add(marshmallowStick);

  // Position the stick within the group
  marshmallowStick.position.y = -1;

  // Translate the entire group AFTER adding all objects
  marshmallowGroup.position.x = 5;

  scene.add(marshmallowGroup);

  // Event listeners
  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouseY = ((event.clientY - rect.top) / container.clientHeight) * 2 - 1;

    if (isMouseDown) {
      targetRotationX = mouseY * Math.PI;
      targetRotationY = mouseX * Math.PI;
      targetRotationZ = Math.sqrt(mouseX * mouseX + mouseY * mouseY) * Math.PI;
    }
  }

  function onWheel(event) {
    targetRotationZ += event.deltaY * 0.001;
  }

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("wheel", onWheel);

  // Window resize handler
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", onWindowResize);

  // After creating the marshmallow group and before adding it to the scene, add this code:

  // Create campfire group
  const campfireGroup = new THREE.Group();

  // Create logs (crossed cylinders)
  const logGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
  const logMaterial = new THREE.MeshBasicMaterial({ color: 0x4a3728 }); // Dark brown

  const log1 = new THREE.Mesh(logGeometry, logMaterial);
  const log2 = new THREE.Mesh(logGeometry, logMaterial);
  const log3 = new THREE.Mesh(logGeometry, logMaterial);

  // Position logs in a triangle/crossed pattern
  log1.position.y = -5;
  log1.rotation.z = Math.PI / 4;

  log2.position.y = -5;
  log2.rotation.z = -Math.PI / 4;

  log3.position.y = -5.2;
  log3.rotation.x = Math.PI / 2;
  log3.rotation.z = Math.PI / 6;

  // Create flames using triangular geometries
  const flameGeometry = new THREE.ConeGeometry(0.8, 2, 4);
  const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 }); // Orange-red
  const flame1 = new THREE.Mesh(flameGeometry, flameMaterial);
  flame1.position.y = -4;

  // Create smaller, inner flame
  const innerFlameGeometry = new THREE.ConeGeometry(0.4, 1.5, 4);
  const innerFlameMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // Yellow
  const flame2 = new THREE.Mesh(innerFlameGeometry, innerFlameMaterial);
  flame2.position.y = -4;

  // Add embers (small spheres)
  const emberGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const emberMaterial = new THREE.MeshBasicMaterial({ color: 0xff8c00 }); // Dark orange

  const embers = [];
  for (let i = 0; i < 5; i++) {
    const ember = new THREE.Mesh(emberGeometry, emberMaterial);
    ember.position.set(
      (Math.random() - 0.5) * 2, // Random x position
      -4.5 + Math.random() * 0.5, // Random y position near flame base
      (Math.random() - 0.5) * 2, // Random z position
    );
    embers.push(ember);
  }

  // Add everything to campfire group
  campfireGroup.add(log1);
  campfireGroup.add(log2);
  campfireGroup.add(log3);
  campfireGroup.add(flame1);
  campfireGroup.add(flame2);
  embers.forEach((ember) => campfireGroup.add(ember));

  // Add flames animation to the animate function
  const originalFlamePositions = embers.map((ember) => ({
    x: ember.position.x,
    y: ember.position.y,
    z: ember.position.z,
  }));

  // Add the campfire group to the scene
  scene.add(campfireGroup);
  campfireGroup.translateX(1.5);

  campfireGroup.scale.set(1, 1, 1); // Scale all dimensions by 2

  // Smoke particles
  const smokeParticles = [];
  const particleCount = 15;
  const smokeGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const smokeMaterial = new THREE.MeshBasicMaterial({
    color: 0x666666,
    transparent: true,
    opacity: 0.4,
  });

  // Create smoke particles with initial properties
  for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(smokeGeometry, smokeMaterial.clone());

    // Initialize particle properties
    particle.userData = {
      speed: 0.03 + Math.random() * 0.03,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      life: 0,
      maxLife: 100 + Math.random() * 50,
      startY: -4, // Start at fire height
      startScale: 0.3 + Math.random() * 0.3,
    };

    // Set initial position
    resetSmokeParticle(particle);

    smokeParticles.push(particle);
    campfireGroup.add(particle);
  }

  // Function to reset a particle to its starting position
  function resetSmokeParticle(particle) {
    particle.position.set(
      (Math.random() - 0.5) * 0.5, // Small random x offset
      particle.userData.startY,
      (Math.random() - 0.5) * 0.5, // Small random z offset
    );
    particle.scale.set(1, 1, 1);
    particle.material.opacity = 0.4;
    particle.userData.life = 0;
  }


  camera.position.set(0, 0, 100);

  // Animation
  function animate() {
    marshmallowGroup.rotation.x +=
      (targetRotationX - marshmallowGroup.rotation.x) * 0.05;
    marshmallowGroup.rotation.y +=
      (targetRotationY - marshmallowGroup.rotation.y) * 0.05;
    marshmallowGroup.rotation.z +=
      (targetRotationZ - marshmallowGroup.rotation.z) * 0.05;
    // marshmallowStick.rotation.copy(marshmallowGroup.rotation);
    //    // Animate flames
    flame1.rotation.y += 0.05;
    flame2.rotation.y -= 0.05;

    // Animate embers
    embers.forEach((ember, index) => {
      const originalPos = originalFlamePositions[index];
      ember.position.y =
        originalPos.y + Math.sin(Date.now() * 0.005 + index) * 0.1;
      ember.position.x =
        originalPos.x + Math.sin(Date.now() * 0.003 + index) * 0.05;
      ember.position.z =
        originalPos.z + Math.cos(Date.now() * 0.003 + index) * 0.05;
    });

    // Animate smoke particles
    smokeParticles.forEach((particle) => {
      // Move particle up
      particle.position.y += particle.userData.speed;

      // Add slight horizontal drift
      particle.position.x +=
        Math.sin(Date.now() * 0.001 + particle.userData.life) * 0.01;
      particle.position.z +=
        Math.cos(Date.now() * 0.001 + particle.userData.life) * 0.01;

      // Rotate particle
      particle.rotation.y += particle.userData.rotationSpeed;

      // Increase size over time
      const scale =
        particle.userData.startScale * (1 + particle.userData.life * 0.01);
      particle.scale.set(scale, scale, scale);

      // Fade out over time
      particle.material.opacity =
        0.4 * (1 - particle.userData.life / particle.userData.maxLife);

      // Increment life
      particle.userData.life++;

      // Reset particle if it's reached its max life
      if (particle.userData.life >= particle.userData.maxLife) {
        resetSmokeParticle(particle);
      }
    });

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  // Cleanup function
  return () => {
    window.removeEventListener("resize", onWindowResize);
    container.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("wheel", onWheel);
    renderer.dispose();
  };
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initThreeBackground);
