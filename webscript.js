/* =========================================
   STUDENT LOGIN
========================================= */

const allowedStudentIDs = [

    "GR12-STEM-A1",
    "GR12-STEM-A2",
    "GR12-STEM-A3",
    "GR12-STEM-A4",
    "GR12-STEM-A5"

];


const loginForm =
    document.getElementById("loginForm");

const loginPage =
    document.getElementById("loginPage");

const mainPage =
    document.getElementById("mainPage");

const studentIDInput =
    document.getElementById("studentID");

const loginMessage =
    document.getElementById("loginMessage");

const welcome =
    document.getElementById("welcome");

const logoutButton =
    document.getElementById("logout");


loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const studentID =
            studentIDInput.value.trim();


        if (
            allowedStudentIDs.includes(studentID)
        ) {

            loginPage.classList.add("hidden");

            mainPage.classList.remove("hidden");

            welcome.textContent =
                "Welcome, " + studentID + "!";

            loginMessage.textContent = "";

            resizeCanvas();

        } else {

            loginMessage.textContent =
                "Invalid Student ID.";

        }

    }
);


/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener(
    "click",
    function() {

        mainPage.classList.add("hidden");

        loginPage.classList.remove("hidden");

        studentIDInput.value = "";

        loginMessage.textContent = "";

        stopSimulation();

    }
);



/* =========================================
   PROJECTILE VARIABLES
========================================= */

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");

const ball =
    document.getElementById("ball");

const velocityInput =
    document.getElementById("velocity");

const thetaInput =
    document.getElementById("theta");

const speedButton =
    document.getElementById("speedButton");


let xi = 20;

let yi = 550;

let g = 9.81;

let theta = 0;

let v_i = 0;

let v_x = 0;

let v_y_i = 0;

let dt = 0.1;

let speedSet = 1;

let speedMultiplier =
    speedSet * 0.1;

let t = 0;

let moving = false;


/* =========================================
   CANVAS SIZE
========================================= */

function resizeCanvas() {

    canvas.width =
        canvas.parentElement.clientWidth;

    canvas.height =
        canvas.parentElement.clientHeight;

    yi =
        canvas.height - 100;


    if (!moving) {

        ball.style.left =
            xi + "px";

        ball.style.top =
            yi + "px";

    }

    updateGraph();
}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   SOLVE PROJECTILE
========================================= */

function solve() {

    v_i =
        parseFloat(
            velocityInput.value
        ) || 0;

    theta =
        parseFloat(
            thetaInput.value
        ) || 0;


    const radians =
        theta * Math.PI / 180;


    v_x =
        v_i * Math.cos(radians);


    v_y_i =
        -v_i * Math.sin(radians);
}


/* =========================================
   DRAW PROJECTILE PATH
========================================= */

function updateGraph() {

    if (!canvas || !ctx) {
        return;
    }


    solve();


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    let time = 0;


    const startX =
        xi + 25;

    const startY =
        yi + 25;


    ctx.beginPath();


    ctx.moveTo(
        startX,
        startY
    );


    for (
        let i = 0;
        i < 500;
        i++
    ) {

        const x =
            startX +
            v_x * time;


        const y =
            startY +
            v_y_i * time +
            0.5 * g * time * time;


        ctx.lineTo(
            x,
            y
        );


        time += 0.1;


        if (
            y > startY &&
            time > 0.1
        ) {

            break;
        }


        if (
            x > canvas.width
        ) {

            break;
        }

    }


    ctx.strokeStyle = "blue";

    ctx.lineWidth = 2;

    ctx.stroke();
}


/* =========================================
   SPEED
========================================= */

function changeSpeed() {

    switch (speedSet) {

        case 1:
            speedSet = 5;
            break;

        case 5:
            speedSet = 10;
            break;

        case 10:
            speedSet = 20;
            break;

        case 20:
            speedSet = 1;
            break;

    }


    speedMultiplier =
        speedSet * 0.1;


    speedButton.textContent =
        speedSet + "x";
}


/* =========================================
   START SIMULATION
========================================= */

