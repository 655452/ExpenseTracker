const balance=document.getElementById("balance");

const money_plus=document.getElementById("money-plus");

const money_minus=document.getElementById("money-minus");

const list =document.getElementById("list");

const form =document.getElementById("form");

const text =document.getElementById("text");

const amount=document.getElementById("amount");



// let transactions = [];

const localStorageTransactions=JSON.parse(localStorage.getItem("transactions"))
let transactions =localStorage.getItem("transactions")!==null?localStorageTransactions:[];


//add transactions

function addTransaction(e){
    e.preventDefault();

    // trim method remove whitespaces from both the ends
    if(text.value.trim()===""||amount.value.trim()===""){
        alert("Please Enter Text And value");
    }
    else{
        const transaction ={
            id:generatedID(),
            text:text.value,
            amount:+amount.value,
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value="";
        amount.value="";
    }

}


// Generate id
function generatedID(){
    // Math.floor returns largest integer less than or equal to a given number
    return Math.floor(Math.random()*100000000)
}


function addTransactionDOM(transaction){
    console.log(transaction)
    const sign =transaction.amount<0?"-":"+";  //sign is selected
    const item =document.createElement("li"); // item is created

    // classList property is read only but oyu can use add() and remove() methods to add or remove css classes return the css classnames of an element
    item.classList.add(
    transaction.amount<0?"minus":"plus"
    )

    item.innerHTML= `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)} </span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    // appendChild() method appends a node element as the last child of an element
    list.appendChild(item);
}

// remove transaction

function removeTransaction(id){
    transactions=transactions.filter((transaction)=>transaction.id!==id);
    updateLocalStorage()
    Init();
}

// Update Values

function updateValues(){
    // creates new array from calling a function for every array elements
    const amounts=transactions.map(transaction=>transaction.amount)

    // reducer methods executes a reducer function for array element
    // syntax array.reduce(function(total,currentval,currentIndex,arr),intialVal)
    //total = the intialvalue or the previously returned value of the function 
    // currentvalue =  value of the current element
    // currentIndex = index of the current element
    // arr = the array the current element belongs to 

    const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);

    const income =amounts.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2)

    const expense=(
        amounts.filter(item=>item<0).reduce((acc,item)=>(acc +=item),0)*-1
    ).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
}

// Update local storage
function updateLocalStorage(){

    // local storage object allows you to save key value pairs in browser
    // JSON.stringify converts the javascript object into the string
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    )
}


// Init app
function Init(){
    list.innerHTML=""
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// addTransactionDOM(Transactions);
Init();
form.addEventListener("submit",addTransaction)