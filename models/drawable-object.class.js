/**
 * Class representing a drawable object.
 */
class DrawableObject {
    x = 120;
    y = 200;
    height = 150;
    width = 100;
    sizeFactor = 0.3;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    animationStarted = false;

    /**
     * Loads an image from the specified path.
     * @param {string} imagePath - The path to the image.
     */
    loadImage(imagePath) {
        this.img = new Image();
        this.img.src = imagePath;
    }

    /**
     * Draws the object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Plays an animation using the provided images.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Resets the current image index if animation has not started.
     */
    resetImage() {
        if (!this.animationStarted) {
            this.animationStarted = true;
            this.currentImage = 0;
        }
    }

    /**
     * Draws the hitbox of the object onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawHitbox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
    }

    /**
     * Adds text to the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {Object} mo - The object containing text properties.
     */
    addText(ctx, mo) {
        ctx.fillText(mo.amount, this.x + 60, this.y + 10);
    }

    /**
     * Sets the offset values of the object based on size factor and individual size factor.
     */
    setOffsets() {
        this.width = this.width * this.sizeFactor * this.individualSizeFactor;
        this.height = this.height * this.sizeFactor * this.individualSizeFactor;
        this.offset.top = this.offset.top * this.sizeFactor * this.individualSizeFactor;
        this.offset.left = this.offset.left * this.sizeFactor * this.individualSizeFactor;
        this.offset.right = this.offset.right * this.sizeFactor * this.individualSizeFactor;
        this.offset.bottom = this.offset.bottom * this.sizeFactor * this.individualSizeFactor;
    }
}
