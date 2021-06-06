document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  const width = 10;
  let currentIndex = 0; //first div in the grid
  let appleIndex = 0; //first div in the grid
  let currentSnake = [2, 1, 0]; // 2 being the head 0 being the end
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  //? start and restart the game
  const startGame = () => {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  };
  //? all the outcomes for the snake
  const moveOutcomes = () => {
    //? snake hitting itself, borders etc.
    if (
      (currentSnake[0] + width > width * width && direction === width) || // hits the bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // hits the right wall
      (currentSnake[0] % width === 0 && direction === -1) || // hits the left wall
      (currentSnake[0] - width < 0 && direction === -width) || // hits the top
      squares[currentSnake[0] + direction].classList.contains("snake") // hits it self
    ) {
      return clearInterval(interval); //clear interval if any of the above happens
    }
    const tail = currentSnake.pop(); // removes last item of the array and shows it
    squares[tail].classList.remove("snake"); // removes class of snake from the tail
    currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head

    //? deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  };

  //? generate new apple once apple is eaten
  const randomApple = () => {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  };

  //? keycodes function
  const control = (e) => {
    squares[currentIndex].classList.remove("snake");
    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  };
  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", startGame);
});
