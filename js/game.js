let canvas;
let world;
let keyboard = new Keyboard();
let menu, youWin, youLose, overlay, gameElements, metaOverlay, footer, header, rotationOverlay;
let gameSoundMuted = false;
let backgroundMusicMuted = false;
let backgroundMusicIsPlaying = false;

window.addEventListener("keydown", (event) => handleKey(event, true));
window.addEventListener("keyup", (event) => handleKey(event, false));
document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("MSFullscreenChange", handleFullscreenChange);

/**
 * Initializes the game by setting up elements and adding touch listeners.
 */
function init() {
    canvas = document.getElementById("canvas");
    canvasWrapper = document.getElementById("canvasWrapper");
    menu = document.getElementById("menu");
    youWin = document.getElementById("youWin");
    youLose = document.getElementById("youLose");
    overlay = document.getElementById("overlay");
    gameElements = document.getElementById("gameElements");
    metaOverlay = document.getElementById("metaOverlay");
    footer = document.getElementById("footer");
    header = document.getElementById("mainHeader");
    rotationOverlay = document.getElementById("rotationOverlay");
    addTouchListeners();
}

/**
 * Starts the game by initializing the level, creating the world, and displaying the necessary elements.
 */
async function startGame() {
    hideMenu();
    await delay(200);
    showElement(canvas);
    initLevel();
    world = new World(canvas, keyboard);
    await delay(100);
    showElement(canvasWrapper);
    if (screen.availHeight > screen.availWidth) {
        showElement(rotationOverlay);
    }
}

/**
 * Hides the main menu and related elements.
 */
function hideMenu() {
    hideElement(menu, youWin, youLose, footer, header);
}

/**
 * Stops the game by clearing intervals, pausing sounds, and showing the menu.
 */
async function stopGame() {
    clearAllIntervals();
    await delay(50);
    world.background_music.pause();
    backgroundMusicIsPlaying = false;
    world.character.snore_sound.pause();
    showElement(menu, footer, header);
    hideElement(canvasWrapper, overlay);
}

/**
 * Hides the specified elements by adding a CSS class.
 * @param {...HTMLElement} elements - The elements to hide.
 */
function hideElement(...elements) {
    elements.forEach((element) => element.classList.add("dNone"));
}

/**
 * Shows the specified elements by removing a CSS class.
 * @param {...HTMLElement} elements - The elements to show.
 */
function showElement(...elements) {
    elements.forEach((element) => element.classList.remove("dNone"));
}

/**
 * Restarts the game by reinitializing the level and world.
 */
async function restartGame() {
    clearAllIntervals();
    await delay(50);
    world.background_music.pause();
    backgroundMusicIsPlaying = false;
    world.character.snore_sound.pause();
    initLevel();
    world = new World(canvas, keyboard);
    hideElement(overlay);
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} milliseconds - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
async function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Plays a sound if the background music is not muted.
 * @param {HTMLAudioElement} sound - The sound to play.
 */
async function playSound(sound) {
    if (!backgroundMusicMuted) await sound.play();
}

/**
 * Toggles the mute status of the specified sound.
 * @param {string} sound - The type of sound ("gameSound" or "backgroundMusic").
 */
function toggleMute(sound) {
    const isMuted = sound === "gameSound" ? gameSoundMuted : backgroundMusicMuted;
    const newMutedStatus = !isMuted;
    const button = document.getElementById(`${sound}Button`);
    if (sound === "gameSound") {
        gameSoundMuted = newMutedStatus;
        button.children[0].src = newMutedStatus ? "icons/mute.png" : "icons/speaker.png";
    } else if (sound === "backgroundMusic") {
        backgroundMusicMuted = newMutedStatus;
        button.children[0].src = newMutedStatus ? "icons/musicalNoteMuted.png" : "icons/musicalNote.png";
    }
}

/**
 * Sets the game to fullscreen mode.
 */
function setFullscreen() {
    const canvasWrapper = document.getElementById("canvasWrapper");
    const requestFullScreen = canvasWrapper.requestFullscreen || canvasWrapper.msRequestFullscreen || canvasWrapper.webkitRequestFullscreen || canvasWrapper.mozRequestFullScreen;
    if (requestFullScreen) {
        requestFullScreen.call(canvasWrapper);
    } else {
        window.alert("Your Browser doesn't support Fullscreen.");
    }
}

/**
 * Exits the fullscreen mode.
 */
function leaveFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
}

/**
 * Handles changes in fullscreen mode and updates the fullscreen button's functionality.
 */
function handleFullscreenChange() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    const button = document.getElementById("setFullscreenButton");
    if (isFullscreen) {
        button.setAttribute("onclick", `leaveFullscreen()`);
    } else {
        button.setAttribute("onclick", `setFullscreen()`);
    }
}

/**
 * Changes the view between the help and keys sections in the menu.
 * @param {string} selector - The section to show ("help" or "keys").
 * @param {HTMLElement} btn - The button element that triggered the change.
 */
function changeView(selector, btn) {
    if (selector === "help") {
        document.getElementById("menuKeys").style.display = "none";
        document.getElementById("menuHelp").style.display = "block";
        btn.setAttribute("onclick", `changeView('keys', this)`);
        btn.children[0].setAttribute("src", `icons/keys.png`);
    } else if (selector === "keys") {
        document.getElementById("menuHelp").style.display = "none";
        document.getElementById("menuKeys").style.display = "block";
        btn.setAttribute("onclick", `changeView('help', this)`);
        btn.children[0].setAttribute("src", `icons/help.png`);
    }
}

/**
 * Prevents the event from propagating, used to avoid closing modals.
 * @param {Event} event - The event to stop propagation for.
 */
function dontClose(event) {
    event.stopPropagation();
}

/**
 * Handles keydown and keyup events to update the keyboard state.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {boolean} isKeyDown - Indicates if the key is pressed down.
 */
function handleKey(event, isKeyDown) {
    const keyMap = {
        87: "UP",
        65: "LEFT",
        83: "DOWN",
        68: "RIGHT",
        32: "SPACE",
        69: "E",
    };
    const key = keyMap[event.keyCode];
    if (key) keyboard[key] = isKeyDown;
}

/**
 * Adds touch event listeners to control buttons.
 */
function addTouchListeners() {
    const buttonMap = {
        btnLeft: "LEFT",
        btnRight: "RIGHT",
        btnJump: "SPACE",
        btnThrow: "E",
    };
    addListenersToButtons(buttonMap);
}

/**
 * Adds event listeners to the specified buttons for touchstart and touchend events.
 * @param {Object} buttonMap - A map of button IDs to keyboard keys.
 */
function addListenersToButtons(buttonMap) {
    for (const [buttonId, key] of Object.entries(buttonMap)) {
        const button = document.getElementById(buttonId);
        button.addEventListener("touchstart", () => (keyboard[key] = true));
        button.addEventListener("touchend", () => (keyboard[key] = false));
    }
}

/**
 * Displays the legal information in the meta overlay.
 */
function showLegal() {
    document.getElementById("metaContent").innerHTML = genLegal();
    showElement(metaOverlay);
}

/**
 * Displays the privacy policy in the meta overlay.
 */
function showPrivacy() {
    document.getElementById("metaContent").innerHTML = genPrivacy();
    showElement(metaOverlay);
}
