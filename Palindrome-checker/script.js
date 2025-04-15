document.getElementById("check-btn").addEventListener("click", ()=> {
    const input = document.getElementById("text-input").value;
    const resultDiv = document.getElementById("result");
    const reverse_string = input.split("").reverse().join("");
    if (input === "") {
        alert("Please input a value");
    }
    else if (input === reverse_string) {
        resultDiv.textContent = `✔️ ${input} is a palindrome`
    }
    else if (input !== reverse_string) {
        resultDiv.textContent = `❌ ${input} is not a palindrome`
    }
})

document.getElementById("text-input").addEventListener("keydown", (event) => {
    document.getElementById("result").textContent = "";
    
    if (event.key === "Enter") {
        document.getElementById("check-btn").click();
    }
})
