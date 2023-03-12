"use strict";

const btnAdd = document.getElementById('button-add');
const btnMinus = document.getElementById('button-minus');
const productNumberInput = document.querySelector('input[name="productnumber"]');
const total = document.querySelector('input[name="total"]');
const customerSelect = document.querySelector('select[name="customer"]');
const productSelect = document.querySelector('select[name="product"]');
const submitFormTab = document.getElementById('submit-tab');
const logtabList = document.getElementById('logtab-list');

let dataVal,i=0,customerSelectVal,productSelectVal;

async function tabExtractDataHandler(){
    try {
        const data =await fetch('/addingtab/data');
        dataVal = await data.json();
    }
    catch(err) {
        console.log(err)
    }

    console.log(dataVal)
}

tabExtractDataHandler();

function outputtingValueTab(index) {
    productNumberInput.value = index;
    const productValue = !productSelectVal ? productSelect.value :
    productSelectVal;
    const findProductData = dataVal.products.find(val=>val._id === productValue);
    total.value = index * findProductData.price
}

function resettingValue(){
    productNumberInput.value = 0;
    total.value = 0;
}

function customerSelectHandler(e) {
    customerSelectVal = e.target.value;
   resettingValue()
}

function productSelectHandler(e) {
    productSelectVal = e.target.value;
   resettingValue();
}

function addProductNumber() {
    i++;
    outputtingValueTab(i);
}

function minusProductNumber() {
    if(i ===0) {
        const html = '<p class="error-message"> Invalid Input </p>';
        submitFormTab.insertAdjacentHTML("afterbegin",html)

        setTimeout(()=>{
            document.querySelector('.error-message').remove()
        },2000)
        return;
    }
    i--;
    outputtingValueTab(i);
}

function outputtingCustomerValue(value) {
    const findValue = dataVal.customers.find(val=>val._id === value)
    return `${findValue.name.firstName} ${findValue.name.lastName}`;
}

function outputtingProductValue(value) {
    const findValue = dataVal.products.find(val=>val._id === value)
    return findValue.name;
}

function submitFormTabHandler(e) {
    e.preventDefault();

    if(productNumberInput.value === '' ||
    productNumberInput.value ===0 ||
    total.value === '' || total.value===0) return;

    const tabBody = {
        c_id: customerSelect.value,
        c_name: outputtingCustomerValue(customerSelect.value),
        p_id: productSelect.value,
        p_name: outputtingProductValue(productSelect.value),
        productTabNumber: productNumberInput.value,
        total: total.value 
    }

    fetch('/addingtab',{
        method:"POST",
        body: JSON.stringify(tabBody),
        headers:{
            'Content-Type':'application/json'
        }
    })

    productNumberInput.value = 0;
    total.value = 0;
    location.reload();
}

customerSelect.addEventListener('change',customerSelectHandler);
productSelect.addEventListener('change',productSelectHandler)
btnAdd.addEventListener('click',addProductNumber);
btnMinus.addEventListener('click',minusProductNumber);
submitFormTab.addEventListener('submit',submitFormTabHandler)