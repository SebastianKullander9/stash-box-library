import { useGLTF } from "@react-three/drei";

type ModelLoaderProps = {
    modelUrl: string;
}

export default function ModelLoader({ modelUrl }: ModelLoaderProps) {
    const { scene } = useGLTF(modelUrl);

    return (
        <primitive object={scene} />
    );
}