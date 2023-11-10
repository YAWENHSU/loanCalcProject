
const loanAmountEl = document.querySelector("#loanAmount");
const interestRateEl = document.querySelector("#interestRate");
const loanYearEl = document.querySelector("#loanYear");
const principalPaymentEl = document.querySelector("#principalPayment");
const resultEl = document.querySelector("#result");
const tableTbodyEl = document.querySelector("#resultTable>tbody");



function roanCalc() {
    //取得貸款金額/利率/年期
    let loanAmount = loanAmountEl.value * 10000;
    let interestRate = interestRateEl.value;
    let loanYear = loanYearEl.value;
    //本金攤還方式
    let principalPayment = principalPaymentEl.checked;
    console.log(loanAmount, interestRate, loanYear, principalPayment);

    let amount = loanAmount;
    let months = loanYear * 12;
    let monthRate = interestRate / 100 / 12;


    //固定還款金額
    let monthPay = parseInt(amount / months);

    let resultPayment = [];

    console.log(amount, months, monthRate, monthPay);
    //跑動期數
    for (let i = 0; i < months; i++) {
        //計算每個月利息
        let interest = Math.round(amount * monthRate)
        //減少餘額
        amount -= monthPay;
        //最後一期
        let text = "";
        if (i == months - 1) {
            resultPayment.push([i + 1, monthPay + amount, interest, monthPay + interest + amount, 0]);

        }
        else {
            resultPayment.push([i + 1, monthPay, interest, monthPay + interest, amount]);
        }

    }

    //計算期數、總利息、還款總金額
    let totalInterest = 0;
    for (let i = 0; i < resultPayment.length; i++) {
        totalInterest += resultPayment[i][2];
    }


    resultEl.innerHTML = `期數:${resultPayment.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;總利息:${totalInterest}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;還款總金額:${loanAmount + totalInterest}`;


    drawTable(resultPayment)
}

//繪製表格
function drawTable(resultPayment) {
    //console.log(tableTbodyEl, resultPayment);
    let tableHtml = "";
    for (let i = 0; i < resultPayment.length; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < resultPayment[i].length; j++) {
            //td
            tableHtml += `<td>${resultPayment[i][j]}</td>`;
        }
        tableHtml += "</tr>";
    }
    if (tableHtml != "") {
        document.querySelector("#resultTable").style.display = "table";
    }
    tableTbodyEl.innerHTML = tableHtml;

}