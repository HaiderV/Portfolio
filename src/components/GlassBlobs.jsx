import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment,
  Lightformer,
  Float,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { createNoise3D } from 'simplex-noise'

const noise3D = createNoise3D()

/* ------------------------------------------------------------------
   Organic "glass drop" geometry.
   An icosphere is merged into an indexed mesh (so normals average to
   a SMOOTH surface — otherwise it shades as flat crystal facets),
   then pushed around by layered simplex noise for a liquid silhouette.
------------------------------------------------------------------ */
function useBlobGeometry(detail, seed, amp, freq) {
  return useMemo(() => {
    const geo = mergeVertices(new THREE.IcosahedronGeometry(1, detail))
    const pos = geo.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const n1 = noise3D(v.x * freq + seed, v.y * freq + seed, v.z * freq + seed)
      const n2 =
        0.5 *
        noise3D(v.x * freq * 2 + seed, v.y * freq * 2 + seed, v.z * freq * 2 + seed)
      v.multiplyScalar(1 + amp * (n1 + n2))
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [detail, seed, amp, freq])
}

/* Shared transmission material — blue (attenuated) or clear. */
function GlassMaterial({ blue, quality = 'high' }) {
  const hi = quality === 'high'
  return (
    <MeshTransmissionMaterial
      samples={hi ? 6 : 3}
      resolution={hi ? 384 : 160}
      thickness={blue ? 1.7 : 1.3}
      roughness={blue ? 0.14 : 0.08}
      ior={1.5}
      chromaticAberration={blue ? 0.09 : 0.035}
      anisotropy={0.25}
      distortion={0.16}
      distortionScale={0.35}
      temporalDistortion={0.1}
      clearcoat={1}
      clearcoatRoughness={0.12}
      attenuationDistance={blue ? 0.95 : 8}
      attenuationColor={blue ? '#001a80' : '#ffffff'}
      color={blue ? '#1230ff' : '#ffffff'}
      backside={hi}
      backsideThickness={0.5}
    />
  )
}

function BlobMesh({ position, rotation, radius, detail, seed, amp, freq, blue, quality }) {
  const geo = useBlobGeometry(detail, seed, amp, freq)
  return (
    <mesh geometry={geo} position={position} rotation={rotation} scale={radius}>
      <GlassMaterial blue={blue} quality={quality} />
    </mesh>
  )
}

/* Blob layout in normalised viewport space; ny is positive toward the top. */
const BLOBS = [
  { nx: -0.42, ny: 0.28, r: 0.14, blue: false, seed: 1.2, amp: 0.22, freq: 1.05, speed: 1.5, depth: 0.6 },
  { nx: 0.68, ny: 0.52, r: 0.09, blue: true, seed: 4.1, amp: 0.26, freq: 1.2, speed: 1.4, depth: 1.8 },
  { nx: 0.02, ny: -0.42, r: 0.07, blue: false, seed: 7.7, amp: 0.17, freq: 0.95, speed: 1.3, depth: 1.8 },
]

function Scene() {
  const { viewport } = useThree()
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const k = Math.min(1, delta * 2.2)
    g.rotation.y += (pointer.current.x * 0.2 - g.rotation.y) * k
    g.rotation.x += (-pointer.current.y * 0.12 - g.rotation.x) * k
  })

  const halfW = viewport.width / 2
  const halfH = viewport.height / 2
  const unit = Math.min(viewport.width, viewport.height)
  const detail = 10

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 6, 6]} intensity={1.6} />
      <directionalLight position={[-6, -3, -5]} intensity={0.8} color="#b9c7ff" />

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer form="rect" intensity={6} position={[0, 5, -9]} scale={[14, 14, 1]} />
          <Lightformer form="rect" intensity={3.5} color="#3b6bff" position={[-6, 2, -1]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={3} color="#ffffff" position={[8, 1, 1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={2.4} color="#dfe7ff" position={[0, -5, 3]} rotation-x={Math.PI / 2} scale={[10, 2, 1]} />
          <Lightformer form="ring" intensity={3} color="#ffffff" position={[2, 3, 4]} scale={3} />
        </group>
      </Environment>

      <group ref={group}>
        {BLOBS.map((b, i) => {
          const radius = b.r * unit
          return (
            <Float
              key={i}
              speed={b.speed ?? 1.2}
              rotationIntensity={0.2}
              floatIntensity={0.65}
            >
              <BlobMesh
                position={[b.nx * halfW * 0.92, b.ny * halfH * 0.82, b.depth]}
                rotation={[b.seed * 0.3, b.seed * 0.5, 0]}
                radius={radius}
                detail={detail}
                seed={b.seed}
                amp={b.amp}
                freq={b.freq}
                blue={b.blue}
                quality="high"
              />
            </Float>
          )
        })}
      </group>
    </>
  )
}

const GlassBlobs = () => {
  const [smallScreen, setSmallScreen] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 699px)').matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 699px)')
    const updateScreenSize = (event) => setSmallScreen(event.matches)
    mediaQuery.addEventListener('change', updateScreenSize)
    return () => mediaQuery.removeEventListener('change', updateScreenSize)
  }, [])

  if (smallScreen) return null

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 40 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene />
    </Canvas>
  )
}

export default GlassBlobs