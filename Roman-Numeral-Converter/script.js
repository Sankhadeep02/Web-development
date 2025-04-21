const inputValue = document.getElementById("number");
const button = document.getElementById("convert-btn");
const outputValue = document.getElementById("output");
const outputContainer = document.getElementById("output-container");

const convertNumberToRoman = (num) => {
  const val =    [1000, 900, 500, 400, 100, 90,  50,  40,  10,  9,   5,   4,   1];
  const roman = ["M", "CM", "D", "CD","C", "XC","L", "XL","X", "IX","V", "IV","I"];

  let result = "";

  for (let i = 0; i < val.length; i++) {
    while (num >= val[i]) {
      result += roman[i];
      num -= val[i];
    }
  }
  return result;
}

button.addEventListener("click", ()=>{
  const inputInt = parseInt(inputValue.value);

  if (inputValue.value === "") {
    outputValue.textContent = "Please enter a valid Integer";
    outputContainer.classList.remove("output-container-success");
    outputContainer.classList.add("output-container-failure");
    outputContainer.style.display = "block";
    return;
  }
  else{
    if (inputInt < 1 || inputInt > 3999) {
      outputValue.textContent = "Please enter a number between 1 and 3999.";
      outputContainer.classList.remove("output-container-success");
      outputContainer.classList.add("output-container-failure");
      outputContainer.style.display = "block";
    } else {
      outputValue.textContent = convertNumberToRoman(inputInt); 
      outputContainer.classList.remove("output-container-failure");
      outputContainer.classList.add("output-container-success");
      outputContainer.style.display = "block";
    }
  }

});

inputValue.addEventListener("keydown", (e)=> {
  outputValue.textContent = "";
  outputContainer.classList.remove("output-container-success", "output-container-failure");
  
  if (e.key === "Enter") {
    button.click();
  }
})
