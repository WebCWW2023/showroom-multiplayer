
/** 
 * scaleGUI 
 */

var scaleFolder;
const scaleGUI = (gui, obj, name) => {
    scaleFolder = gui.addFolder(name);
    scaleFolder.add(obj.scale, 'x').min(0.1).max(100).step(0.1).name(`${name} S x`)
    scaleFolder.add(obj.scale, 'y').min(0.1).max(100).step(0.1).name(`${name} S y`)
    scaleFolder.add(obj.scale, 'z').min(0.1).max(100).step(0.1).name(`${name} S z`)
    return scaleFolder;
}

/** 
* positionGUI 
*/

var sliderFolder;
const positionGUI = (gui, obj, name) => {
    // positionGUI(gui,camera,'camera')
    sliderFolder = gui.addFolder(name);
    sliderFolder.add(obj.position, 'x').min(-5000).max(5000).step(0.1).name(`${name} P x`)
    sliderFolder.add(obj.position, 'y').min(-5000).max(5000).step(0.1).name(`${name} P y`)
    sliderFolder.add(obj.position, 'z').min(-5000).max(5000).step(0.1).name(`${name} P z`)
    return sliderFolder;
}
/** 
* rotationGUI 
*/

var sliderFolder;
const rotationGUI = (gui, obj, name) => {
    sliderFolder = gui.addFolder(name);
    sliderFolder.add(obj.rotation, 'x').min(-500).max(500).step(0.1).name(`${name} R x`)
    sliderFolder.add(obj.rotation, 'y').min(-500).max(500).step(0.1).name(`${name} R y`)
    sliderFolder.add(obj.rotation, 'z').min(-500).max(500).step(0.1).name(`${name} R z`)
    return sliderFolder;
}

/** 
 * ambientLight 
 */

var ambientLightFolder;
const ambientLightGUI = (gui, obj, name) => {
    ambientLightFolder = gui.addFolder(name);
    ambientLightFolder.add(obj, 'visible');
    ambientLightFolder.addColor(obj, 'color')
    ambientLightFolder.add(obj, 'intensity').min(0.1).max(10).step(0.1).name('AmbientLight intensity');
    return ambientLightFolder;
}
/** 
 * directionalLight 
 */

var directionalLightFolder;
const directionalLightGUI = (gui, obj, name) => {
    directionalLightFolder = gui.addFolder(name);
    directionalLightFolder.add(obj, 'visible');
    directionalLightFolder.addColor(obj, 'color')
    directionalLightFolder.add(obj, 'intensity').min(0.1).max(5).step(0.1).name('DirectionalLight intensity');
    directionalLightFolder.add(obj.position, 'x').min(-1000).max(1000).step(0.1).name(`${name} P x`)
    directionalLightFolder.add(obj.position, 'y').min(-1000).max(1000).step(0.1).name(`${name} P y`)
    directionalLightFolder.add(obj.position, 'z').min(-1000).max(1000).step(0.1).name(`${name} P z`)
    directionalLightFolder.add(obj.rotation, 'x').min(-1000).max(1000).step(0.1).name(`${name} P x`)
    directionalLightFolder.add(obj.rotation, 'y').min(-1000).max(1000).step(0.1).name(`${name} P y`)
    directionalLightFolder.add(obj.rotation, 'z').min(-1000).max(1000).step(0.1).name(`${name} P z`)
    return directionalLightFolder;
}
/** 
 * spotLight 
 */

var spotLightFolder;
const spotLightGUI = (gui, obj, name) => {
    spotLightFolder = gui.addFolder(name);
    spotLightFolder.add(obj, 'visible');
    spotLightFolder.addColor(obj, 'color')
    spotLightFolder.add(obj, 'intensity').min(0.1).max(2).step(0.1).name('SpotLight intensity');
    spotLightFolder.add(obj, 'angle').min(-1000).max(1000).step(0.1).name(`${name} A x`)
    spotLightFolder.add(obj, 'penumbra').min(0).max(1).step(0.01).name(`${name} Penumbra`)
    spotLightFolder.add(obj.position, 'x').min(-1000).max(1000).step(0.1).name(`${name} P x`)
    spotLightFolder.add(obj.position, 'y').min(-1000).max(1000).step(0.1).name(`${name} P y`)
    spotLightFolder.add(obj.position, 'z').min(-1000).max(1000).step(0.1).name(`${name} P z`)
    return spotLightFolder;
}

/** 
 * hemisphereLight 
 */

