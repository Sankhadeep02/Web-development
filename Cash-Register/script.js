let cid = [
    ['ONE RUPEE', 5],        
    ['TWO RUPEES', 10],      
    ['FIVE RUPEES', 15],     
    ['TEN RUPEES', 20],      
    ['TWENTY RUPEES', 40],   
    ['FIFTY RUPEES', 100],   
    ['HUNDRED RUPEES', 200], 
    ['FIVE HUNDRED RUPEES', 500]
];

const currencyUnits = {
    "ONE RUPEE": 1,
    "TWO RUPEES": 2,
    "FIVE RUPEES": 5,
    "TEN RUPEES": 10,
    "TWENTY RUPEES": 20,
    "FIFTY RUPEES": 50,
    "HUNDRED RUPEES": 100,
    "FIVE HUNDRED RUPEES": 500,
    "TWO THOUSAND RUPEES": 2000
};

const priceInput = document.getElementById("item-price")
const purchaseBtn = document.getElementById("purchase-btn")
const cashInput = document.getElementById("cash")
const changeDue = document.getElementById("change-due")
const priceDisplay = document.getElementById("price-display")
const changesLeft = document.getElementById("changes-left")


const renderChangesLeft = () => {
    let changesOutput = "Changes Left <br><br>"
    for (let i = 0; i < cid.length; i++) {
        changesOutput += `${cid[i][0]}: ₹${cid[i][1]} <br>`
        changesLeft.innerHTML = changesOutput
    }
}

const purchase = () => {
    if (priceInput.value.trim() === "") {
        alert("Enter a valid price")
        return
    }
    const price = Number(priceInput.value)
    priceDisplay.innerHTML = `Price: ₹` + price
    const cashValue = Number(cashInput.value)
    let changeToReturn = +(cashValue-price).toFixed(2)

    let drawer = [...cid].reverse()

    const changeArray = []
    let totalInDrawer = 0

    for (let [unit, amount] of cid) {
        totalInDrawer += amount
    }
    totalInDrawer = +totalInDrawer.toFixed(2)

    if (cashValue < price) {
        alert("Customer does not have enough money to purchase the item")
        return
    }

    if (changeToReturn > totalInDrawer) {
        changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
        return
    }

    for (let [unit, amountInDrawer] of drawer) {
        let unitValue = currencyUnits[unit]
        let amountUsed = 0

        while (changeToReturn >= unitValue && amountInDrawer > 0) {
            changeToReturn = +(changeToReturn - unitValue).toFixed(2)
            amountInDrawer = +(amountInDrawer - unitValue).toFixed(2)
            amountUsed = +(amountUsed + unitValue).toFixed(2)
        }

        if (amountUsed > 0) {
            changeArray.push([unit, amountUsed])
        }
    }

    let totalAmountGiven = changeArray.reduce((sum, [unit, amt]) => sum + amt, 0)
    totalAmountGiven = +totalAmountGiven.toFixed(2)

    if (changeToReturn > 0) {
        changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
    }
    else {
        for (let [unit, amt] of changeArray) {
            for (let i = 0; i < cid.length; i++) {
                if (cid[i][0] === unit) {
                    cid[i][1] = +(cid[i][1] - amt).toFixed(2)
                    break;
                }
            }
        }
        console.log(cid)
        if (totalAmountGiven === totalInDrawer) {
            let output = "Status: CLOSED<br><br>";
            for (let [unit, amt] of changeArray) {
                output += ` ${unit}: ₹${amt}<br>`
            }
            changeDue.innerHTML = output;
        }
        else {
            let output = "Status: OPEN<br><br>";
            for (let [unit, amt] of changeArray) {
                output += ` ${unit}: ₹${amt}<br>`
            }
            changeDue.innerHTML = output;
        }
    }
    renderChangesLeft()
}

renderChangesLeft()

purchaseBtn.addEventListener("click", purchase)

