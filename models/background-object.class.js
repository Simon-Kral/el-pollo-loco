/**
 * Represents a background object that extends a movable object.
 * This class handles the properties and behaviors specific to background elements in the game.
 *
 * @extends {MovableObject}
 */
class BackgroundObject extends MovableObject {
    width = 1280;
    height = 720;
    x = 0;
    y = 0;

    /**
     * Creates an instance of BackgroundObject.
     *
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The initial x-coordinate position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
