import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;
  
  // Hash function for noise
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;
    
    // Lens distortion (very subtle)
    vec2 cc = uv - 0.5;
    float dist = dot(cc, cc);
    uv = uv + cc * (1.0 + dist) * 0.05; 
    
    // Check bounds after distortion to avoid wrapping artifacts
    if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
       gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
       return;
    }
    
    // Scanlines
    float scanline = sin(uv.y * 800.0) * 0.04;
    
    // Slow moving scanline (refresh line)
    float refresh = sin(uv.y * 10.0 + time * 5.0) * 0.02;
    
    // Vignette
    float vignette = length(cc);
    vignette = smoothstep(0.8, 0.2, vignette);
    
    // Subtle noise
    float n = hash(uv + time) * 0.04;
    
    // Base color (we're not rendering a scene behind this, just an overlay)
    // We will blend this shader over the DOM using CSS mix-blend-mode or pointer-events-none.
    // So we just output the effects with some transparency.
    
    vec3 color = vec3(0.0);
    
    // Adding CRT green tint slightly in the noise
    color += vec3(0.1, 0.2, 0.1) * n;
    
    // Final composite
    float alpha = scanline + refresh + n;
    
    // Add dark vignette borders
    if(vignette < 0.5) alpha += (0.5 - vignette);
    
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
  }
`;

export default function CRTFilter() {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
