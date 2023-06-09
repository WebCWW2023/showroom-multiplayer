import * as THREE from "three";
import { bannerNameArray, changeTextureNames } from "../game.js";

var texture1 = new THREE.TextureLoader().load('../static/texture/banner.jpg');
texture1.flipY = false;
texture1.minFilter = THREE.LinearFilter;
var texture2 = new THREE.TextureLoader().load('../static/texture/banner_2.jpg');
texture2.flipY = false;
texture2.minFilter = THREE.LinearFilter;



let glassColor = new THREE.Color(0x575757);
const wallGlassMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, color: glassColor });

const UpdateMaterial = (object) => {

    let type;
    switch (object.material.name) {
        /*-----------------car material-------------------*/
        case 'Material #150':
            changeTextureNames.push(object.name);
            break;
        case 'Material #159':
            changeTextureNames.push(object.name);
            break;
        case 'Material #118':
            changeTextureNames.push(object.name);
            break;
        case 'Material #95':
            changeTextureNames.push(object.name);
            break;
        case 'Material #186':
            changeTextureNames.push(object.name);
            break;
        case 'Material #192':
            changeTextureNames.push(object.name);
            break;
        case 'Material #165':
            changeTextureNames.push(object.name);
            break;
        case 'Material #177':
            changeTextureNames.push(object.name);
            break;
        case 'Material #35':
            changeTextureNames.push(object.name);
            break;

        /*-----------------banner-------------------*/
        case 'b1':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b2':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b3':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b4':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b5':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b6':
            object.material.map = texture2;
            bannerNameArray.push(object.name);
            break;
        case 'b7':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b8':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b9':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b10':
            object.material.map = texture2;
            bannerNameArray.push(object.name);
            break;
        case 'b11':
            object.material.map = texture1;
            bannerNameArray.push(object.name);
            break;
        case 'b12':
            object.material.map = texture2;
            bannerNameArray.push(object.name);
            break;
        default:
            break;
    }



}

export { UpdateMaterial }