const Base_URL=`https://api.frankfurter.app/latest?from=`;

const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurrency=document.querySelector(".from select").value;
const toCurrency=document.querySelector(".to select").value;
const msg=document.querySelector(".msg")
// for(country_flag in countryList){
    //     console.log(country_flag,countryList[country_flag]);
// }


const btn=document.querySelector("form button");

for(let select of dropdowns){
    for(currencyCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;
        if(select.name === "from" && currencyCode === "USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && currencyCode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    
    select.addEventListener("change",(evt)=>{
        flagUpdate(evt.target);
    });
}




const flagUpdate=(element)=>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal < 1 ) {
        amtVal =1;
        amount.value='1';
    }


    const URL=`${Base_URL}${amount}&from=${fromCurrency}&to=${toCurrency}`;
    let response=await fetch(URL);
    let data = await response.json();
    let rate=data.rates.INR;
    let finalAmount=amtVal*rate;
    msg.innerHTML=`${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`
 });