const slider=document.querySelector("[slidebar]");

const checkbxUpper=document.querySelector("#choice1");
const checkbxLower=document.querySelector("#choice2");
const checkbxNumber=document.querySelector("#choice3");
const checkbxSymbol=document.querySelector("#choice4");

const Passdisplaybx=document.querySelector("[displaypass]");

const length=document.querySelector("#pass-length");

const strengthColor=document.querySelector("#colorstrength");

const copyMsg=document.querySelector(".copyMsg");
  
let password="";
let passlength=10;

handleslider();

function handleslider(){
    slider.value=passlength;
    length.innerText = passlength;

    // slider.oninput = function(){
    //     length.innerText = this.value;
    // }

    const max=slider.max;
    const min=slider.min;

    slider.style.backgroundSize = ((slider.value-min)*100/(max-min)) + "% 100%"
}
    

    

slider.addEventListener("input" , function(){length.innerText = slider.value})
slider.addEventListener("input" , function(){
    const max=slider.max;
    const min=slider.min;

    slider.style.backgroundSize = ((slider.value-min)*100/(max-min)) + "% 100%"
});


function getRdnInteger(max,min){
   return Math.round(Math.random()*(max-min))+min;
}

function getUpprCase(){
    return String.fromCharCode(getRdnInteger(90,65));
}

function getLowerrCase(){
    return String.fromCharCode(getRdnInteger(122,97));
}

function getSymbol(){
    return String.fromCharCode(getRdnInteger(47,33));
}

function getNumber(){
    return getRdnInteger(9,0);
}


function setIndicator(newColor){
    return strengthColor.style.setProperty('--strengthColor' , newColor);
}



let count=0;

function counntCheckbx(){

    count=0;

    

    var chekbx=document.querySelectorAll('input[type="checkbox"]')

    for(var i=0;i<4;i++){
    if(chekbx[i].checked){
        count++;
    }
    }

    return count;
}




function changeIndicator(){

    counntCheckbx();

    if(count==0){
        setIndicator("grey");
    }
    if(count==1 || slider.value<=5){
        setIndicator("red");
    }
    if(count==2 || count==3 ||slider.value<=10){
        setIndicator("yellow");
    }
    if(count==4 ||slider.value>=10){
        setIndicator("green");
    }


}

document.querySelector('i').addEventListener('click' , copyPass)


async function copyPass(){

    try{
        await navigator.clipboard.writeText(Passdisplaybx.value);
        copyMsg.innerText = "copied"
    }

    catch (e){
        copyMsg.innerText = "Failed"
    }

    copyMsg.classList.add("Active");

    setTimeout( () => {
        copyMsg.classList.remove("Active")}
        ,2000);



}


function minimumLength(){

     counntCheckbx;

     if(count>slider.value){
        passlength=count;
        handleslider();
     }
}

function shuffling(Array){
    for(var i=(Array.length-1);i>0;i--){
        const j=Math.round(Math.random()*i);
        const n =Array[j];
        Array[j]=Array[i];
        Array[i]=n;
    }

    var str='';
    Array.forEach(e => {
        str+=e
    });

    return str;

}



function generatePassword(){

    counntCheckbx();

    minimumLength();

    if(count==0){
        password="";
    }

    else{


        password="";
    
        let funcArr = [] ;
        // console.log(typeof(funcArr))
    
        // if(checkbxUpper.checked){
        //     password += getUpprCase()
        // }
    
        // if(checkbxLower.checked){
        //     password += getLowerrCase()
        // }
    
        // if(checkbxNumber.checked){
        //     password += getRdnInteger(9,0)
        // }
    
        // if(checkbxSymbol.checked){
        //     password += getSymbol()
        // }
    
        if(checkbxUpper.checked){
            
            funcArr.push(getUpprCase);
        }
    
        if(checkbxLower.checked){
            
            funcArr.push(getLowerrCase);
        }
    
        if(checkbxNumber.checked){
           
            funcArr.push(getNumber);
        }
    
        if(checkbxSymbol.checked){
          
            funcArr.push(getSymbol);
        }
    
    
        for(let i=0 ; i<funcArr.length ; i++)[
            password += funcArr[i]()
        ]
    
        let ln=password.length;
    
    
        for(let i=0 ; i<(parseInt(slider.value) - ln ) ; i++){
    
            password += funcArr[getRdnInteger((funcArr.length-1),0)]()
        
        }

    }  

    password = shuffling(Array.from(password));

    Passdisplaybx.value=password;

    changeIndicator();
    copyPass();

    
    
}


