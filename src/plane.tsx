import React, { forwardRef, useRef } from "react"
import { useFrame } from "react-three-fiber"
import "./CustomMaterial"


type PlaneArgs = {
    color?: any,
    shift?: any,
    opacity?: any,
    args?: any,
    map?: any
}

const Plane = forwardRef(({ color = "black", shift = 1, opacity = 1, args, map, ...props }:PlaneArgs, ref) => {
  const material:any = useRef()
  return (
    <mesh ref={ref} {...props}>
      <planeBufferGeometry attach="geometry" args={args} />
      <customMaterial ref={material} attach="material" color={color} map={map} transparent opacity={opacity} />
    </mesh>
  )
})

export default Plane