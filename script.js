// Function to trigger confetti
function startConfetti(event) {
    const { clientX, clientY } = event;

    const pastelEasterColors = [
    "#FF1493", // Deep Pink
    "#00BFFF", // Deep Sky Blue
    "#7CFC00", // Lawn Green
    "#FF8C00", // Dark Orange
    "#FFD700", // Gold
    "#9932CC", // Dark Orchid
    "#00FF7F", // Spring Green
    "#FF69B4"  // Hot Pink
];

    confetti({
        particleCount: 200, // More confetti
        spread: 80, // Wider spread
        origin: {
            x: clientX / window.innerWidth, 
            y: clientY / window.innerHeight
        },
        scalar: 1.5, // Make confetti larger
        gravity: 2,
        startVelocity: 60,
        colors: pastelEasterColors, // Apply pastel colors
    });
}

// Load confetti script dynamically if not included
(function loadConfetti() {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
})();

const yesButton = document.querySelector('.yes');
const aside = document.querySelector('aside.good');
const asideBad = document.querySelector('aside.bad');
const nameInput = document.querySelector('.description[type="text"]'); // Selects the input field
const nameSpan = document.querySelector('.kind-name'); // Selects the span inside aside
const form = document.getElementById("form");
const nameSpanBad = document.querySelector('.kind-name-bad'); // Selects the span inside aside
const noButton = document.querySelector('.no');
const errorMessage = form.querySelector('.error-message');


yesButton.addEventListener("click", (e) => {

    e.preventDefault();
    
    const userName = nameInput.value.trim(); // Get and trim input value

    if (userName) { // Check if name is filled

        nameInput.classList.remove('invalid');
        errorMessage.style.visibility = 'hidden'; 

        e.preventDefault();
        const formData = new FormData(form);
        formData.append("submission", "yes");


        fetch("https://getform.io/f/adrnxwwa", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    

        nameSpan.textContent = userName; // Insert the name into the span

        // Run confetti at the button click position
        startConfetti(event);

        setTimeout(() => {
            aside.classList.add('open'); // Open the aside
        }, 1000);
    } else {
        nameInput.classList.add('invalid');
        errorMessage.style.visibility = 'visible'; // Show error message
        nameInput.focus(); // Focus on the empty field

    }
});



noButton.addEventListener("click", (e) => {

    e.preventDefault();
    
    const userName = nameInput.value.trim(); // Get and trim input value

    if (userName) { // Check if name is filled
        nameInput.classList.remove('invalid');
        errorMessage.style.visibility = 'hidden'; 

        e.preventDefault();
        const formData = new FormData(form);
        formData.append("submission", "no");

        

        fetch("https://getform.io/f/adrnxwwa", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json",
            },
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
        

        nameSpanBad.textContent = userName; // Insert the name into the span

        setTimeout(() => {
            asideBad.classList.add('open'); // Open the aside
        }, 1000);
    } else {
        const errorMessage = form.querySelector('.error-message');
        nameInput.classList.add('invalid');
        errorMessage.style.visibility = 'visible'; // Show error message
        nameInput.focus(); // Focus on the empty field

    }
});
