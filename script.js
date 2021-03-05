/*
 *  Functionality was made using inspiration from https://youtu.be/W0MxUHlZo6U.
 *  Pulse function was created using example provided by Professor Keating.
 *
 *
 *  This application has been written on a machine using MacOS version 10.14.6.
 *  It was tested in browser using boyth Google Chrome version 88.0.4324.192 and Safari version 14.0.1.
 */


const greenButton = document.getElementById("greenPanel");
const blueButton = document.getElementById("bluePanel");
const yellowButton = document.getElementById("yellowPanel");
const redButton = document.getElementById("redPanel");

const currentScore = document.getElementById("currentScore");
const highScore = document.getElementById("highScore");
var score = 0;
var highestScore = 0;



/*function that returns random panel */
const getRandomPanel = () => {

    const panels = [
        greenButton,
        blueButton,
        yellowButton,
        redButton
    ];

    return panels[parseInt(Math.random() * panels.length)];
}

//sets up array for the sequence of panels and adds first one 
let sequence = [getRandomPanel()];

/* replicates the sequence needed to guess from array 'sequence' */
let sequenceToGuess = [...sequence];


/*functions that will 'flash' the panel passed at 4 different speeds */
const flash01 = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 1000);
    });
}

const flash02 = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 600);
    });
}

const flash03 = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 400);
    });
}

const flash04 = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 200);
    });
}

/*Functions to flash each panel seperately*/
const flashGreen = () => {
    return new Promise((resolve, reject) => {
        greenButton.className += ' active';
        setTimeout(() => {
            greenButton.className = greenButton.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 500);
    });
}

const flashRed = () => {
    return new Promise((resolve, reject) => {
        redButton.className += ' active';
        setTimeout(() => {
            redButton.className = redButton.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 500);
    });
}

const flashYellow = () => {
    return new Promise((resolve, reject) => {
        yellowButton.className += ' active';
        setTimeout(() => {
            yellowButton.className = yellowButton.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 500);
    });
}

const flashBlue = () => {
    return new Promise((resolve, reject) => {
        blueButton.className += ' active';
        setTimeout(() => {
            blueButton.className = blueButton.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, 500);
    });
}

/* Pulse function */
function pulse() {
    flashRed();
    flashYellow();
    flashGreen();
    flashBlue();

    
}

//bool to toggle from computers turn to users turn
let canClick = false;

//check the panel clicked against the expected panel
const panelClicked = panelClicked => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panelClicked) {
        if (sequenceToGuess.length === 0) {
            /*start new round.*/
            score = score + 1;
            if (score < 10) {
                currentScore.innerHTML = "0" + score;
            } else {
                currentScore.innerHTML = score;
            }
            

            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            main();
        }
    } else {
        failed();
    }
}


const failed = () => {
    /* end game if wrong panel clicked 
        */
        document.getElementById("light").style.backgroundColor = "red";

        /* pulse all buttons 5 times on FAIL */
        
        pulse();
        var callCount = 1;
        var repeater = setInterval(function () {
            if (callCount < 5) {
                pulse();
                callCount += 1;
            } else {
                clearInterval(repeater);
            }
        }, 750);
       

        /*update highest score*/
        if (score > highestScore) {
            highestScore = score;
            
        }
        if (highestScore < 10) {
            highScore.innerHTML = "0" + highestScore;
        } else {
            highScore.innerHTML = highestScore;
        }
        score = 0;
        /*Reset current score*/
        currentScore.innerHTML = "00";
        /*Reset sequence for next go*/

        sequence.length = 0;
        sequence.push(getRandomPanel());
        sequenceToGuess = [...sequence];
}
/*main method called on the click of the 'START' button and at start of each new round*/
const startClicked = () => {
    

    document.getElementById("light").style.backgroundColor = "green";
    // Wait 3 seconds before starting  
    setTimeout(function () {
        main();
    }, 3000);
    
}

const main = async () => {
    
    if (score < 10) {
        currentScore.innerHTML = "0" + score;
    } else {
        currentScore.innerHTML = score;
    }
    
    
    
    if (score <= 5) {
        canClick = false;
        for (const panel of sequence) {
            await flash01(panel);            
        }
        
        canClick = true;
        
   
    } else if (score <= 9) {
        canClick = false;
        for (const panel of sequence) {
            await flash02(panel);
        }

        canClick = true;
        
        
    } else if(score <= 13) {
        canClick = false;
        for (const panel of sequence) {
            await flash03(panel);  
        }
        canClick = true;
        
        
    } else {
        canClick = false;
        for (const panel of sequence) {
            await flash04(panel);
            
        }
        canClick = true;
        
        
    }    
};