const answers = {
    'name': '',
    'email': '',
    'course': '',
    'college': '',
    'university': '',
    'year-pass': '',

    's1-answer1': '',
    's1-answer2': '',
    's1-answer3': '',
    's1-answer4': '',
    's1-answer5': '',

    's2-answer1': '',
    's2-answer2': '',
    's2-answer3': '',
    's2-answer4': '',
    's2-answer5': '',

    's3-answer1': '',
    's3-answer2': '',
    's3-answer3': '',
    's3-answer4': '',
    's3-answer5': '',

    's4-answer1': '',
    's4-answer2': '',
    's4-answer3': '',
    's4-answer4': '',
    's4-answer5': '',
};

const answerKey = {
    's1-answer1' : 'Cascading Style Sheets',
    's1-answer2' : 'Python',
    's1-answer3' : 'Asynchronous JavaScript and XML',
    's1-answer4' : 'img',
    's1-answer5' : 'To control the layout on mobile browsers',
    's2-answer1' : 'Structured Query Language',
    's2-answer2' : 'HTML',
    's2-answer3' : 'Atomicity, Consistency, Isolation, Durability',
    's2-answer4' : 'To speed up data retrieval',
    's2-answer5' : 'ARRAY',
    's3-answer1' : 'Transmission Control Protocol/Internet Protocol',
    's3-answer2' : 'Network Layer',
    's3-answer3' : 'Dynamic Host Configuration Protocol',
    's3-answer4' : 'To translate between public and private IP addresses',
    's3-answer5' : 'SMTP',
    's4-answer1' : 'Merge Sort',
    's4-answer2' : 'Stack',
    's4-answer3' : 'Bubble Sort',
    's4-answer4' : 'O(log n)',
    's4-answer5' : 'Hash Table'
}

var score = 0;

function validateEmail(email) {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateInputs() {
    const activePage = document.querySelector('.page.active');
    const radioGroups = activePage.querySelectorAll('input[type="radio"]:required');
    for (const radioGroup of radioGroups) {
        const name = radioGroup.getAttribute('name');
        const checked = activePage.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
            return false;
        }
    }
    return true;
}


function nextPage(page) {
    if (page === 1) {
        const emailInput = document.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    }

    // Check if all required inputs are filled
    if (validateInputs()) {
        document.getElementById(`page${page}`).classList.remove('active');
        document.getElementById(`page${page + 1}`).classList.add('active');
        document.documentElement.scrollTop = 0;
    } else {
        alert("Please answer all questions before proceeding.");
    }
}

function start(page) {
    if (page === 1) {
        const emailInput = document.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    }

    // Check if all required inputs are filled
    if (validateInputs()) {
        document.getElementById(`page${page}`).classList.remove('active');
        document.getElementById(`page${page + 1}`).classList.add('active');
        document.documentElement.scrollTop = 0;
        document.getElementById("timer").removeAttribute("hidden");
        startTimer();
    } else {
        alert("Please answer all questions before proceeding.");
    }
}

function prevPage(page) {
    document.getElementById(`page${page}`).classList.remove('active');
    document.getElementById(`page${page - 1}`).classList.add('active');
    document.documentElement.scrollTop = 0;
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

function displayObject(obj, outputElementId, answerKey) {
    var outputDiv = document.getElementById(outputElementId);
    if (!outputDiv) {
        console.error("Output element with id " + outputElementId + " not found.");
        return;
    }

    var ul = document.createElement('ul');
    const notIn = ['name', 'email', 'course', 'college', 'university', 'year-pass'] 
    for (var key in obj) {

        if (notIn.includes(key)) {
            var li = document.createElement('li');
            var answer = obj[key];
            li.innerHTML = '<strong>' + key + '</strong>: ';
            li.innerHTML += '<span style="color: green;">' + answer + '</span>';
            ul.appendChild(li);
        } else {
            var li = document.createElement('li');
            var answer = obj[key];
            var correctAnswer = answerKey[key];
            li.innerHTML = '<strong>' + key + '</strong>: ';
            if (answer === correctAnswer) {
                li.innerHTML += '<span style="color: green;">' + answer + '</span>';
            } else {
                li.innerHTML += '<span style="color: red;">' + answer + '</span>';
                li.innerHTML += ' (Correct Answer: <span style="color: blue;">' + correctAnswer + '</span>)';
            }
            ul.appendChild(li);
        }
    }
    outputDiv.appendChild(ul);
}

function checkAnswers(userAnswers, answerKey) {
    const result = {};
    for (const question in userAnswers) {
        if (userAnswers.hasOwnProperty(question) && answerKey.hasOwnProperty(question)) {
            result[question] = userAnswers[question] === answerKey[question];
        }

    }

    for (const i in result) {
        if (result[i] == true) {
            score = score +1;
        }
    }
    return result;
}

function submitQuiz() {

    if (validateInputs()) {
        const textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach(input => {
            answers[input.name] = input.value;
        });
    
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            answers[input.name] = input.value;
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
    
        console.log(answers);

        const results = checkAnswers(answers, answerKey);
        console.log(results);
        console.log(score);
    
        clearInputs();
        
        document.getElementById(`page0`).classList.remove('active');
        document.getElementById(`page1`).classList.remove('active');
        document.getElementById(`page2`).classList.remove('active');
        document.getElementById(`page3`).classList.remove('active');
        document.getElementById(`page4`).classList.remove('active');
        document.getElementById(`page5`).classList.remove('active');
        document.getElementById("timer").hidden = true;
        document.getElementById(`result`).classList.add('active');
    
        var paragraph = document.createElement('p');
        var parentElement = document.getElementById('result-child');
        var printScore = document.createElement('h3');
        printScore.textContent = `SCORE: ${score}`;
        parentElement.appendChild(printScore);
        printScore.classList.add('scoreClass');
        paragraph.textContent = `YOUR ANSWERS ARE:`;
        parentElement.appendChild(paragraph);
        displayObject(answers, 'result-child', answerKey);
        document.documentElement.scrollTop = 0;
    } else {
        alert("Please answer all questions before proceeding.");
    }

}

function removeRequired() {
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.removeAttribute('required');
    });
}

var totalSeconds = 300;
var timerInterval;

function startTimer() {
    var minutes, seconds;
    timerInterval = setInterval(function() {
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("timer").textContent = minutes + ":" + seconds;
        totalSeconds--;
        if (totalSeconds < 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            removeRequired();
            submitQuiz();
        }
    }, 1000);
}

window.onload = function() {
    document.getElementById('page0').classList.add('active');
};