function startSimulation() {

    solve();

    t = 0;


    if (!moving) {

        moving = true;

        move();

    }

}


/* =========================================
   ANIMATE PROJECTILE
========================================= */

function move() {

    if (!moving) {
        return;
    }


    const effectiveDt =
        dt * speedMultiplier;


    t += effectiveDt;


    const x =
        xi +
        v_x * t;


    const y =
        yi +
        v_y_i * t +
        0.5 * g * t * t;


    ball.style.left =
        x + "px";


    ball.style.top =
        y + "px";


    if (
        y < yi &&
        x < canvas.width
    ) {

        requestAnimationFrame(
            move
        );

    } else {

        stopSimulation();

    }

}


/* =========================================
   STOP SIMULATION
========================================= */

function stopSimulation() {

    moving = false;

    t = 0;


    ball.style.left =
        xi + "px";


    ball.style.top =
        yi + "px";

}


/* =========================================
   SCIENTIFIC CALCULATOR
========================================= */

let calculatorExpression = "";

let angleModeValue = "RAD";


const expressionDisplay =
    document.getElementById(
        "expression"
    );


const resultDisplay =
    document.getElementById(
        "result"
    );


const angleModeButton =
    document.getElementById(
        "angleMode"
    );


/* =========================================
   UPDATE CALCULATOR DISPLAY
========================================= */

function updateCalculatorDisplay() {

    expressionDisplay.textContent =
        calculatorExpression;


    if (
        calculatorExpression === ""
    ) {

        resultDisplay.textContent =
            "0";

    }

}


/* =========================================
   ADD CALCULATOR VALUE
========================================= */

function appendValue(value) {

    calculatorExpression += value;

    updateCalculatorDisplay();

}


/* =========================================
   CLEAR CALCULATOR
========================================= */

function clearCalculator() {

    calculatorExpression = "";

    expressionDisplay.textContent = "";

    resultDisplay.textContent = "0";

}


/* =========================================
   BACKSPACE
========================================= */

function backspace() {

    calculatorExpression =
        calculatorExpression.slice(
            0,
            -1
        );

    updateCalculatorDisplay();

}


/* =========================================
   BASIC CALCULATION
========================================= */

function calculate() {

    if (
        calculatorExpression === ""
    ) {

        return;
    }


    try {

        let calculation =
            calculatorExpression

                .replace(
                    /×/g,
                    "*"
                )

                .replace(
                    /÷/g,
                    "/"
                )

                .replace(
                    /−/g,
                    "-"
                )

                .replace(
                    /π/g,
                    "Math.PI"
                )

                .replace(
                    /\be\b/g,
                    "Math.E"
                );


        /*
         * Only allow mathematical
         * characters.
         */

        if (
            !/^[0-9+\-*/().\s*]+$/
                .test(calculation)
        ) {

            throw new Error();

        }


        const answer =
            Function(
                '"use strict"; return (' +
                calculation +
                ')'
            )();


        if (
            !Number.isFinite(answer)
        ) {

            throw new Error();

        }


        resultDisplay.textContent =
            formatNumber(answer);


    } catch (error) {

        resultDisplay.textContent =
            "Error";

    }

}


/* =========================================
   FORMAT NUMBER
========================================= */

function formatNumber(number) {

    if (
        Number.isInteger(number)
    ) {

        return number.toString();

    }


    return Number(
        number.toFixed(10)
    ).toString();

}


/* =========================================
   ANGLE CONVERSION
========================================= */

function toRadians(value) {

    if (
        angleModeValue === "DEG"
    ) {

        return (
            value *
            Math.PI /
            180
        );

    }


    return value;

}


/* =========================================
   SCIENTIFIC FUNCTIONS
========================================= */

