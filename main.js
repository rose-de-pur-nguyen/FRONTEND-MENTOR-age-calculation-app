const dayInput = document.querySelector('.dayInput');
const monthInput = document.querySelector('.monthInput');
const yearInput = document.querySelector('.yearInput');
const button = document.querySelector('.arrow-down');
const yearDisplay = document.querySelector('#yearResult');
const monthDisplay = document.querySelector('#monthResult');
const dayDisplay = document.querySelector('#dayResult');
const dayTitle = document.querySelector('#day');
const monthTitle = document.querySelector('#month');
const yearTitle = document.querySelector('#year');

let outputYear;
let outputMonth;
let outputDay;

const today = new Date()

const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDate = today.getDate();

function reset() {
    dayDisplay.textContent = "- -";
    monthDisplay.textContent = "- -";
    yearDisplay.textContent = "- -";
}

let previousMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const inputs = [dayInput, monthInput, yearInput];
const titles = [dayTitle, monthTitle, yearTitle];

function validateDate(day, month, year) {
  // Check for valid year (future year)
  if (year > 2024) { // Update the year if needed
    yearTitle.style.color = "hsl(0, 100%, 67%)";
    yearInput.style.border = "1px solid hsl(0, 100%, 67%)";
    yearInput.nextElementSibling.style.display = "block";
    yearInput.nextElementSibling.textContent = "Must be a valid year";
    reset();
    return "Invalid year. Please enter a year not in the future.";
  } else {
    yearTitle.style.color = "hsl(0, 1%, 44%)";
    yearInput.style.border = "1px solid hsl(0, 1%, 44%)";
    yearInput.nextElementSibling.style.display = "none";
  }

  // Check for valid month
  if (month === "2") {
    previousMonth[1] = (year % 4 === 0 ) ? 29 : 28;
  }

  if (month < 1 || month > 12) {
    monthTitle.style.color = "hsl(0, 100%, 67%)";
    monthInput.style.border = "1px solid hsl(0, 100%, 67%)";
    monthInput.nextElementSibling.style.display = "block";
    monthInput.nextElementSibling.textContent = "Must be a valid month";
    reset();
    return "Invalid month. Please enter a month between 1 and 12.";
  } else {
    monthTitle.style.color = "hsl(0, 1%, 44%)";
    monthInput.style.border = "1px solid hsl(0, 1%, 44%)";
    monthInput.nextElementSibling.style.display = "none";
  }

  // Account for leap years in February
  if (day < 1 || day > 31 || day > previousMonth[month - 1]) {
    dayTitle.style.color = "hsl(0, 100%, 67%)";
    dayInput.style.border = "1px solid hsl(0, 100%, 67%)";
    dayInput.nextElementSibling.style.display = "block";
    dayInput.nextElementSibling.textContent = "Must be a valid day";
    reset();
    return `Invalid day for month ${month}. Please enter a day between 1 and ${previousMonth[month - 1]}.`;
  } else {
    dayTitle.style.color = "hsl(0, 1%, 44%)";
    dayInput.style.border = "1px solid hsl(0, 1%, 44%)";
    dayInput.nextElementSibling.style.display = "none";
  }

  // If all conditions pass, return "Valid date"
  return "Valid date";
}

dayInput.addEventListener('input', function(event) {
    const result = validateDate(dayInput.value, monthInput.value, yearInput.value);
    console.log(result);
});

monthInput.addEventListener('input', function() {
    const result = validateDate(dayInput.value, monthInput.value, yearInput.value);
    console.log(result);
});

yearInput.addEventListener('input', function() {
    const result = validateDate(dayInput.value, monthInput.value, yearInput.value);
    console.log(result);
});


let hasEmptyInput = false;

button.addEventListener('click', () => {
    // empty error
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            titles[i].style.color = "hsl(0, 100%, 67%)"
            inputs[i].style.border = "1px solid hsl(0, 100%, 67%)"
            inputs[i].nextElementSibling.style.display = "block"
            inputs[i].nextElementSibling.textContent = "This field is required";
            hasEmptyInput = true;
        } else {
            titles[i].classList.remove('active');
            inputs[i].classList.remove('active');
            inputs[i].nextElementSibling.classList.remove('show');
            inputs[i].nextElementSibling.textContent = "";
            hasEmptyInput = false;
        }
    }

    if (hasEmptyInput) {
        reset();
    }

    // calculating year 
    if (currentMonth == monthInput.value) {
        if (currentDate >= dayInput.value) {
            outputYear = currentYear - yearInput.value;
            displayResult();
        } else {
            outputYear = currentYear - yearInput.value - 1;
            displayResult();
        };
    } else if (currentMonth > monthInput.value) {
        outputYear = currentYear - yearInput.value;
        displayResult();
    } else {
        outputYear = currentYear - yearInput.value - 1;
        displayResult();
    }

    // calculating month
    if (outputYear == currentYear - yearInput.value) {
        if (currentDate >= dayInput.value) {
            outputMonth = currentMonth - monthInput.value;
            displayResult();
        } else if (currentDate < dayInput.value) {
            outputMonth = currentMonth - monthInput.value - 1;
            displayResult();
        }
    } else if (outputYear == currentYear - yearInput.value - 1) {
        if (currentDate > dayInput.value) {
            outputMonth = 12 - monthInput.value + currentMonth;
            displayResult();
        } else {
            outputMonth = 12 - monthInput.value + currentMonth - 1;
            displayResult();
        }
    }

    // calculating day
    if (currentDate >= dayInput.value) {
        outputDay = currentDate - dayInput.value;
        displayResult();
    } else {
        let previousMonthDays = previousMonth[currentMonth - 2];
        if (currentMonth === 1 && isLeapYear(currentYear)) {
            previousMonthDays = 29;
        };
        outputDay = currentDate + (previousMonthDays - dayInput.value);
        displayResult();
    }
  
})

function isLeapYear() {
    if (currentYear % 4 === 0) {
        return true;
    }
}

function displayResult() {
    yearDisplay.textContent = outputYear;
    monthDisplay.textContent = outputMonth;
    dayDisplay.textContent = outputDay;
}