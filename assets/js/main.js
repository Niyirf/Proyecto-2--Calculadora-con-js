const historico = [];

function myFunction(id) {
    document.calc.result.value += id;
}

function clearScreen() {
    document.calc.result.value = "";
}

function calculate() {
    try {
        var input = eval(document.calc.result.value);
        historico.push(input)
        console.log(historico)
        document.calc.historico.value = historico;
        document.calc.result.value = input;
    } catch (err) {
        document.calc.result.value = "Error";
    }
}


//botón activa cambio de color
const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};

//juego del triki

var startBtn = document.querySelector('.start-btn');
var cells = Array.from(document.querySelectorAll('.cell'));
var modalBox = document.querySelector('.popup');
var winnerMessage = document.querySelector('.winner-message');

startBtn.addEventListener('click', () => {
  modalBox.style.display = "none";
  startNewGame();
});

function startNewGame() {
  cells.map(cell => {
    cell.classList.remove('x-marker');
    cell.classList.remove('o-marker');
    cell.textContent = "";
    return cell;
  });
}
cells.map(cell => {
  cell.addEventListener('click', putMark);
});

var xStep = true;
var clicksCount = 0

function putMark() {
  if (this.textContent === "") {
    ++clicksCount;
    if (xStep) {
      this.classList.add('x-marker');
      this.textContent = "X";
      xStep = false;
    } else {
      this.classList.add('o-marker');
      this.textContent = "O";
      xStep = true;
    }
  }
  // if it's draw
  var winner = getWinner();
  console.log(winner);
  if (winner) {
    window.setTimeout(endGame(winner), 150);
    clicksCount = 0;
  } else if (clicksCount === 9) {
    clicksCount = 0;
    window.setTimeout(endGame(), 150);
  }

}


function endGame(flag) {
  if (flag === "x") {
    modalBox.style.display = "block";
    winnerMessage.innerHTML = '<span class="x-marker">X </span>Ganaste!'
  } else if (flag === "o") {
    modalBox.style.display = "block";
    winnerMessage.innerHTML = '<span class="o-marker">O </span>Ganaste!'
  } else {
    modalBox.style.display = "block";
    winnerMessage.innerHTML = 'Draw!'
  }
}


function getWinner() {
  var cellsD = document.querySelectorAll('.cell');
  var cells = [
    [],
    [],
    []
  ];
  var i;
  for (i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var el = cellsD[i * 3 + j];
      if (el.classList.contains('x-marker')) {
        cells[i][j] = 'x';
        console.log("cell " + i + " " + j + "x");
      }
      if (el.classList.contains('o-marker')) {
        cells[i][j] = 'o';
        console.log("cell " + i + " " + j + "y");
      }

    }
  }
  if (
    ((cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])) ||
    ((cells[2][0] === cells[1][1]) && (cells[1][1] === cells[0][2]))
  ) {
    return cells[1][1];
  }

  for (i = 0; i <= 2; i++) {
    if ((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i] && cells[0][i] && cells[1][i] && cells[2][i])) {
      return cells[0][i];
    }
    if ((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2] && cells[i][0] && cells[i][1] && cells[i][2])) {
      return cells[i][0];
    }
  }
}