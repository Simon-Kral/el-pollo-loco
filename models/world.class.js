/**
 * Class representing the game world.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    groundHeight = canvas.height * 0.87;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    throwableObjects = [];
    cheer_sound = new Audio("audio/cheer.mp3");
    background_music = new Audio("audio/background_music.mp3");

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initWorld();
    }

    /**
     * Initializes the game world.
     */
    initWorld() {
        this.draw();
        this.setWorld();
        this.run();
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "top";
        this.ctx.font = "56px Boogaloo, Arial, Helvetica, sans-serif";
    }

    /**
     * Draws the game elements on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap([...this.level.backgroundObjects, ...this.level.clouds]);
        this.drawFixedPositionObjects([this.statusBarHealth, this.statusBarBottles, this.statusBarCoins]);
        this.addObjectsToMap([this.character, ...this.level.enemies, ...this.level.bottles, ...this.level.coins, ...this.throwableObjects]);
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Sets the world properties.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 25);
        setInterval(() => {
            this.checkBackgroundMusic();
            this.throw();
        }, 10);
    }

    /**
     * Adds objects to the map.
     * @param {Object[]} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Draws fixed position objects on the canvas.
     * @param {Object[]} objects - The objects to draw.
     */
    drawFixedPositionObjects(objects) {
        this.ctx.translate(-this.camera_x, 0);
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Adds an object to the map.
     * @param {Object} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawHitbox(this.ctx);
        if (mo.constructor == StatusBarBottles || mo.constructor == StatusBarCoins) mo.addText(this.ctx, mo.constructor);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Throws a throwable object.
     */
    throw() {
        if (this.keyboard.E && StatusBarBottles.amount > 0 && !StatusBarBottles.isOnCooldown()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.keyboard.RIGHT ? (bottle.movementSpeed = bottle.movementSpeed + this.character.movementSpeed / 1.2) : this.keyboard.LEFT ? (bottle.movementSpeed = bottle.movementSpeed - this.character.movementSpeed / 1.2) : "";
            this.throwableObjects.push(bottle);
            StatusBarBottles.lastThrown = new Date().getTime();
        }
    }

    /**
     * Checks for collisions between game objects.
     */
    checkCollisions() {
        this.checkEnemies();
        this.checkThrowableObjects();
        this.checkBottles();
        this.checkCoins();
    }

    /**
     * Checks for collisions with enemies.
     */
    checkEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            this.checkCharacterWithEnemy(enemy);
            this.removeDeadEnemy(enemy, index);
        });
    }

    /**
     * Checks collision between character and enemy.
     * @param {Object} enemy - The enemy object.
     */
    checkCharacterWithEnemy(enemy) {
        if (this.character.isColliding(enemy) && !enemy.isDead() && !(enemy instanceof StatusBarEndboss)) {
            if (this.character.isAboveGround() && enemy instanceof Chicken && this.character.speedY < 0) this.hitEnemy(enemy);
            else if (!this.character.isHurt()) this.hitCharacter();
        }
    }

    /**
     * Handles hitting an enemy.
     * @param {Object} enemy - The enemy object.
     */
    async hitEnemy(enemy) {
        enemy.hit(5);
        await playSound(enemy.death_sound);
        await playSound(this.character.jump_sound);
        this.character.speedY = 8;
    }

    /**
     * Handles character being hit.
     */
    async hitCharacter() {
        this.character.hit(1);
        await playSound(this.character.hurt_sound);
        this.statusBarHealth.setPercentage(this.character.hp);
    }

    /**
     * Removes dead enemies from the game.
     * @param {Object} enemy - The enemy object.
     * @param {number} index - The index of the enemy.
     */
    async removeDeadEnemy(enemy, index) {
        if (enemy.isDead() && !enemy.isHurt()) {
            if (enemy instanceof Endboss) {
                const statusbarIndex = this.level.enemies.findIndex((statusBarEndboss) => statusBarEndboss instanceof StatusBarEndboss);
                this.level.enemies.splice(statusbarIndex, 1);
                Endboss.X = undefined;
                stopGame();
                showElement(youWin);
                await playSound(this.cheer_sound);
            }
            this.level.enemies.splice(index, 1);
        }
    }

    /**
     * Checks for collisions involving throwable objects.
     */
    checkThrowableObjects() {
        this.throwableObjects.forEach((obj, index) => {
            this.level.enemies.forEach((enemy) => {
                this.checkBottleWithChicken(enemy, obj);
                this.checkBottleWithEndboss(enemy, obj);
            });
            this.ckeckSplash(obj, index);
        });
    }

    /**
     * Checks collision between bottle and chicken enemy.
     * @param {Object} enemy - The enemy object.
     * @param {Object} obj - The throwable object.
     */
    async checkBottleWithChicken(enemy, obj) {
        if (obj.isColliding(enemy) && enemy instanceof Chicken && !enemy.isDead() && !obj.isSplashed) {
            enemy.hit(5);
            await playSound(obj.break_sound);
            obj.splash();
        }
    }

    /**
     * Checks collision between bottle and endboss enemy.
     * @param {Object} enemy - The enemy object.
     * @param {Object} obj - The throwable object.
     */
    async checkBottleWithEndboss(enemy, obj) {
        if (obj.isColliding(enemy) && enemy instanceof Endboss && !enemy.isDead() && !obj.isSplashed) {
            enemy.hit(1);
            console.log('Endboss hit');
            await playSound(enemy.hurt_sound);
            const statusbarIndex = this.level.enemies.findIndex((statusBarEndboss) => statusBarEndboss instanceof StatusBarEndboss);
            this.level.enemies[statusbarIndex].setPercentage(enemy.hp);
            obj.splash();
        }
    }

    /**
     * Checks if the throwable object has splashed, and removes it from the list if its splash animation has been played.
     * @param {Object} obj - The throwable object.
     * @param {number} index - The index of the throwable object in the list.
     */
    ckeckSplash(obj, index) {
        if (obj.splashAnimationIsPlayed) this.throwableObjects.splice(index, 1);
        if (obj.isOnGround() && !obj.isSplashed) obj.splash();
    }

    /**
     * Checks for collisions between the character and bottles, and collects the bottles if collided.
     */
    checkBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                bottle.collect(1);
                playSound(bottle.collect_sound);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collisions between the character and coins, and collects the coins if collided.
     */
    checkCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin.collect(1);
                playSound(coin.collect_sound);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Flips the image horizontally.
     * @param {Object} mo - The object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original state after flipping.
     * @param {Object} mo - The object whose image to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks and controls the background music playback.
     */
    async checkBackgroundMusic() {
        if (!backgroundMusicIsPlaying) {
            this.background_music.volume = 0.2;
            this.background_music.loop = true;
            await playMusic(this.background_music);
            backgroundMusicIsPlaying = true;
        } else if (backgroundMusicMuted && backgroundMusicIsPlaying) {
            this.background_music.pause();
            backgroundMusicIsPlaying = false;
        }
    }
}
