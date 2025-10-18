import { Canvas } from "@react-three/fiber";
import ModelLoader from "../modelLoader/ModelLoader";
import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

type Canvas3dProps = {
    modelUrl: string;
}

export default function Canvas3d({ modelUrl }: Canvas3dProps) {
    return (
        <>
            <Canvas

            >
                <OrbitControls />
                <Environment preset="city" />
                <ModelLoader modelUrl={modelUrl} />
            </Canvas>
        </>
    )
}