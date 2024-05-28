/**
 * Class representing a NormalChicken, extending the Chicken class.
 */
class NormalChicken extends Chicken {
    width = 248;
    height = 243;
    individualSizeFactor = 1.1 + Math.random() * 0.5;
    offsetIncrement = 40;
    offset = {
        top: 13 + this.offsetIncrement,
        left: 5 + this.offsetIncrement,
        right: 7 + this.offsetIncrement,
        bottom: 15 + this.offsetIncrement,
    };

    IMAGES_WALKING = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

    /**
     * Constructs a new instance of NormalChicken.
     */
    constructor() {
        super();
        this.init();
    }
}
