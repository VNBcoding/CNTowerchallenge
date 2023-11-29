document.addEventListener("DOMContentLoaded", () => {
    const plane = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    let Scorecontent = document.querySelector("#score #scoredata")
    let bestScorecontent = document.querySelector("#highestScore #bestscore")
    let bestScore = localStorage.getItem('bestScore') || 0;
    bestScorecontent.innerHTML = bestScore;
    let score = 0
    let planeLeft = 220;
    let planeBottom = 300;
    let gravity = 2;
    let isGameOver = false;
    let gap = 440;
    let startButton;
    let gametimerID;
    let tryAgainButton = document.getElementById('tryAgainButton');
    startButton = document.getElementById('startButton');
    startButton.addEventListener('click', reset);
    function reset (){
        if (!isGameOver) {
            Scorecontent.innerHTML = score;
            document.addEventListener('keyup', control);
            gametimerID = setInterval(startGame, 20);
            generateObstacle();
            startButton.style.display = 'none';
        }
    };
    function startGame(){
        planeBottom -= gravity;
        plane.style.bottom = planeBottom +'px';
        plane.style.left = planeLeft +'px';
       
    }
   

    function jump() {
        if (planeBottom <= (580 - 45)) {
            planeBottom += 50;
            plane.style.bottom = planeBottom + 'px';
        }
    }

    function control(e) {
        if (e.key === ' ' || e.code === 'Space') {
            jump();
        }
    }

    function generateObstacle(){
        let passed = false;
        let randomHeight = Math.random()*150; 
        let obstacleLeft = 500;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topobstacle = document.createElement('div');
       
        if(!isGameOver){
            obstacle.classList.add('obstacle');
            topobstacle.classList.add('TOPobstacle')
            gameDisplay.appendChild(obstacle);  
            gameDisplay.appendChild(topobstacle);
            obstacle.style.left = obstacleLeft +"px";
            topobstacle.style.left = obstacleLeft +"px";
            obstacle.style.bottom = obstacleBottom+"px";
            topobstacle.style.bottom = obstacleBottom + gap + "px";
        }  
       
        function moveObstacle(){ 
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft +'px';
            topobstacle.style.left = obstacleLeft +'px';

            if(obstacleLeft === -60){
                clearInterval(timerID);
                if (gameDisplay.contains(obstacle)) {
                    gameDisplay.removeChild(obstacle);
                }
                if (gameDisplay.contains(topobstacle)) {
                    gameDisplay.removeChild(topobstacle);
                }
            }
            if (planeBottom <= 0 || 
                obstacleLeft >200 && obstacleLeft <280 && planeLeft === 220 && 
                (planeBottom < obstacleBottom + 300 - 150 || planeBottom + 150 > obstacleBottom + gap - 45 )) {
                gameOver();
                clearInterval(timerID);
                clearTimeout(gametime); 
            
            }
            if (!passed && obstacleLeft < planeLeft) {
                // plane has passed the obstacle
                passed = true;
                score++;
                console.log(score); // Output the score to the console
                Scorecontent.innerHTML = score;
            }
            
            
        }
        let timerID = setInterval(moveObstacle,20);
     // setTimout: invoking the function after 3000 miliseconds(3s), it is one time-execution after the delay
     
       let gametime = setTimeout(generateObstacle, 3000);
    
    }

    function gameOver() {
        console.log("Game over");
        clearInterval(gametimerID)
        isGameOver = true;
        document.removeEventListener('keyup', control);
        updateBestScore();
        displayBestScore();
        showTryAgainButton();
       
        
    }
    function showTryAgainButton() {
        tryAgainButton.style.display ="block";
        tryAgainButton.addEventListener('click', resetAndStartGame);
        
    }
    function showTryAgainButton() {
        tryAgainButton.style.display = "block";
        tryAgainButton.addEventListener('click', resetPage);
    }

    function resetPage() {
        location.reload()}
    function updateBestScore() {
        if (score > bestScore) {
            bestScore = score;
            alert("New High Score")
            localStorage.setItem('bestScore', bestScore);
        }
        }
    function displayBestScore() {
        // Display the best score wherever you want (e.g., in an HTML element)
        console.log('Best Score:', bestScore);
        bestScorecontent.innerHTML = bestScore;
    }  
        
});
    
/* this the code for web navigation design */
    
function navOn() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function navOff() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

    


    
  

    

