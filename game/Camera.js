import * as THREE from 'three';
import { OrbitControls } from '../cdn/examples/jsm/controls/OrbitControls.js';

const cameraM = () => {
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 100//40//100;
    camera.position.z = 250//50//250;
    return camera;
}

const controlM = (camera,renderer) => {
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.6;
    controls.screenSpacePanning = false;
    controls.update();
    return controls;
}
export { cameraM, controlM }