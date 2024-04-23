
const animate = document.querySelectorAll('[data-animate]');

// Messages
//�������أ�Http://www.bootstrapmb.com
const invalidNameText = "Please enter your name"
const invalidEmailText1 = "Please enter your email id";
const invalidEmailText2 = "Please enter valid email id";
const emailSentText = "Your message has been sent. We'll be in touch with you soon";
const emailFailedText = "Sending fail, Please try again letter";

/**
 * Page loading
 */
function loading() {
    const loader = document.getElementById('loader');

    loader.classList.add('hide');
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

/**
 * Check element is in viewport
 * @param {HTMLElement} el 
 * @param {number} dividend 
 * @returns 
 */
function inViewport(el, dividend = 1) {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
}

/**
 * Initialize scroll animation 
 */
function scrollAnimation() {
    animate.forEach(item => {
        if (inViewport(item, 1.15)) {
            item.classList.add(item.dataset.animate);

            const computedStyle = window.getComputedStyle(item);
            const prop = computedStyle.getPropertyValue('-webkit-animation-delay') ? '-webkit-animation-delay' : 'animation-delay';
            if (item.dataset.animateDelay) item.style.setProperty(prop, item.dataset.animateDelay);
        }
    });
}

/**
 * Hamburger menu events
 */
function menu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const close = document.getElementById('sidebar_close');
    const overlay = document.createElement('div');
    const show = 'show';
    const removeSidebar = () => {
        sidebar.classList.remove(show);
        overlay.classList.remove(show);
        setTimeout(() => {
            overlay.remove();
        }, 251);
    }

    overlay.id = 'overlay';

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.add(show);
            document.body.appendChild(overlay);
            setTimeout(() => {
                overlay.classList.add(show);
            }, 1);
        });

        close.addEventListener("click", removeSidebar);
        overlay.addEventListener("click", removeSidebar);
    }

}

/**
 * Will gracefully scroll the page
 * This function will scroll the page using
 * an `ease-in-out` effect.
 * 
 * @param {HTMLElement | number | Selector} to 
 * @param {number} duration 
 * @returns 
 */
function scrollPageTo(to, duration = 300) {
    const easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    return new Promise((resolve, reject) => {
        const element = document.scrollingElement;

        if (typeof to === 'string') {
            to = document.querySelector(to) || reject();
        }
        if (typeof to !== 'number') {
            to = to.getBoundingClientRect().top + element.scrollTop;
        }

        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = function () {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

/**
 * Bind click event on link to scroll to element.
 */
function scrollToElement() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const id = this.getAttribute('href') !== '#' ? this.getAttribute('href') : '';
            const target = id ? document.querySelector(id) : null;
            const offset = this.dataset.offset || target?.offsetTop;
            window.scrollPageTo(parseInt(offset, 10));
        });
    });
}

/**
 * Portfolio card slider
 */
function portfolioCards() {
    new Swiper('#portfolio_cards', {
        slidesPerView: 1,
        spaceBetween: 16,

        pagination: {
            el: '#portfolio_cards .swiper-pagination',
            clickable: true
        },

        breakpoints: {
            580: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
}

/**
 * Testimonial slider
 */
function testimonialSlider() {
    new Swiper('#testimonial_slider', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 16,

        pagination: {
            el: '#testimonial_slider .swiper-pagination',
            clickable: true
        },

        autoplay: {
            delay: 5000
        },
    });
}

/**
 * Blog card slider
 */
function blogCards() {
    new Swiper('#blog_cards', {
        slidesPerView: 1,
        spaceBetween: 16,

        pagination: {
            el: '#blog_cards .swiper-pagination',
            clickable: true
        },

        breakpoints: {
            580: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
}

/**
 * Contact form
 * Validate form & send bind event on controls.
 */
function contactForm() {
    const contactButton = document.getElementById('contact_btn');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const msg = document.getElementById('msg');
    const nameError = document.createElement('div');
    const emailError = document.createElement('div');
    let isSubmitted = false;
    let isValid = false;

    // Name field validation
    const nameValidation = () => {
        if (isSubmitted && !name.value) {
            nameError.className = 'form-error';
            nameError.innerText = invalidNameText;
            name.after(nameError);
            isValid = false;
        } else {
            nameError.remove();
            isValid = true;
        }
    }

    // Email field validation
    const emailValidation = () => {
        const REG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (isSubmitted && !email.value) {
            emailError.className = 'form-error';
            emailError.id = 'email_error';
            emailError.innerText = invalidEmailText1;
            email.after(emailError);
            isValid = false;

        } else if (isSubmitted && !email.value.match(REG)) {
            const el = document.getElementById('email_error');
            if (el) {
                emailError.innerText = invalidEmailText2;
            } else {
                emailError.className = 'form-error';
                emailError.innerText = invalidEmailText2;
                email.after(emailError);
            }
            isValid = false;

        } else {
            emailError.remove();
            isValid = true;
        }
    }

    if (contactButton) {
        name.addEventListener('input', nameValidation);
        email.addEventListener('input', emailValidation);

        contactButton.addEventListener("click", function (event) {
            event.preventDefault();
            isSubmitted = true;
            nameValidation();
            emailValidation();

            if (isValid) {
                const data = '?name=' + name.value + '&email=' + email.value + '&msg=' + msg.value;
                sendEmail(data);
                isSubmitted = false;
            }
        });
    }
}

/**
 * Send email
 * @param {string} url 
 */
async function sendEmail(url) {
    const formMessage = document.getElementById('form_message');
    const span = document.createElement('span');
    let timer = null;

    // Set email message
    const setEmailMessage = () => {
        if (formMessage.firstElementChild) {
            formMessage.removeChild(formMessage.firstElementChild);
        }
        formMessage.appendChild(span);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            formMessage.removeChild(formMessage.firstElementChild);
        }, 5000);
    }

    // Send email
    await fetch('php/contact.php' + url, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, UPDATE, DELETE",
        }
    }).then((response) => {
        if (response.status === 200) {
            span.innerText = emailSentText;
            span.className = 'success';
        } else {
            span.innerText = emailFailedText;
            span.className = 'error';
        }
        setEmailMessage();

    }).catch(() => {
        span.innerText = emailFailedText;
        span.className = 'error';
        setEmailMessage();
    });
}

/**
 * Call functions on window load.
 */
window.onload = () => {
    loading();
    scrollAnimation();
    menu();
    scrollToElement();
    portfolioCards();
    testimonialSlider();
    blogCards();
    contactForm();
}

/**
 * Bind scroll event on window
 * For scroll animation.
 */
window.addEventListener("scroll", scrollAnimation);


/**
 * Theme settings
 *------------------------------------*/
const theme = document.getElementById('theme');
if (theme) {
    theme.addEventListener("click", () => {
        if (document.body.hasAttribute('data-theme')) {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }
    });
}
