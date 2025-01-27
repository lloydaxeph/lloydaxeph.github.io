const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextButton = document.querySelector('.a-right');
const prevButton = document.querySelector('.a-left');
const itemWidth = items[0].getBoundingClientRect().width;

let currentIndex = 0;

let index = 0;
let descIndex = 0;

function typeEffect(text, element, speed, highlightRanges, callback) {
    if (index < text.length) {
        let char = text[index];
        if (char === "\n") {
            element.innerHTML += "<br>";
        } else {
            let isHighlighted = false;
            highlightRanges.forEach(([start, end]) => {
                if (index >= start && index <= end) {
                    isHighlighted = true;
                    element.innerHTML += `<span class="alt-txt-clr">${char}</span>`;
                }
            });
            if (!isHighlighted) element.innerHTML += char;
        }
        index++;
        setTimeout(() => typeEffect(text, element, speed, highlightRanges, callback), speed);
    } else {
        index = 0; 
        callback();
    }
}

function introTypeEffect(callback) {
    const introText = "Hi,\nI'm Lloyd, an \nAI Software Engineer.";
    const introTextSpeed = 50;

    const typeIntro = document.getElementById("intro-text");
    typeEffect(introText, typeIntro, introTextSpeed, [[8, 12], [31, 38]], callback);
}

function introDescTypeEffect() {
    const toHighlight = ["ModelOps Engineer", "Philippines"];
    const startYear = 2020;

    const typeIntroDesc = document.getElementById("introDesc-text");
    const currentYear = new Date().getFullYear();

    typeIntroDesc.innerHTML = typeIntroDesc.innerHTML.replace("{yearExperience}", 
        `<span class="alt-txt-clr bld">${currentYear - startYear}</span>`) ;

    for (let i = 0; i < toHighlight.length; i++) {
        typeIntroDesc.innerHTML = typeIntroDesc.innerHTML.replace(toHighlight[i], 
            `<span class="alt-txt-clr bld">${toHighlight[i]}</span>`);
    }

    typeIntroDesc.style.opacity = 1;
    typeIntroDesc.style.transform = "translateY(0)"; 
}

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === items.length - 1;
}

nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', () => {
    updateCarousel();
});

window.onload = () => {
    introTypeEffect(introDescTypeEffect);
};
