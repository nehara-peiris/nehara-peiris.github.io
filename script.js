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

window.speechSynthesis.onvoiceschanged = loadVoices;

setTimeout(() => {
    if (voices.length === 0) {
        loadVoices();
    }
}, 1000);

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

function handleSpeech() {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
}

document.querySelector("button").addEventListener("pointerdown", handleSpeech);
