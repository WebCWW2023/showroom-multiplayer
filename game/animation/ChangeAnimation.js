import * as THREE from "three";

const changeAnimation = (a, animationsArray, animationName,isAnimationSingle) => {
    a && a.stopAllAction()
    if (!isAnimationSingle) { 
        a && a.clipAction(animationsArray[animationName].animations[0]).fadeIn().play();
    }
    else { 
        a && a.clipAction(animationsArray[animationName].animations[0]).setLoop(THREE.LoopOnce,2).fadeIn(0.2).play();
        a.addEventListener('finished', () => {
            a && a.clipAction(animationsArray['Idle'].animations[0]).fadeIn().play();
        })
    }
}

export { changeAnimation }