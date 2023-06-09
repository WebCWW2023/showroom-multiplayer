import * as THREE from "three";
import { positionGUI, scaleGUI } from "../common/CommonFunction.js";
import { objectArray } from "../game.js";

let glassColor = new THREE.Color(0x575757);
let glassOpacity = 0.4;
const UpdateMesh = (cityGroup, gui, scene) => {

    let glassObjectsNames = ['Glass001_1', 'Mesh038_1', 'Glass', 'Door_Frame_Glass', 'Wall'];
    glassObjectsNames.map(item => {
        let glassObject = scene.getObjectByName(item);
        glassObject.material.transparent = true;
        glassObject.material.opacity = glassOpacity;
    })
    let transparentObjectsName = ['Rectangle001', 'Cylinder001',];
    transparentObjectsName.map(item => {
        let transparentObject = scene.getObjectByName(item);
        transparentObject.material.transparent = true;
        transparentObject.material.opacity = 0;
    })
    let Light_Bar = scene.getObjectByName('Light_Bar');
    Light_Bar.material.transparent = true;
    Light_Bar.material.opacity = 0.5;

    var tree_alpha = new THREE.TextureLoader().load('../static/texture/tree_alphamap.jpg');
    tree_alpha.flipY = false;
    let treePlane = scene.getObjectByName("Plane009_1");
    treePlane.material.alphaMap = tree_alpha;
    treePlane = scene.getObjectByName("Plane021");
    treePlane.material.alphaMap = tree_alpha;
}

const addObjectToArray = (object) => {
    switch (object.material.name) {
        case 'Material #201':
            break;
        case 'Material #200':
            break;
        default:
            objectArray.push(object);
            break;
    }
}
export { UpdateMesh, addObjectToArray }
