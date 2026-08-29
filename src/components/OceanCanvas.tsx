import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function ScrollRig() {
  useFrame((state) => {
    // Determine scroll percentage (0 to 1)
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    
    // Dive down up to 30 units deep based on scroll
    const targetY = -(scrollProgress * 30);
    
    // Lerp camera for smooth cinematic effect
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
  });
  return null;
}

function Shark() {
  const sharkRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sharkRef.current) {
      // Offset by camera Y to keep it somewhat in view or let it swim globally
      const camY = state.camera.position.y;
      
      const t = state.clock.elapsedTime * 0.15;
      sharkRef.current.position.x = Math.sin(t) * 20;
      sharkRef.current.position.z = Math.cos(t) * 15 - 15;
      // Make it swim lower down, reacting loosely to camera depth
      sharkRef.current.position.y = Math.sin(t * 1.5) * 3 - 5 + (camY * 0.5);
      
      // Calculate tangent for rotation
      const nextX = Math.sin(t + 0.01) * 20;
      const nextZ = Math.cos(t + 0.01) * 15 - 15;
      const angle = Math.atan2(nextX - sharkRef.current.position.x, nextZ - sharkRef.current.position.z);
      sharkRef.current.rotation.y = angle;
      sharkRef.current.rotation.z = Math.sin(t * 3) * 0.1; // Gentle swimming roll
    }
  });

  return (
    <group ref={sharkRef}>
      {/* Abstract subtle shark shape */}
      <mesh scale={[0.5, 0.8, 3]}>
        <coneGeometry args={[1, 4, 4]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.03} wireframe />
      </mesh>
      {/* Fin */}
      <mesh position={[0, 1.2, 0.5]} scale={[0.1, 1, 1]} rotation={[-0.5, 0, 0]}>
        <coneGeometry args={[1, 2, 3]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function DataStream({ count = 200 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      // Spread Y from top (10) to bottom (-40) to cover the dive depth
      positions[i * 3 + 1] = 10 - (Math.random() * 50); // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#22d3ee" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function MantaRay({ position, scale = 1, delay = 0 }: { position: [number, number, number], scale?: number, delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.2 + delay;
      ref.current.position.x = position[0] + Math.sin(t) * 10;
      ref.current.position.z = position[2] + Math.cos(t) * 8;
      ref.current.position.y = position[1] + Math.sin(t * 2) * 2;
      
      const nextX = position[0] + Math.sin(t + 0.01) * 10;
      const nextZ = position[2] + Math.cos(t + 0.01) * 8;
      ref.current.rotation.y = Math.atan2(nextX - ref.current.position.x, nextZ - ref.current.position.z);
      ref.current.rotation.z = Math.sin(t * 4) * 0.2; // wing flap
    }
  });

  return (
    <group ref={ref} scale={scale}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 3, 10, 10]} />
          <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.1} />
        </mesh>
        <mesh position={[0, 0, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.2, 2, 4]} />
          <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

function Jellyfish({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.005;
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} scale={scale} ref={ref}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        {/* Bell */}
        <mesh>
          <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.4} wireframe />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.6, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="#3b82f6" transparent opacity={0.2} wireframe />
        </mesh>
        {/* Tentacles */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i * (Math.PI / 3)) * 0.4, -1, Math.cos(i * (Math.PI / 3)) * 0.4]}>
            <cylinderGeometry args={[0.02, 0.01, 1.5, 4]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}


