import { useGLTF } from "@react-three/drei";

const BrainModel = () => {
  const { scene } = useGLTF("/models/HeroCharModel.glb"); // path in public
  return <primitive object={scene} scale={1.5} />;
};

export default BrainModel;
