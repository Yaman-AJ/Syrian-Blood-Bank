// scripts/main.js
// إدارة حالة تسجيل الدخول
function toggleLoginState(isLoggedIn) {
  const authButtons = document.getElementById("authButtons");
  const userProfile = document.getElementById("userProfile");

  if (isLoggedIn) {
    authButtons.style.display = "none";
    userProfile.style.display = "block";
  } else {
    authButtons.style.display = "flex";
    userProfile.style.display = "none";
  }
}

// إدارة القائمة المنزلقة للجوال
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      mobileNav.classList.toggle("nav--mobile-open");
      this.classList.toggle("header__menu--active");
      document.body.style.overflow = !isExpanded ? "hidden" : "";
    });

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("nav--mobile-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.classList.remove("header__menu--active");
        document.body.style.overflow = "";
      });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", (e) => {
      if (
        !mobileNav.contains(e.target) &&
        !mobileMenuBtn.contains(e.target) &&
        mobileNav.classList.contains("nav--mobile-open")
      ) {
        mobileNav.classList.remove("nav--mobile-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.classList.remove("header__menu--active");
        document.body.style.overflow = "";
      }
    });
  }
}

// تجربة: تسجيل الدخول عند النقر على الأزرار
function initAuthButtons() {
  document.querySelectorAll(".btn--login, .btn--signup").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLoginState(true);
      const mobileNav = document.getElementById("mobileNav");
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");

      if (mobileNav) {
        mobileNav.classList.remove("nav--mobile-open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.classList.remove("header__menu--active");
        document.body.style.overflow = "";
      }
    });
  });

  // تجربة: تسجيل الخروج
  document
    .querySelector(".dropdown-item--logout")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLoginState(false);
    });
}

// إغلاق القائمة عند تغيير حجم النافذة
function initWindowResize() {
  window.addEventListener("resize", () => {
    const mobileNav = document.getElementById("mobileNav");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    if (
      window.innerWidth > 1024 &&
      mobileNav &&
      mobileNav.classList.contains("nav--mobile-open")
    ) {
      mobileNav.classList.remove("nav--mobile-open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenuBtn.classList.remove("header__menu--active");
      document.body.style.overflow = "";
    }
  });
}

// تهيئة جميع الوظائف المشتركة
function initCommonFunctions() {
  initMobileMenu();
  initAuthButtons();
  initWindowResize();
  toggleLoginState(false); // الحالة الأولية: غير مسجل الدخول
}

// تهيئة عندما يكون DOM جاهزاً
document.addEventListener("DOMContentLoaded", function () {
  initCommonFunctions();
});
