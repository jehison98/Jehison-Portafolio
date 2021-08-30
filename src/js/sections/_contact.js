const contactForm = document.getElementById('contact-form');
const allLabels = document.querySelectorAll('#contact-form label');
const allInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
const sendBtn = document.getElementById("send-btn");

allInputs.forEach((element, index) => {
    element.addEventListener('keyup', () => {
        allLabels[index].style.opacity = "1";
    });
});

//Regular expresions
const expresions = {
    name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/,
    message: /^.{3,500}$/,
}

/* object to validate if every input are right */
const inputsValidation = {
    name: false,
    email: false,
    phone: false,
    message: false,
}

/* detect when user write in the inputs
    and validate if user are writing a valid value based on the regular expresions 
*/
allInputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

/* Detect wich input are being written and execute a function with specific values */
function validateForm(e) {
    switch (e.target.name) {
        case "name":
            validateInput(expresions.name, e.target, 'name');
            break;
        case "email":
            validateInput(expresions.email, e.target, 'email');
            break;
        case "phone":
            validateInput(expresions.phone, e.target, 'phone');
            break;
        case "message":
            validateInput(expresions.message, e.target, 'message');
            break;
    }
}

/* Take the values and execute other function to validate the data */
function validateInput(expresion, input, id) {

    let formInput = document.querySelector(`#form-${id} input`);
    if (formInput == null) formInput = document.querySelector(`#form-${id} textarea`);

    /* validate if the input has a valid value based on the regex */
    if (expresion.test(input.value)) {
        formInputTrue(formInput, id);
    }
    else {
        formInputFalse(formInput, id);
    }

    if (verifyTheInputs()) {
        sendBtn.disabled = false;
        sendBtn.style.opacity = '1';
        sendBtn.style.cursor = 'pointer';
    }
    else {
        sendBtn.disabled = true;
        sendBtn.style.opacity = '0.2';
        sendBtn.style.cursor = 'not-allowed';
    }

}

/* give the classes for the valid input */
function formInputTrue(formInput, id) {
    formInput.style.border = '2px solid #22bb33';

    const alertMessage = document.querySelector(`#form-${id} .alert-message`);
    alertMessage.style.opacity = "0";
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 500);

    inputsValidation[id] = true;
}
/* give the classes for the wrong input */
function formInputFalse(formInput, id) {
    formInput.style.border = '2px solid #bb2124';

    const alertMessage = document.querySelector(`#form-${id} .alert-message`);
    alertMessage.style.display = 'block';
    setTimeout(() => {
        alertMessage.style.opacity = "1";
    }, 1);

    inputsValidation[id] = false;
}

/* Function to verify if all the inputs are right a return a value true or false  */
function verifyTheInputs() {
    let inputsStatus;

    for (let input in inputsValidation) {
        if (inputsValidation[input]) {
            inputsStatus = true;
        }
        else {
            inputsStatus = false;
            break;
        }
    }
    return inputsStatus;
}

/* EventListener to send the inputs data */
contactForm.addEventListener('submit', (e) => {
    resetModal();
    e.preventDefault();
    if (verifyTheInputs()) {
        sendValues();
    }
    else {
        missingInputs();
        scroll({
            top: document.getElementById("contact").offsetTop,
            behavior: "smooth"
        });
    }

});

/* If the inputs are wrong or empty this function indicates wich camps are wrong or empty */
function missingInputs() {

    for (let id in inputsValidation) {
        if (!inputsValidation[id]) {
            let formInput = document.querySelector(`#form-${id} input`);
            if (formInput == null) formInput = document.querySelector(`#form-${id} textarea`);
            formInputFalse(formInput, id);
        }
    }

}

/* clear all the inputs and inputs styles when the message is sended, 
 generate new captcha and turn false all the inputs validation
*/
function clearInputs() {

    for (let id in inputsValidation) {
        const labelForm = document.querySelector(`#form-${id} label`);
        const formInput = document.querySelector(`#form-${id} input, #form-${id} textarea`);

        formInput.style.border = 'none';
        formInput.value = "";
        formInput.placeholder = labelForm.textContent;
        labelForm.style.opacity = "0";

        inputsValidation[id] = false;
    }

}

/* Fetch function to send inputs value to the banckend and the backend sent a email */
function sendValues() {
    const sendModal = document.getElementById('sendModal');
    const sendModalPopup = new bootstrap.Modal(sendModal, {});

    let url = "http://localhost:5000/";
    let formData = {};

    sendModalPopup.show();

    for (let id in inputsValidation) {
        const theInput = document.querySelector(`#form-${id} input, #form-${id} textarea`);
        formData[id] = theInput.value;
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            modalMessage(checkIcon, checkClass, successTitle, successText);
            clearInputs();
        }
    })
    .catch(error => modalMessage(timesIcon, timesClass, errorTitle, errorText));

}

const modalHeader = document.querySelector('#sendModal .modal-content .modal-header');
const modalBody = document.querySelector('#sendModal .modal-content .modal-body');

const checkIcon = 'check-icon';
const checkClass = 'check-circle';
const successTitle = 'Message sent successfully!';
const successText = 'Thanks for your message. I will contact you as soon as possible';

const timesIcon = 'times-icon';
const timesClass = 'times-circle';
const errorTitle = 'Oops! Something went wrong.';
const errorText = 'Please try again later or contact me with another contact option.'


function modalMessage(iconID, iconClass, titleText, bodyText) {
    const newP = document.createElement('p');
    const newI = document.createElement('i');

    modalHeader.innerHTML = `
    <h3 class="modal-title" id="sendModalLabel">
        ${titleText}
    </h3>
    `;

    newI.innerHTML = '<i class="far fa-times-circle close-btn" data-bs-dismiss="modal" aria-label="Close"></i>'
    modalHeader.prepend(newI);

    newP.innerHTML = bodyText;
    modalHeader.append(newP);

    modalBody.innerHTML = `                    
    <div id="${iconID}">
        <i class="far fa-${iconClass}"></i>
    </div>
    `
    const theIcon = document.getElementById(iconID);

    theIcon.style.display = 'block';
    setTimeout(() => {
        theIcon.style.opacity = '0.8';
        theIcon.style.transform = 'scale(1)';
    }, 500);

}

function resetModal() {
    modalHeader.innerHTML = `
    <h3 class="modal-title" id="sendModalLabel">
        Sending
        <div class="dots"></div>
        <div class="dots"></div>
        <div class="dots"></div>
    </h3>
    `
    modalBody.innerHTML = `
    <div id="spin-loader" class="loader"></div>
    `
}