function calculateFunction(type) {

    let value;


    try {

        /*
         * Get current value
         */

        if (
            calculatorExpression !== ""
        ) {

            let calculation =
                calculatorExpression

                    .replace(
                        /×/g,
                        "*"
                    )

                    .replace(
                        /÷/g,
                        "/"
                    )

                    .replace(
                        /−/g,
                        "-"
                    )

                    .replace(
                        /π/g,
                        "Math.PI"
                    )

                    .replace(
                        /\be\b/g,
                        "Math.E"
                    );


            value =
                Function(
                    '"use strict"; return (' +
                    calculation +
                    ')'
                )();

        } else {

            value =
                Number(
                    resultDisplay.textContent
                );

        }


        if (
            !Number.isFinite(value)
        ) {

            throw new Error();

        }


        let answer;


        switch (type) {

            /* √ */

            case "sqrt":

                if (
                    value < 0
                ) {

                    throw new Error();

                }

                answer =
                    Math.sqrt(value);

                break;


            /* x² */

            case "square":

                answer =
                    value ** 2;

                break;


            /* xʸ */

            case "power":

                calculatorExpression =
                    value + "**";

                expressionDisplay.textContent =
                    calculatorExpression;

                resultDisplay.textContent =
                    value;

                return;


            /* 1/x */

            case "inverse":

                if (
                    value === 0
                ) {

                    throw new Error();

                }

                answer =
                    1 / value;

                break;


            /* SIN */

            case "sin":

                answer =
                    Math.sin(
                        toRadians(value)
                    );

                break;


            /* COS */

            case "cos":

                answer =
                    Math.cos(
                        toRadians(value)
                    );

                break;


            /* TAN */

            case "tan":

                answer =
                    Math.tan(
                        toRadians(value)
                    );

                break;


            /* LOG */

            case "log":

                if (
                    value <= 0
                ) {

                    throw new Error();

                }

                answer =
                    Math.log10(value);

                break;


            /* LN */

            case "ln":

                if (
                    value <= 0
                ) {

                    throw new Error();

                }

                answer =
                    Math.log(value);

                break;


            /* FACTORIAL */

            case "factorial":

                answer =
                    factorial(value);

                break;


            /* PI */

            case "pi":

                answer =
                    Math.PI;

                break;


            /* E */

            case "e":

                answer =
                    Math.E;

                break;


            /* ABS */

            case "abs":

                answer =
                    Math.abs(value);

                break;


            /* PERCENT */

            case "percent":

                answer =
                    value / 100;

                break;


            /* EXP */

            case "exp":

                answer =
                    Math.exp(value);

                break;


            default:

                answer =
                    value;

        }


        calculatorExpression = "";


        expressionDisplay.textContent =
            type.toUpperCase();


        resultDisplay.textContent =
            formatNumber(answer);


    } catch (error) {

        resultDisplay.textContent =
            "Error";

    }

}


/* =========================================
   FACTORIAL
========================================= */

function factorial(number) {

    if (
        number < 0 ||
        !Number.isInteger(number)
    ) {

        throw new Error();

    }


    if (
        number > 170
    ) {

        throw new Error();

    }


    let answer = 1;


    for (
        let i = 2;
        i <= number;
        i++
    ) {

        answer *= i;

    }


    return answer;

}


/* =========================================
   RAD / DEG
========================================= */

angleModeButton.addEventListener(
    "click",
    function() {

        if (
            angleModeValue === "RAD"
        ) {

            angleModeValue = "DEG";

            angleModeButton.textContent =
                "DEG";

        } else {

            angleModeValue = "RAD";

            angleModeButton.textContent =
                "RAD";

        }

    }
);


/* =========================================
   CALCULATOR KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        if (
            (
                key >= "0" &&
                key <= "9"
            ) ||
            key === "." ||
            key === "(" ||
            key === ")"
        ) {

            appendValue(key);

            return;

        }


        if (
            key === "+"
        ) {

            appendValue("+");

        }


        else if (
            key === "-"
        ) {

            appendValue("−");

        }


        else if (
            key === "*"
        ) {

            appendValue("×");

        }


        else if (
            key === "/"
        ) {

            appendValue("÷");

        }


        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        else if (
            key === "Backspace"
        ) {

            backspace();

        }


        else if (
            key === "Escape"
        ) {

            clearCalculator();

        }

    }
);


/* =========================================
   PHYSICS SEARCH DATABASE
========================================= */

