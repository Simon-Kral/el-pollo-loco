/**
 * Class representing a status bar for coins, extending the DrawableObject class.
 */
class StatusBarCoins extends DrawableObject {
    static amount = 0;
    width = 158;
    height = 158;
    individualSizeFactor = 1.5;

    IMAGE = "img/7_statusbars/3_icons/icon_coin.png";

    /**
     * Constructs a new instance of StatusBarCoins.
     */
    constructor() {
        super();
        StatusBarCoins.amount = 0;
        this.loadImage(this.IMAGE);
        this.setOffsets();
        this.x = 500;
        this.y = 10;
    }
}
