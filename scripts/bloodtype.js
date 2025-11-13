// scripts/bloodtype.js
document.addEventListener("DOMContentLoaded", function () {
  // إدارة اختيار خيارات البحث
  document.querySelectorAll(".btn-option").forEach((option) => {
    option.addEventListener("click", function () {
      const group = this.parentElement;
      group.querySelectorAll(".btn-option").forEach((btn) => {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  // إدارة عرض نتائج البحث
  const searchSubmit = document.querySelector(".search-submit");
  const bloodDetails = document.getElementById("bloodDetails");
  const summaryBloodType = document.getElementById("summaryBloodType");
  const summaryRh = document.getElementById("summaryRh");
  const centersCount = document.getElementById("centersCount");
  const centersGrid = document.getElementById("centersGrid");

  // قاعدة بيانات مؤقتة للمراكز (محدثة ومتنوعة)
  const centersData = [
    {
      id: 1,
      name: "بنك الشام المركزي",
      address: "شارع الاندلس، دمشق",
      bloodType: "AB",
      rh: "موجبة",
      bags: 5,
      province: "دمشق",
    },
    {
      id: 2,
      name: "مستشفى المواساة",
      address: "المزة، دمشق",
      bloodType: "AB",
      rh: "موجبة",
      bags: 2,
      province: "دمشق",
    },
    {
      id: 3,
      name: "مشفى الأسد الجامعي",
      address: "البرامكة، دمشق",
      bloodType: "AB",
      rh: "موجبة",
      bags: 8,
      province: "دمشق",
    },
    {
      id: 4,
      name: "مستشفى البيروني",
      address: "المالكي، دمشق",
      bloodType: "B",
      rh: "موجبة",
      bags: 3,
      province: "دمشق",
    },
    {
      id: 5,
      name: "مستشفى حرستا",
      address: "حرستا، ريف دمشق",
      bloodType: "B",
      rh: "موجبة",
      bags: 3,
      province: "ريف دمشق",
    },
    {
      id: 6,
      name: "مشفى داريا",
      address: "داريا، ريف دمشق",
      bloodType: "B",
      rh: "موجبة",
      bags: 1,
      province: "ريف دمشق",
    },
    {
      id: 7,
      name: "مستشفى الكرامة",
      address: "شارع الحرية، حلب",
      bloodType: "O",
      rh: "موجبة",
      bags: 4,
      province: "حلب",
    },
    {
      id: 8,
      name: "مشفى الجامعة",
      address: "جامعة حلب، حلب",
      bloodType: "O",
      rh: "موجبة",
      bags: 6,
      province: "حلب",
    },
    {
      id: 9,
      name: "مشفى الوطني",
      address: "حي الغوطة، حمص",
      bloodType: "A",
      rh: "موجبة",
      bags: 3,
      province: "حمص",
    },
    {
      id: 10,
      name: "مستشفى الوليد",
      address: "الكراجات، حمص",
      bloodType: "A",
      rh: "موجبة",
      bags: 2,
      province: "حمص",
    },
    {
      id: 11,
      name: "مشفى الأطفال",
      address: "القصاع، دمشق",
      bloodType: "O",
      rh: "موجبة",
      bags: 7,
      province: "دمشق",
    },
    {
      id: 12,
      name: "مستشفى القدس",
      address: "القدم، دمشق",
      bloodType: "B",
      rh: "سالبة",
      bags: 2,
      province: "دمشق",
    },
    {
      id: 13,
      name: "مشفى التوليد",
      address: "الميدان، دمشق",
      bloodType: "A",
      rh: "موجبة",
      bags: 4,
      province: "دمشق",
    },
    {
      id: 14,
      name: "مستشفى الشهباء",
      address: "السليمانية، حلب",
      bloodType: "AB",
      rh: "سالبة",
      bags: 1,
      province: "حلب",
    },
    {
      id: 15,
      name: "مشفى الرازي",
      address: "العدوي، حمص",
      bloodType: "AB",
      rh: "سالبة",
      bags: 2,
      province: "حمص",
    },
  ];

  // دالة البحث الرئيسية
  function performSearch() {
    // الحصول على القيم المختارة
    const selectedBloodType = document.querySelector(
      "#blood-type .btn-option.active"
    ).textContent;
    const selectedRh = document.querySelector(
      "#rh .btn-option.active"
    ).textContent;
    const selectedProvince = document.querySelector(
      "#province .btn-option.active"
    ).textContent;

    console.log("البحث عن:", selectedBloodType, selectedRh, selectedProvince);

    // تعيين القيم في الملخص
    summaryBloodType.textContent = selectedBloodType;
    summaryRh.textContent = selectedRh;

    // تصفية المراكز بناءً على الفصيلة والزمرة والمحافظة
    let filteredCenters = centersData.filter(
      (center) =>
        center.bloodType === selectedBloodType && center.rh === selectedRh
    );

    // إذا كانت المحافظة محددة وليست "جميع المحافظات"، نقوم بتصفية إضافية
    if (selectedProvince && selectedProvince !== "جميع المحافظات") {
      filteredCenters = filteredCenters.filter(
        (center) => center.province === selectedProvince
      );
    }

    console.log("النتائج:", filteredCenters);

    // تحديث عدد المراكز
    centersCount.textContent = filteredCenters.length;

    // عرض المراكز
    displayCenters(filteredCenters);

    // إظهار قسم التفاصيل
    bloodDetails.style.display = "block";

    // التمرير السلس إلى قسم التفاصيل
    bloodDetails.scrollIntoView({ behavior: "smooth" });
  }

  function displayCenters(centers) {
    // مسح المحتوى القديم
    centersGrid.innerHTML = "";

    if (centers.length === 0) {
      centersGrid.innerHTML = `
                <div class="no-results">
                    <p>لا توجد مراكز متوفرة لهذه الفصيلة في المحافظة المحددة.</p>
                    <p>جرب البحث في محافظة أخرى أو اختيار فصيلة دم مختلفة.</p>
                </div>
            `;
      return;
    }

    // إضافة كل مركز إلى الشبكة
    centers.forEach((center) => {
      const centerCard = document.createElement("div");
      centerCard.className = "center-card";
      centerCard.innerHTML = `
                <div class="center-header">
                    <h3 class="center-name">${center.name}</h3>
                </div>
                <div class="center-details">
                    <div class="detail-row">
                        <span class="detail-label">فصيلة الدم:</span>
                        <span class="detail-value">${center.bloodType}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">الزمرة:</span>
                        <span class="detail-value">${center.rh}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">عدد الكياس:</span>
                        <span class="detail-value">${center.bags}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">العنوان:</span>
                        <span class="detail-value">${center.address}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">المحافظة:</span>
                        <span class="detail-value">${center.province}</span>
                    </div>
                </div>
            `;

      centersGrid.appendChild(centerCard);
    });
  }

  // إضافة event listener لزر البحث فقط
  if (searchSubmit) {
    searchSubmit.addEventListener("click", performSearch);
  }
});
