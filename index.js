console.log("test casino");
console.log("");

//=================================================================
let BET = 20;
let BALLANCE = 10040;
let TOTAL_LOST = 0;
let LOST_ROUNDS = 0;
let TOTAL_GAMES = 0;
let INSURANCE = 0;
let insuranceCounter = 0;
let BJ_counter = 0;
let DRAW_counter = 0;
let sideBet = 0;

const refs = {
    ballance: document.querySelector(".ballance"),
    bet: document.querySelector(".betNow"),
    lostRounds: document.querySelector(".lost_rounds"),
    totalGames: document.querySelector(".totalGames"),
    buttonOnWin: document.querySelector(".button__win"),
    buttonOnLost: document.querySelector(".button__lost"),
    buttonBJ: document.querySelector(".bj__win"),
    buttonDraw: document.querySelector(".button__draw"),
    buttonDouble: document.querySelector(".button__double"),
    buttonSplit: document.querySelector(".button__split"),
    buttonInsurance: document.querySelector(".button__insurance"),
    sideButtInsuranceWin: document.querySelector(".win"),
    sideButtInsuranceLost: document.querySelector(".lost"),
};
refs.ballance.textContent = BALLANCE;
refs.bet.textContent = BET;
refs.lostRounds.textContent = LOST_ROUNDS;
refs.totalGames.textContent = TOTAL_GAMES;
//=================================================================
function recountParams() {
    refs.ballance.textContent = BALLANCE;
    refs.bet.textContent = BET;
    refs.lostRounds.textContent = LOST_ROUNDS;
    refs.totalGames.textContent = TOTAL_GAMES;
}
function betCount() {
    BET = BET * 2 + 20;
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
    closeInsurance();
    recountParams();
}
function onLost() {
    BALLANCE -= BET + sideBet;
    LOST_ROUNDS += 1;
    BET = BET * 2 + 20 + sideBet;
    sideBet = 0;
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
    console.log("BJ_counter", BJ_counter);
}
function onDraw() {
    DRAW_counter += 1;
    BET += 20;
    sideBet = 0;
    console.log("DRAW_counter", DRAW_counter);
    closeInsurance();
    recountParams();
}
//=================================================================
function onDouble() {
    sideBet = BET;
    recountParams();
    console.log("sideBet", sideBet);
    refs.buttonBJ.disabled = true;
    refs.buttonSplit.disabled = true;
    refs.buttonInsurance.disabled = true;
    refs.buttonDouble.disabled = true;
}
function onSplit() {
    sideBet = BET;
    recountParams();
    console.log("sideBet", sideBet);
    refs.buttonBJ.disabled = true;
    refs.buttonSplit.disabled = true;
    refs.buttonInsurance.disabled = true;
    refs.buttonDouble.disabled = true;
}
//=================================================================
function onInsurance() {
    INSURANCE = BET / 2;
    BALLANCE -= INSURANCE;
    console.log("INSURANCE value", INSURANCE);
    insuranceCounter += 1;
    recountParams();
    openInsurance();
    console.log("insuranceCounter", insuranceCounter);
}
function onInsuranceWin() {
    BALLANCE += INSURANCE * 3 - BET;
    BET += 20;
    DRAW_counter += 1;
    console.log(DRAW_counter);
    recountParams();
    closeInsurance();
}
function onInsuranceLost() {
    recountParams();
    closeInsurance();
    refs.buttonInsurance.disabled = true;
    refs.buttonBJ.disabled = true;
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
});
