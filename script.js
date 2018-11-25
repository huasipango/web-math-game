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




// SCRIPTS FROM TEMPLATE-------------------------------------------------------------

var Expand = (function() {
  var tile = $('.strips__strip');
  var tileLink = $('.strips__strip > .strip__content');
  var tileText = tileLink.find('.strip__inner-text');
  var stripClose = $('.strip__close');
  
  var expanded  = false;

  var open = function() {
      
    var tile = $(this).parent();

      if (!expanded) {
        tile.addClass('strips__strip--expanded');
        // add delay to inner text
        tileText.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
        stripClose.addClass('strip__close--show');
        stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
        expanded = true;
      } 
    };
  
  var close = function() {
    if (expanded) {
      tile.removeClass('strips__strip--expanded');
      // remove delay from inner text
      tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
      stripClose.removeClass('strip__close--show');
      stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)')
      expanded = false;
    }
  }

    var bindActions = function() {
      tileLink.on('click', open);
      stripClose.on('click', close);
    };

    var init = function() {
      bindActions();
    };

    return {
      init: init
    };

  }());

Expand.init();

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
