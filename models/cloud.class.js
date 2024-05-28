/**
 * Class representing a cloud, inheriting from the MovableObject class.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    width = 1280;
    height = 720;
    y = 0;

    /**
     * Constructs a new cloud object.
     * @param {string} imagePath - The path to the image of the cloud.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.startPositionX = x;
        this.x = x;
        this.animate();
    }

    /**
     * Animates the movement of the cloud.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x < -1280) this.x = 1279 * 7;
        }, 1000 / 60);
    }
}
