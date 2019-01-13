export default `
    varying vec2 vfPosition;
    void main() {
        
        vec4 modelViewPosition = modelViewMatrix*vec4(position, 1.0);
        vec4 p = projectionMatrix * modelViewPosition;
        gl_Position = p;
        vfPosition = p.xy;
    }
`