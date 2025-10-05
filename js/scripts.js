/* loader */
const loaderContainer = document.querySelector('.loader-container');
window.addEventListener('load', () => {
    loaderContainer.style.display = 'none';
});

/* hamburger menu */
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navList = document.getElementById('nav-list');

    if (hamburgerBtn && navList) {
        hamburgerBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');

            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }
});

// Modal popup logic
function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('formModal').style.display = 'flex';
}
document.getElementById('closeModal').onclick = function () {
    document.getElementById('formModal').style.display = 'none';
};
window.onclick = function (event) {
    if (event.target == document.getElementById('formModal')) {
        document.getElementById('formModal').style.display = 'none';
    }
};

// File size validation
document.getElementById('attachment').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
        showModal('File size must be less than 2MB.');
        e.target.value = '';
    }
});

// Custom form validation and submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    const form = e.target;

    // First, check browser's built-in validation
    if (!form.checkValidity()) {
        // Prevent submission and show a generic message for invalid fields
        e.preventDefault();
        showModal('Please fill in all required fields correctly before submitting.');
        return;
    }

    // Now, perform custom validation (e.g., for the select dropdown)
    const subject = document.getElementById('subject').value;
    if (!subject) {
        // Prevent submission and show a specific message for the subject field
        e.preventDefault();
        showModal('Please select a subject.');
        return;
    }

    // If all validation passes, the form submission will proceed naturally
    // and Netlify will handle the redirection to 'thank-you.html'.
});
// modal popup 
function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('formModal').style.display = 'flex';
}
document.getElementById('closeModal').onclick = function () {
    document.getElementById('formModal').style.display = 'none';
};
window.onclick = function (event) {
    if (event.target == document.getElementById('formModal')) {
        document.getElementById('formModal').style.display = 'none';
    }
};


