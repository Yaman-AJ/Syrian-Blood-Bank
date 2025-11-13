// scripts/exemption.js
document.addEventListener("DOMContentLoaded", function () {
  // إدارة رفع الملف
  const fileInput = document.querySelector("#doc-upload");
  const uploadText = document.querySelector(".upload-text");

  if (fileInput && uploadText) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (file) {
        const name =
          file.name.length > 30 ? file.name.slice(0, 27) + "..." : file.name;
        uploadText.textContent = name;
      } else {
        uploadText.textContent = "يجب رفع وثيقة تثبت إعفائك";
      }
    });
  }
});
