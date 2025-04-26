const checkButton = document.getElementById("check-btn")
const clearButton = document.getElementById("clear-btn")
const inputText = document.getElementById("user-input")
const result = document.getElementById("results-div")

checkButton.addEventListener("click", ()=>{
    const inputValue = inputText.value;
    const regex = /^(\+91[\s-]?|91[\s-]?)?[6-9]\d{9}$/

    if (inputValue === "") {
        alert("Please provide a phone number");
        return;
    }
    else if(inputValue.match(regex)) {
        result.innerHTML = `✅ <br> Valid Indian number: <br> ${inputValue}`
        return
    }
    else {
        result.innerHTML = `❌ <br> Invalid Indian number: <br> ${inputValue}`
        return
    }
})

clearButton.addEventListener("click", ()=>{
    result.innerHTML = ""
})

inputText.addEventListener("keydown", (e)=>{
    result.innerHTML = ""

    if (e.key === "Enter") {
        checkButton.click()
    }
})
