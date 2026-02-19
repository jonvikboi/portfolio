"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function AmbientPieces() {
    const groupRef = useRef<THREE.Group>(null);
    const count = 40;
    const pieces = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 10 - 5,
                ] as [number, number, number],
                color: i % 3 === 0 ? "#F40C3F" : i % 3 === 1 ? "#6E0419" : "#310108",
                scale: Math.random() * 0.5 + 0.1,
                wireframe: Math.random() > 0.5,
            });
        }
        return temp;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const { x, y } = state.mouse;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.1, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.1, 0.05);
    });

    return (
        <group ref={groupRef}>
            {pieces.map((piece, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={piece.position} scale={piece.scale}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial
                            color={piece.color}
                            transparent
                            opacity={0.1}
                            wireframe={piece.wireframe}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

export default function Scene() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: true }}
            >
                <AmbientPieces />
            </Canvas>
        </div>
    );
}
