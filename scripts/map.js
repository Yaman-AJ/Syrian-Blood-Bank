// scripts/map.js
document.addEventListener("DOMContentLoaded", function () {
  // إدارة اختيار المحافظات
  document.querySelectorAll(".filter__item").forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".filter__item").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
