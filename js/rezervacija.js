
const reservationForm = document.querySelector("form");

const nameInput = document.getElementById("ime");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("telefon");
const dateInput = document.getElementById("datum");
const timeInput = document.getElementById("ura");
const peopleInput = document.getElementById("osebe");
const consentInput = document.getElementById("soglasje");

const summaryContainer = document.getElementById("reservation-summary");

function validateName(value) {
    const nameRegex = /^[A-Za-zČŠŽčšž]{2,}(?:\s+[A-Za-zČŠŽčšž]{2,})+$/;
    return nameRegex.test(value.trim());
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
}

function validatePhone(value) {
    const phoneRegex = /^040 ?\d{3} ?\d{3}$/;
    return phoneRegex.test(value.trim());
}

function validateDate(value) {
    if (value === "") {
        return false;
    }

    const selectedDate = new Date(value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return false;
    }
    if (selectedDate.getDay() === 1) {
        return false;
    }
    return true;
}

function validateTime(value) {
    if (value === "") {
        return false;
    }
    return value >= "11:00" && value <= "22:00";
}

function validatePeople(value) {
    const numberOfPeople = Number(value);
    return Number.isInteger(numberOfPeople) && numberOfPeople >= 1 && numberOfPeople <= 12;
}

function showError(input, message) {
    input.classList.add("input-error");
    let errorMessage = input.parentElement.querySelector(".error-message");
    if (!errorMessage) {
        errorMessage = document.createElement("small");
        errorMessage.className = "error-message";
        input.insertAdjacentElement("afterend", errorMessage);
    }
    errorMessage.textContent = message;
}

function clearError(input) {
    input.classList.remove("input-error");
    const errorMessage = input.parentElement.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.remove();
    }
}

function validateField(input) {
    let isValid = true;
    let message = "";

    switch (input.id) {
        case "ime":
            isValid = validateName(input.value);
            message = "Vnesite vsaj dve besedi, vsako z najmanj dvema črkama.";
            break;

        case "email":
            isValid = validateEmail(input.value);
            message = "Vnesite veljaven elektronski naslov.";
            break;

        case "telefon":
            isValid = validatePhone(input.value);
            message = "Vnesite telefonsko številko v obliki 040 123 456 ali 040123456.";
            break;

        case "datum":
            isValid = validateDate(input.value);
            message = "Izberite današnji ali prihodnji datum. Ob ponedeljkih smo zaprti.";
            break;

        case "ura":
            isValid = validateTime(input.value);
            message = "Izberite uro med 11:00 in 22:00.";
            break;

        case "osebe":
            isValid = validatePeople(input.value);
            message = "Število oseb mora biti celo število med 1 in 12.";
            break;

        case "soglasje":
            isValid = input.checked;
            message = "Za nadaljevanje morate potrditi soglasje.";
            break;
    }
    if (isValid) {
        clearError(input);
    } else {
        showError(input, message);
    }
    return isValid;
}

function validateForm() {
    const fields = [
        nameInput,
        emailInput,
        phoneInput,
        dateInput,
        timeInput,
        peopleInput,
        consentInput
    ];
    let formIsValid = true;
    fields.forEach(field => {
        if (!validateField(field)) {
            formIsValid = false;
        }
    });
    return formIsValid;
}

const fieldsToValidate = [
    nameInput,
    emailInput,
    phoneInput,
    dateInput,
    timeInput,
    peopleInput,
    consentInput
];

fieldsToValidate.forEach(field => {
    field.addEventListener("input", () => {
        validateField(field);
        summaryContainer.replaceChildren();
    });
});

reservationForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!validateForm()) {
        summaryContainer.replaceChildren();
        return;
    }

    summaryContainer.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = "Povzetek rezervacije";

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Ime in priimek: " + nameInput.value;

    const dateParagraph = document.createElement("p");
    dateParagraph.textContent = "Datum: " + dateInput.value;

    const timeParagraph = document.createElement("p");
    timeParagraph.textContent = "Ura: " + timeInput.value;

    const peopleParagraph = document.createElement("p");
    peopleParagraph.textContent = "Število oseb: " + peopleInput.value;

    summaryContainer.append(
        heading,
        nameParagraph,
        dateParagraph,
        timeParagraph,
        peopleParagraph
    );
});

reservationForm.addEventListener("reset", () => {
    fieldsToValidate.forEach(field => clearError(field));
    summaryContainer.replaceChildren();
});
