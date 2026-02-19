(function () {
  const form = document.getElementById("booking-form");
  const responseBox = document.getElementById("form-response");

  if (!form) return;

  function showMessage(type, text) {
    responseBox.className = "message-box " + type;
    responseBox.textContent = text;
    responseBox.style.display = "block";
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    responseBox.style.display = "none";

    const payload = {
      name: form.fullName.value.trim(),
      phone: form.phoneNumber.value.trim(),
      email: form.emailAddress.value.trim(),
      carModel: form.carModel.value.trim(),
      service: form.serviceRequired.value,
      preferredDate: form.preferredDate.value,
      message: form.message.value.trim(),
      branch: form.branch.value
    };

    if (!payload.name || payload.name.length < 2) {
      showMessage("error", "Please enter your full name.");
      return;
    }

    if (!payload.phone || !/^\d{10}$/.test(payload.phone)) {
      showMessage("error", "Please enter a valid 10-digit phone number.");
      return;
    }

    if (!payload.branch) {
      showMessage("error", "Please select a branch.");
      return;
    }

    if (!payload.carModel) {
      showMessage("error", "Please enter your car model.");
      return;
    }

    if (!payload.service) {
      showMessage("error", "Please select a service.");
      return;
    }

    if (!payload.preferredDate) {
      showMessage("error", "Please select a preferred date.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      const formBody = new URLSearchParams(payload);
      await fetch(
        "https://script.google.com/macros/s/AKfycbxZLtcabIE53HrgH2fEMNP5SYhTDsLAEsT1UAMYkTrv8sy7w2_OuhoJzSvxC6nxC1p8dQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: formBody.toString()
        }
      );

      showMessage("success", " Booking submitted successfully!");
      form.reset();
    } catch (err) {
      showMessage("error", " Booking failed. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Booking";
    }
  });
})();
