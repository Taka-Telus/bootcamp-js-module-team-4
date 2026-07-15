const addQuestion = document.getElementById('addQuestion');
const questionsContainer = document.getElementById('questions');

questionsContainer.addEventListener("click", e => {
    if (e.target.closest('button')?.classList.contains('delete-question')) {
        e.target.closest('.question').remove()
    }
})



addQuestion.addEventListener("click", () => {
    console.log("lol");
    const question = document.createElement("div");
    question.innerHTML = `
                <div class="insertQuestion">
                    <p id="" class="numberQuestion">1</p>
                    <input type="text" id="inputQuestion" class="inputQuestion"/>
                    <button><span class="material-symbols-outlined">delete</span></button>
                </div>
                
                <div class="selectAnswer">
                    <div class="answerContainer">
                        <p>A.</p>
                        <input type="text" class="inputAnswer" />
                        <button id="answerA"></button>
                    </div>
                    
                    <div class="answerContainer">
                        <p>B.</p>
                        <input type="text" class="inputAnswer" />
                        <button id="answerB"></button>
                    </div>
                    
                    <div class="answerContainer">
                        <p>C.</p>
                        <input type="text" class="inputAnswer" />
                        <button id="answerC"></button>
                    </div>
                    <div class="answerContainer">
                        <p>D.</p>
                        <input type="text" class="inputAnswer" />
                        <button id="answerD"></button>
                    </div>
    `
    questionsContainer.appendChild(question);

});

function borrar() {
    // const questionDelete = 
    // questionDelete.remove();
    console.log('borrar')
}