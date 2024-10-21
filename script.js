document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.querySelector("textarea");
    const select = document.querySelector("select");
    const button = document.querySelector("button");

    let voices = [];

    // Function to populate available voices
    const getVoices = () => {
        voices = speechSynthesis.getVoices();

        // Clear previous options
        select.innerHTML = '';

        // Populate voice selection if available
        voices.forEach((voice) => {
            const option = document.createElement("option");
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            select.appendChild(option);
        });

        // If no voices available (especially on mobile), provide a fallback
        if (voices.length === 0) {
            const option = document.createElement("option");
            option.value = "default";
            option.textContent = "Default Voice";
            select.appendChild(option);
        }
    };

    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // If mobile, hide voice selection and notify the user
    if (isMobile) {
        alert("Voice selection may not be fully supported on mobile devices.");
        select.style.display = "none"; // Hide the voice selection on mobile devices
    } else {
        // Populate voices on desktop and Android devices
        speechSynthesis.onvoiceschanged = getVoices;
        getVoices(); // Ensure voices are populated initially
    }

    // Function to convert text to speech
    const textToSpeech = () => {
        const text = textarea.value;

        if (text.trim() !== "") {
            const utterance = new SpeechSynthesisUtterance(text);

            // If not mobile, allow voice selection
            if (!isMobile) {
                const selectedVoice = voices.find(voice => voice.name === select.value);
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                }
            }

            // Speak the text
            speechSynthesis.speak(utterance);
        } else {
            alert("Please enter some text to convert to speech.");
        }
    };

    // Add event listener to the button to trigger text-to-speech
    button.addEventListener("click", textToSpeech);
});
