const addQuestion = document.getElementById('addQuestion');
const questionsContainer = document.getElementById('questions');
let questionNumber = 0;


// -------------------------
//   Seleccion de pregunta
// -------------------------

questionsContainer.addEventListener("click", e => {
    if (e.target.closest('button')?.classList.contains('delete-question')) {
        e.target.closest('.question').remove()
    }
    if (e.target.classList.contains('answerButton')) {

        const question = e.target.closest('.question');
        question.querySelectorAll('.answerButton').forEach(btn => {
            btn.innerHTML = '';
            btn.classList.remove('selectedCorrect');
        });
        e.target.innerHTML = 'si marco';
        e.target.classList.add('selectedCorrect');
    }
});

document.getElementById('backHome').addEventListener("click", () => {
    window.location.href = "../home/home.html";
});


    // ------------------
    //   Añade Preguntas
    // ------------------

    addQuestion.addEventListener("click", () => {

        let questionNumber = questionsContainer.children.length + 1;

    const question = document.createElement("div");
    question.innerHTML = `
            <div class="question">

                <div class="insertQuestion">
                    <p id="${questionNumber}" class="numberQuestion">${questionNumber}</p>
                    <input type="text" id="inputQuestion.${questionNumber}" class="inputQuestion" name="questions.${questionNumber}"/>
                    <button class="delete-question"><span class="material-symbols-outlined">delete</span></button>
                </div>
                
                <div class="selectAnswer">
                    <div class="answerContainer">
                        <p>A.</p>
                        <input type="text" class="inputAnswer" name="answerWrong.${questionNumber}"/>
                        <button class="answerButton" id="buttonA.${questionNumber}"></button>
                    </div>
                    
                    <div class="answerContainer">
                        <p>B.</p>
                        <input type="text" class="inputAnswer" name="answerWrong.${questionNumber}"/>
                        <button class="answerButton" id="buttonB.${questionNumber}"></button>
                    </div>
                    
                    <div class="answerContainer">
                        <p>C.</p>
                        <input type="text" class="inputAnswer" name="answerWrong.${questionNumber}"/>
                        <button class="answerButton" id="buttonC.${questionNumber}"></button>
                    </div>
                    <div class="answerContainer">
                        <p>D.</p>
                        <input type="text" class="inputAnswer" name="answerWrong.${questionNumber}"/>
                        <button class="answerButton" id="buttonD.${questionNumber}"></button>
                    </div>
                    
                </div>
            </div>
    `
    questionsContainer.appendChild(question);
});

const deleteAllGame = document.getElementById('deleteAllGameButton')


// --------------
//   Delate Game
// --------------

deleteAllGame.addEventListener("click", () => {

});

// ------------------
//   Cancel Game
// ------------------
const cancelGame = document.getElementById('cancelButton')

cancelGame.addEventListener("click", () => {

});


// ------------
//   Save Game
// ------------
const saveGame = document.getElementById('saveChangesButton')
let tittleGame = document.getElementById('tittleGame');

saveGame.addEventListener("click", () => {
    if (!validateInputs()) {
        return;
    }
    const gameData = extractQuestions();
    console.log(gameData);
});

// -----------------------------------------
//   Valida los inputs que no esten vacios
// -----------------------------------------

function validateInputs() {
    let esValido = true;

    const tildeInputs = (input) => {
        if (!input.value.trim()) {
            input.classList.add('invalid');
            esValido = false;
        } else {
            input.classList.remove('invalid');
        }
    };

    const basicInputs = [tittleGame, document.getElementById('description'), document.getElementById('imagenURL')];
    basicInputs.forEach(tildeInputs);

    questionsContainer.querySelectorAll('.inputQuestion, .inputAnswer').forEach(tildeInputs);

    return esValido;
}


// ---------------------------------
//   Extraer preguntas y respuestas
// ---------------------------------

function extractQuestions() {
    let data = {};

    const questionDivs = questionsContainer.querySelectorAll('.question');
    questionDivs.forEach((questionDiv, questionIndex) => {
        const questionText = questionDiv.querySelector('.inputQuestion').value;

        setDeep(data, `questions.${questionIndex}.tittle`, questionText);

        const answerContainers = questionDiv.querySelectorAll('.answerContainer');
        let correctAnswer = null;
        const wrongAnswers = [];

        answerContainers.forEach(container => {
            const answerText = container.querySelector('.inputAnswer').value;
            const esCorrecto = container.querySelector('.answerButton').classList.contains('selectedCorrect');
            
            if (esCorrecto) {
                correctAnswer = answerText;
            } else {
                wrongAnswers.push(answerText);
            }
        });

        const orderedAnswers = [correctAnswer, ...wrongAnswers];

        orderedAnswers.forEach((answerText, answerIndex) => {
            setDeep(data, `questions.${questionIndex}.text.${answerIndex}`, answerText);
        });
    });

    return data;
}


// --------------------------------------------
//   setDeep del cesar (NO TOCAR!!!!!!!!!!!!)
// -------------------------------------------
// nota: pedir q te lo explique cesar por si acaso

function setDeep(obj, path, value) {
        const parts = typeof path === "string" ? path.split(".") : path;
        let current = obj;
        for (let i = 0; i < parts.length; i++) {
            const key = parts[i];
            const isLast = i === parts.length - 1;
            if (isLast) {
                current[key] = value;
            } else {

                const nextKey = parts[i + 1];
                const nextIsArray = !isNaN(Number(nextKey));
                if (current[key] === undefined) {
                    current[key] = nextIsArray ? [] : {};
                }
                current = current[key];
            }
        }
        return obj;
    }

//---------------
// Enviar Juego 
//---------------
