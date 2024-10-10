let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    console.log(voices); // Log available voices
    if (voices.length > 0) {
        speech.voice = voices[0]; // Default to the first voice
        voiceSelect.innerHTML = '';
        voices.forEach((voice, i) => {
            let option = new Option(voice.name + ' (' + voice.lang + ')', i);
            voiceSelect.options.add(option);
        });
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices;

setTimeout(() => {
    if (voices.length === 0) {
        loadVoices(); // Try loading again in case voices are delayed
    }
}, 1000);

function handleSpeech() {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
}

voiceSelect.addEventListener("change", () => {
    const selectedIndex = voiceSelect.value; // Get selected index
    if (voices[selectedIndex]) { // Ensure the voice exists
        speech.voice = voices[selectedIndex]; // Update the selected voice
        console.log(`Selected voice: ${speech.voice.name}`); // Log selected voice
    }
});

document.querySelector("button").addEventListener("pointerdown", handleSpeech);
