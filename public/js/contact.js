window.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("my-form");
    var btn = document.querySelector(".form-submit");
    var name = document.querySelector("input[name='name']");
    var email = document.querySelector("input[name='email']");
    var msg = document.querySelector("textarea[name='message']");

    name.isValid = () => !!name.value;
    email.isValid = () => isValidEmail(email.value);
    msg.isValid = () => !!msg.value;

    const inputFields = [name, email, msg];

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    let shouldValidate = false;
    let isFormValid = false;

    const validateInputs = () => {
        if (!shouldValidate) return;

        isFormValid = true;
        inputFields.forEach((input) => {
            input.classList.remove("invalid");
            input.nextElementSibling.style.display = 'none';

            if (!input.isValid()) {
                input.classList.add("invalid");
                isFormValid = false;
                input.nextElementSibling.style.display = 'block';
            }
        })
    }

    function errorAlert() {
        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "An error occurred. Please try again.",
            confirmButtonColor: "#F27474"
        });
    }

    function success() {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Thanks, your message was sent successfully.",
            confirmButtonColor: "#68E0CF"
        });
    }

    function sendEmail(name, email, msg) {
        emailjs.send("service_z9mshmd", "template_sscgggf", {
            from_name: email,
            to_name: "Manuel Ahuno",
            reply_to: name,
            message: msg,
        }).then(function() {
            form.reset();
            success();
        }, function(error) {
            errorAlert();
            console.log("Error: ", error);
        });
    }

    function submitForm() {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            shouldValidate = true;
            validateInputs();

            if (isFormValid) {
                sendEmail(name.value, email.value, msg.value);
            }
        });
    }
    submitForm();

    inputFields.forEach((input) => input.addEventListener("input", validateInputs));
});
