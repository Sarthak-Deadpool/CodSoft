
const buttons = document.querySelectorAll(".button");
const input   = document.querySelector(".input");
let expr = "";          
let justEvaluated = false;

function updateDisplay() {
    input.value = expr || "0";
}

function evaluateExpression(str) {
    return Function(`'use strict'; return (${str})`)();
}

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        const value = e.target.closest("button").innerText.trim();

        switch (value) {
            case "C":
                expr = "";
                break;

            case "backspace":
            case "⌫":            
                expr = expr.slice(0, -1);
                break;

            case "=":
                try {
                    expr = evaluateExpression(expr).toString();
                } catch (err) {
                    expr = "Error";
                }
                justEvaluated = true;
                break;
            default:
                if (justEvaluated && /[0-9.]/.test(value)) expr = "";
                justEvaluated = false;
                expr += value;
        }

        updateDisplay();
    });
});

window.addEventListener("keydown", e => {
    const key = e.key;

    if (key === "Enter") {
        document.querySelector(".button:contains('=')")?.click();
    } else if ("0123456789+-*/().".includes(key)) {
        expr += key;
        updateDisplay();
    } else if (key === "Escape") {
        expr = "";
        updateDisplay();
    }
});

updateDisplay();
