// 예시로 resetClasses 함수 정의 추가
function resetClasses(elements) {
  elements.forEach((element) => {
    element.classList.remove(
      "moveToDown",
      "moveToUp",
      "hide",
      "show",
      "moveToDown2",
      "moveToDown3",
      "moveToDown4"
    );
  });
}

const roomManBox = document.querySelector(".roomManBox");
const laboratoryManBox = document.querySelector(".laboratoryManBox");
const cylinderTopCapBox = document.querySelector(".cylinderTopCapBox");
const workManUp = document.querySelector(".workManUpBox");
const workManDown = document.querySelector(".workManDownBox");
const restMan = document.querySelector(".restManBox");

$(document).ready(function () {
  $("#fullpage").fullpage({
    autoScrolling: true,
    verticalCentered: false,
    keyboardScrolling: false, // 키보드 스크롤 비활성화

    onLeave: function (origin, destination, direction) {
      if (
        (origin.index === 0 && destination.index === 1) ||
        (origin.index === 1 && destination.index === 0)
      ) {
        resetClasses([laboratoryManBox, roomManBox, cylinderTopCapBox]);

        if (direction === "down") {
          setTimeout(() => {
            laboratoryManBox.classList.add("moveToDown");
            roomManBox.classList.add("hide");
          }, 500);

          setTimeout(() => {
            cylinderTopCapBox.classList.add("show");
          }, 700);
        } else if (direction === "up") {
          roomManBox.classList.add("show");
          laboratoryManBox.classList.add("moveToUp");
        }
      }

      if (origin.index === 1 && destination.index === 2) {
        resetClasses([workManUp, workManDown]);

        // 0.5초 지연 후 클래스 추가
        setTimeout(() => {
          laboratoryManBox.classList.add("hide");
          workManUp.classList.add("moveToDown2");
          workManDown.classList.add("moveToDown3");
        }, 500);
      }

      if (origin.index === 2 && destination.index === 1) {
        resetClasses([workManUp, workManDown]);

        // 즉시 클래스 추가
        workManUp.classList.add("moveToUp");
        workManDown.classList.add("moveToUp");
        laboratoryManBox.classList.add("show");
      }

      // Section 3에서 Section 4로 넘어갈 때
      if (origin.index === 2 && destination.index === 3) {
        resetClasses([restMan]);

        // 0.5초 지연 후 클래스 추가
        setTimeout(() => {
          workManUp.classList.add("hide");
          workManDown.classList.add("hide");
          restMan.classList.add("moveToDown4");
        }, 500);
      }

      // Section 4에서 Section 3으로 돌아올 때
      if (origin.index === 3 && destination.index === 2) {
        resetClasses([restMan]);

        // 즉시 클래스 추가
        workManUp.classList.add("show");
        workManDown.classList.add("show");
        restMan.classList.add("moveToUp");
      }
    },
    afterRender: function () {
      $(document).on("keydown", function (e) {
        if (e.code === "Space") {
          e.preventDefault(); // 스페이스바 기본 동작 방지
        }
      });
    },
  });
});

function resetClasses(elements) {
  elements.forEach((element) => {
    element.classList.remove(
      "moveToDown",
      "moveToUp",
      "hide",
      "show",
      "moveToDown2",
      "moveToDown3",
      "moveToDown4"
    );
  });
}

// MyRoom 스케줄러 관련
// board 클릭 이벤트
document.addEventListener("DOMContentLoaded", function () {
  const boardBox = document.querySelector(".boardBox");
  const xMark = document.querySelector(".scheduleXMark");
  const mySchedule = document.querySelector(".wholeWrap");
  const TodoListContainerCancleBtn = document.querySelector(
    ".TodoListContainerCancleBtn"
  );
  const TodoListContainer = document.querySelector(".TodoListContainer");

  boardBox.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    mySchedule.style.display = "block";

    fullpage_api.setAllowScrolling(false); // fullPage.js 스크롤 비활성화
  });

  xMark.addEventListener("click", function () {
    mySchedule.style.display = "none";

    fullpage_api.setAllowScrolling(true); // fullPage.js 스크롤 활성화
  });

  TodoListContainerCancleBtn.addEventListener("click", () => {
    TodoListContainer.style.display = "none";
  });
});

