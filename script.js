document.addEventListener('DOMContentLoaded', () => {
// Navbar scroll effects
window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});
// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
// Active link highlighting on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("navmenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Close mobile menu on link click
document.querySelectorAll("#navmenu li a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});
// Hero section => Typing effect
const typedText = document.getElementById("typed-text");
const words = ["Muhammad Shoaib", "MERN Stack Developer", "Web Enthusiast"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    if (i >= words.length) i = 0;

    currentWord = words[i];

    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, j--);
        if (j < 0) {
            isDeleting = false;
            i++;
            j = 0;
        }
    } else {
        typedText.textContent = currentWord.substring(0, j++);
        if (j > currentWord.length) {
            isDeleting = true;
            j = currentWord.length;
        }
    }
    setTimeout(type, isDeleting ? 100 : 200);
}

type();

// Read More / Read Less functionality
const readMoreBtn = document.getElementById("readMoreBtn");
const dots = document.getElementById("dots");
const moreText = document.getElementById("more");

readMoreBtn.addEventListener("click", () => {
    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
        dots.style.display = "none";
        readMoreBtn.textContent = "Read Less";
    } else {
        moreText.style.display = "none";
        dots.style.display = "inline";
        readMoreBtn.textContent = "Read More";
    }
});

// Skill bar animation on scroll
const skillFills = document.querySelectorAll(".skill-fill");

window.addEventListener("scroll", () => {
    skillFills.forEach(fill => {
        const skillTop = fill.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (skillTop < windowHeight - 50) {
            fill.style.width = fill.dataset.percentage;
        }
    });
});

// Counter animation for skills
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.dataset.target;
        const count = +counter.innerText.replace("%","");
        const increment = target / 100;

        if(count < target){
            counter.innerText = Math.ceil(count + increment) + "%";
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target + "%";
        }
    };

    window.addEventListener("scroll", function() {
        const counterTop = counter.getBoundingClientRect().top;
        if(counterTop < window.innerHeight - 50){
            updateCount();
        }
    }, {once: true});
});

// Skill filtering
  const filterButtons = document.querySelectorAll(".skill-filters button");
const skillCards = document.querySelectorAll(".skill-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        skillCards.forEach(card => {
            if(filter === "all" || card.dataset.type === filter){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === ""){
        showToast("Please fill all fields!", "error");
        return;
    }
    if(!validateEmail(emailInput.value)){
        showToast("Enter a valid email!", "error");
        return;
    }
    showToast("Message Sent Successfully!", "success");
    form.reset();
});

function validateEmail(email){
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function showToast(message, type){
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show " + type;
    setTimeout(() => {
        toast.className = toast.className.replace("show " + type, "");
    }, 3000);
}
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => {
        const draft = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };
        localStorage.setItem("contactDraft", JSON.stringify(draft));
    });
});

// Load draft on page load
window.addEventListener("load", () => {
    const draft = JSON.parse(localStorage.getItem("contactDraft"));
    if(draft){
        nameInput.value = draft.name;
        emailInput.value = draft.email;
        messageInput.value = draft.message;
    }
});
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    form.reset();
    localStorage.removeItem("contactDraft");
    showToast("Form Cleared!", "success");
});


});


