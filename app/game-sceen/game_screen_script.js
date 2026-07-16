let gameObject;
let total_score = 0;

const API = "https://quiz-api.cesar-kastli.workers.dev";

async function loadData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("No se recibió un id en la URL.");
        return;
    }

    try {
        const response = await fetch(`${API}/games/${id}`);

        gameObject = await response.json();

        updateScore();

        playGame();

    } catch (error) {
        console.log(error);
    }
}

loadData();


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


async function playGame() {

    for (let i = 0; i < gameObject.questions.length; i++) {

        const question = gameObject.questions[i];

        document.querySelector(".question-number").textContent =
            `Pregunta ${i + 1} de ${gameObject.questions.length}`;


        const correctAnswer = question.options[0];

        const options = [...question.options];
        shuffle(options);


        document.querySelector("#question-title").textContent =
            question.text;


        const cards = document.querySelectorAll(".option-card");


        cards.forEach((card, index) => {

            card.style.display = "block";

            card.innerHTML = `
                <span>${String.fromCharCode(65 + index)}</span>
                <p>${options[index]}</p>
            `;

            card.dataset.option = options[index];

            card.classList.remove(
                "correct",
                "incorrect"
            );

        });


        await startTimer(correctAnswer);
    }


    finishGame();

}



function calculateScore(time, current_score) {

    return current_score + (time * 10);

}



function updateScore() {

    document.querySelector(".puntaje").textContent =
        `Puntaje: ${Math.round(total_score)}`;

}



function startTimer(correctAnswer) {


    return new Promise((resolve) => {


        let inicio = performance.now();
        let terminado = false;


        const timeText =
            document.querySelector(".time-left p");


        const timeBar =
            document.querySelector(".time-bar");


        const nextOption =
            document.querySelector("#next-option");


        nextOption.hidden = true;


        const cards =
            document.querySelectorAll(".option-card");


        timeBar.style.width = "100%";


        const intervalo = setInterval(() => {


            if (terminado) {

                clearInterval(intervalo);
                return;

            }


            const pasado =
                (performance.now() - inicio) / 1000;


            const restante =
                Math.max(0, 30 - pasado);



            timeText.textContent =
                Math.ceil(restante);



            timeBar.style.width =
                `${100 - (restante / 30) * 100}%`;



        }, 100);




        const timeout = setTimeout(() => {


            if (terminado) return;


            terminado = true;


            clearInterval(intervalo);



            cards.forEach(card => {


                if (card.dataset.option === correctAnswer) {

                    card.classList.add("correct");

                }


                card.onclick = null;


            });



            nextOption.hidden = false;



            nextOption.onclick = () => {


                nextOption.hidden = true;


                cards.forEach(card => {

                    card.classList.remove(
                        "correct",
                        "incorrect"
                    );

                });


                resolve();


            };



        }, 30000);





        cards.forEach(card => {



            card.onclick = () => {



                if (terminado) return;



                terminado = true;


                clearTimeout(timeout);

                clearInterval(intervalo);



                const transcurrido =
                    (performance.now() - inicio) / 1000;



                const tiempoRestante =
                    Math.max(0, 30 - transcurrido);



                cards.forEach(c => {

                    c.onclick = null;

                });

                const popup = document.querySelector("#question-popup");


                if (card.dataset.option === correctAnswer) {


                    card.classList.add("correct");

                    popup.textContent = "¡Respuesta correcta!";
                    popup.classList.remove("wrong");
                    popup.classList.add("right");
                    popup.style.display = "block";


                    total_score =
                        calculateScore(
                            tiempoRestante,
                            total_score
                        );


                    updateScore();


                } else {


                    card.classList.add("incorrect");


                    cards.forEach(c => {

                        if (c.dataset.option === correctAnswer) {

                            c.classList.add("correct");

                        }

                    });


                    popup.textContent = "¡Respuesta incorrecta!";
                    popup.classList.remove("right");
                    popup.classList.add("wrong");
                    popup.style.display = "block";


                }




                nextOption.hidden = false;



                nextOption.onclick = () => {

                    nextOption.hidden = true;


                    const popup = document.querySelector("#question-popup");

                    popup.style.display = "none";


                    cards.forEach(c => {

                        c.classList.remove(
                            "correct",
                            "incorrect"
                        );

                    });


                    resolve();

                };



            };



        });



    });


}

async function finishGame() {


    const params =
        new URLSearchParams(window.location.search);


    const id =
        params.get("id");


    await fetch(`${API}/games/${id}/scores`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            playerName: "invitado",

            score: Math.round(total_score)

        })

    });


    const response =
        await fetch(`${API}/games/${id}/scores`);

    let scores =
        await response.json();

    scores.sort((a, b) => b.score - a.score);

    const top5 =
        scores.slice(0, 5);


    document.querySelector(".game_content").style.display =
        "none";



    document.querySelector("body").style.textAlign =
        "center";


    const scoreboard =
        document.querySelector("#scoreboard");


    scoreboard.innerHTML = "";

    scoreboard.style.display = "block";



    const titulo =
        document.createElement("h1");


    titulo.textContent =
        "Scoreboard";


    scoreboard.appendChild(titulo);

    top5.forEach((player, index) => {


        const li =
            document.createElement("li");


        li.textContent =
            `${player.playerName} - ${player.score}`;


        scoreboard.appendChild(li);

    });

    const playAgainButton = document.querySelector("#play-again");
    const homeButton = document.querySelector("#home");


    playAgainButton.style.display = 'inline';
    homeButton.style.display = 'inline';

    playAgainButton.onclick = () => {
        location.reload();
    };


    homeButton.onclick = () => {
        window.location.href = "#";
    };


}