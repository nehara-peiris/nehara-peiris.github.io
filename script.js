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
    } else {
        console.log('Voices not loaded, retrying...');
    }
}

window.speechSynthesis.onvoiceschanged = loadVoices;

// Try loading voices on page load, and retry after user interaction
document.addEventListener('DOMContentLoaded', () => {
    loadVoices();
    // Fallback: try loading voices after a short delay
    setTimeout(() => {
        if (voices.length === 0) {
            loadVoices();
        }
    }, 1000);
});

function handleSpeech() {
    speech.text = document.querySelector("textarea").value;
    if (speech.text.trim() !== "") {
        window.speechSynthesis.speak(speech);
    } else {
        console.log('No text provided for speech');
    }
}

voiceSelect.addEventListener("change", () => {
    const selectedIndex = voiceSelect.value; // Get selected index
    if (voices[selectedIndex]) { // Ensure the voice exists
        speech.voice = voices[selectedIndex]; // Update the selected voice
        console.log(`Selected voice: ${speech.voice.name}`); // Log selected voice
    }
});

// Trigger speech on button press with user interaction
document.querySelector("button").addEventListener("click", handleSpeech);
