let level1;

/**
 * Initializes the level with enemies, bottles, coins, clouds, and background objects.
 * This function sets up the level1 variable with a new instance of the Level class.
 */
function initLevel() {
    level1 = new Level(
        [
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new NormalChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss(),
            new StatusBarEndboss(),
        ],
        [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],
        [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
        [
            new Cloud("img/5_background/layers/4_clouds/1.png", 1279 * -1),
            new Cloud("img/5_background/layers/4_clouds/2.png", 1279 * 0),
            new Cloud("img/5_background/layers/4_clouds/1.png", 1279 * 1),
            new Cloud("img/5_background/layers/4_clouds/2.png", 1279 * 2),
            new Cloud("img/5_background/layers/4_clouds/1.png", 1279 * 3),
            new Cloud("img/5_background/layers/4_clouds/2.png", 1279 * 4),
            new Cloud("img/5_background/layers/4_clouds/1.png", 1279 * 5),
            new Cloud("img/5_background/layers/4_clouds/2.png", 1279 * 6),
        ],
        [
            new BackgroundObject("img/5_background/layers/air.png", -1279),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -1279),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -1279),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -1279),

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/air.png", 1279),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1279),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 1279),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1279),

            new BackgroundObject("img/5_background/layers/air.png", 1279 * 2),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1279 * 2),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1279 * 2),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1279 * 2),
            new BackgroundObject("img/5_background/layers/air.png", 1279 * 3),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1279 * 3),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 1279 * 3),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1279 * 3),

            new BackgroundObject("img/5_background/layers/air.png", 1279 * 4),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 1279 * 4),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 1279 * 4),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 1279 * 4),
            new BackgroundObject("img/5_background/layers/air.png", 1279 * 5),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1279 * 5),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 1279 * 5),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1279 * 5),
        ]
    );
}
