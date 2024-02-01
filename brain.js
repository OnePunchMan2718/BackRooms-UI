document.addEventListener("DOMContentLoaded", () => {
  function toggle() {
    // Look for any element with the 'data-toggle' attribute
    const elements = document.querySelectorAll("[data-toggle]");

    elements.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();

        const targetID = element.getAttribute("data-toggle");
        const targetElement = document.getElementById(targetID);

        // Toggle the class 'toggled' on the targeted element
        targetElement.classList.toggle("toggled");

        // Toggle the class 'active' on the clicked element
        element.classList.toggle("active");
      });
    });

    const synth = window.speechSynthesis;
    const inputForm = document.querySelector("form");
    const inputTxt = document.querySelector("input");
    const voiceSelect = document.querySelector("select");

    let voices;
    function loadvoices() {
      voices = synth.getVoices();
      for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;
        option.value = i;
        voiceSelect.appendChild(option);
      }
    }

    if ("onvoiceschanged" in synth) {
      synth.onvoiceschanged = loadvoices;
    } else {
      loadvoices();
    }

    inputForm.onsubmit = (event) => {
      event.preventDefault();

      const utterThis = new SpeechSynthesisUtterance(inputTxt.value);

      utterThis.voice = voices[voiceSelect.value];
      synth.speak(utterThis);
      inputTxt.blur();
    };
  }
  toggle();
});
