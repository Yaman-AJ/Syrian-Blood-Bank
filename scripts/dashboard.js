// كود JavaScript للداشبورد الإداري
document.addEventListener("DOMContentLoaded", function () {
  console.log("لوحة التحكم جاهزة!");

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
        // منع التمرير عند فتح الشريط الجانبي
        document.body.style.overflow = "hidden";
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        // إعادة التمرير عند إغلاق الشريط الجانبي
        document.body.style.overflow = "";
      }
    });

    // إغلاق الشريط الجانبي عند النقر خارجها
    document.addEventListener("click", function (e) {
      if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target) &&
        window.innerWidth <= 1024
      ) {
        closeSidebar();
      }
    });
  }

  function closeSidebar() {
    if (sidebar && sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
      if (sidebarToggle) {
        sidebarToggle.classList.remove("active");
        const icon = sidebarToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
      document.body.style.overflow = "";
    }
  }

  // ========== إدارة تبويبات الصفحة ==========
  const menuItems = document.querySelectorAll(".menu-item");
  const tabContents = document.querySelectorAll(".tab-content");

  // دالة لتبديل التبويب
  function switchTab(tabId) {
    // إخفاء جميع المحتويات
    tabContents.forEach((c) => c.classList.remove("active"));

    // إزالة النشاط من جميع عناصر القائمة
    menuItems.forEach((m) => m.classList.remove("active"));

    // إظهار المحتوى المحدد
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
      targetContent.classList.add("active");

      // إضافة النشاط للقائمة الجانبية
      const targetMenu = document.querySelector(
        `.menu-item[data-tab="${tabId}"]`
      );
      if (targetMenu) {
        targetMenu.classList.add("active");
      }

      // إغلاق الشريط الجانبي على الجوال
      closeSidebar();

      return true;
    }
    return false;
  }

  // إضافة مستمعي الأحداث لعناصر القائمة
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const tabId = this.getAttribute("data-tab");
      if (tabId) {
        switchTab(tabId);
      }
    });
  });

  // تهيئة التبويب الأول
  if (menuItems.length > 0) {
    const firstTab = menuItems[0].getAttribute("data-tab");
    switchTab(firstTab);
  }

  // ========== إدارة النوافذ المنبثقة ==========
  // نافذة إضافة كيس دم
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

    function closeBloodModalFunc() {
      addBloodModal.classList.remove("active");
      document.body.style.overflow = "";
      document.getElementById("bloodForm").reset();
    }

    if (closeBloodModal)
      closeBloodModal.addEventListener("click", closeBloodModalFunc);
    if (cancelBloodBtn)
      cancelBloodBtn.addEventListener("click", closeBloodModalFunc);

    if (saveBloodBtn) {
      saveBloodBtn.addEventListener("click", function () {
        const form = document.getElementById("bloodForm");
        if (form.checkValidity()) {
          showNotification("تم إضافة كيس الدم بنجاح", "success");
          closeBloodModalFunc();
          // إضافة الصف إلى الجدول
          addBloodToTable({
            bagNumber: document.getElementById("bagNumber").value,
            bloodType: document.getElementById("bloodType").value,
            donationDate: document.getElementById("donationDate").value,
            expiryDate: document.getElementById("expiryDate").value,
            center: document.getElementById("center").value,
            donor: document.getElementById("donor").value,
          });
        } else {
          showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
        }
      });
    }
  }

  // نافذة إضافة موعد
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

    function closeAppointmentModalFunc() {
      addAppointmentModal.classList.remove("active");
      document.body.style.overflow = "";
      document.getElementById("appointmentForm").reset();
    }

    if (closeAppointmentModal)
      closeAppointmentModal.addEventListener(
        "click",
        closeAppointmentModalFunc
      );
    if (cancelAppointmentBtn)
      cancelAppointmentBtn.addEventListener("click", closeAppointmentModalFunc);

    if (saveAppointmentBtn) {
      saveAppointmentBtn.addEventListener("click", function () {
        const form = document.getElementById("appointmentForm");
        if (form.checkValidity()) {
          showNotification("تم إضافة الموعد بنجاح", "success");
          closeAppointmentModalFunc();
          // إضافة الصف إلى الجدول
          addAppointmentToTable({
            donor: document.getElementById("appDonor").value,
            bloodType: document.getElementById("appBloodType").value,
            center: document.getElementById("appCenter").value,
            date: document.getElementById("appDate").value,
            time: document.getElementById("appTime").value,
            status: document.getElementById("appStatus").value,
          });
        } else {
          showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
        }
      });
    }
  }

  // نافذة إضافة متبرع
  const addDonorBtn = document.getElementById("addDonorBtn");
  const addDonorModal = document.getElementById("addDonorModal");
  const closeDonorModal = document.getElementById("closeDonorModal");
  const cancelDonorBtn = document.getElementById("cancelDonorBtn");
  const saveDonorBtn = document.getElementById("saveDonorBtn");

  if (addDonorBtn && addDonorModal) {
    addDonorBtn.addEventListener("click", function () {
      addDonorModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    function closeDonorModalFunc() {
      addDonorModal.classList.remove("active");
      document.body.style.overflow = "";
      document.getElementById("donorForm").reset();
    }

    if (closeDonorModal)
      closeDonorModal.addEventListener("click", closeDonorModalFunc);
    if (cancelDonorBtn)
      cancelDonorBtn.addEventListener("click", closeDonorModalFunc);

    if (saveDonorBtn) {
      saveDonorBtn.addEventListener("click", function () {
        const form = document.getElementById("donorForm");
        if (form.checkValidity()) {
          showNotification("تم إضافة المتبرع بنجاح", "success");
          closeDonorModalFunc();
          // إضافة الصف إلى الجدول
          addDonorToTable({
            name: document.getElementById("donorName").value,
            bloodType: document.getElementById("donorBloodType").value,
            phone: document.getElementById("donorPhone").value,
            id: document.getElementById("donorId").value,
            email: document.getElementById("donorEmail").value,
            birthDate: document.getElementById("donorBirthDate").value,
            gender: document.getElementById("donorGender").value,
            weight: document.getElementById("donorWeight").value,
          });
        } else {
          showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
        }
      });
    }
  }

  // نافذة إضافة مركز
  const addCenterBtn = document.getElementById("addCenterBtn");
  const addCenterModal = document.getElementById("addCenterModal");
  const closeCenterModal = document.getElementById("closeCenterModal");
  const cancelCenterBtn = document.getElementById("cancelCenterBtn");
  const saveCenterBtn = document.getElementById("saveCenterBtn");

  if (addCenterBtn && addCenterModal) {
    addCenterBtn.addEventListener("click", function () {
      addCenterModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    function closeCenterModalFunc() {
      addCenterModal.classList.remove("active");
      document.body.style.overflow = "";
      document.getElementById("centerForm").reset();
    }

    if (closeCenterModal)
      closeCenterModal.addEventListener("click", closeCenterModalFunc);
    if (cancelCenterBtn)
      cancelCenterBtn.addEventListener("click", closeCenterModalFunc);

    if (saveCenterBtn) {
      saveCenterBtn.addEventListener("click", function () {
        const form = document.getElementById("centerForm");
        if (form.checkValidity()) {
          showNotification("تم إضافة المركز بنجاح", "success");
          closeCenterModalFunc();
          // إضافة الصف إلى الجدول
          addCenterToTable({
            name: document.getElementById("centerName").value,
            type: document.getElementById("centerType").value,
            governorate: document.getElementById("centerGovernorate").value,
            phone: document.getElementById("centerPhone").value,
            address: document.getElementById("centerAddress").value,
            email: document.getElementById("centerEmail").value,
            status: document.getElementById("centerStatus").value,
          });
        } else {
          showNotification("يرجى ملء جميع الحقول المطلوبة", "error");
        }
      });
    }
  }

  // إغلاق النوافذ عند النقر خارجها
  document.addEventListener("click", function (e) {
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

  // زر تحديث المخزون
  const updateInventoryBtn = document.getElementById("updateInventoryBtn");
  if (updateInventoryBtn) {
    updateInventoryBtn.addEventListener("click", function () {
      this.disabled = true;
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث...';

      setTimeout(() => {
        updateBloodTypesGrid();
        showNotification("تم تحديث بيانات المخزون بنجاح", "success");
        this.disabled = false;
        this.innerHTML = originalHTML;
      }, 1500);
    });
  }

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

  // ========== وظائف إضافة بيانات للجداول ==========
  function addBloodToTable(data) {
    const table = document.querySelector("#blood-management tbody");
    if (!table) return;

    const newRow = document.createElement("tr");
    const formattedDate = new Date(data.donationDate).toLocaleDateString(
      "ar-SA"
    );
    const formattedExpiry = new Date(data.expiryDate).toLocaleDateString(
      "ar-SA"
    );

    newRow.innerHTML = `
            <td data-label="رقم الكيس">${data.bagNumber}</td>
            <td data-label="فصيلة الدم">${data.bloodType}</td>
            <td data-label="تاريخ التبرع">${formattedDate}</td>
            <td data-label="تاريخ الانتهاء">${formattedExpiry}</td>
            <td data-label="المركز">${data.center}</td>
            <td data-label="المتبرع">${data.donor}</td>
            <td data-label="الحالة"><span class="status-badge status-approved">متاح</span></td>
            <td data-label="الإجراءات">
                <div class="action-buttons">
                    <button class="btn-icon btn-view"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;

    table.prepend(newRow);
  }

  function addAppointmentToTable(data) {
    const table = document.querySelector("#appointments-management tbody");
    if (!table) return;

    const statusMap = {
      pending: "قيد الانتظار",
      approved: "مؤكد",
      cancelled: "ملغى",
    };

    const statusClassMap = {
      pending: "status-pending",
      approved: "status-approved",
      cancelled: "status-rejected",
    };

    const newRow = document.createElement("tr");
    const appointmentId = `APT-${Date.now().toString().slice(-6)}`;

    newRow.innerHTML = `
            <td data-label="رقم الحجز">${appointmentId}</td>
            <td data-label="المتبرع">${data.donor}</td>
            <td data-label="فصيلة الدم">${data.bloodType}</td>
            <td data-label="المركز">${data.center}</td>
            <td data-label="التاريخ">${data.date}</td>
            <td data-label="الوقت">${data.time}</td>
            <td data-label="الحالة"><span class="status-badge ${
              statusClassMap[data.status]
            }">${statusMap[data.status]}</span></td>
            <td data-label="الإجراءات">
                <div class="action-buttons">
                    <button class="btn-icon btn-view"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;

    table.prepend(newRow);
  }

  function addDonorToTable(data) {
    const table = document.querySelector("#donors-management tbody");
    if (!table) return;

    const newRow = document.createElement("tr");
    const formattedDate = new Date().toLocaleDateString("ar-SA");

    newRow.innerHTML = `
            <td data-label="الاسم">${data.name}</td>
            <td data-label="فصيلة الدم">${data.bloodType}</td>
            <td data-label="الهاتف">${data.phone}</td>
            <td data-label="آخر تبرع">${formattedDate}</td>
            <td data-label="عدد التبرعات">0</td>
            <td data-label="الحالة"><span class="status-badge status-approved">نشط</span></td>
            <td data-label="الإجراءات">
                <div class="action-buttons">
                    <button class="btn-icon btn-view"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;

    table.prepend(newRow);
  }

  function addCenterToTable(data) {
    const table = document.querySelector("#centers-management tbody");
    if (!table) return;

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
            <td data-label="اسم المركز">${data.name}</td>
            <td data-label="المحافظة">${data.governorate}</td>
            <td data-label="العنوان">${data.address}</td>
            <td data-label="الهاتف">${data.phone}</td>
            <td data-label="ساعات العمل">08:00 ص - 04:00 م</td>
            <td data-label="الحالة"><span class="status-badge status-approved">نشط</span></td>
            <td data-label="الإجراءات">
                <div class="action-buttons">
                    <button class="btn-icon btn-view"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;

    table.prepend(newRow);
  }

  // ========== إدارة أزرار الإجراءات ==========
  document.addEventListener("click", function (e) {
    // حذف صف
    if (
      e.target.closest(".btn-delete") ||
      e.target.classList.contains("fa-trash")
    ) {
      const row = e.target.closest("tr");
      if (row) {
        if (confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
          row.style.opacity = "0.5";
          setTimeout(() => {
            row.remove();
            showNotification("تم الحذف بنجاح", "success");
          }, 300);
        }
      }
    }

    // تحرير صف
    if (
      e.target.closest(".btn-edit") ||
      e.target.classList.contains("fa-edit")
    ) {
      showNotification("تم تفعيل وضع التحرير", "info");
    }

    // عرض تفاصيل
    if (
      e.target.closest(".btn-view") ||
      e.target.classList.contains("fa-eye")
    ) {
      showNotification("جاري تحميل التفاصيل...", "info");
    }
  });

  // ========== البحث في الجداول ==========
  document.querySelectorAll(".table-search input").forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      const table = this.closest(".data-table");
      const rows = table.querySelectorAll("tbody tr");

      let visibleCount = 0;

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });

      // عرض رسالة إذا لم توجد نتائج
      const noResults = table.querySelector(".no-results");
      if (visibleCount === 0 && searchTerm !== "") {
        if (!noResults) {
          const message = document.createElement("div");
          message.className = "no-results";
          message.innerHTML = `<p style="text-align: center; padding: 2rem; color: var(--color-admin-text-light);">لا توجد نتائج مطابقة</p>`;
          table.querySelector("tbody").appendChild(message);
        }
      } else if (noResults) {
        noResults.remove();
      }
    });
  });

  // ========== الفلاتر ==========
  document.querySelectorAll(".table-actions select").forEach((select) => {
    select.addEventListener("change", function () {
      const filterValue = this.value;
      const table = this.closest(".data-table");
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const statusCell = row.querySelector(".status-badge");
        if (filterValue === "all" || !statusCell) {
          row.style.display = "";
        } else {
          const statusText = statusCell.textContent.toLowerCase();
          const filterText = filterValue.toLowerCase();
          row.style.display = statusText.includes(filterText) ? "" : "none";
        }
      });
    });
  });

  // ========== وظائف مساعدة ==========
  function showNotification(message, type = "info") {
    // إزالة الإشعارات القديمة
    document.querySelectorAll(".notification").forEach((n) => n.remove());

    // إنشاء الإشعار الجديد
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;

    // تحديد لون الإشعار
    let bgColor, textColor;
    switch (type) {
      case "success":
        bgColor = "var(--color-admin-secondary)";
        textColor = "white";
        break;
      case "error":
        bgColor = "var(--color-admin-danger)";
        textColor = "white";
        break;
      case "warning":
        bgColor = "var(--color-admin-warning)";
        textColor = "white";
        break;
      default:
        bgColor = "var(--color-admin-primary-light)";
        textColor = "white";
    }

    notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 20px;
                padding: 1rem 1.5rem;
                background: ${bgColor};
                color: ${textColor};
                border-radius: var(--radius-md);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 500px;
                animation: slideInLeft 0.3s ease;
            ">
                <span>${message}</span>
                <button onclick="this.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: ${textColor};
                    font-size: 1.5rem;
                    cursor: pointer;
                    margin-right: 0.5rem;
                    padding: 0;
                ">
                    &times;
                </button>
            </div>
        `;

    document.body.appendChild(notification);

    // إزالة تلقائية بعد 5 ثوانٍ
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-100%)";
        notification.style.transition = "all 0.3s ease";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);

    // إضافة أنماط الحركة إذا لم تكن موجودة
    if (!document.querySelector("#notification-animations")) {
      const style = document.createElement("style");
      style.id = "notification-animations";
      style.textContent = `
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
      document.head.appendChild(style);
    }
  }

  // ========== إدارة التنبيهات ==========
  const notificationIcon = document.querySelector(".notification-icon");
  if (notificationIcon) {
    notificationIcon.addEventListener("click", function () {
      showNotification("عرض قائمة التنبيهات", "info");
      // هنا يمكنك إضافة منطق لعرض التنبيهات
    });
  }

  // ========== تحسينات التوافق مع الشاشات ==========
  function optimizeForScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const adminContent = document.querySelector(".admin-content");

    if (isMobile) {
      // تحسين للشاشات الصغيرة
      if (adminContent) {
        adminContent.style.width = "100vw";
        adminContent.style.maxWidth = "100vw";
        adminContent.style.overflowX = "hidden";
      }

      // تحويل الجداول إلى عرض بطاقات إذا كانت صغيرة جداً
      if (window.innerWidth <= 480) {
        document.querySelectorAll(".data-table").forEach((table) => {
          table.classList.add("mobile-card-view");
        });
      } else {
        document.querySelectorAll(".data-table").forEach((table) => {
          table.classList.remove("mobile-card-view");
        });
      }
    } else {
      // تحسين للشاشات الكبيرة
      if (adminContent) {
        adminContent.style.width = "";
        adminContent.style.maxWidth = "";
        adminContent.style.overflowX = "";
      }

      document.querySelectorAll(".data-table").forEach((table) => {
        table.classList.remove("mobile-card-view");
      });
    }

    // إغلاق الشريط الجانبي إذا كانت الشاشة كبيرة
    if (window.innerWidth > 1024) {
      closeSidebar();
    }
  }

  // ========== تكييف مع تغيير حجم النافذة ==========
  function handleResize() {
    optimizeForScreenSize();

    // إغلاق الشريط الجانبي عند توسيع الشاشة
    if (window.innerWidth > 1024) {
      closeSidebar();
    }

    // تحسين عرض الجداول
    document.querySelectorAll(".table-container").forEach((container) => {
      const table = container.querySelector("table");
      if (table) {
        const tableWidth = table.scrollWidth;
        const containerWidth = container.clientWidth;

        if (tableWidth > containerWidth && window.innerWidth > 768) {
          container.style.boxShadow =
            "inset -10px 0 10px -10px rgba(0,0,0,0.1)";
        } else {
          container.style.boxShadow = "none";
        }
      }
    });
  }

  // تطبيق التحسينات عند تحميل الصفحة
  optimizeForScreenSize();

  // إضافة مستمع حدث تغيير الحجم
  window.addEventListener("resize", handleResize);

  // إضافة مستمع حدث تحميل الصفحة بالكامل
  window.addEventListener("load", function () {
    setTimeout(handleResize, 100);
    setTimeout(optimizeForScreenSize, 200);
  });

  // تحسين شريط التمرير للجداول
  function initTableScroll() {
    document.querySelectorAll(".table-container").forEach((container) => {
      container.addEventListener("scroll", function () {
        const scrollLeft = this.scrollLeft;
        const scrollWidth = this.scrollWidth;
        const clientWidth = this.clientWidth;

        if (scrollLeft > 0 && scrollLeft + clientWidth < scrollWidth) {
          this.style.boxShadow =
            "inset -10px 0 10px -10px rgba(0,0,0,0.1), inset 10px 0 10px -10px rgba(0,0,0,0.1)";
        } else if (scrollLeft > 0) {
          this.style.boxShadow = "inset 10px 0 10px -10px rgba(0,0,0,0.1)";
        } else if (scrollLeft + clientWidth < scrollWidth) {
          this.style.boxShadow = "inset -10px 0 10px -10px rgba(0,0,0,0.1)";
        } else {
          this.style.boxShadow = "none";
        }
      });
    });
  }

  initTableScroll();

  console.log("لوحة التحكم تم تحميلها بنجاح!");
});