// 스케줄러 작동 함수
document.addEventListener("DOMContentLoaded", function () {
  const calendarWrap = document.querySelector(".calendarWrap");
  const todoListContainer = document.querySelector(".TodoListContainer");
  const currentMonthElement = document.getElementById("current-month");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const todoList = document.getElementById("todo-list");
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const selectedDateElement = document.getElementById("selected-date");

  const today = new Date();
  let currentYear = today.getFullYear(); // 현재 연도
  let currentMonth = today.getMonth(); // 현재 월
  let selectedDate = null; // 선택된 날짜
  let datesWithTodos = new Map(); // 투두가 있는 날짜와 개수를 저장할 Map

  function updateMonthLabel(year, month) {
    const monthNames = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
  }

  function generateCalendar(year, month) {
    calendarWrap.querySelector(".calendar")?.remove(); // 이전 달력 제거

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const table = document.createElement("table");
    table.classList.add("calendar");

    const headerRow = document.createElement("tr");
    daysOfWeek.forEach((day) => {
      const th = document.createElement("th");
      th.textContent = day;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDayOfMonth) {
          cell.classList.add("empty"); // 빈 셀
        } else if (currentDay > lastDayOfMonth) {
          cell.classList.add("empty"); // 빈 셀
        } else {
          const dateString = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(currentDay).padStart(2, "0")}`;
          cell.dataset.date = dateString;

          // 날짜가 있는 셀에는 날짜 숫자 표시
          const daySpan = document.createElement("span");
          daySpan.textContent = currentDay;
          cell.appendChild(daySpan);

          // 날짜가 있는 셀에는 동그라미를 항상 표시
          const todoCount = datesWithTodos.get(dateString) || 0;
          if (todoCount > 0) {
            cell.classList.add("has-todo");
            cell.dataset.todoCount = todoCount;
          } else {
            cell.dataset.todoCount = 0;
          }

          cell.addEventListener("click", function () {
            // 모든 날짜 셀의 동그라미 숫자를 0으로 초기화
            Array.from(calendarWrap.querySelectorAll(".calendar td")).forEach(
              (td) => {
                td.classList.remove("selected");
                td.classList.remove("has-todo");
                td.dataset.todoCount = 0;
              }
            );

            // 클릭된 날짜 셀에 'selected' 클래스 추가
            cell.classList.add("selected");
            selectedDate = cell.dataset.date;
            selectedDateElement.textContent = selectedDate;

            // 선택된 날짜의 투두리스트 보이기
            todoListContainer.style.display = "block";

            // 선택된 날짜의 투두리스트 초기화
            todoList.innerHTML = "";

            // 선택된 날짜의 동그라미 숫자 업데이트
            cell.dataset.todoCount = datesWithTodos.get(selectedDate) || 0;
          });

          currentDay++;
        }

        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    calendarWrap.appendChild(table);

    // 선택된 날짜의 셀 다시 선택하기
    if (selectedDate) {
      const selectedCell = Array.from(
        calendarWrap.querySelectorAll(".calendar td")
      ).find((td) => td.dataset.date === selectedDate);
      if (selectedCell) {
        selectedCell.classList.add("selected");
      }
    }
  }

  function updateDeleteButtonVisibility(listItem) {
    const deleteButton = listItem.querySelector(".delete");
    if (listItem.classList.contains("completed")) {
      deleteButton.style.display = "none"; // 완료 상태일 때 삭제 버튼 숨기기
      if (!listItem.querySelector(".completed-text")) {
        const completedText = document.createElement("span");
        completedText.textContent = "👍";
        completedText.classList.add("completed-text");
        listItem.appendChild(completedText);
      }
    } else {
      deleteButton.style.display = "inline"; // 미완료 상태일 때 삭제 버튼 보이기
      const completedText = listItem.querySelector(".completed-text");
      if (completedText) {
        completedText.remove();
      }
    }
  }

  function setupEventListeners() {
    prevButton.addEventListener("click", function () {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
      updateMonthLabel(currentYear, currentMonth);
      generateCalendar(currentYear, currentMonth);
    });

    nextButton.addEventListener("click", function () {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
      updateMonthLabel(currentYear, currentMonth);
      generateCalendar(currentYear, currentMonth);
    });

    addButton.addEventListener("click", function () {
      const todoText = input.value.trim();

      if (todoText !== "" && selectedDate) {
        const listItem = document.createElement("li");
        listItem.textContent = todoText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("delete");

        // 이벤트 전파를 막는 부분 추가
        deleteButton.addEventListener("click", function (event) {
          event.stopPropagation();

          // 삭제하려는 항목이 완료되지 않았으면 투두 카운트를 줄임
          if (!listItem.classList.contains("completed")) {
            const currentCount = datesWithTodos.get(selectedDate) || 0;
            if (currentCount > 1) {
              datesWithTodos.set(selectedDate, currentCount - 1);
            } else {
              datesWithTodos.delete(selectedDate);
            }
          }

          // 투두 항목 삭제
          todoList.removeChild(listItem);

          // 달력 업데이트
          generateCalendar(currentYear, currentMonth);

          // 선택된 날짜 셀의 상태 유지
          const selectedCell = Array.from(
            calendarWrap.querySelectorAll(".calendar td")
          ).find((td) => td.dataset.date === selectedDate);
          if (selectedCell) {
            selectedCell.classList.add("selected");
          }
        });

        listItem.appendChild(deleteButton);

        listItem.addEventListener("click", function () {
          listItem.classList.toggle("completed");
          updateDeleteButtonVisibility(listItem); // 완료 상태에 따라 삭제 버튼 업데이트

          // 완료 상태 변경 시, 이미 완료된 항목을 다시 클릭하여 미완료로 변경할 때만 카운트 증가
          const isCompleted = listItem.classList.contains("completed");
          const currentCount = datesWithTodos.get(selectedDate) || 0;

          if (isCompleted) {
            datesWithTodos.set(selectedDate, Math.max(currentCount - 1, 0));
          } else {
            datesWithTodos.set(selectedDate, currentCount + 1);
          }

          // 동그라미에 숫자 표시 업데이트
          const selectedCell = Array.from(
            calendarWrap.querySelectorAll(".calendar td")
          ).find((td) => td.dataset.date === selectedDate);
          if (selectedCell) {
            selectedCell.classList.add("has-todo");
            selectedCell.dataset.todoCount =
              datesWithTodos.get(selectedDate) || 0;
          }
        });

        todoList.appendChild(listItem);

        // 선택된 날짜의 투두 개수 업데이트
        const currentCount = datesWithTodos.get(selectedDate) || 0;
        datesWithTodos.set(selectedDate, currentCount + 1);

        // 동그라미에 숫자 표시 업데이트
        const selectedCell = Array.from(
          calendarWrap.querySelectorAll(".calendar td")
        ).find((td) => td.dataset.date === selectedDate);
        if (selectedCell) {
          selectedCell.classList.add("has-todo");
          selectedCell.dataset.todoCount = datesWithTodos.get(selectedDate);
        }

        input.value = ""; // 입력창 초기화
      }
    });
  }

  updateMonthLabel(currentYear, currentMonth);
  generateCalendar(currentYear, currentMonth);
  setupEventListeners();
});

// 테트리스 게임 함수
document.addEventListener("DOMContentLoaded", function () {
  const gamePadBox = document.querySelector(".gamePadBox");
  const xMark = document.querySelector(".tetrisXmark");
  const gameWrap = document.querySelector(".gameWrap");
  const tetrisGame = document.querySelector(".tetrisGame");
  const tetrisMessage = document.querySelector(".gameMessageWrap");

  gamePadBox.addEventListener("click", function (event) {
    event.preventDefault();

    // 화면 맨 위로 스크롤 이동
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (window.innerWidth <= 1023) {
      // 화면 너비가 686px 이하일 때
      gameWrap.style.display = "none";
      tetrisMessage.style.display = "block";
    } else {
      // 화면 너비가 686px 초과일 때
      gameWrap.style.display = "block";
      tetrisGame.style.display = "block";
    }

    fullpage_api.setAllowScrolling(false); // fullPage.js 스크롤 비활성화
  });

  xMark.addEventListener("click", function () {
    gameWrap.style.display = "none";
    tetrisGame.style.display = "none";
    tetrisMessage.style.display = "none";
    fullpage_api.setAllowScrolling(true); // fullPage.js 스크롤 활성화
  });

  tetrisMessage.addEventListener("click", () => {
    tetrisMessage.style.display = "none";
    fullpage_api.setAllowScrolling(true); // fullPage.js 스크롤 활성화
  });
});

// 테트리스

const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 600;
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30; // 기존 블록 크기
const NEXT_BLOCK_SIZE = 50; // 다음 블록 크기

// 블록 디자인을 위한 이미지 로드
const blockImages = {};
const imageSources = {
  I: "img/02_i-tetromino.png",
  J: "img/02_j-tetromino.png",
  L: "img/02_l-tetromino.png",
  O: "img/02_o-tetromino.png",
  S: "img/02_s-tetromino.png",
  T: "img/02_t-tetromino.png",
  Z: "img/02_z-tetromino.png",
};

const shapes = {
  I: [[1, 1, 1, 1]], // I
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ], // J
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ], // L
  O: [
    [1, 1],
    [1, 1],
  ], // O
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ], // S
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ], // T
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ], // Z
};

let board;
let currentShape;
let currentX;
let currentY;
let nextShape; // 변수 추가
let gameOver;
let score;
let interval;

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const gameOverElement = document.getElementById("game-over");
const scoreBoard = document.getElementById("score-board");
const nextBlockContainer = document.getElementById("next-block"); // 다음 블록 요소

// 이미지 로드 함수
function loadImages(callback) {
  let loadedImages = 0;
  const totalImages = Object.keys(imageSources).length;

  for (let key in imageSources) {
    blockImages[key] = new Image();
    blockImages[key].src = imageSources[key];
    blockImages[key].onload = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        callback();
      }
    };
  }
}

function initializeGame() {
  board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  currentShape = getRandomShape();
  nextShape = getRandomShape(); // 초기화
  currentX = Math.floor(COLS / 2) - 1;
  currentY = 0;
  gameOver = false;
  score = 0;
  updateScore();
  drawNextShape(); // 다음 블록 그리기
  gameOverElement.style.display = "none";
  restartButton.style.display = "none";
  interval = setInterval(update, 500);
  draw();
}

function getRandomShape() {
  const keys = Object.keys(shapes);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return {
    shape: shapes[key],
    image: key,
  };
}

function drawBoard() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x]) {
        const image = blockImages[Object.keys(shapes)[board[y][x] - 1]]; // 인덱스에서 이미지 키 가져오기
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          x * BLOCK_SIZE,
          y * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
}

function drawShape() {
  const shape = currentShape.shape;
  const image = blockImages[currentShape.image];
  context.globalAlpha = 1; // 이미지의 투명도 설정
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          (currentX + x) * BLOCK_SIZE,
          (currentY + y) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    }
  }
}

function drawNextShape() {
  nextBlockContainer.innerHTML = "<h3>Next Block</h3>";

  const nextBlockCanvas = document.createElement("canvas");
  nextBlockCanvas.width = NEXT_BLOCK_SIZE;
  nextBlockCanvas.height = NEXT_BLOCK_SIZE;
  const nextBlockContext = nextBlockCanvas.getContext("2d");

  nextBlockContext.clearRect(
    0,
    0,
    nextBlockCanvas.width,
    nextBlockCanvas.height
  );

  const shape = nextShape.shape;
  const image = blockImages[nextShape.image];
  const shapeSize = Math.min(
    NEXT_BLOCK_SIZE / shape[0].length,
    NEXT_BLOCK_SIZE / shape.length
  );

  const offsetX = (NEXT_BLOCK_SIZE - shapeSize * shape[0].length) / 2;
  const offsetY = (NEXT_BLOCK_SIZE - shapeSize * shape.length) / 2;

  nextBlockContext.globalAlpha = 1; // 이미지의 투명도 설정
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        nextBlockContext.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          x * shapeSize + offsetX,
          y * shapeSize + offsetY,
          shapeSize,
          shapeSize
        );
      }
    }
  }

  nextBlockContainer.appendChild(nextBlockCanvas);
}

function drawGuideLine() {
  let dropY = currentY;
  while (!collide(currentX, dropY + 1, currentShape.shape)) {
    dropY++;
  }

  const shape = currentShape.shape;
  const shapeSize = BLOCK_SIZE;
  const image = blockImages[currentShape.image];

  context.globalAlpha = 0.5; // 이미지의 투명도 설정
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          (currentX + x) * shapeSize,
          (dropY + y) * shapeSize,
          shapeSize,
          shapeSize
        );
      }
    }
  }

  context.globalAlpha = 1; // 투명도 복원
}

function updateScore() {
  scoreBoard.textContent = `Score: ${score}`;
}

function showGameOver() {
  gameOverElement.style.display = "block";
  restartButton.style.display = "inline-block";
}

function draw() {
  drawBoard();
  drawShape();
  drawGuideLine();
  if (gameOver) {
    showGameOver();
  }
}

function collide(x, y, shape) {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] && (board[y + i] && board[y + i][x + j]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function rotateShape() {
  const shape = currentShape.shape;
  const rotatedShape = shape[0]
    .map((_, i) => shape.map((row) => row[i]))
    .reverse();
  if (!collide(currentX, currentY, rotatedShape)) {
    currentShape.shape = rotatedShape;
  }
}

function moveShape(dx, dy) {
  if (!collide(currentX + dx, currentY + dy, currentShape.shape)) {
    currentX += dx;
    currentY += dy;
  } else if (dy) {
    mergeShape();
    clearLines();
    currentShape = nextShape;
    nextShape = getRandomShape();
    drawNextShape();
    currentX = Math.floor(COLS / 2) - 1;
    currentY = 0;
    if (collide(currentX, currentY, currentShape.shape)) {
      gameOver = true;
      clearInterval(interval);
    }
  }
  draw();
}

function dropShape() {
  while (!collide(currentX, currentY + 1, currentShape.shape)) {
    currentY++;
  }
  moveShape(0, 0);
}

function mergeShape() {
  const shape = currentShape.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        board[currentY + y][currentX + x] =
          Object.keys(shapes).indexOf(currentShape.image) + 1;
      }
    }
  }
}

function clearLines() {
  let linesCleared = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every((cell) => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      linesCleared++;
      y++;
    }
  }
  if (linesCleared > 0) {
    score += linesCleared === 4 ? 1000 : linesCleared * 100;
    updateScore();
  }
}

function update() {
  if (!gameOver) {
    moveShape(0, 1);
  }
}

// Load images and initialize game
loadImages(() => {
  startButton.addEventListener("click", () => {
    initializeGame();
    startButton.style.display = "none";
  });

  restartButton.addEventListener("click", () => {
    initializeGame();
  });

  document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    switch (e.key) {
      case "ArrowLeft":
        moveShape(-1, 0);
        break;
      case "ArrowRight":
        moveShape(1, 0);
        break;
      case "ArrowDown":
        moveShape(0, 1);
        break;
      case "ArrowUp":
        rotateShape();
        break;
      case " ":
        dropShape();
        break;
    }
    draw();
  });
});

// 스와이퍼 관련
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 40,
  initialSlide: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const nextButton = document.querySelector(".swiper-button-next");
const prevButton = document.querySelector(".swiper-button-prev");

function updateButtonState() {
  if (swiper.isBeginning) {
    prevButton.classList.add("swiper-button-disabled");
  } else {
    prevButton.classList.remove("swiper-button-disabled");
  }

  if (swiper.isEnd) {
    nextButton.classList.add("swiper-button-disabled");
  } else {
    nextButton.classList.remove("swiper-button-disabled");
  }
}

swiper.on("slideChange", function () {
  updateButtonState();
});

updateButtonState();

nextButton.addEventListener("click", function () {
  swiper.slideNext();
});

prevButton.addEventListener("click", function () {
  swiper.slidePrev();
});

// 포트폴리오 클릭이벤트 관련 함수
const portfolio = document.querySelector(".swiper-container");
const section3TextBox = document.querySelector(".section3TitleBox");
const portfolioCancleBtn = document.querySelector(".portfolioCancleBtn");
const leftMonitor = document.querySelector(".leftMonitorBox");
const centerMonitor = document.querySelector(".centerMonitorBox");
const rightMonitor = document.querySelector(".rightMoniterBox");

// 포트폴리오 열기 함수
function openPortfolio() {
  portfolio.style.opacity = "1";
  portfolio.style.visibility = "visible";
  portfolioCancleBtn.style.opacity = "1";
  portfolioCancleBtn.style.visibility = "visible";

  // 화면 너비가 1023px 이하일 경우 section3TextBox 관련 스타일은 변경하지 않음
  if (window.innerWidth > 1023) {
    section3TextBox.style.transform = "translateY(0%)";
    section3TextBox.style.top = "8%";
  }
}

// 포트폴리오 닫기 함수
function closePortfolio() {
  portfolio.style.opacity = "0";
  portfolio.style.visibility = "hidden";
  portfolioCancleBtn.style.opacity = "0";
  portfolioCancleBtn.style.visibility = "hidden";

  // 화면 너비가 1023px 이하일 경우 section3TextBox 관련 스타일은 변경하지 않음
  if (window.innerWidth > 1023) {
    section3TextBox.style.transform = "translateY(-50%)";
    section3TextBox.style.top = "50%";
  }
}

// 클릭 이벤트 추가
[leftMonitor, centerMonitor, rightMonitor].forEach((monitor) => {
  monitor.addEventListener("click", openPortfolio);
});
portfolioCancleBtn.addEventListener("click", closePortfolio);

// 차트 클릭 이벤트
const elementsToShowContainer = [
  document.querySelector(".cylinderGlassBox"),
  document.querySelector(".cylinderBottomBox"),
  document.querySelector(".cylinderTopFrontBox"),
  document.querySelector(".cylinderTopCapBox"),
];
const aboutContainer = document.querySelector(".aboutContainer");
const aboutContainerCancelBtn = document.querySelector(
  ".aboutContainerCancleBtn"
);

function showAboutContainer() {
  if (window.innerWidth <= 1023) {
    aboutContainer.style.opacity = "1";
    aboutContainer.style.visibility = "visible";
  }
}

function hideAboutContainer() {
  if (window.innerWidth <= 1023) {
    aboutContainer.style.opacity = "0";
    aboutContainer.style.visibility = "hidden";
  }
}

// 클릭 이벤트 추가
elementsToShowContainer.forEach((element) => {
  element.addEventListener("click", showAboutContainer);
});

aboutContainerCancelBtn.addEventListener("click", hideAboutContainer);

// 수포티파이 웹 크기 관련 함수
function openNewWindow(url) {
  window.open(url, "_blank", "width=360,height=740");
}

// section2 resume 날짜 관련 함수
function updateDate() {
  const currentDateElement = document.querySelector(
    ".footer-date-box p:last-child"
  );
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(today.getDate()).padStart(2, "0"); // 날짜를 2자리로 맞추기 위해 padStart 사용
  const formattedDate = `${year}.${month}.${day}`;

  currentDateElement.textContent = formattedDate; // p:last-child의 내용을 오늘 날짜로 업데이트
}

// 페이지가 로드될 때 날짜 업데이트
updateDate();
