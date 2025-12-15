// إدارة حالة تسجيل الدخول
function toggleLoginState(isLoggedIn) {
  const authButtons = document.getElementById("authButtons");
  const userProfile = document.getElementById("userProfile");

  if (authButtons && userProfile) {
    if (isLoggedIn) {
      authButtons.style.display = "none";
      userProfile.style.display = "flex";
    } else {
      authButtons.style.display = "flex";
      userProfile.style.display = "none";
    }
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

// إدارة نماذج تسجيل الدخول وإنشاء الحساب
function initAuthForms() {
  // منع السلوك الافتراضي لأزرار تسجيل الدخول وإنشاء الحساب في الصفحات الرئيسية
  document.querySelectorAll(".btn--login, .btn--signup").forEach((btn) => {
    // فقط إذا لم تكن الصفحة الحالية هي صفحات المصادقة
    if (
      !window.location.pathname.includes("login.html") &&
      !window.location.pathname.includes("signup.html")
    ) {
      btn.addEventListener("click", (e) => {
        // السماح بالانتقال الطبيعي للصفحة
        // لا حاجة لمنع السلوك الافتراضي هنا
      });
    }
  });

  // إدارة نماذج تسجيل الدخول وإنشاء الحساب في صفحات المصادقة
  const loginForm = document.querySelector(".auth-form");
  if (loginForm && window.location.pathname.includes("login.html")) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // محاكاة تسجيل الدخول الناجح
      alert("تم تسجيل الدخول بنجاح!");
      // حفظ حالة تسجيل الدخول
      localStorage.setItem("isLoggedIn", "true");
      // التوجيه إلى الصفحة الرئيسية
      window.location.href = "../index.html";
    });
  }

  const signupForm = document.querySelector(".auth-form");
  if (signupForm && window.location.pathname.includes("signup.html")) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // محاكاة إنشاء حساب ناجح
      alert("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.");
      // التوجيه إلى صفحة تسجيل الدخول
      window.location.href = "login.html";
    });
  }

  // إدارة تسجيل الخروج
  const logoutBtn = document.querySelector(".dropdown-item--logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLoginState(false);
      localStorage.removeItem("isLoggedIn");
      // إعادة تحميل الصفحة إذا كنا في الصفحة الرئيسية
      if (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/")
      ) {
        window.location.reload();
      }
    });
  }
}

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  toggleLoginState(isLoggedIn);
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
  initAuthForms();
  initWindowResize();
  checkLoginStatus();
}

// تهيئة عندما يكون DOM جاهزاً
document.addEventListener("DOMContentLoaded", function () {
  initCommonFunctions();
});
