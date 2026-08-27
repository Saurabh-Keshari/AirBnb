(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// Auto-dismiss Flash Messages after 2sec
setTimeout(() => {
  let alertElements = document.querySelectorAll(".alert");
  alertElements.forEach((alert) => {
    // Bootstrap ka Alert component use karke usko gracefully close karna
    let bsAlert = new bootstrap.Alert(alert);
    bsAlert.close();
  });
}, 3000);
