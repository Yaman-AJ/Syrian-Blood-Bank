// scripts/contactus.js
document.addEventListener("DOMContentLoaded", function () {
  // إرسال النموذج
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("تم إرسال النموذج بنجاح!");
      this.reset();
    });
  }
});
