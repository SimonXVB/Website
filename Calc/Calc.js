const one = document.getElementById("btnOne");
const two = document.getElementById("btnTwo");
const three = document.getElementById("btnThree");
const four = document.getElementById("btnFour");
const five = document.getElementById("btnFive");
const six = document.getElementById("btnSix");
const seven = document.getElementById("btnSeven");
const eight = document.getElementById("btnEight");
const nine = document.getElementById("btnNine");
const zero = document.getElementById("btnZero");
const sub = document.getElementById("btnSub");
const add = document.getElementById("btnAdd");
const div = document.getElementById("btnDiv");
const mult = document.getElementById("btnMult");
const dot = document.getElementById("btnDot");
const equals = document.getElementById("btnEquals");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const prot = document.getElementById("protocol");
const clearProtBtn = document.getElementById("clearProt");
let protArr = [];

one.addEventListener("click", () => {
    display.value += "1";
});

two.addEventListener("click", () => {
    display.value += "2";
});

three.addEventListener("click", () => {
    display.value += "3";
});

four.addEventListener("click", () => {
    display.value += "4";
});

five.addEventListener("click", () => {
    display.value += "5";
});

six.addEventListener("click", () => {
    display.value += "6";
});

seven.addEventListener("click", () => {
    display.value += "7";
});

eight.addEventListener("click", () => {
    display.value += "8";
});

nine.addEventListener("click", () => {
    display.value += "9";
});

zero.addEventListener("click", () => {
    display.value += "0";
});

add.addEventListener("click", () => {
    display.value += "+";
});

sub.addEventListener("click", () => {
    display.value += "-";
});

div.addEventListener("click", () => {
    display.value += "/";
});

mult.addEventListener("click", () => {
    display.value += "*";
});

dot.addEventListener("click", () => {
    display.value += ".";
});

equals.addEventListener("click", () => {
    if(display.value === ""){
        placeholder = "Enter Number"
    }
    else{
    display.value = eval(display.value);
    }
});

clear.addEventListener("click", () => {
    display.value = "";
});

const protocol = () => {

    equals.addEventListener("click", () => {
    protArr.push(display.value);
    
    if(protArr.length === 18){
        protArr.splice(0, 1);
    };
    prot.innerHTML = protArr.toString().split(",").join("<br>");
    });
};

const clearProt = () => {
    clearProtBtn.addEventListener("click", () => {

        prot.innerText = "";
        protArr = [];
    });
};
protocol();
clearProt();