const physicsData = [

    {
        name: "Velocity",

        definition:
            "Velocity is the rate of change of displacement with respect to time.",

        formula:
            "v = d / t"
    },

    {
        name: "Acceleration",

        definition:
            "Acceleration is the rate of change of velocity with respect to time.",

        formula:
            "a = Δv / Δt"
    },

    {
        name: "Force",

        definition:
            "Force is a push or pull that can change the motion of an object.",

        formula:
            "F = ma"
    },

    {
        name: "Momentum",

        definition:
            "Momentum is the product of an object's mass and velocity.",

        formula:
            "p = mv"
    },

    {
        name: "Kinetic Energy",

        definition:
            "Kinetic energy is the energy possessed by an object because of its motion.",

        formula:
            "KE = ½mv²"
    },

    {
        name: "Potential Energy",

        definition:
            "Gravitational potential energy depends on mass, gravity, and height.",

        formula:
            "PE = mgh"
    },

    {
        name: "Projectile Motion",

        definition:
            "Projectile motion is the motion of an object launched into the air under the influence of gravity.",

        formula:
            "x = vₓt"
    },

    {
        name: "Gravity",

        definition:
            "Gravity is the force that attracts objects toward Earth.",

        formula:
            "g ≈ 9.81 m/s²"
    }

];


/* =========================================
   PHYSICS SEARCH
========================================= */

function searchPhysics() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const results =
        document.getElementById(
            "searchResults"
        );


    const search =
        input.value
            .toLowerCase()
            .trim();


    if (
        search === ""
    ) {

        results.innerHTML = "";

        return;

    }


    const matches =
        physicsData.filter(
            item =>

                item.name
                    .toLowerCase()
                    .includes(search) ||

                item.definition
                    .toLowerCase()
                    .includes(search)
        );


    if (
        matches.length === 0
    ) {

        results.innerHTML =
            "<p>No physics topic found.</p>";

        return;

    }


    results.innerHTML =
        matches.map(
            item => `

            <div class="search-item">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.definition}
                </p>

                <strong>
                    Formula: ${item.formula}
                </strong>

            </div>

        `
        ).join("");

}


/* =========================================
   PROJECTILE MOTION QUESTION GENERATOR
   10 QUESTIONS
========================================= */

const questions = [

    // =================================
    // DEFINITIONS (1-3)
    // =================================

    {
        question: " What is projectile motion?",

        choices: [
            "Motion of an object in a straight line",
            "Motion of an object launched into the air under the influence of gravity",
            "Motion of an object moving in a circle",
            "Motion of an object at rest"
        ],

        answer: "Motion of an object launched into the air under the influence of gravity"
    },

    {
        question: " What is the trajectory of a projectile?",

        choices: [
            "The speed of an object",
            "The force acting on an object",
            "The curved path followed by a projectile",
            "The time an object takes to move"
        ],

        answer: "The curved path followed by a projectile"
    },

    {
        question: " What force primarily affects the motion of an ideal projectile when air resistance is ignored?",

        choices: [
            "Friction",
            "Magnetic force",
            "Gravity",
            "Applied force"
        ],

        answer: "Gravity"
    },


    // =================================
    // FORMULAS (4-6)
    // =================================

    {
        question: " Which formula is used to calculate the horizontal velocity of a projectile?",

        choices: [
            "vx = vi sin θ",
            "vx = vi cos θ",
            "vx = gt",
            "vx = ½gt²"
        ],

        answer: "vx = vi cos θ"
    },

    {
        question: " Which formula is used to calculate the maximum height of a projectile launched and landing at the same level?",

        choices: [
            "H = (vi² sin² θ) / 2g",
            "H = vi t",
            "H = (vi cos θ) / g",
            "H = gt"
        ],

        answer: "H = (vi² sin² θ) / 2g"
    },

    {
        question: " Which formula is used to calculate the total time of flight when a projectile lands at the same height from which it was launched?",

        choices: [
            "T = (vi cos θ) / g",
            "T = vi² / 2g",
            "T = (2vi sin θ) / g",
            "T = vi t"
        ],

        answer: "T = (2vi sin θ) / g"
    },


    // =================================
    // PROBLEM SOLVING (7-10)
    // =================================

    {
        question: " A ball is launched horizontally at a velocity of 20 m/s. What is its horizontal velocity after 3 seconds?",

        choices: [
            "9.8 m/s",
            "20 m/s",
            "29.4 m/s",
            "60 m/s"
        ],

        answer: "20 m/s"
    },

    {
        question: " A projectile is launched with an initial velocity of 20 m/s at an angle of 30°. What is its initial vertical velocity?",

        choices: [
            "5 m/s",
            "10 m/s",
            "17.32 m/s",
            "20 m/s"
        ],

        answer: "10 m/s"
    },

    {
        question: " A projectile is launched with an initial velocity of 20 m/s at an angle of 30°. What is its total time of flight if it lands at the same height?",

        choices: [
            "1.02 seconds",
            "2.04 seconds",
            "3.50 seconds",
            "4.08 seconds"
        ],

        answer: "2.04 seconds"
    },

    {
        question: " A projectile is launched at an initial velocity of 20 m/s at an angle of 45°. What is its maximum height?",

        choices: [
            "5.10 m",
            "10.20 m",
            "15.30 m",
            "20.40 m"
        ],

        answer: "10.20 m"
    }

];


