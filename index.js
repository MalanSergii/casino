console.log("test casino");
console.log("");

//=================================================================
let BET = 20;
// let moneyONStart = Number(prompt("money on start"));
let moneyONStart = 40720;
let BALLANCE = moneyONStart;
let TOTAL_LOST = 0;
let LOST_ROUNDS = 0;
let TOTAL_GAMES = 0;
let INSURANCE = 0;
let insuranceCounter = 0;
let BJ_counter = 0;
let DRAW_counter = 0;
let sideBet = 0;
let winMoney = 0;

const refs = {
    ballance: document.querySelector(".ballance"),
    winMoney: document.querySelector(".money"),
    bet: document.querySelector(".betNow"),
    lostRounds: document.querySelector(".lost_rounds"),
    totalGames: document.querySelector(".totalGames"),
    buttonOnWin: document.querySelector(".button__win"),
    buttonOnLost: document.querySelector(".button__lost"),
    buttonBJ: document.querySelector(".bj__win"),
    buttonDraw: document.querySelector(".button__draw"),
    buttonDouble: document.querySelector(".button__double"),
    buttonSplit: document.querySelector(".button__split"),
    sideButtSplitWin: document.querySelector(".push_win"),
    sideButtSplitLost: document.querySelector(".push_lost"),
    buttonInsurance: document.querySelector(".button__insurance"),
    sideButtInsuranceWin: document.querySelector(".win"),
    sideButtInsuranceLost: document.querySelector(".lost"),
};

refs.ballance.textContent = BALLANCE;
refs.bet.textContent = BET;
refs.lostRounds.textContent = LOST_ROUNDS;
refs.totalGames.textContent = TOTAL_GAMES;
refs.winMoney.textContent = winMoney;
//=================================================================
function recountParams() {
    refs.ballance.textContent = BALLANCE;
    refs.bet.textContent = BET;
    refs.lostRounds.textContent = LOST_ROUNDS;
    refs.totalGames.textContent = TOTAL_GAMES;
    winMoney = BALLANCE - moneyONStart;
    refs.winMoney.textContent = winMoney;
}

function gamesCounter() {
    TOTAL_GAMES += 1;
}
//=================================================================
function onWin() {
    BALLANCE += BET + sideBet * 2;
    BET = 20;
    sideBet = 0;
    LOST_ROUNDS = 0;
    refs.sideButtSplitWin.disabled = true;
    refs.sideButtSplitLost.disabled = true;
    closeInsurance();
    recountParams();
}
function onLost() {
    BALLANCE -= BET;
    LOST_ROUNDS += 1;
    BET = BET * 2 + 20 + sideBet;
    sideBet = 0;
    refs.sideButtSplitWin.disabled = true;
    refs.sideButtSplitLost.disabled = true;
    closeInsurance();
    recountParams();
}
function onBJ() {
    let winBJ = BET * 1.5;
    BALLANCE += winBJ;
    BET = 20;
    LOST_ROUNDS = 0;
    BJ_counter += 1;
    recountParams();
}
function onDraw() {
    DRAW_counter += 1;
    BALLANCE += sideBet;
    sideBet = 0;
    refs.sideButtSplitWin.disabled = true;
    refs.sideButtSplitLost.disabled = true;
    closeInsurance();
    recountParams();
}
//=================================================================
function onDouble() {
    sideBet = BET;
    BALLANCE -= sideBet;
    recountParams();
    refs.buttonBJ.disabled = true;
    refs.buttonSplit.disabled = true;
    refs.buttonInsurance.disabled = true;
    refs.buttonDouble.disabled = true;
}
function onSplit() {
    sideBet = BET;
    BALLANCE -= sideBet;
    recountParams();
    refs.buttonBJ.disabled = true;
    refs.buttonSplit.disabled = true;
    refs.buttonInsurance.disabled = true;
    refs.buttonDouble.disabled = true;
    refs.sideButtSplitWin.disabled = false;
    refs.sideButtSplitLost.disabled = false;
}
function onSideBtnSplitWin() {
    BALLANCE += sideBet;
    sideBet = 0;
    TOTAL_GAMES += 1;
    refs.sideButtSplitWin.disabled = true;
    refs.sideButtSplitLost.disabled = true;
    onWin();
}
function onSideBtnSplitLost() {
    BALLANCE += sideBet;
    sideBet = 0;
    TOTAL_GAMES += 1;
    refs.sideButtSplitWin.disabled = true;
    refs.sideButtSplitLost.disabled = true;
    onLost();
}
//=================================================================
function onInsurance() {
    INSURANCE = BET / 2;
    BALLANCE -= INSURANCE;
    insuranceCounter += 1;
    recountParams();
    openInsurance();
}
function onInsuranceWin() {
    BALLANCE += INSURANCE * 3 - BET;
    BET += 20;
    DRAW_counter += 1;
    recountParams();
    closeInsurance();
}
function onInsuranceLost() {
    recountParams();
    closeInsurance();
    refs.buttonInsurance.disabled = true;
    refs.buttonDouble.disabled = true;
    refs.buttonSplit.disabled = true;
}
function openInsurance() {
    refs.sideButtInsuranceWin.disabled = false;
    refs.sideButtInsuranceLost.disabled = false;
    refs.buttonInsurance.disabled = true;
    refs.buttonOnWin.disabled = true;
    refs.buttonOnLost.disabled = true;
    refs.buttonBJ.disabled = true;
    refs.buttonDraw.disabled = true;
    refs.buttonSplit.disabled = true;
    refs.buttonDouble.disabled = true;
}
function closeInsurance() {
    refs.sideButtInsuranceWin.disabled = true;
    refs.sideButtInsuranceLost.disabled = true;
    refs.buttonInsurance.disabled = false;
    refs.buttonOnWin.disabled = false;
    refs.buttonOnLost.disabled = false;
    refs.buttonBJ.disabled = false;
    refs.buttonDraw.disabled = false;
    refs.buttonSplit.disabled = false;
    refs.buttonDouble.disabled = false;
}
//=================================================================
document.querySelector(".mainBody").addEventListener("click", (event) => {
    if (event.target === refs.buttonOnLost) {
        gamesCounter();
        onLost();
    }
    if (event.target === refs.buttonOnWin) {
        gamesCounter();
        onWin();
    }
    if (event.target === refs.buttonBJ) {
        gamesCounter();
        onBJ();
    }
    if (event.target === refs.buttonInsurance) {
        onInsurance();
    }
    if (event.target === refs.sideButtInsuranceWin) {
        gamesCounter();
        onInsuranceWin();
    }
    if (event.target === refs.sideButtInsuranceLost) {
        onInsuranceLost();
    }
    if (event.target === refs.buttonDraw) {
        gamesCounter();
        onDraw();
    }
    if (event.target === refs.buttonDouble) {
        onDouble();
    }
    if (event.target === refs.buttonSplit) {
        onSplit();
    }
    if (event.target === refs.sideButtSplitWin) {
        onSideBtnSplitWin();
    }
    if (event.target === refs.sideButtSplitLost) {
        onSideBtnSplitLost();
    }
});
