//let musicals = ['hamilton', 'phantom', 'mormon', 'chicago', 'superstar', 'saigon'];
//let seperated = ['HAM', 'ILT','ON', 'PH', 'ANT','OM', 'MO','RM','ON', 'CH','ICA', 'GO', 'SUP', 'ERS','TAR', 'SA', 'IG', 'ON']

let chosenIndexes = [];
let chosenWord = '';

let musicals = ['HAMILTON', 'PHANTOM', 'MORMON', 'CHICAGO', 'SUPERSTAR', 'SAIGON'];

//let seperated = ['RM', 'ON', 'ILT',  'ANT','OM', 'HAM', 'MO','ON', 'PH',]
let seperated = ['HAM', 'ILT','ON', 'PH', 'ANT','OM', 'MO','RM','ON', 'CH','ICA', 'GO', 'SUP', 'ERS','TAR', 'SA', 'IG', 'ON'];
//Used to populate the UI 
let fullName = ['Hamilton', 'Phantom of The Opera', 'Book of Mormon', 'Chicago', 'Superstar', 'Miss Saigon'] 

let currentIndex = seperated.length, temporaryValue, randomIndex; 
//Fisher–Yates shuffle

function shuffle(){
    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -=1;
        temporaryValue = seperated[currentIndex];
        seperated[currentIndex] = seperated[randomIndex];
        seperated[randomIndex] = temporaryValue;
}

}

let container = document.querySelector('.container');
let textBox = document.getElementById('user-text-box');

function createUI(){
    shuffle();
    seperated.forEach(element =>{
        //console.log(`${element} ${element.length}`)
        let button = document.createElement('button');
        button.className = 'btn btn-success btn-lg p-2 m-4';
        button.id = 'lettersBtn';
        button.type = 'button'
        button.innerHTML = element;
        container.appendChild(button);
    });

    let checkButton = document.createElement('button');
    checkButton.type = 'button';
    checkButton.id = 'checkBtn';
    checkButton.className = 'btn btn-info btn-lg btn-block mt-5 font-weight-bold p-3';
    checkButton.innerHTML = 'Check Word For Match';
    container.appendChild(checkButton);

}



createUI();


let buttons = document.querySelectorAll('#lettersBtn');
let searchBtn = document.getElementById('searchBtn');


let buttonCount = 0;

buttons.forEach((element, index) =>{
    element.addEventListener('click', ()=>{
        
        if(buttonCount !== 3){
            buttonCount++;
            textBox.innerHTML += element.innerHTML;
            chosenIndexes.push(index);
            chosenWord += element.innerHTML;
        }
        else{
            showError('Max length reached press submit');
        }
        
    });
});


checkBtn.addEventListener('click', checkWord)



function checkWord(){
    console.log(chosenIndexes);
    console.log(chosenWord);
    console.log(wordFound(chosenWord));
    if(wordFound(chosenWord)){
        let listItems = document.querySelectorAll('.clue-label');
        listItems[index].innerHTML += ` ${fullName[index]} ✅`;
        listItems[index].parentElement.classList.add('list-group-item-success');
        clearUsedButtons();
        clearUI(); 
    }
    else{
        if(chosenWord.length === 0){
            showError('Please enter word');
        }
        else{
            showError('Not a word on the list');
            clearUI();
        }
    }
}

let index; 

function showError(message){
    let errorDiv = document.createElement('div');
    errorDiv.className = "p-3 mt-3 mb-2 bg-danger text-white text-center";
    errorDiv.innerHTML = message
    ulElement.insertAdjacentElement('afterend', errorDiv);
    setTimeout(()=>{
        errorDiv.remove();
    }, 3000)
}

function wordFound(word){
    for(let i = 0; i < musicals.length; i++){
        if(musicals[i] === word){
            index = i;
            return true
        }
    }
   return false; 
    
    
}




let testBTN = document.getElementById('test-btn');


let ulElement = document.querySelector('.list-group');


function clearUsedButtons(){
    for(let i = 0; i < 3; i++){
        buttons[chosenIndexes[i]].remove();
    }
}
// 🇻🇳
// 🙏
// 🎺
// 🇺🇸
function clearUI(){
    chosenIndexes = [];
    textBox.innerHTML = '';
    buttonCount = 0;
    chosenWord = '';
}