/**
* Formspree.io and BootstrapMade Form Validation
* This script combines the features of both to handle form submission with Formspree.
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let status = thisForm.querySelector('.sent-message');
      let errorMessage = thisForm.querySelector('.error-message');
      let loading = thisForm.querySelector('.loading');

      // Show loading spinner
      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      status.classList.remove('d-block');

      let action = thisForm.getAttribute('action');
      let data = new FormData(this);

      // Fetch API to submit the form data to the Formspree endpoint
      fetch(action, {
        method: thisForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        loading.classList.remove('d-block');
        if (response.ok) {
          // Success
          status.innerHTML = "Your Message have been Submitted!";
          status.classList.add('d-block');
          thisForm.reset();
        } else {
          // Error
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              errorMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              errorMessage.innerHTML = "Oops! There was a problem submitting your form.";
            }
            errorMessage.classList.add('d-block');
          });
        }
      })
      .catch(error => {
        loading.classList.remove('d-block');
        errorMessage.innerHTML = "Oops! There was a problem submitting your form.";
        errorMessage.classList.add('d-block');
      });
    });
  });

})();