const sittingM = (playersPeerData,x,y,z,xr,yr,zr) => {
    playersPeerData[socket.id] = {
        socket_id: socket.id, 
        position: { x: 8.9, y: 1.0, z: -16.4 },
        rotation: new THREE.Euler(0, Math.PI * 0.5, 0, 'XYZ')
    };
    setTimeout(() => {
        updatePlayerLocally('sitting') 
        updatePlayerGloally('sitting') 
        delete playersPeerData[socket.id];
    }, 100)
}
export { sittingM }