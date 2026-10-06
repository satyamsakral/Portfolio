import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OceanFacilityCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Deep Ocean Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x01040a, 0.0018);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      1200
    );
    camera.position.set(0, 0, 360);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x071b3e, 1.8);
    scene.add(ambientLight);

    const cyanBeacon = new THREE.PointLight(0x06b6d4, 3, 400);
    cyanBeacon.position.set(60, 40, 100);
    scene.add(cyanBeacon);

    const purpleBeacon = new THREE.PointLight(0x8b5cf6, 2.5, 450);
    purpleBeacon.position.set(-80, -60, 80);
    scene.add(purpleBeacon);

    // ----------------------------------------------------
    // 1. Submerged Geodesic Research Dome (Facility Structure)
    // ----------------------------------------------------
    const facilityGroup = new THREE.Group();
    facilityGroup.position.set(0, -30, -50);
    scene.add(facilityGroup);

    // Wireframe Outer Dome
    const domeGeo = new THREE.IcosahedronGeometry(120, 2);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    facilityGroup.add(domeMesh);

    // Inner Quantum Orbit Ring 1
    const ring1Geo = new THREE.TorusGeometry(85, 0.7, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    facilityGroup.add(ring1);

    // Inner Quantum Orbit Ring 2
    const ring2Geo = new THREE.TorusGeometry(65, 0.5, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    facilityGroup.add(ring2);

    // Inner Quantum Orbit Ring 3
    const ring3Geo = new THREE.TorusGeometry(45, 0.4, 16, 80);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      transparent: true,
      opacity: 0.5,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    facilityGroup.add(ring3);

    // Central Glowing AI Reactor Octahedron
    const coreGeo = new THREE.OctahedronGeometry(22, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x083344,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    facilityGroup.add(coreMesh);

    // ----------------------------------------------------
    // 2. Rising Micro-Bubbles System
    // ----------------------------------------------------
    const bubbleCount = 220;
    const bubbleGeo = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds: number[] = [];
    const bubbleSwits: number[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3] = (Math.random() - 0.5) * 450;
      bubblePositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 350;

      bubbleSpeeds.push(0.3 + Math.random() * 0.8);
      bubbleSwits.push(Math.random() * Math.PI * 2);
    }

    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));

    // Glow bubble canvas sprite
    const bubbleCanvas = document.createElement('canvas');
    bubbleCanvas.width = 32;
    bubbleCanvas.height = 32;
    const bCtx = bubbleCanvas.getContext('2d');
    if (bCtx) {
      const g = bCtx.createRadialGradient(16, 16, 1, 16, 16, 15);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      g.addColorStop(0.3, 'rgba(34, 211, 238, 0.7)');
      g.addColorStop(0.7, 'rgba(6, 182, 212, 0.2)');
      g.addColorStop(1, 'rgba(2, 6, 23, 0)');
      bCtx.fillStyle = g;
      bCtx.beginPath();
      bCtx.arc(16, 16, 15, 0, Math.PI * 2);
      bCtx.fill();
    }
    const bubbleTexture = new THREE.CanvasTexture(bubbleCanvas);

    const bubbleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 5,
      map: bubbleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbles);

    // ----------------------------------------------------
    // 3. Bioluminescent Marine Snow / Deep Particles
    // ----------------------------------------------------
    const snowCount = 350;
    const snowGeo = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3] = (Math.random() - 0.5) * 600;
      snowPositions[i * 3 + 1] = (Math.random() - 0.5) * 550;
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 450;

      snowVelocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.15,
      });
    }

    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));

    const snowMat = new THREE.PointsMaterial({
      color: 0x14b8a6,
      size: 2.8,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.5,
    });

    const snow = new THREE.Points(snowGeo, snowMat);
    scene.add(snow);

    // ----------------------------------------------------
    // 4. Autonomous Deep-Sea Research Drone (Submarine Probe)
    // ----------------------------------------------------
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Drone hull (abstract aerodynamic glider)
    const droneHullGeo = new THREE.ConeGeometry(5, 20, 5);
    const droneHullMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const droneHull = new THREE.Mesh(droneHullGeo, droneHullMat);
    droneHull.rotation.x = Math.PI / 2;
    droneGroup.add(droneHull);

    // Drone wings
    const droneWingsGeo = new THREE.BoxGeometry(22, 0.4, 6);
    const droneWingsMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const droneWings = new THREE.Mesh(droneWingsGeo, droneWingsMat);
    droneGroup.add(droneWings);

    // Drone light sensor
    const droneSensor = new THREE.PointLight(0x22d3ee, 1.5, 120);
    droneSensor.position.set(0, 0, 10);
    droneGroup.add(droneSensor);

    droneGroup.position.set(-150, 40, -100);

    // ----------------------------------------------------
    // 5. Synaptic Data Stream Conduits (Vertical Light Beams)
    // ----------------------------------------------------
    const conduitCount = 18;
    const conduitsGroup = new THREE.Group();
    scene.add(conduitsGroup);

    for (let i = 0; i < conduitCount; i++) {
      const cGeo = new THREE.CylinderGeometry(0.3, 0.3, 300, 6);
      const cMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });
      const cMesh = new THREE.Mesh(cGeo, cMat);
      cMesh.position.set(
        (Math.random() - 0.5) * 450,
        -50,
        (Math.random() - 0.5) * 350 - 50
      );
      conduitsGroup.add(cMesh);
    }

    // ----------------------------------------------------
    // Mouse and Scroll Event Handling
    // ----------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // ----------------------------------------------------
    // Animation Loop
    // ----------------------------------------------------
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Scroll depth factor (camera descends as user scrolls down)
      const docHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollRatio = scrollY / docHeight;
      const targetDepthY = -scrollRatio * 180;

      // Camera coordinates with subtle ocean swell
      camera.position.x = mouse.x * 35 + Math.sin(elapsedTime * 0.3) * 6;
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetDepthY + mouse.y * 25, 0.05);
      camera.lookAt(0, targetDepthY * 0.7, 0);

      // Rotate Facility Elements
      facilityGroup.rotation.y = elapsedTime * 0.08;
      ring1.rotation.x = elapsedTime * 0.25;
      ring1.rotation.y = elapsedTime * 0.18;
      ring2.rotation.y = -elapsedTime * 0.22;
      ring2.rotation.z = elapsedTime * 0.15;
      ring3.rotation.x = elapsedTime * 0.3;
      ring3.rotation.z = -elapsedTime * 0.25;
      coreMesh.rotation.y = -elapsedTime * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.3;

      // Gentle facility vertical breathing
      facilityGroup.position.y = -30 + Math.sin(elapsedTime * 0.8) * 4;

      // Beacon lights subtle pulse
      cyanBeacon.intensity = 2.4 + Math.sin(elapsedTime * 2.5) * 0.8;
      purpleBeacon.intensity = 2.0 + Math.cos(elapsedTime * 2) * 0.6;

      // Update Rising Bubbles
      const bPos = bubbleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < bubbleCount; i++) {
        const i3 = i * 3;
        bPos[i3 + 1] += bubbleSpeeds[i];
        bPos[i3] += Math.sin(elapsedTime + bubbleSwits[i]) * 0.15;

        // Reset if bubble reaches top
        if (bPos[i3 + 1] > 220) {
          bPos[i3 + 1] = -220;
          bPos[i3] = (Math.random() - 0.5) * 450;
        }
      }
      bubbleGeo.attributes.position.needsUpdate = true;

      // Update Marine Snow
      const sPos = snowGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        const i3 = i * 3;
        sPos[i3] += snowVelocities[i].x;
        sPos[i3 + 1] += snowVelocities[i].y;
        sPos[i3 + 2] += snowVelocities[i].z;

        if (sPos[i3] > 300) sPos[i3] = -300;
        if (sPos[i3] < -300) sPos[i3] = 300;
        if (sPos[i3 + 1] > 280) sPos[i3 + 1] = -280;
        if (sPos[i3 + 1] < -280) sPos[i3 + 1] = 280;
      }
      snowGeo.attributes.position.needsUpdate = true;

      // Deep Sea Drone Orbit Path
      const droneTime = elapsedTime * 0.2;
      droneGroup.position.x = Math.sin(droneTime) * 160;
      droneGroup.position.z = Math.cos(droneTime) * 120 - 60;
      droneGroup.position.y = Math.sin(droneTime * 2) * 20 - 10 + targetDepthY * 0.4;
      droneGroup.rotation.y = droneTime + Math.PI / 2;
      droneGroup.rotation.z = Math.sin(droneTime * 3) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
    />
  );
}
