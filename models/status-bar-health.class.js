/**
 * Class representing a status bar for health, extending the DrawableObject class.
 */
class StatusBarHealth extends DrawableObject {
    percentage = 5;
    width = 595;
    height = 158;
    individualSizeFactor = 1.5;

    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    /**
     * Constructs a new instance of StatusBarHealth.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setOffsets();
        this.x = 20;
        this.y = 10;
        this.setPercentage(5);
    }

    /**
     * Sets the percentage of health for the status bar.
     * @param {number} percentage - The percentage of health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current health percentage.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        return this.percentage;
    }
}
