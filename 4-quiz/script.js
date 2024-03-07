function nextPage(page) {
    document.getElementById(`page${page}`).classList.remove('active');
    document.getElementById(`page${page + 1}`).classList.add('active');
}

function prevPage(page) {
    document.getElementById(`page${page}`).classList.remove('active');
    document.getElementById(`page${page - 1}`).classList.add('active');
}


function clearInputs() {
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    textInputs.forEach(input => {
        input.value = '';
    });
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function displayObject(obj, outputElementId) {
    var outputDiv = document.getElementById(outputElementId);
    if (!outputDiv) {
        console.error("Output element with id " + outputElementId + " not found.");
        return;
    }

    var ul = document.createElement('ul');
    for (var key in obj) {
        var li = document.createElement('li');
        li.innerHTML = '<strong>' + key + '</strong>: ' + obj[key];
        ul.appendChild(li);
    }
    outputDiv.appendChild(ul);
}

function submitQuiz() {

    const answers = {
        'name': '',
        'email': '',
        'course': '',
        'college': '',
        'university': '',
        'year-pass': '',
        'answer1': '',
        'answer2': '',
        'answer3': '',
        'answer4': '',
        'answer5': '',
        'SA-answer-1': '',
        'SA-answer-2': '',
        'SA-answer-3': '',
        'SA-answer-4': '',
        'SA-answer-5': '',
        'LA-answer-1': '',
        'LA-answer-2': '',
        'LA-answer-3': '',
        'LA-answer-4': '',
        'LA-answer-5': '',
        'MCOQ-answer-1': '',
        'MCOQ-answer-2': '',
        'MCOQ-answer-3': '',
        'MCOQ-answer-4': '',
        'MCOQ-answer-5': '',
    };

    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        answers[input.name] = input.value;
    });

    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        answers[input.name] = input.value;
    });

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        answers[textarea.name] = textarea.value;
    });

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        if (!answers[radio.name]) {
            answers[radio.name] = '';
        }
        if (radio.checked) {
            answers[radio.name] = radio.value;
        }
    });

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (!answers[checkbox.name]) {
            answers[checkbox.name] = [];
        }
        if (checkbox.checked) {
            answers[checkbox.name].push(checkbox.value);
        }
    });

    console.log(answers);

    clearInputs();

    document.getElementById(`page5`).classList.remove('active');
    document.getElementById(`result`).classList.add('active');

    var paragraph = document.createElement('p');
    paragraph.textContent = `YOUR ANSWERS ARE:`;
    var parentElement = document.getElementById('result-child');
    parentElement.appendChild(paragraph);
    displayObject(answers, 'result-child')
}

window.onload = function() {
    document.getElementById('page1').classList.add('active');
};