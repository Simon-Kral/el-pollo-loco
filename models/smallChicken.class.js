/**
 * Class representing a SmallChicken, extending the Chicken class.
 */
class SmallChicken extends Chicken {
    width = 236;
    height = 210;
    individualSizeFactor = 0.8 + Math.random() * 0.3;
    offsetIncrement = 30;
    offset = {
        top: 13 + this.offsetIncrement,
        left: 5 + this.offsetIncrement,
        right: 7 + this.offsetIncrement,
        bottom: 15 + this.offsetIncrement,
    };

    IMAGES_WALKING = ["img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

    /**
     * Constructs a new instance of SmallChicken.
     */
    constructor() {
        super();
        this.init();
    }
}
