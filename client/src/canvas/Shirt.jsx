import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

// Shirt
const Shirt = () => {
  // current state snapshot
  const snap = useSnapshot(state);
  // extract nodes and materials from model
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // load textures
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // update t-shirt color on snapshot updated
  useFrame((_, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  // current state
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      {/* mesh */}
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* if full texture is showing on t-shirt */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {/* if logo is showing on t-shirt */}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