/* =========================================
   QUIZ VARIABLES
========================================= */

let currentQuestion = null;

let score = 0;

let totalQuestions = 0;

let answered = false;

let previousQuestionIndex = -1;

let nextQuestionTimer = null;


/* =========================================
   GENERATE QUESTION
========================================= */

function generateQuestion() {

    clearTimeout(nextQuestionTimer);

    answered = false;

    const questionText =
        document.getElementById("questionText");

    const choicesContainer =
        document.getElementById("choices");

    const feedback =
        document.getElementById("questionFeedback");

    const startButton =
        document.getElementById("startQuestionButton");


    // Pick a random question without
    // immediately repeating the previous one

    let randomIndex;

    if (questions.length > 1) {

        do {

            randomIndex = Math.floor(
                Math.random() * questions.length
            );

        } while (
            randomIndex === previousQuestionIndex
        );

    } else {

        randomIndex = 0;

    }


    previousQuestionIndex = randomIndex;

    currentQuestion = questions[randomIndex];


    // Display question

    questionText.textContent =
        currentQuestion.question;


    // Clear previous choices and feedback

    choicesContainer.innerHTML = "";

    feedback.textContent = "";

    feedback.style.color = "";


    // Hide Start Quiz button

    if (startButton) {

        startButton.style.display = "none";

    }


    // Display four choices

    currentQuestion.choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.className = "choice";

        button.textContent = choice;

        button.onclick = function() {

            checkAnswer(choice, button);

        };

        choicesContainer.appendChild(button);

    });

}


/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(selectedAnswer, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    totalQuestions++;

    const allChoices =
        document.querySelectorAll(".choice");

    const feedback =
        document.getElementById("questionFeedback");


    // Disable all choices

    allChoices.forEach(button => {

        button.disabled = true;

    });


    // Check answer

    if (selectedAnswer === currentQuestion.answer) {

        score++;

        selectedButton.classList.add("correct");

        feedback.textContent =
            "✓ Correct! Great job!";

        feedback.style.color = "green";

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "✗ Incorrect! The correct answer is: " +
            currentQuestion.answer;

        feedback.style.color = "red";


        // Highlight correct answer

        allChoices.forEach(button => {

            if (
                button.textContent === currentQuestion.answer
            ) {

                button.classList.add("correct");

            }

        });

    }


    // Update score

    document.getElementById("score").textContent =
        "Score: " + score + " / " + totalQuestions;


    // Automatically load next question

    feedback.textContent += " Next question loading...";

    nextQuestionTimer = setTimeout(function() {

        generateQuestion();

    }, 1500);

}


/* =========================================
   INITIAL SETUP
========================================= */

window.addEventListener(
    "load",
    function() {

        resizeCanvas();

        ball.style.left =
            xi + "px";

        ball.style.top =
            yi + "px";

    }
);