var hemisphereLighttFolder;
const hemisphereLightGUI = (gui, obj, name) => {
    hemisphereLighttFolder = gui.addFolder(name);
    hemisphereLighttFolder.add(obj, 'visible');
    hemisphereLighttFolder.addColor(obj, 'color')
    hemisphereLighttFolder.addColor(obj, 'groundColor')
    hemisphereLighttFolder.add(obj, 'intensity').min(0.1).max(1.0).step(0.1).name('hemisphereLight intensity');
    hemisphereLighttFolder.add(obj.position, 'x').min(-1000).max(1000).step(0.1).name(`${name} P x`)
    hemisphereLighttFolder.add(obj.position, 'y').min(-1000).max(1000).step(0.1).name(`${name} P y`)
    hemisphereLighttFolder.add(obj.position, 'z').min(-1000).max(1000).step(0.1).name(`${name} P z`)
    return hemisphereLighttFolder;
}

/** 
 * rectAreaLight 
 */

var rectAreaLightFolder;
const rectAreaLightGUI = (gui, obj, name) => {
    rectAreaLightFolder = gui.addFolder(name);
    rectAreaLightFolder.add(obj, 'visible');
    rectAreaLightFolder.addColor(obj, 'color')
    rectAreaLightFolder.add(obj, 'intensity').min(0.1).max(10).step(0.1).name('hemisphereLight intensity');
    rectAreaLightFolder.add(obj, 'width').min(-1000).max(1000).step(0.1).name(`${name} width`)
    rectAreaLightFolder.add(obj, 'height').min(-1000).max(1000).step(0.1).name(`${name} height`)
    rectAreaLightFolder.add(obj.position, 'x').min(-1000).max(1000).step(0.1).name(`${name} P x`)
    rectAreaLightFolder.add(obj.position, 'y').min(-1000).max(1000).step(0.1).name(`${name} P y`)
    rectAreaLightFolder.add(obj.position, 'z').min(-1000).max(1000).step(0.1).name(`${name} P z`)
    rectAreaLightFolder.add(obj.rotation, 'x').min(-1000).max(1000).step(0.1).name(`${name} R x`)
    rectAreaLightFolder.add(obj.rotation, 'y').min(-1000).max(1000).step(0.1).name(`${name} R y`)
    rectAreaLightFolder.add(obj.rotation, 'z').min(-1000).max(1000).step(0.1).name(`${name} R z`)
    return rectAreaLightFolder;
}


/** 
 * cameraPathGUI 
 */
var cameraPathFolder;
const cameraPathGUI = (gui, obj, name) => {
    cameraPathFolder = gui.addFolder(name);
    cameraPathFolder.add(obj, 'x').min(-1000).max(1000).step(1).name(`camera path ${name} P x`);
    cameraPathFolder.add(obj, 'y').min(-1000).max(1000).step(1).name(`camera path ${name} P y`);
    cameraPathFolder.add(obj, 'z').min(-1000).max(1000).step(1).name(`camera path ${name} P z`);
    return cameraPathFolder
}
/** 
 * colorGUI 
 */
var colorFolder;
const colorGUI = (gui, obj, name) => {
    colorFolder = gui.addFolder(name);
    colorFolder.addColor(obj, 'color');
    return colorFolder;
}

/** 
 *  unrealBloomPass
 */
var unrealBloomPassFolder;
const unrealBloomPassGUI = (gui, obj, name) => {
    unrealBloomPassFolder = gui.addFolder(name);
    unrealBloomPassFolder.add(obj, 'enabled')
    unrealBloomPassFolder.add(obj, 'strength').min(0).max(2).step(0.001)
    unrealBloomPassFolder.add(obj, 'radius').min(0).max(2).step(0.001)
    unrealBloomPassFolder.add(obj, 'threshold').min(0).max(1).step(0.001)
    unrealBloomPassFolder.addColor(obj, 'clearColor')
}

/** 
 * fog 
 */
var fogFolder;
const fogGUI = (gui, obj, name) => {
    let fogFolder = gui.addFolder('fog');
    fogFolder.add(obj.fog, 'near').min(0).max(4000).step(1).name('near')
    fogFolder.add(obj.fog, 'far').min(0).max(5000).step(1).name('far')
    return fogFolder;
}

/** 
 * quaternion 
 */

 var quaternionFolder;
 const quaternionGUI = (gui, obj, name) => {
     quaternionFolder = gui.addFolder(name);
     quaternionFolder.add(obj.quaternion, 'x').min(-1).max(1).step(0.001).name(`${name} R x`)
     quaternionFolder.add(obj.quaternion, 'y').min(-1).max(2).step(0.001).name(`${name} R y`)
     quaternionFolder.add(obj.quaternion, 'z').min(-1).max(1).step(0.001).name(`${name} R z`)
     quaternionFolder.add(obj.quaternion, 'w').min(-1).max(1).step(0.001).name(`${name} R w`)
     return quaternionFolder;
 }

export { scaleGUI, rotationGUI, positionGUI, ambientLightGUI, directionalLightGUI, colorGUI, cameraPathGUI, hemisphereLightGUI, spotLightGUI, rectAreaLightGUI, unrealBloomPassGUI, fogGUI,quaternionGUI }
