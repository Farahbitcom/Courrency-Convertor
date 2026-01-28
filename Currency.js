// const BASE_URL =`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;
// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");

// for(let select of dropdowns){
//   for(currCode in countryList){
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if(select.name === "from" && currCode === "USD"){
//       newOption.selected = "selected";
//     } else  if(select.name === "to" && currCode === "PKR"){
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }
//   select.addEventListener("change", (evt)=>{
//      updateFlag(evt.target);
//   })
//   const updateFlag = (element) =>{
//    let currCode = element.value;
//    let countryCode = countryList[currCode];
//    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
//    let img = element.parentElement.querySelector("img");
//    img.src = newSrc;
//   }
// }
// btn.addEventListener("click", async(evt)=>{
//   evt.preventDefault();
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if(amtVal === "" || amtVal < 1){
//     amtVal = 1;
//     amount.value = "1";
//   }
//   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//   let response = await fetch(URL);
//   let data = await response.json();
//   console.log(data);
// });


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//  move function OUTSIDE loop
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

  let rate; // ✅ DECLARE HERE (IMPORTANT)

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error("API error");

    let data = await response.json();
    rate = data[from][to]; // ✅ ASSIGN HERE
  } catch (error) {
    console.error("Failed to fetch currency data", error);
    msg.innerText = "Error fetching exchange rate ❌";
    return; // ⛔ stop execution if error
  }

  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});



