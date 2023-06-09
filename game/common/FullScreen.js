var isScreenFull = false;

const openFullscreen = () => {
  if (document.fullscreenEnabled) {
    if (!isScreenFull) {
      document.documentElement.requestFullscreen()
      isScreenFull = true;
    } else {
      document.exitFullscreen();
      isScreenFull = false;
    }
  }
}
const FullScreenM = (fullScreen) => {
  fullScreen.addEventListener('click', () => {
    openFullscreen();
  });
  document.addEventListener("keyup", function (e) {
    if (e.code === "KeyF") {
      openFullscreen();
    }
  })

}

export { FullScreenM }