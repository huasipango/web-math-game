var playing = false;
var score;

//Si hacemos click en Start/Reset
document.getElementById("startreset").onclick = function(){
    //alert("hola");
    
    //Si estamos jugando
    if(playing==true){
        location.reload(); //Reload the page
        
    }else{ //Si no estamos jugando
        playing=true;
        //inicializo score en 0
        score=0;
        document.getElementById("scorevalue").innerHTML = score;
       
       //Mostrar contador
       show("timeremaining");
       
        timeremaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        
        //Ocultar game over
        hide("gameover")
        //CAmbiar el boton a reset
        document.getElementById("startreset").innerHTML="Reiniciar Juego";
        
        //Iniciar contador
        startCountDown();
        
        //Generar una nueva pregunta
       generateQA();
    }
   
}

//Click en una caja de respuesta
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //Verificar si estamos jugando
    if(playing == true){//Si
        //alert(this.innerHTML);
        //alert(correctAnswer);
        if(this.innerHTML == correctAnswer){
            //Respuesta correcta
            //Incrementamos el score
            
            score++;
            document.getElementById("scorevalue").innerHTML=score;
            
            //Mostramos caja correcta y ocultamos caja incorrecta
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);
            
            //Generar nueva pregunta
            generateQA();
            
        }else{
            //respuesta incorrrecta
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
        }
    }
    }
}
    
//Funciones

//Iniciar contador
function startCountDown(){
    action = setInterval(function(){
        timeremaining-=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){//game over
            stopCountDown();
           
            show("gameover");
           
             document.getElementById("gameover").innerHTML="<p>Juego  finalizado!!</p><p>Su puntuación es: " + score +".</p>";
             
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML="Iniciar juego";
            
            
        }
    },1000);
}

//Detener contador
function stopCountDown(){
    clearInterval(action);
}

//Ocultar un elemento
function hide(id){
     document.getElementById(id).style.display="none";
}


//Mostar un elemento
function show(id){
     document.getElementById(id).style.display="block";
}


//Generar una pregunta y sus respuestas
function generateQA(){
    //alert("pregunta");
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML= x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    //Llenar una caja con la respuesta correcta
    document.getElementById("box" + correctPosition).innerHTML=correctAnswer;
    
    //Llenar el resto de cajas con respuestas incorrectas
    var answers = [correctAnswer];
    for(i=1; 1<5; i++){
        if (i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer= (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //Una respuesta incorrecta
            }while(answers.indexOf(wrongAnswer)>-1)
            
            document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);

        }
    }
}
