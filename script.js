let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speech.voice = voices[0];
        voiceSelect.innerHTML = '';
        voices.forEach((voice, i) => {
            let option = new Option(voice.name + ' (' + voice.lang + ')', i);
            voiceSelect.options.add(option);
        });
    }
}

// Call `loadVoices()` both on voice change and after a short delay
window.speechSynthesis.onvoiceschanged = loadVoices;

// For mobile, try calling manually after a small delay
setTimeout(() => {
    if (voices.length === 0) {
        loadVoices(); // Try loading again in case voices are delayed
    }
}, 1000);

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
