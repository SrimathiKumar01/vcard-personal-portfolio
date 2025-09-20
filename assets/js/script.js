'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  selectedValue = selectedValue.toLowerCase().trim();
  
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else {
      const itemCategory = filterItems[i].dataset.category.toLowerCase().trim();
      if (itemCategory === selectedValue) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
}

// Show all projects by default on page load
document.addEventListener("DOMContentLoaded", function() {
  filterFunc("all");
});

// add event in all filter button items for large screen
let lastClickedBtn = null;
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase().trim();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(form);
  const name = formData.get('fullname');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Create mailto link with form data
  const mailtoLink = `mailto:kumarsrimathi4@gmail.com?subject=Contact from ${name}&body=From: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Reset form
  form.reset();
  formBtn.setAttribute("disabled", "");
  
  // Show success message
  alert("Thank you for your message! Your email client will open now.");
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const resumeBtn = document.getElementById("resume-btn");
const myResumeBtn = document.getElementById("my-resume-btn");

function clearActiveStates() {
  navigationLinks.forEach(link => link.classList.remove("active"));
  if (resumeBtn) resumeBtn.classList.remove("active");
  if (myResumeBtn) myResumeBtn.classList.remove("active");
}

navigationLinks.forEach((link, i) => {
  link.addEventListener("click", function () {
    const clickedText = this.textContent.trim().toLowerCase();
    pages.forEach((page, j) => {
      const pageName = (page.dataset.page || '').trim().toLowerCase();
      if ((pageName === clickedText) || (pageName === 'portfolio' && clickedText === 'projects')) {
        page.classList.add("active");
        clearActiveStates();
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });
    // Animate activities if About is clicked
    if (clickedText === "about") {
      const items = document.querySelectorAll("#activity-list .activity-item");
      let k = 0;
      items.forEach(item => item.style.display = "none");
      function showNext() {
        if (k < items.length) {
          items[k].style.display = "block";
          k++;
          setTimeout(showNext, 900);
        }
      }
      showNext();
    }
  });
});

if (resumeBtn) {
  resumeBtn.addEventListener("click", function () {
    clearActiveStates();
    resumeBtn.classList.add("active");
  });
}
if (myResumeBtn) {
  myResumeBtn.addEventListener("click", function () {
    clearActiveStates();
    myResumeBtn.classList.add("active");
  });
}
// Animated arrow for activities
// Initial About animation on page load
document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll("#activity-list .activity-item");
  let i = 0;
  items.forEach(item => item.style.display = "none");
  function showNext() {
    if (i < items.length) {
      items[i].style.display = "block";
      i++;
      setTimeout(showNext, 900);
    }
  }
  showNext();
});

// add event to all nav link
// (Removed duplicate navigation handler)