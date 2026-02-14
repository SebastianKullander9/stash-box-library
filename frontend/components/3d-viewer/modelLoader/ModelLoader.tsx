import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ModelLoaderProps = {
    modelUrl: string;
}

export default function ModelLoader({ modelUrl }: ModelLoaderProps) {
    const { scene } = useGLTF(modelUrl);
	const ref = useRef<THREE.Group>(null);

	useFrame((_, delta) => {
		if (ref.current) {
			ref.current.rotation.y += delta * 0.5;
		}
	})

    return (
        <primitive ref={ref} object={scene} />
    );
}