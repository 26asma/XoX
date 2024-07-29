let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnX = true;
const winpatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];
const resetGame = () => {
    turnX = true;
    enabledboxes();
    msgcontainer.classList.add("hide");
    resetbtn.add("reset");

}
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnX) {
            box.innerText = "X"
            turnX = false;
        }
        else {
            box.innerText = "O"
            turnX = true;
        }
        box.disabled = true;
        checkWinner();
        draw();
    });
});
const disabledboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const enabledboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    msg.innerText = `congrats,winner is ${winner}`;
    msgcontainer.classList.remove("hide");

    resetbtn.remove("reset");
    disabledboxes();

}
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {


                showWinner(pos1val);
            }

        }


    }


};

const draw = () => {
    let allFilled = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            allFilled = false;
            break;
        }
    }

  
    if (allFilled) {
        // Check if there's a winner already
        let winnerFound = false;
        for (let pattern of winpatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
                if (pos1val === pos2val && pos2val === pos3val) {
                    winnerFound = true;
                    break;
                }
            }
        }

        if (!winnerFound) {
            alert("Game is a draw! Try again.");
            resetGame();
        }
    }
};


newbtn.addEventListener("click", resetGame)
resetbtn.addEventListener("click", resetGame)