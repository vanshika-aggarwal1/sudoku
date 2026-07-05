let selectedCell = null;
//check if the board is filled or not
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("click", ()=>{
        if(selectedCell) {
            selectedCell.style.backgroundColor = "white";
        }
        selectedCell = input;
        selectedCell.style.backgroundColor = "lightblue";
    });
    input.addEventListener("input", () => {
        if (![...document.querySelectorAll("input")].some(i => i.value.trim() === "")) {
            checkBoard();
        }
    });
});


//check
function checkBoard() {
      const board = [];
      for(let i = 0; i < 9; i++) {
          board[i] = [];
      }

      document.querySelectorAll("input").forEach(input => {
          const row = Number(input.dataset.row);
          const col = Number(input.dataset.col);

          board[row][col] = Number(input.value);
      });
      fetch("/check", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ board })
      })
      .then(res => res.json())
      .then(data => {
            if(data.notfil === 0 && data.wrongCells.length === 0) {
                alert("Congratulations! You won");
                window.location.href='/';
            }
          data.wrongCells.forEach(cell =>{
            const input = document.querySelector(
              `input[data-row="${cell.row}"][data-col="${cell.col}"]`
            );

            if (input) {
              input.style.backgroundColor = "red";
            }
          });
      });
    }


//get a hint

document.querySelectorAll("input").forEach((input) => {
    
});

function hint() {
    if(!selectedCell) alert("Please select a cell");
    const row = selectedCell.dataset.row;
    const col = selectedCell.dataset.col;
    fetch("/hint", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({row, col })
    })
    .then(res => res.json())
    .then(data =>{
        const input = document.querySelector(
            `input[data-row="${row}"][data-col="${col}"]`
        );

        if (input) {
          input.value = data.val;
        }
    })

}

//reset board
function reset() {
    window.location.href='/reset';
}