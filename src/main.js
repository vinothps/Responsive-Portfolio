import emailjs from 'emailjs-com';
const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeLists = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const portfolioLists = document.querySelectorAll('.portfolio-list');
const portfolioBoxs = document.querySelectorAll('.portfolio-box');

const form = document.getElementById('contactForm');

// navbar actions and all section actions along with cube rotation when navbar is clicked
navs.forEach((nav, idx) => {
  nav.addEventListener('click', () => {
    document.querySelector('.nav-list li.active').classList.remove('active');
    nav.classList.add('active');

    cube.style.transform = `rotateY(${idx * -90}deg)`;

    document.querySelector('.section.active').classList.remove('active');
    sections[idx].classList.add('active');

    const array = Array.from(sections);
    const arrSecs = array.slice(1, -1); // only requires indexes 1,2,3 or does not require start and end indexes
    arrSecs.forEach(arrSec => {
      if (arrSec.classList.contains('active')) {
        sections[4].classList.add('action-contact');
      }
    });
    if (sections[0].classList.contains('active')) {
      sections[4].classList.remove('action-contact');
    }
  });
});

// resume section when clicking tab list
resumeLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    document.querySelector('.resume-list.active').classList.remove('active');
    list.classList.add('active');

    document.querySelector('.resume-box.active').classList.remove('active');
    resumeBoxs[idx].classList.add('active');
  });
});


// portfolio section when clicking tab-list
portfolioLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    document.querySelector('.portfolio-list.active').classList.remove('active');
    list.classList.add('active');

    document.querySelector('.portfolio-box.active').classList.remove('active');
    portfolioBoxs[idx].classList.add('active');
  });
});

// visibility of contact section when reloading (cube reloading animation)
setTimeout(() => {
  sections[4].classList.remove('active');
}, 1500)

//contact section when user click send button, it will triggered email to me

document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('mJukf_lFjo4g2wBgt');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      //get form field values 

      const name = form.querySelector("input[name='user_name']").value.trim();
      const email = form.querySelector("input[name='user_email']").value.trim();
      const phone = form.querySelector("input[name='user_phone']").value.trim();
      const subject = form.querySelector("input[name='subject']").value.trim();
      const message = form.querySelector("textarea[name='message']").value.trim();

      //Basic form validation
      if (!name || !email || !phone || !subject || !message) {
        alert("⚠️ Please fill in all fields before submitting");
        return;
      }

      if (!validateEmail(email)) {
        alert('⚠️ Please eneter a valid email address');
        return;
      }

      emailjs.sendForm('service_9l1gn0c', 'template_epd9kal', this)
        .then(() => {
          alert('✅  Message sent successfully');
          form.reset();  // Clear form after successful submission
        })
        .catch((error) => {
          console.error("❌ FAILED...", error);
          alert("❌ Failed to send message. Please try again.");
        })

    })
  }
});

function validateEmail(email) {
  const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
