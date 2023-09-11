// import country_list from "./country-list";
const dropList = document.querySelectorAll("select");
const getButton = document.querySelector("button");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");

rateText = document.querySelector(".exchange-rate");
const API_KEY = "c3e30c75d17ee470acc4968f";

const fromImg = document.querySelector(".from img");
const toImg = document.querySelector("#toImg");




for(let i = 0;i<dropList.length;i++){

    for(currencyCode in country_list ){
        let selected;
        if(i==0){
            selected = currencyCode=='USD' ? "selected":"";
        }
        else{
            selected = currencyCode=='INR' ? "selected":"";
        }
        //creating option tag by passing currency
        let optionTag = `<option value = "${currencyCode}" ${selected}>${currencyCode}</option>`;
        //inserting option tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
        
    }
}



//disable the selected option in to currency
fromCurrency.addEventListener('change',()=>{
    const selectedCurrencyOption = fromCurrency.value;
    console.log(selectedCurrencyOption);
    fromImg.src = `https://flagsapi.com/${country_list[selectedCurrencyOption]}/flat/64.png`;
    //loop the toCurrency select and remove the selectedOption
    for(let i = 0;i<toCurrency.options.length;i++){
        const option = toCurrency.options[i];
        // if(option.value === selectedCurrencyOption){
        //     option.disabled = true;
        // }
        // else{
        //     option.disabled = false;
        // }
        if(option.value === selectedCurrencyOption){
            toCurrency.removeChild(option);
        }
    }
});

console.log(toCurrency.value);
toCurrency.addEventListener('change',()=>{
    const selectedToCurrencyOption = toCurrency.value;
    console.log(selectedToCurrencyOption);
    toImg.src = `https://flagsapi.com/${country_list[selectedToCurrencyOption]}/flat/64.png`;

});

getButton.addEventListener('click',(e)=>{
    //stopping form to get submitted
    e.preventDefault();
    getExchangeRate();
});

async function getExchangeRate(){
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue=="" || amountValue=="0"){
        amount.value = "1";
        amountValue = 1;
    }
  
   // let url = "https://corsproxy.io/?http://api.exchangeratesapi.io/v1/latest?access_key=1600c0345f576a444ee25a11125af0de";
   let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;
   try {
        const response = await fetch(url);
        const json = await response.json();
        const rates = json.conversion_rates;
        // console.log(json);
        // console.log(amountValue);
        // console.log(fromCurrency.value);
        // console.log(typeof rates);
        
        // console.log(rates[toCurrency.value]);
        let totalExchangeRate = amountValue * rates[toCurrency.value];
        totalExchangeRate = totalExchangeRate.toFixed(3);
        rateText.innerHTML = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        


    } catch (error) {
        console.log("not able to fetch data from api");
    }

    
}