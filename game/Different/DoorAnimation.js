const DoorAnimation = (isDoorClosed, hall, gsap) => {
    let leftDoor = hall.scene.getObjectByName('Glass_Door_Part01');
    let rightDoor = hall.scene.getObjectByName('Glass_Door_Part149');
    if (isDoorClosed) {
        gsap.to(leftDoor.position, { duration: 2, ease: "none", x: leftDoor.position.x - 1 });  
        gsap.to(rightDoor.position, { duration: 2, ease: "none", x: rightDoor.position.x + 1 });  
    }
    else {
        gsap.to(leftDoor.position, { duration: 2, ease: "none", x: leftDoor.position.x + 1 });  
        gsap.to(rightDoor.position, { duration: 2, ease: "none", x: rightDoor.position.x - 1 });   
    }


}
export { DoorAnimation }