function addToDisplay(value) {
  document.getElementById('display').innerHTML += value;
}

function clearOne() {
  let display = document.getElementById('display');
  if (document.getElementById('display').innerHTML == 'Error') {
    clearDisplay();
  } else {
    display.innerHTML = display.innerHTML.slice(0, -1);
  }
  
}

function clearDisplay() {
  document.getElementById('display').innerHTML = '';
}

function calculate() {
  try {
    document.getElementById('display').innerHTML = eval(document.getElementById('display').innerHTML);
    console.log(eval(document.getElementById('display').innerHTML));
  } catch (error) {
    document.getElementById('display').innerHTML = 'Error';
    console.log('Error');
  }
}