
async function changeLanguage(lang) {
    
    document.body.classList.add("fade");

    if (lang === "pt") {
        location.reload();
        return;
    }

    const response = await fetch(`languages/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;

        const value = key
            .split(".")
            .reduce((obj, item) => obj[item], translations);

        if (value) {
            element.innerHTML = value;
        }
    });

    setTimeout(() => {
        document.body.classList.remove("fade");
    }, 600);
}

const language = document.getElementById("language");

language.addEventListener("change", (e) => {
    changeLanguage(e.target.value);
});

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});


const cards = document.querySelectorAll(".card");

let index = 0;

function animateCards() {

    cards[index].classList.add("active");

    setTimeout(() => {
        cards[index].classList.remove("active");

        index++;

        if (index >= cards.length) {
            index = 0;
        }

        animateCards();

    }, 600);
}

animateCards();