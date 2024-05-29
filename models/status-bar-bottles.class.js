/**
 * Class representing a status bar for bottles, extending the DrawableObject class.
 */
class StatusBarBottles extends DrawableObject {
    static amount = 0;
    static lastThrown = 0;
    width = 162;
    height = 158;
    individualSizeFactor = 1.5;

    IMAGE = "img/7_statusbars/3_icons/icon_salsa_bottle.png";

    /**
     * Constructs a new instance of StatusBarBottles.
     */
    constructor() {
        super();
        StatusBarBottles.amount = 0;
        this.loadImage(this.IMAGE);
        this.setOffsets();
        this.x = 350;
        this.y = 10;
    }

    /**
     * Checks if the bottle is on cooldown.
     * @returns {boolean} True if the bottle is on cooldown, false otherwise.
     */
    static isOnCooldown() {
        let timePassed = new Date().getTime() - StatusBarBottles.lastThrown;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
}
