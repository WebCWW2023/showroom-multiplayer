import * as THREE from 'three';

const meshM = (cityGroup, objectArray) => {
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 'gray'
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.receiveShadow = true
    floor.rotation.x = - Math.PI * 0.5
    floor.position.set(0, 0, 0)
    cityGroup.add(floor) 
    objectArray.push(floor)
}
export { meshM }