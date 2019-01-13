export default `
    uniform vec2 resolution;
    varying vec2 vfPosition;

    void main() {
        float rx = resolution.x;
        float ry = resolution.y;
        float coordx = (vfPosition.x + resolution.x/2.0)/(rx/1.0);
        float coordy = (vfPosition.y + resolution.y/2.0)/(ry/1.0);
        vec2 coord = vec2(coordx, coordy);
        vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
        if(coord.x < 0.5) {
            color = vec4(1.0, 1.0, 1.0, 1.0);
        }
        gl_FragColor = color;
    }
`