// كود JavaScript للداشبورد الإداري
document.addEventListener("DOMContentLoaded", function () {
  // ========== إدارة الشريط الجانبي للجوال ==========
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
      this.classList.toggle("active");

      // تغيير الأيقونة
      const icon = this.querySelector("i");
      if (sidebar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // إغلاق الشريط الجانبي عند النقر خارجها (للجوال فقط)
    document.addEventListener("click", function (e) {
      if (
        window.innerWidth <= 1024 &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target)
      ) {
        sidebar.classList.remove("active");
        sidebarToggle.classList.remove("active");
        const icon = sidebarToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // ========== إدارة تبويبات الصفحة ==========
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // دالة لتبديل التبويب
  function switchTab(tabId) {
    // إزالة النشاط من جميع الأزرار والمحتويات
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // إضافة النشاط للزر والمحتوى المحدد
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const targetContent = document.getElementById(tabId);

    if (targetBtn && targetContent) {
      targetBtn.classList.add("active");
      targetContent.classList.add("active");

      // تحديث القائمة الجانبية
      updateSidebarMenu(tabId);

      // إغلاق الشريط الجانبي على الجوال إذا كان مفتوحًا
      if (
        window.innerWidth <= 1024 &&
        sidebar &&
        sidebar.classList.contains("active")
      ) {
        sidebar.classList.remove("active");
        sidebarToggle.classList.remove("active");
        const icon = sidebarToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }

      return true;
    }
    return false;
  }

  // إضافة مستمعي الأحداث لأزرار التبويبات
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // ========== إدارة القائمة الجانبية ==========
  const menuItems = document.querySelectorAll(".menu-item");

  // تحديث القائمة الجانبية بناءً على التبويب النشط
  function updateSidebarMenu(activeTab) {
    menuItems.forEach((item) => item.classList.remove("active"));

    // خريطة التبويبات للقائمة الجانبية
    const menuMapping = {
      overview: "overview",
      "blood-management": "blood-management",
      "appointments-management": "appointments-management",
      "exemptions-management": "exemptions-management",
      "donors-management": "donors-management",
      "centers-management": "centers-management",
      "reports-management": "reports-management",
      "staff-management": "staff-management",
      "settings-management": "settings-management",
    };

    const targetMenu = document.querySelector(
      `.menu-item[data-tab="${activeTab}"]`
    );
    if (targetMenu) {
      targetMenu.classList.add("active");
    }
  }

  // إضافة مستمعي الأحداث لعناصر القائمة الجانبية
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const tabId = this.getAttribute("data-tab");
      if (tabId && switchTab(tabId)) {
        // تحديث القائمة الجانبية
        menuItems.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // ========== إدارة نافذة إضافة كيس دم ==========
  const addBloodBtn = document.getElementById("addBloodBtn");
  const addBloodModal = document.getElementById("addBloodModal");
  const closeBloodModal = document.getElementById("closeBloodModal");
  const cancelBloodBtn = document.getElementById("cancelBloodBtn");
  const saveBloodBtn = document.getElementById("saveBloodBtn");

  if (addBloodBtn && addBloodModal) {
    addBloodBtn.addEventListener("click", function () {
      addBloodModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // دالة لإغلاق النافذة
    function closeBloodModalFunc() {
      addBloodModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    closeBloodModal.addEventListener("click", closeBloodModalFunc);
    cancelBloodBtn.addEventListener("click", closeBloodModalFunc);

    saveBloodBtn.addEventListener("click", function () {
      // التحقق من صحة النموذج
      const bloodForm = document.getElementById("bloodForm");
      if (!bloodForm.checkValidity()) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      // محاكاة حفظ البيانات
      showNotification("تم إضافة كيس الدم بنجاح", "success");
      closeBloodModalFunc();
      bloodForm.reset();

      // تحديث الجدول (محاكاة)
      updateBloodTable();
    });
  }

  // ========== إدارة نافذة إضافة موعد ==========
  const addAppointmentBtn = document.getElementById("addAppointmentBtn");
  const addAppointmentModal = document.getElementById("addAppointmentModal");
  const closeAppointmentModal = document.getElementById(
    "closeAppointmentModal"
  );
  const cancelAppointmentBtn = document.getElementById("cancelAppointmentBtn");
  const saveAppointmentBtn = document.getElementById("saveAppointmentBtn");

  if (addAppointmentBtn && addAppointmentModal) {
    addAppointmentBtn.addEventListener("click", function () {
      addAppointmentModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // دالة لإغلاق النافذة
    function closeAppointmentModalFunc() {
      addAppointmentModal.classList.remove("active");
      document.body.style.overflow = "";
    }

    closeAppointmentModal.addEventListener("click", closeAppointmentModalFunc);
    cancelAppointmentBtn.addEventListener("click", closeAppointmentModalFunc);

    saveAppointmentBtn.addEventListener("click", function () {
      // التحقق من صحة النموذج
      const appointmentForm = document.getElementById("appointmentForm");
      if (!appointmentForm.checkValidity()) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      // محاكاة حفظ البيانات
      showNotification("تم إضافة الموعد بنجاح", "success");
      closeAppointmentModalFunc();
      appointmentForm.reset();

      // تحديث الجدول (محاكاة)
      updateAppointmentsTable();
    });
  }

  // ========== إدارة النوافذ المنبثقة ==========
  // إغلاق النوافذ عند النقر خارجها
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // إغلاق النوافذ بمفتاح Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  });

  // ========== تحديث حالة فصائل الدم ==========
  const bloodTypesGrid = document.querySelector(".blood-types-grid");
  if (bloodTypesGrid) {
    updateBloodTypesGrid();
  }

  // دالة تحديث شبكة فصائل الدم
  function updateBloodTypesGrid() {
    const bloodTypes = [
      { type: "A+", count: 153, status: "good" },
      { type: "B+", count: 142, status: "good" },
      { type: "O+", count: 187, status: "good" },
      { type: "AB+", count: 89, status: "low" },
      { type: "A-", count: 45, status: "low" },
      { type: "B-", count: 38, status: "critical" },
      { type: "O-", count: 52, status: "low" },
      { type: "AB-", count: 18, status: "critical" },
    ];

    bloodTypesGrid.innerHTML = "";

    bloodTypes.forEach((blood) => {
      let statusClass = "";
      let statusText = "";

      switch (blood.status) {
        case "good":
          statusClass = "blood-status--good";
          statusText = "ممتازة";
          break;
        case "low":
          statusClass = "blood-status--low";
          statusText = "منخفضة";
          break;
        case "critical":
          statusClass = "blood-status--critical";
          statusText = "حرجة";
          break;
      }

      const card = document.createElement("div");
      card.className = "blood-type-card";
      card.innerHTML = `
        <div class="blood-type">${blood.type}</div>
        <div class="blood-count">${blood.count} كيس</div>
        <div class="blood-status ${statusClass}">${statusText}</div>
      `;

      bloodTypesGrid.appendChild(card);
    });
  }

  // ========== تحديث الجداول ==========
  // دالة تحديث جدول المواعيد (محاكاة)
  function updateAppointmentsTable() {
    const appointmentsTable = document.querySelector(
      "#appointments-management tbody"
    );
    if (appointmentsTable) {
      // يمكنك هنا جلب البيانات من الخادم وتحديث الجدول
      console.log("Updating appointments table...");
    }
  }

  // دالة تحديث جدول الدم (محاكاة)
  function updateBloodTable() {
    const bloodTable = document.querySelector("#blood-management tbody");
    if (bloodTable) {
      // يمكنك هنا جلب البيانات من الخادم وتحديث الجدول
      console.log("Updating blood table...");
    }
  }

  // ========== إدارة أزرار الإجراءات في الجداول ==========
  document.addEventListener("click", function (e) {
    // حذف عنصر
    if (
      e.target.closest(".btn-delete") ||
      e.target.classList.contains("fa-trash")
    ) {
      const row = e.target.closest("tr");
      if (row && confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
        row.style.opacity = "0.5";
        setTimeout(() => {
          row.remove();
          showNotification("تم الحذف بنجاح", "success");
        }, 300);
      }
    }

    // تعديل عنصر
    if (
      e.target.closest(".btn-edit") ||
      e.target.classList.contains("fa-edit")
    ) {
      const row = e.target.closest("tr");
      if (row) {
        showNotification("فتح نموذج التعديل للعنصر المحدد", "info");
        // هنا يمكنك فتح نموذج التعديل مع بيانات الصف
      }
    }

    // عرض تفاصيل العنصر
    if (
      e.target.closest(".btn-view") ||
      e.target.classList.contains("fa-eye")
    ) {
      const row = e.target.closest("tr");
      if (row) {
        showNotification("عرض تفاصيل العنصر", "info");
        // هنا يمكنك عرض تفاصيل الصف
      }
    }
  });

  // ========== وظائف مساعدة ==========
  // دالة لعرض الإشعارات
  function showNotification(message, type = "info") {
    // إنشاء عنصر الإشعار
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    // إضافة أنماط CSS للإشعار
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style");
      styles.id = "notification-styles";
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          left: 20px;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          animation: slideInLeft 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 300px;
          max-width: 500px;
        }
        .notification--success {
          background: var(--color-admin-success);
          color: white;
        }
        .notification--error {
          background: var(--color-admin-danger);
          color: white;
        }
        .notification--info {
          background: var(--color-admin-secondary);
          color: white;
        }
        .notification--warning {
          background: var(--color-admin-warning);
          color: white;
        }
        .notification-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          margin-right: 0.5rem;
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);

    // إضافة مستمع حدث للإغلاق
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.remove();
      });

    // إزالة الإشعار تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-100%)";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  // ========== تهيئة البحث في الجداول ==========
  document.querySelectorAll(".table-search input").forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const table = this.closest(".data-table");
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  // ========== تهيئة الفلاتر ==========
  document.querySelectorAll(".table-actions select").forEach((select) => {
    select.addEventListener("change", function () {
      const value = this.value;
      const table = this.closest(".data-table");
      const rows = table.querySelectorAll("tbody tr");

      if (value === "all") {
        rows.forEach((row) => (row.style.display = ""));
      } else {
        rows.forEach((row) => {
          const statusCell = row.querySelector(".status-badge");
          if (statusCell && statusCell.textContent.includes(value)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      }
    });
  });

  // ========== تهيئة زر تحديث المخزون ==========
  const updateInventoryBtn = document.getElementById("updateInventoryBtn");
  if (updateInventoryBtn) {
    updateInventoryBtn.addEventListener("click", function () {
      this.disabled = true;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث...';

      // محاكاة تحديث البيانات من الخادم
      setTimeout(() => {
        updateBloodTypesGrid();
        showNotification("تم تحديث بيانات المخزون بنجاح", "success");
        this.disabled = false;
        this.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث المخزون';
      }, 1500);
    });
  }

  // ========== إدارة التنبيهات ==========
  const notificationIcon = document.querySelector(".notification-icon");
  if (notificationIcon) {
    notificationIcon.addEventListener("click", function () {
      showNotification("فتح قائمة التنبيهات", "info");
      // هنا يمكنك فتح قائمة التنبيهات
    });
  }

  console.log("Dashboard JavaScript loaded successfully!");
});
