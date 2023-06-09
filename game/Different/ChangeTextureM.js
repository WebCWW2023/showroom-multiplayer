import * as THREE from "three";
import { seletcedMeshToChangeTexture } from "../game.js";

const ChangeTextureM = (changeTextureDivs) => {
    changeTextureDivs.forEach(function (div) {
        div.addEventListener("click", function () {
            var texture = new THREE.TextureLoader().load(`../../static/texture/car/${div.classList[0]}.jpg`);
            seletcedMeshToChangeTexture.material.map = texture;
            seletcedMeshToChangeTexture.material.needsUpdate = true;
        });
    });
}
export { ChangeTextureM }