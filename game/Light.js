import * as THREE from 'three';
import { ambientLightGUI, directionalLightGUI, hemisphereLightGUI, positionGUI, rectAreaLightGUI, spotLightGUI } from './common/CommonFunction.js';
// import { RectAreaLightHelper } from '../cdn/examples/jsm/helpers/RectAreaLightHelper.js';
const ambientLightM = (gui, lightGroup, intensity, color, lightGui) => {
    let ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.name = 'ambientLight'
    lightGroup.add(ambientLight);
    lightGui && ambientLightGUI(gui, ambientLight, 'ambientLight');
}

/** 
 * hemisphereLight 
 */

const hemisphereLightM = (gui, lightGroup, intensity, color1, color2) => {
    let hemisphereLight = new THREE.HemisphereLight(color1, color2, intensity);
    hemisphereLight.name = 'hemisphereLight'
    hemisphereLight.position.set(0, 10, 0);
    // hemisphereLightGUI(gui, hemisphereLight, 'hemisphereLight')  
    lightGroup.add(hemisphereLight)
}
const directionalLightM = (gui, lightGroup, helperGroup, x, y, z, xr, yr, zr,intensity, color, lightGui) => {
    let directionalLight = new THREE.DirectionalLight(color, intensity);//756c6c
    directionalLight.visible = true;
    directionalLight.name = 'dayDirectionalLight'
    directionalLight.position.set(x, y, z);
    directionalLight.rotation.set(xr, yr, zr);

    directionalLight.castShadow = false;

    directionalLight.shadow.mapSize.width = 1024 * 24
    directionalLight.shadow.mapSize.height = 1024 * 24

    directionalLight.shadow.camera.near = 10
    directionalLight.shadow.camera.far = 600

    directionalLight.shadow.camera.top = 500
    directionalLight.shadow.camera.right = 500
    directionalLight.shadow.camera.bottom = - 500
    directionalLight.shadow.camera.left = - 500
    directionalLight.shadow.bias = -0.0005;
    lightGroup.add(directionalLight);
    lightGui && directionalLightGUI(gui, directionalLight, 'directionalLight');
    const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    lightGui && helperGroup.add(directionalLightCameraHelper);
}

/** 
 * night mode direction light 
 */

const rectAreaLightNightM = (color, gui, lightGroup, helperGroup, w, h, x, y, z, xl, yl, zl, name) => {
    let intensity = 3.0;
    let rectLight = new THREE.RectAreaLight(color, intensity, w, h);
    rectLight.name = name;
    rectLight.visible = false;
    rectLight.position.set(x, y, z);
    rectLight.rotation.set(0, 0, -0.8);
    rectLight.lookAt(xl, yl, zl);
    // rectAreaLightGUI(gui, rectLight, 'rectLight')
    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // helperGroup.add(rectLightHelper);
    lightGroup.add(rectLight)
}

/** 
 * spotLight 
 */
const spotLightM = (gui, lightGroup) => {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.name = 'spotLight';
    spotLight.castShadow = false;
    spotLight.position.set(14.3, 100, -4.6);
    spotLight.visible = false;
    spotLight.intensity = 1.5;
    spotLight.angle = 464.1;
    spotLight.penumbra = 0.96;
    spotLight.shadow.bias = 0.1;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 1000;
    spotLight.shadow.camera.fov = 50;
    lightGroup.add(spotLight);
    spotLightGUI(gui, spotLight, 'spotLight')
}

const rectAreaLightM = (gui, lightGroup, w, h, x, y, z, xl, yl, zl) => {
    let intensity = 1;
    let rectLight = new THREE.RectAreaLight(0xffffff, intensity, w, h);
    rectLight.position.set(x, y, z);
    rectLight.lookAt(xl, yl, zl);
    // rectAreaLightGUI(gui, rectLight, 'rectLight')
    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);
    lightGroup.add(rectLight)
}

export { ambientLightM, hemisphereLightM, directionalLightM, rectAreaLightM, rectAreaLightNightM, spotLightM }