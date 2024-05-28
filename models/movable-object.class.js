/**
 * Represents a movable object that extends a drawable object.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    movementSpeed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.3;
    hp = 5;
    lastHit = 0;

    /**
     * Applies gravity to the object's vertical movement.
     */
    applyGravity() {
        setInterval(() => {
            if (!this.isSplashed) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                } else this.y = this.groundHeight;
            }
        }, 1000 / 100);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return !this.isSplashed;
        else return this.y < this.groundHeight && this.y - this.speedY < this.groundHeight;
    }

    /**
     * Checks if the object is on the ground.
     * @returns {boolean} True if the object is on the ground, false otherwise.
     */
    isOnGround() {
        return this.y >= this.groundHeight;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {object} obj - The object to check collision with.
     * @returns {boolean} True if the object is colliding with the specified object, false otherwise.
     */
    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        );
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.movementSpeed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.movementSpeed;
    }

    /**
     * Initiates a jump action for the object.
     * @async
     */
    async jump() {
        await playSound(this.jump_sound);
        this.speedY = 11;
    }

    /**
     * Inflicts damage to the object.
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        this.hp -= damage;
        if (this.hp <= 0) this.hp = 0;
        this.lastHit = new Date().getTime();
    }

    /**
     * Checks if the object is dead.
     * @returns {number} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.hp == 0;
    }

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object is currently hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
}
