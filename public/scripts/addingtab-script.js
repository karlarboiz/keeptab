"use strict";

let dataVal,data,i=0,customerSelectVal,
productSelectVal,switchURL = '/addingtab';

const submitFormTab= document.getElementById('submit-tab');

//form elements//
const customerSelect = submitFormTab.querySelector('select[name="customer"]');
const productSelect = submitFormTab.querySelector('select[name="product"]');
const productNumberInput = submitFormTab.querySelector('input[name="productnumber"]');
const total = submitFormTab.querySelector('input[name="total"]');
const btnAdd = submitFormTab.querySelector('input[name="add"]');
const btnMinus = submitFormTab.querySelector('input[name="minus"]');

const logtabList = document.getElementById('logtab-list');
const editBtn = document.querySelectorAll(".settings-option__edit");
const deleteBtn = document.querySelectorAll(".settings-option__delete");
const backdrop = document.querySelector('.backdrop');
const cancel = document.querySelector('input[name="cancel"]');
const submitBtn = document.querySelector('input[name="submit"]');
const settingsBtn = document.querySelectorAll('.fa-ellipsis-v');
const settingsEllipsis = document.querySelectorAll('.settings-options');
const closeSettingBtn = document.querySelectorAll('.settings-options button')
const message = document.getElementById('message');
const messageContent = document.getElementById('message-content')
//extract data for filling up the form
async function tabExtractDataHandler(){
    try {
        data =await fetch('/addingtab/data');

    }
    catch(err) {
       tabExtractDataHandler();
    }

    if(!data.ok) {
        triggerErrorMessage('Having trouble loading info. Give us a minute',false);

        setTimeout(()=>{
            tabExtractDataHandler()
        },3000)
        return;
    }

    dataVal = await data.json();
}

tabExtractDataHandler();
//


//outputting value inside the total input
function outputtingValueTab(index) {
    productNumberInput.value = index;
    const productValue = !productSelectVal ? productSelect.value :
    productSelectVal;
    const findProductData = dataVal.products.find(val=>val._id === productValue);
    total.value = index * findProductData.price
}
//

//resetting value in both inputs in the form
function resettingValue(){
    i = 0;
    productNumberInput.value = 0;
    total.value = 0;

}
//

// trigger error message 
function triggerErrorMessage(value,checkValue) {
    const classForMessage = checkValue ? 'message-content__confirm' :
    'message-content__error';
    message.className = 'message-entry'
    messageContent.textContent = value;
    messageContent.className = classForMessage;
    setTimeout(()=>{
       
       message.className = 'message-leave';
    },2000)
}
//

//handling values for both customer and product dropdown
function customerSelectHandler(e) {
    customerSelectVal = e.target.value;
   resettingValue()
}

function productSelectHandler(e) {
    productSelectVal = e.target.value;
   resettingValue();
}

//

//input value to show the number of products in the tab
function addProductNumber() {
    i++;
    outputtingValueTab(i);
}

function minusProductNumber() {
    if(i ===0) {
        triggerErrorMessage('Invalid Input',false)

        return;
    }
    i--;
    outputtingValueTab(i);
}
//

//outputting names from both product and customer dropdowns to include in the submission of the tab
function outputtingCustomerValue(value) {
    const findValue = dataVal.customers
    .find(val=>val._id === value)
    return `${findValue.name.firstName} 
    ${findValue.name.lastName}`;
}

function outputtingProductValue(value) {
    const findValue = dataVal.products.find(val=>val._id === value)
    return findValue.name;
}

function outputtingLogtabValue(value) {
    const findValue = dataVal.logtab.find(val=>val._id === value)
    return findValue;
}
//

//edit function to edit a specific logtab

async function editFuncHandler(e){
    const targetEl = e.target;
    const tabID = targetEl.dataset.link;
    cancel.style.display = "block"; 
    submitBtn.value = 'Update';
    settingsEllipsis.forEach(val=>val.style.display = "none")
    switchURL =`/logtab/edit/${tabID}`;
   
    const specifiedLogtab =await fetch(switchURL);
    const logtab = await specifiedLogtab.json();
    const targetLog = logtab.logtab;

    customerSelect.value = targetLog.cid;
    productSelect.value = targetLog.pid;
    productNumberInput.value = targetLog.pnumber;
    total.value = targetLog.total;
    i = +targetLog.pnumber;

    const cancelBtn = `
    <input type="button" value="Cancel" name="cancel">
    `
}
//

//submitting the form 
async function submitFormTabHandler(e) {
    e.preventDefault();

    if(productNumberInput.value === '' ||
    productNumberInput.value ===0 ||
    total.value === '' || total.value=== 0 || 
    productNumberInput.value === '0' ||
    total.value === '0' ) {
        triggerErrorMessage('Invalid Input',false)
        return
    }
 
    const tabBody = {
        c_id: customerSelect.value,
        c_name: outputtingCustomerValue(customerSelect.value),
        p_id: productSelect.value,
        p_name: outputtingProductValue(productSelect.value),
        productTabNumber: productNumberInput.value,
        total: total.value 
    }

   const submittedInfo = await fetch(switchURL,{
        method:"POST",
        body: JSON.stringify(tabBody),
        headers:{
            'Content-Type':'application/json'
        }
    })


    if(cancel.style.display=== 'block' && submitBtn.value === 'Update') {
        cancel.style.display= 'none';
        submitBtn.value = 'Register'
    }

    const submittedInfoJson = await submittedInfo.json()

    triggerErrorMessage(submittedInfoJson.message,true);

    productNumberInput.value = 0;
    total.value = 0;
    
}
//

//cancel update handler
function cancelFuncHandler(e){
    submitBtn.value = 'Register';
    cancel.style.display = 'none';
    productNumberInput.value = 0;

    customerSelect.value = dataVal.customers[0]._id;
    productSelect.value = dataVal.products[0]._id;
    total.value = 0;
    i = 0;
}
//

//delete a specific handler
async function deleteLogTabHandler(e) {
    const button = e.target
    const tabID = button.dataset.link;
    switchURL =`/logtab/delete/${tabID}`;

    const deleteLogtab =await fetch(switchURL,{
        method: "DELETE",
        headers:{
            'Content-Type':'application/json'
        }
    });
    const logtab = await deleteLogtab.json();
    const buttonParent = button.parentElement.parentElement.parentElement.parentElement;
    buttonParent.remove();
    triggerErrorMessage(logtab.message,true)
   
}
//

//settings option function

settingsBtn.forEach((val,index)=> {  
    val.addEventListener('click',()=>{
        settingsEllipsis.forEach(val=>val.style.display = "none")
        settingsEllipsis[index].style.display = "block"
        
    })

})

closeSettingBtn.forEach(val=>{
    val.addEventListener('click',(e)=>{
        const targetEl = e.target.parentElement;
        targetEl.style.display= 'none';
    })
})

//buttons and handlers
customerSelect.addEventListener('change',customerSelectHandler);
productSelect.addEventListener('change',productSelectHandler)
btnAdd.addEventListener('click',addProductNumber);
btnMinus.addEventListener('click',minusProductNumber);
submitFormTab.addEventListener('submit',submitFormTabHandler)
editBtn.forEach(val=>{val.addEventListener('click',editFuncHandler)})
cancel.addEventListener('click',cancelFuncHandler);
deleteBtn.forEach(val=>val.addEventListener('click',deleteLogTabHandler))