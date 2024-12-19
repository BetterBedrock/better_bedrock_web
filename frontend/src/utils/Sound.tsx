import bedrockClickSound from "../assets/sounds/minecraft_click.mp3";

const buttonClickSoundInstance = new Audio(bedrockClickSound);
buttonClickSoundInstance.preload = "auto"; // Ensure the audio is preloaded

export { buttonClickSoundInstance };