function CompanionFish() {
  const ref = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const finLRef = useRef<THREE.Mesh>(null);
  const finRRef = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  
  // Physics state
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      const w = state.viewport.width;
      const h = state.viewport.height;
      const targetX = pointer.current.x * (w / 2) * 1.2;
      const targetY = pointer.current.y * (h / 2) * 1.2 + state.camera.position.y;
      
      const roamingOffset = new THREE.Vector3(
        Math.sin(state.clock.elapsedTime * 0.8) * 0.5,
        Math.cos(state.clock.elapsedTime * 0.6) * 0.3,
        Math.sin(state.clock.elapsedTime * 0.4) * 0.4 - 2 // base Z position
      );
      
      currentTarget.current.set(targetX, targetY, 0).add(roamingOffset);
      const position = ref.current.position;
      
      // Smooth cursor following
      const previousPosition = position.clone();
      position.lerp(currentTarget.current, 0.03);
      
      // Calculate instantaneous velocity for rotation
      velocity.current.subVectors(position, previousPosition).divideScalar(delta);
      
      // Update rotation
      if (velocity.current.lengthSq() > 0.01) {
        const forward = velocity.current.clone().normalize();
        
        // Target right vector
        const worldUp = new THREE.Vector3(0, 1, 0);
        
        // Banking effect
        const turnAmount = THREE.MathUtils.clamp(velocity.current.x * 0.1, -1, 1);
        const bankAngle = turnAmount * Math.PI / 4; 
        worldUp.applyAxisAngle(forward, bankAngle);
        
        const right = new THREE.Vector3().crossVectors(worldUp, forward).normalize();
        if (right.lengthSq() < 0.001) right.set(1, 0, 0);
        const up = new THREE.Vector3().crossVectors(forward, right).normalize();
        
        const rotationMatrix = new THREE.Matrix4().makeBasis(right, up, forward);
        const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);
        
        ref.current.quaternion.slerp(targetQuaternion, delta * 15);
      }
      
      // Wobble
      ref.current.rotateZ(Math.sin(state.clock.elapsedTime * 3) * 0.05);
    }
    
    // Stop flapping tail and fins, just a static gentle pose
    if (tailRef.current) {
        tailRef.current.rotation.y = 0;
    }
    if (finLRef.current) {
        finLRef.current.rotation.z = -Math.PI/4;
    }
    if (finRRef.current) {
        finRRef.current.rotation.z = Math.PI/4;
    }
  });

  return (
    <group ref={ref} position={[0, 0, -3]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        {/* Main Body */}
        <mesh scale={[0.35, 0.45, 1.2]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.6} />
        </mesh>
        
        {/* Inner Core */}
        <mesh position={[0, -0.05, 0.05]} scale={[0.25, 0.35, 1.1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Tail section */}
        <group position={[0, 0, -1.1]} ref={tailRef}>
          {/* Top Tail Fin */}
          <mesh position={[0, 0.3, -0.3]} scale={[0.04, 0.6, 0.4]} rotation={[Math.PI / 4, 0, 0]}>
            <coneGeometry args={[1, 2, 16]} />
            <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
          </mesh>
          {/* Bottom Tail Fin */}
          <mesh position={[0, -0.2, -0.2]} scale={[0.04, 0.4, 0.3]} rotation={[2.4, 0, 0]}>
            <coneGeometry args={[1, 2, 16]} />
            <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Dorsal Fin */}
        <mesh position={[0, 0.55, -0.1]} rotation={[-Math.PI/5, 0, 0]} scale={[0.05, 0.5, 0.6]}>
          <coneGeometry args={[1, 2, 16]} />
          <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
        </mesh>

        {/* Side Fins */}
        <mesh ref={finLRef} position={[0.35, -0.1, 0.3]} rotation={[0, 0, -Math.PI/3]} scale={[0.6, 0.05, 0.4]}>
          <coneGeometry args={[1, 2, 16]} />
          <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
        </mesh>
        <mesh ref={finRRef} position={[-0.35, -0.1, 0.3]} rotation={[0, 0, Math.PI/3]} scale={[0.6, 0.05, 0.4]}>
          <coneGeometry args={[1, 2, 16]} />
          <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
        </mesh>

        {/* Angry Brows */}
        <mesh position={[0.22, 0.22, 0.85]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.15, 0.04, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
        </mesh>
        <mesh position={[-0.22, 0.22, 0.85]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.15, 0.04, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.8} />
        </mesh>

        {/* Eyes (Fierce Blue) */}
        <mesh position={[0.24, 0.15, 0.85]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0ea5e9" wireframe />
        </mesh>
        <mesh position={[-0.24, 0.15, 0.85]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#0ea5e9" wireframe />
        </mesh>
        
        {/* Jaw/Mouth with Teeth */}
        <mesh position={[0, -0.12, 1.05]} rotation={[-Math.PI / 10, 0, 0]}>
          <boxGeometry args={[0.25, 0.02, 0.15]} />
          <meshBasicMaterial color="#0ea5e9" wireframe />
        </mesh>
        <mesh position={[0.08, -0.13, 1.1]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.03, 0.06, 4]} />
          <meshBasicMaterial color="#0ea5e9" wireframe />
        </mesh>
        <mesh position={[-0.08, -0.13, 1.1]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.03, 0.06, 4]} />
          <meshBasicMaterial color="#0ea5e9" wireframe />
        </mesh>
      </Float>
    </group>
  );
}


function Octopus({ position, scale = 1, delay = 0 }: { position: [number, number, number], scale?: number, delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  const tentaclesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.5 + delay;
      ref.current.position.y = position[1] + Math.sin(t) * 1.5;
    }
    if (tentaclesRef.current) {
      const t = state.clock.elapsedTime * 2 + delay;
      tentaclesRef.current.children.forEach((child, i) => {
        child.rotation.x = Math.sin(t + i) * 0.3 + 0.2;
      });
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#7e22ce" roughness={0.4} />
        </mesh>
        {/* Eyes */}
        <mesh position={[0.4, 1, 0.8]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.4, 1, 0.8]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1} />
        </mesh>
        {/* Tentacles */}
        <group ref={tentaclesRef} position={[0, 0.2, 0]}>
          {[...Array(8)].map((_, i) => (
            <group key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
              <mesh position={[0, -1, 0.8]}>
                <cylinderGeometry args={[0.1, 0.02, 2, 8]} />
                <meshStandardMaterial color="#6b21a8" />
              </mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}

function RedEyeFish({ position, scale = 1, delay = 0 }: { position: [number, number, number], scale?: number, delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.5 + position[0] + delay;
      ref.current.position.x = position[0] + Math.sin(t) * 8;
      ref.current.position.z = position[2] + Math.cos(t * 0.8) * 4;
      ref.current.position.y = position[1] + Math.sin(t * 1.5) * 2;
      
      const nextX = position[0] + Math.sin(t + 0.01) * 8;
      const nextZ = position[2] + Math.cos((t + 0.01) * 0.8) * 4;
      ref.current.rotation.y = Math.atan2(nextX - ref.current.position.x, nextZ - ref.current.position.z);
      // add wiggle
      ref.current.rotation.z = Math.sin(t * 10) * 0.1;
    }
  });

  return (
    <group ref={ref} scale={scale}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <coneGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
        {/* Tail */}
        <mesh position={[0, -1.2, 0]}>
          <coneGeometry args={[0.3, 1, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>
      {/* Eyes */}
      <mesh position={[0.25, 0.1, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.25, 0.1, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}


function SeaHorse({ position, scale = 1, delay = 0 }: { position: [number, number, number], scale?: number, delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  const finRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 1.2 + delay;
      ref.current.position.y = position[1] + Math.sin(t) * 0.3;
      ref.current.position.x = position[0] + Math.cos(t * 0.8) * 0.2;
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.3;
      ref.current.rotation.z = Math.sin(t * 1.5) * 0.1; // Gentle sway
    }
    if (finRef.current) {
      // Rapid fin fluttering
      finRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 20) * 0.5;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main Body Curve (using a series of spheres for a smooth organic shape) */}
        
        <group rotation={[0, 0, 0.2]}>
            {/* Torso */}
            <mesh position={[0, 0, 0]}>
              <capsuleGeometry args={[0.25, 0.5, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.1} />
            </mesh>
            
            {/* Belly highlight */}
            <mesh position={[0.1, -0.1, 0]}>
              <capsuleGeometry args={[0.2, 0.4, 16, 16]} />
              <meshStandardMaterial color="#fde68a" roughness={0.6} />
            </mesh>

            {/* Neck */}
            <mesh position={[0.05, 0.45, 0]} rotation={[0, 0, 0.3]}>
               <capsuleGeometry args={[0.18, 0.3, 16, 16]} />
               <meshStandardMaterial color="#f59e0b" roughness={0.4} />
            </mesh>

            {/* Head */}
            <mesh position={[0.2, 0.65, 0]} rotation={[0, 0, -0.2]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.4} />
            </mesh>
            
            {/* Snout */}
            <mesh position={[0.45, 0.55, 0]} rotation={[0, 0, -Math.PI/2 + 0.2]}>
              <cylinderGeometry args={[0.06, 0.12, 0.35, 16]} />
              <meshStandardMaterial color="#d97706" />
            </mesh>

            {/* Coronet (crown on head) */}
            <mesh position={[0.15, 0.85, 0]} rotation={[0, 0, 0.2]}>
              <coneGeometry args={[0.08, 0.2, 8]} />
              <meshStandardMaterial color="#d97706" />
            </mesh>

            {/* Tail */}
            <group position={[-0.05, -0.4, 0]}>
               {/* Base of tail */}
               <mesh position={[0, -0.2, 0]} rotation={[0, 0, -0.2]}>
                 <cylinderGeometry args={[0.18, 0.1, 0.4, 16]} />
                 <meshStandardMaterial color="#f59e0b" />
               </mesh>
               {/* Curl */}
               <mesh position={[0.08, -0.45, 0]} rotation={[0, 0, Math.PI]}>
                  <torusGeometry args={[0.12, 0.08, 16, 32, Math.PI * 1.5]} />
                  <meshStandardMaterial color="#f59e0b" />
               </mesh>
            </group>

            {/* Dorsal Fin */}
            <mesh ref={finRef} position={[-0.25, 0.1, 0]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.3, 0.4]} />
              <meshStandardMaterial color="#fcd34d" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
            
            {/* Eyes */}
            <mesh position={[0.3, 0.68, 0.12]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            <mesh position={[0.3, 0.68, -0.12]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            
            {/* Eye highlights */}
            <mesh position={[0.33, 0.7, 0.15]}>
              <sphereGeometry args={[0.015, 4, 4]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.33, 0.7, -0.15]}>
              <sphereGeometry args={[0.015, 4, 4]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
        </group>
      </Float>
    </group>
  );
}


function KelpPlant({ position, delay }: { position: [number, number, number], delay: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime + delay;
      // Sway in the current
      ref.current.rotation.z = Math.sin(t * 0.5) * 0.1;
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group position={position} ref={ref}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[Math.sin(i + delay) * 0.2, i * 1.5, Math.cos(i + delay) * 0.2]} rotation={[0, 0, Math.sin(i)*0.2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#10b981" : "#059669"} emissive="#064e3b" emissiveIntensity={0.2} wireframe />
          
          {/* Leaves */}
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI/4]}>
             <boxGeometry args={[0.4, 0.02, 0.2]} />
             <meshStandardMaterial color="#34d399" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -Math.PI/4]}>
             <boxGeometry args={[0.4, 0.02, 0.2]} />
             <meshStandardMaterial color="#34d399" transparent opacity={0.5} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

function DeepWaterPlants() {
  return (
    <group>
      <KelpPlant position={[-5, -34, -6]} delay={0} />
      <KelpPlant position={[-3, -36, -8]} delay={2} />
      <KelpPlant position={[4, -34, -7]} delay={1} />
      <KelpPlant position={[6, -35, -5]} delay={3} />
      <KelpPlant position={[0, -36, -10]} delay={0.5} />
    </group>
  );
}

export default function OceanCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Use a dark fog to blend things into the abyss without completely covering the CSS gradient behind */}
        <fog attach="fog" args={['#020617', 5, 25]} />
        <ambientLight intensity={0.5} color="#0c1e40" />
        <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
        
        <DataStream count={1000} />
        <Sparkles count={400} scale={[20, 50, 20]} position={[0, -15, 0]} size={2} speed={0.2} opacity={0.15} color="#3b82f6" />
        
        <CompanionFish />
        <Shark />
        
        {/* Spread elements vertically to discover them while diving */}
        <SeaHorse position={[2, 4, -4]} scale={0.5} />
        <SeaHorse position={[3, 3, -5]} scale={0.4} delay={2} />
        <SeaHorse position={[-3, 5, -3]} scale={0.6} delay={1} />
        
        <MantaRay position={[4, 0, -5]} scale={0.6} />
        <Jellyfish position={[-4, 2, -6]} scale={0.5} />
        
        {/* Deeper elements */}
        <Jellyfish position={[3, -10, -5]} scale={0.8} />
        <MantaRay position={[-3, -14, -8]} scale={0.8} delay={5} />
        <RedEyeFish position={[2, -18, -4]} scale={0.5} />
        <RedEyeFish position={[3, -17.5, -5]} scale={0.4} delay={0.5} />
        <RedEyeFish position={[1.5, -18.5, -6]} scale={0.45} delay={1} />
        
        {/* Even deeper elements */}
        <Jellyfish position={[-2, -22, -4]} scale={1.2} />
        <MantaRay position={[6, -26, -12]} scale={1.2} delay={10} />
        
        <Octopus position={[-2, -28, -8]} scale={0.8} />
        <Octopus position={[4, -30, -10]} scale={1} delay={2} />
        
        <DeepWaterPlants />

        <ScrollRig />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
