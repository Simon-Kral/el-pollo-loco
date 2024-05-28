/**
 * Represents a game level.
 * @class
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 1279 * 5;
    /**
     * Creates an instance of Level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} bottles - The bottles in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, bottles, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}
