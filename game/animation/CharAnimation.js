const CharAnimation = (animationName, aniLoader, animationsArray) => {
    aniLoader.load(`../static/models/fbx/${animationName}.fbx`, (animation) => {
        animation.name = animationName;
        animationsArray[animationName] = animation;
    });
}
const JumpAnimation = (myAVtar, gsap) => {

    if (myAVtar.children[0].children[2].position.y === 1.0) {
        gsap.to(myAVtar.children[0].children[2].position, { duration: 0.5, ease: "power2.out", y: myAVtar.children[0].children[2].position.y + 0.5 });
        setTimeout(() => {
            gsap.to(myAVtar.children[0].children[2].position, { duration: 2, ease: "power2.out", y: myAVtar.children[0].children[2].position.y - 0.5 });
        }, 500)
    }
}
export { CharAnimation, JumpAnimation }