document.addEventListener("DOMContentLoaded", function () {
    const typingParagraph = document.getElementById("result");
    const startButton = document.getElementById("startButton");

    function typeFormattedText(textArray, index) {
        if (index < textArray.length) {
            let charIndex = 0;
            const typingInterval = setInterval(function () {
                if (charIndex < textArray[index].length) {
                    typingParagraph.innerHTML += textArray[index].charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    typingParagraph.innerHTML += "<br><br>"; // Add line breaks for readability
                    typeFormattedText(textArray, index + 1);
                }
            }, 30); // Adjust typing speed (milliseconds)
        } else {
            // Re-enable the button after typing is complete
            startButton.disabled = false;
        }
    }

    startButton.addEventListener("click", function () {
        // Disable the button to prevent multiple clicks
        startButton.disabled = true;

        // Reset the result and error message
        document.getElementById("result").textContent = "";
        document.getElementById("result").style.color = "black";

        // Get values from input fields
        const gender = document.getElementById("gender").value;
        const age = parseFloat(document.getElementById("age").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);

        // Check if any input field is empty
        if (!gender || isNaN(age) || isNaN(weight) || isNaN(height)) {
            document.getElementById("result").textContent = " Please fill in all fields.";
            document.getElementById("result").style.color = "red";
            // Re-enable the button to allow the user to try again
            startButton.disabled = false;
            return;
        }

        // Check if all fields are filled and calculate body fat percentage
        let bodyFatPercentage;
        if (gender === "male") {
            bodyFatPercentage = 0.29288 * weight + 0.0005 * Math.pow(height, 2) - 0.0229 * age + 0.407 * 1;
        } else {
            bodyFatPercentage = 0.29288 * weight + 0.0005 * Math.pow(height, 2) - 0.0229 * age + 0.407 * 0;
        }
        document.getElementById("result").textContent = `Estimated Body Fat Percentage: ${bodyFatPercentage.toFixed(2)}%`;

        // Fetch and display diet text file
        fetch("Text.txt")
            .then(response => response.text())
            .then(text => {
                const formattedText = text.split('\n'); // Split text by line breaks
                typeFormattedText(formattedText, 0);
            })
            .catch(error => {
                console.error("Error fetching text:", error);
                // Re-enable the button in case of an error
                startButton.disabled = false;
            });
    });
});
document.querySelector('.menu-button').addEventListener('click', function() {
    document.querySelector('.menu-button').classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open');
});

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Unlock",
    " Your", 
    "Ultimate",
     "Fitness",
     " Potential",
     "with",
     "Healthand",
     " Wellness ",
     "Resource",
      "Center"
    
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

