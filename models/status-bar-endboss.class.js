/**
 * Class representing a status bar for the end boss, extending the MovableObject class.
 */
class StatusBarEndboss extends MovableObject {
    percentage = 5;
    width = 595;
    height = 158;
    individualSizeFactor = 1.5;
    remove = false;

    IMAGES = [
        "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
        "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    ];

    /**
     * Constructs a new instance of StatusBarEndboss.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setOffsets();
        this.y = 120;
        this.setPercentage(5);
        this.animate();
    }

    /**
     * Sets the percentage of completion for the end boss.
     * @param {number} percentage - The percentage of completion.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        return this.percentage;
    }

    /**
     * Initiates the animation for the end boss status bar.
     */
    animate() {
        setInterval(() => {
            this.x = Endboss.X;
            this.setPercentage(this.percentage);
        }, 1000 / 60);
    }
}
