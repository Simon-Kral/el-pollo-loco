/**
 * Class representing a coin, extending the StatusBarCoins class.
 * @extends StatusBarCoins
 */
class Coin extends StatusBarCoins {
    width = 400;
    height = 400;
    individualSizeFactor = 1;
    x = 100;
    y = 100;
    statusBar = StatusBarCoins;
    offset = {
        top: 102,
        left: 102,
        right: 102,
        bottom: 102,
    };
    collect_sound = new Audio("audio/collectCoin.mp3");

    IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

    /**
     * Constructs a new coin object.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE);
        this.x = 300 + Math.random() * 1279 * 4.2;
        this.setOffsets();
        this.y = 626 - this.height + this.offset.bottom - Math.random() * 300;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    /**
     * Animates the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000 / 3);
    }

    /**
     * Collects the coin and updates the amount in the status bar.
     * @param {number} amount - The amount of coins to collect.
     */
    collect(amount) {
        StatusBarCoins.amount = StatusBarCoins.amount + amount;
    }
}
