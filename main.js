var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');

const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name  = "Rod 1";
const rod2Name = "Rod 2";


let score,
    maxScore,
    rod,
    ballSpeedX = 2;
    ballSpeedY = 2;


let gameOn = false;
let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;
    window.addEventListener('resize',function(){

         windowWidth = window.innerWidth;
         windowHeight = window.innerHeight;
    });

(function() {

    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if(rod == "null" || maxScore == "null"){

         alert("this is the first time you are palying ");
          maxScore = 0;
          rod = "rod 1";
    }else{

         alert(rod+ "has the max score of " + maxScore*100);
    }

    resetBoard(rod);

})();

function resetBoard(rodName){

     rod1.style.left = (window.innerWidth - rod1.offsetWidth)/2 + "px";
     rod2.style.left = (window.innerWidth - rod2.offsetWidth)/2 + "px";
     ball.style.left = (windowWidth - ball.offsetWidth)/2 + "px";

     //Lossing player gets the ball;

    //  if(rodName === rod2Name){
    //       ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + "px";
    //       ballSpeedY = 2;
    //  }else if( rodName === rod1Name){

    //      ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + "px";
    //      ballSpeedY = -2;
    //  }
     score = 0;
     gameOn = false;
}

function storeWin(rod,score){

     if(score > maxScore){

           maxScore = score;
          localStorage.setItem(storeName,rod);
          localStorage.setItem(storeName,maxScore);
     }

     clearInterval(movement);
     resetBoard(rod);
     alert(rod + "wind with socre of "+ (score * 100)+"max score is  "+ (maxScore * 100));

}
window.addEventListener('keypress',function(event){

     let rodSpeed = 20;
     let rodRect = rod1.getBoundingClientRect();

    if(event.code == "KeyD" && ((rodRect.x + rodRect.width)< window.innerWidth)){

         rod1.style.left = (rodRect.x) + rodSpeed + "px";
         rod2.style.left = rod1.style.left;
    }
    else if (event.code === "KeyA" && (rodRect.x > 0)) {
        rod1.style.left = (rodRect.x) - rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }

    if(event.code == "Enter") {

          if(!gameOn){

             gameOn = true;
             let ballRect = ball.getBoundingClientRect();
             let ballX = ballRect.x;
             let ballY = ballRect.y;
             let ballDia = ballRect.width;
              
             let rod1Height = rod1.offsetHeight;
             let rod2Height = rod2.offsetHeight;
             let rod1Width = rod1.offsetWidth;
             let rod2Width = rod2.offsetWidth;

             movement = setInterval(function(){
                  ballX += ballSpeedX;
                  ballY += ballSpeedY;

                  rod1X = rod1.getBoundingClientRect().x;
                  rod2X =  rod2.getBoundingClientRect().x;

                  ball.style.left = ballX + "px";
                  ball.style.top = ballY + "px";

                  if((ballX + ballDia) > windowWidth || ballX < 0){

                       ballSpeedX =  -ballSpeedX;
                  }

                 let ballPos = ballX + ballDia /2;

                 //check for rod 1

                  if(ballY <= rod1Height){

                     ballSpeedY = -ballSpeedY;
                     score++;

                       if((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))){

                         storeWin(rod2Name,score);
                       }

                  }else if((ballY + ballDia) >= (windowHeight-rod2Height)){
                              ballSpeedY = - ballSpeedY;
                              score++;

                              if((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))){

                                    storeWin(rod1Name,score);
                              }

                  }


             },10);


          }
    }

});
