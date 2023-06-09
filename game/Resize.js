const resizeM = (playersPeer, renderer, labelRenderer, socket_id) => {
    let isPortrait = window.matchMedia("(orientation: portrait)").matches;
    var sizes = {};
    if (isPortrait) {
        sizes.width = window.outerWidth
        sizes.height = window.outerHeight
    }
    else {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    }
    playersPeer[socket_id] && playersPeer[socket_id].children.length && (playersPeer[socket_id].children[0].children[2].aspect = sizes.width / sizes.height);
    playersPeer[socket_id] && playersPeer[socket_id].children.length && playersPeer[socket_id].children[0].children[2].updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    labelRenderer.setSize(sizes.width, sizes.height)

}
export { resizeM }