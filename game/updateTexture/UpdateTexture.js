import * as THREE from "three";
import {
  selectedBannername,
  bannerMeshArray,
  scene,
  globalUrl,
} from "../game.js";

let url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;
var roomName = search_params.get("room");
var defaultImg = document.querySelector(".defaultImg");

const addBanner = () => {
  let userTextures;
  var myHeaders = new Headers(
    {
      "Access-Control-Allow-Origin": "*"
    }
  );
  // myHeaders.append("Access-Control-Allow-Origin", "*")
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `${globalUrl}/usertexter?room_name=${roomName}`,
    requestOptions
  ).then((response) => response.json())
    .then((result) => {
      userTextures = result.data;
      var userTexturesObj = {};
      for (let i = 0; i < userTextures.length; i++) {
        userTexturesObj[userTextures[i].texter_name] =
          userTextures[i].text_image;
      }
      bannerMeshArray.map((item) => {
        if (userTexturesObj[item.name]) {
          let bannertexture = new THREE.TextureLoader().load(
            globalUrl + userTexturesObj[item.name],
          );
          bannertexture.flipY = false;
          bannertexture.minFilter = THREE.LinearFilter;
          // const bannerMaterial = new THREE.MeshStandardMaterial({
          //   map: bannertexture,
          //   side: THREE.DoubleSide,  
          // });
          // item.material.dispose()
          // item.material = bannerMaterial; 
          item.material.map = bannertexture;
          item.material.needsUpdate = true;
        }
      })
    })
}
const UpdateTexture = (imgPath, bannerName) => {
  const texturePath = `${globalUrl}` + imgPath;
  let updateMesh = scene.getObjectByName(bannerName);

  let bannertexture = new THREE.TextureLoader().load(texturePath);
  bannertexture.flipY = false;
  bannertexture.minFilter = THREE.LinearFilter;

  // const bannerMaterial = new THREE.MeshStandardMaterial({
  //   map: bannertexture,
  //   side: THREE.DoubleSide,
  // });

  // updateMesh.material.dispose();
  // updateMesh.material = bannerMaterial;
  updateMesh.material.map = bannertexture;
  updateMesh.material.needsUpdate = true;
};

/*-----------------textureUpdateForm-------------------*/
const textureUpdateForm = document.querySelector(".textureUpdateForm");
textureUpdateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var bannerToUpload = document.getElementById("text_image").files[0];
  var bannerImage = document.querySelector(".bannerImage");
  var warning = document.querySelector(".warning");
  var textureUpdate = document.querySelector(".textureUpdate");

  if (bannerToUpload.type === "image/jpeg") {
    if (bannerToUpload.size > 1000000) {
      bannerImage.style.display = 'none';
      warning.innerHTML = "File size too large!";
      return;
    }
    else {
      let picture = new FileReader();
      picture.readAsDataURL(bannerToUpload);
      picture.addEventListener("load", function (event) {
        bannerImage.setAttribute("src", event.target.result);
        bannerImage.style.display = "block";
        warning.style.display = "none";
        /*------------------------------------*/
        var myHeaders = new Headers();
        var formdata = new FormData();
        formdata.append("texter_name", selectedBannername);
        formdata.append("text_image", bannerToUpload);
        formdata.append("room_name", roomName);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        fetch(`${globalUrl}/updateaddusertexter/`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            UpdateTexture(
              result.data.text_image,
              selectedBannername
            );
          })
          .then(() => {
            textureUpdate.style.display = "none";
          })
          .catch((error) => console.log("error", error));
      });
      /*------------------------------------*/
    }
  } else {
    bannerImage.style.display = 'none';
    warning.innerHTML = "Please select a JPG file.";
    return;
  }

});

export { addBanner };
