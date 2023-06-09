import * as THREE from "three";

const createHeart = (emojiName,heartsGroup,playerPosition) => {
    const heartSpriteMap = new THREE.TextureLoader().load(`../../static/images/emoji/${emojiName}.png`);
    const heartSpriteMaterial = new THREE.SpriteMaterial({ map: heartSpriteMap});
    const heartSprite = new THREE.Sprite(heartSpriteMaterial);
    heartSprite.scale.set(0.1, 0.1, 1);
    const heartInstance = heartSprite.clone();
    heartInstance.position.set(playerPosition.x, playerPosition.y + 0.9, playerPosition.z);
    heartsGroup.add(heartInstance);
    gsap.to(heartInstance.position, {
        duration: 1,
        y: heartInstance.position.y + 0.5,
        x: heartInstance.position.x + Math.random() * 0.5 - 0.2,
        z: heartInstance.position.z + Math.random() * 0.5 - 0.2,
        onComplete: () => {
            heartsGroup.remove(heartInstance);
        },
        ease: "power1.out",
    });
    gsap.to(heartInstance.scale, {
        duration: 1,
        y: Math.random() * 0.08 - 0.2,
        x: Math.random() * 0.08 - 0.2,
        z: 1,
        ease: "power1.out",
    });
}

export { createHeart }