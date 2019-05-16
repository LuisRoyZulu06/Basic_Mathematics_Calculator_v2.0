//DISPLAY
//FUNCTION TO DISPLAY HISTORY
function getHistory(){
    return document.querySelector("#history").innerText;
}
function printHistory(num){
    document.querySelector("#history").innerText = num;
}

 //FUNCTION TO DISPLAY OUTPUT
function getOutput(){
    return document.querySelector("#output").innerText;
}
function printOutput(num){
    if(num == ""){
        document.querySelector("#output").innerText = num;
    }else{
        document.querySelector("#output").innerText = getFormattedNumber(num);
    }
}

//FUCTION FOR DISPLAYING NUMBER IN OUPUT WITH COMMA FOR GOOD READABILITY
function getFormattedNumber(num){
    //When a number is negative, once a user clicks backsapce it returns "" and not NaN.
    if(num == "-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

//VIRTUAL-KEYBOARD
//OPERATORS
//ACCESSING OPERATORS
var operator = document.getElementsByClassName("operator");
    //USING FOR-LOOP TO ACCESS ALL OPERATORS ONE BY ONE
    for(var i = 0; i<operator.length;i++){
        operator[i].addEventListener('click',function(){ 
            //IF STATEMENT TO CLEAR THE DISPLAY
            if(this.id == "clear"){
                printHistory("");
                printOutput("");
            }
            //IF STATEMENT TO DELETE USING BACKSPACE ("CE")
            if(this.id == "backspace"){
                var output = reverseNumberFormat(getOutput()).toString();
                if (output){//if output has a value
                    output = output.substr(0,output.length-1);
                    printOutput(output);
                }
            }
            //CHECKING IF OUTPUT IS NOT EMPTY SO THAT OTHER OPERATORS (+,-,*,/) COULD WORK.
            else{
                var output = getOutput();
                var history = getHistory();
                if(output == "" && history  != ""){
                    if(isNaN(history[history.length-1])){
                        history = history.substr(0,history.length-1);
                    }
                }
                
                if(output != "" || history != ""){
                    output = output == ""?
                    output: reverseNumberFormat(output);
                    
                    //EVALUATIONS
                    history = history + output;
                    if(this.id == "="){
                        var result = eval(history);
                        //THE RESULTS OF EVALUATION TO BE PRINTED ON OUTPUT
                        printOutput(result);
                        //HISTORY TO BE SET TO EMPTY
                        printHistory("");
                    }
                    //CONCATINATION OF NUMBERS AND OPERATORS IN HISTORY DISPLAY
                    else{
                        history = history+this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }           
        })
    }

//NUMBER
//ACCESSING NUMBERS
var number = document.getElementsByClassName("number");
    
//USING FOR-LOOP TO ACCESS ALL NUMBERS ONE BY ONE
    for(var i = 0; i<number.length;i++){
        number[i].addEventListener('click',function(){
            
            //GETTING OUTPUT DISPLAYED
            var output = reverseNumberFormat(getOutput());
            if (output !== NaN){
                //IF OUTPUT IS A NUMBER CONCATINATE IT
                output = output+this.id;
                printOutput(output);
            }
        })
    }