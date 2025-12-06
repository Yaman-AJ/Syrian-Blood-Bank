// مكتبة بيانات المراكز حسب المحافظة
const exemptionCentersByGovernorate = {
  دمشق: ["المركز الوطني", "مشفى المواساة", "مشفى الأسد الجامعي"],
  "ريف دمشق": ["مركز دمشق للتبرع", "مشفى الهلال"],
  حلب: ["مشفى الحلب الجامعي", "مشفى الإسعاف"],
  حمص: ["مشفى الوطني", "مشفى الباسل"],
  حماه: ["مشفى حماة الوطني"],
  اللاذقية: ["مشفى التوليد الجامعي"],
  طرطوس: ["مشفى طرطوس"],
  ادلب: ["مشفى ادلب الوطني"],
  الحسكة: ["مشفى الحسكة"],
  درعا: ["مشفى درعا"],
  "دير الزور": ["مشفى دير الزور"],
  الرقة: ["مشفى الرقة"],
  القنيطرة: ["مشفى القنيطرة"],
  السويداء: ["مشفى السويداء"],
};

// تحميل جميع الوظائف عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  // تحديث قائمة المراكز عند تغيير المحافظة
  document.getElementById("province").addEventListener("change", function () {
    const province = this.value;
    const centerSelect = document.getElementById("center");

    // مسح الخيارات الحالية
    centerSelect.innerHTML = '<option value="">--اختر--</option>';

    // إضافة المراكز المناسبة
    if (province && exemptionCentersByGovernorate[province]) {
      exemptionCentersByGovernorate[province].forEach((center) => {
        const option = document.createElement("option");
        option.value = center;
        option.textContent = center;
        centerSelect.appendChild(option);
      });
    }
  });

  // إدارة رفع الملف (غير إلزامي)
  const fileInput = document.getElementById("doc-upload");
  const uploadText = document.getElementById("uploadText");

  if (fileInput && uploadText) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        // التحقق من حجم الملف (5MB كحد أقصى) - تحقق اختياري فقط
        if (file.size > 5 * 1024 * 1024) {
          alert("حجم الملف كبير جداً. الحد الأقصى هو 5MB.");
          this.value = ""; // مسح الملف
          uploadText.textContent = "يجب رفع وثيقة تثبت إعفائك";
          return;
        }

        // التحقق من نوع الملف - تحقق اختياري فقط
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "application/pdf",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert(
            "نوع الملف غير مسموح به. الرجاء رفع ملف بصيغة JPG, PNG أو PDF."
          );
          this.value = ""; // مسح الملف
          uploadText.textContent = "يجب رفع وثيقة تثبت إعفائك";
          return;
        }

        const fileName =
          file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name;
        uploadText.textContent = fileName;
      } else {
        uploadText.textContent = "يجب رفع وثيقة تثبت إعفائك";
      }
    });
  }

  // التحقق من صحة البريد الإلكتروني
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // التحقق من صحة رقم الهاتف
  function validatePhone(phone) {
    const re = /^09\d{8}$/;
    return re.test(phone);
  }

  // التحقق من صحة العمر
  function validateAge(age) {
    return age >= 18 && age <= 70; // فرض أن عمر المتبرع بين 18 و 70
  }

  // التحقق من جميع الحقول (بدون التحقق من الملف)
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const province = document.getElementById("province").value;
    const center = document.getElementById("center").value;
    const reason = document.getElementById("reason").value;
    const notes = document.getElementById("additionalNotes").value.trim();

    // رسائل الخطأ
    const errors = [];

    // التحقق من الحقول الإجبارية (باستثناء الملف)
    if (!name) errors.push("الرجاء إدخال الاسم الكامل");
    if (!age) errors.push("الرجاء إدخال العمر");
    if (!email) errors.push("الرجاء إدخال البريد الإلكتروني");
    if (!phone) errors.push("الرجاء إدخال رقم الهاتف");
    if (!province) errors.push("الرجاء اختيار المحافظة");
    if (!center) errors.push("الرجاء اختيار المركز");
    if (!reason) errors.push("الرجاء اختيار سبب الإعفاء");
    // الملف غير إلزامي - لا نتحقق منه

    // التحقق من صحة البيانات
    if (age && !validateAge(parseInt(age)))
      errors.push("العمر يجب أن يكون بين 18 و 70 سنة");
    if (email && !validateEmail(email))
      errors.push("البريد الإلكتروني غير صالح");
    if (phone && !validatePhone(phone))
      errors.push("رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام");

    // التحقق من طول الملاحظات إذا كانت موجودة
    if (notes && notes.length > 500) {
      errors.push("الملاحظات يجب أن لا تتجاوز 500 حرف");
    }

    return errors;
  }

  // التعامل مع إرسال النموذج
  document
    .getElementById("exemptionForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // التحقق من صحة النموذج
      const validationErrors = validateForm();

      if (validationErrors.length > 0) {
        // عرض جميع الأخطاء في رسالة واحدة
        alert("يوجد أخطاء في النموذج:\n\n" + validationErrors.join("\n• "));
        return;
      }

      // جمع بيانات النموذج
      const fileInput = document.getElementById("doc-upload");
      const fileName = fileInput.files[0]
        ? fileInput.files[0].name.length > 30
          ? fileInput.files[0].name.slice(0, 27) + "..."
          : fileInput.files[0].name
        : "لم يتم رفع ملف";

      const formData = {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value,
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        province: document.getElementById("province").value,
        center: document.getElementById("center").value,
        reason: document.getElementById("reason").value,
        notes: document.getElementById("additionalNotes").value.trim(),
        documentUploaded: fileName,
        requestNumber:
          "EX-" +
          new Date().getFullYear() +
          "-" +
          Math.floor(1000 + Math.random() * 9000),
        submissionDate: new Date().toISOString().split("T")[0],
      };

      // حفظ البيانات في localStorage
      localStorage.setItem("lastExemptionRequest", JSON.stringify(formData));

      // تحديث تفاصيل الطلب
      document.getElementById("detailName").textContent = formData.name;
      document.getElementById("detailEmail").textContent = formData.email;
      document.getElementById("detailProvince").textContent = formData.province;
      document.getElementById("detailCenter").textContent = formData.center;
      document.getElementById("detailReason").textContent = formData.reason;
      document.getElementById("detailDate").textContent =
        formData.submissionDate;
      document.getElementById("requestNumber").textContent =
        formData.requestNumber;

      // إظهار رسالة النجاح وإخفاء النموذج
      document.getElementById("exemptionSuccess").style.display = "block";
      document.getElementById("exemptionForm").style.display = "none";

      // إظهار تفاصيل الطلب
      setTimeout(() => {
        document.getElementById("exemptionDetails").style.display = "block";
        // التمرير إلى تفاصيل الطلب
        document.getElementById("exemptionDetails").scrollIntoView({
          behavior: "smooth",
        });
      }, 1500);
    });

  // طباعة تفاصيل الطلب
  document
    .getElementById("printExemption")
    .addEventListener("click", function () {
      window.print();
    });

  // تتبع حالة الطلب
  document
    .getElementById("trackExemption")
    .addEventListener("click", function () {
      alert(
        "سيتم إضافة صفحة تتبع حالة الطلب قريباً. يمكنك التواصل معنا على info@bloodbank.sy للاستفسار عن حالة طلبك."
      );
    });

  // إلغاء طلب الإعفاء
  document
    .getElementById("cancelExemption")
    .addEventListener("click", function () {
      if (
        confirm(
          "هل أنت متأكد من إلغاء طلب الإعفاء؟ هذا الإجراء لا يمكن التراجع عنه."
        )
      ) {
        // حذف الطلب من localStorage
        localStorage.removeItem("lastExemptionRequest");

        // إظهار رسالة نجاح
        alert("تم إلغاء طلب الإعفاء بنجاح");

        // إعادة تحميل الصفحة لعرض النموذج مرة أخرى
        location.reload();
      }
    });

  // تحميل بيانات الطلب السابق إذا وجدت
  const lastRequest = localStorage.getItem("lastExemptionRequest");
  if (lastRequest) {
    const request = JSON.parse(lastRequest);
    document.getElementById("detailName").textContent = request.name;
    document.getElementById("detailEmail").textContent = request.email;
    document.getElementById("detailProvince").textContent = request.province;
    document.getElementById("detailCenter").textContent = request.center;
    document.getElementById("detailReason").textContent = request.reason;
    document.getElementById("detailDate").textContent = request.submissionDate;
    document.getElementById("requestNumber").textContent =
      request.requestNumber;

    // إظهار تفاصيل الطلب وإخفاء النموذج
    document.getElementById("exemptionForm").style.display = "none";
    document.getElementById("exemptionSuccess").style.display = "block";
    document.getElementById("exemptionDetails").style.display = "block";
  }

  // إضافة تحقق أثناء الكتابة (اختياري)
  const inputs = document.querySelectorAll(
    "#exemptionForm input[required], #exemptionForm select[required]"
  );
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      // التحقق البسيط عند الخروج من الحقل
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#f44336";
      } else {
        this.style.borderColor = "";
      }
    });
  });
});
