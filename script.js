document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.querySelector("textarea");
    const select = document.querySelector("select");
    const button = document.querySelector("button");

    // Get available voices
    let voices = [];

    const getVoices = () => {
        voices = speechSynthesis.getVoices();

        if (voices.length === 0) {
            // Alert or message if no voices are available on mobile
            alert("No voices are available on this device.");
            return;
        }

        voices.forEach((voice) => {
            const option = document.createElement("option");
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            select.appendChild(option);
        });
    };

    // Populate voices when they are loaded
    speechSynthesis.onvoiceschanged = getVoices;

    // Text to Speech
    const textToSpeech = () => {
        const text = textarea.value;

        if (text.trim() !== "") {
            const utterance = new SpeechSynthesisUtterance(text);

            // Set selected voice
            const selectedVoice = voices.find((voice) => voice.name === select.value);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Speak the text
            speechSynthesis.speak(utterance);
        } else {
            alert("Please enter some text to convert to speech.");
        }
    };

    // Add event listener to button
    button.addEventListener("click", textToSpeech);
});
