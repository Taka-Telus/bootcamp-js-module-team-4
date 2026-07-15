let gameObject;
let total_score = 0;

async function loadData() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("No se recibió un id en la URL.");
        return;
    }

    try {
        const response = await fetch(
            `https://quiz-api.cesar-kastli.workers.dev/games/${id}`
        );

        gameObject = await response.json();

        actualizarPuntaje();

        jugar();
    } catch (error) {
        console.log(error);
    }
}

async function loadScoreboard() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("No se recibió un id en la URL.");
        return;
    }

    try {
        const response = await fetch(
            `https://quiz-api.cesar-kastli.workers.dev/games/${id}/scores`
        );

        gameObject = await response.json();

        actualizarPuntaje();

        jugar();
    } catch (error) {
        console.log(error);
    }
}

loadData();

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

async function jugar() {

    for (let i = 0; i < gameObject.questions.length; i++) {

        const question = gameObject.questions[i];

        document.querySelector(".question-number").textContent =
            `Pregunta ${i + 1} de ${gameObject.questions.length}`;

        const correctAnswer = question.options[0];

        const options = [...question.options];
        shuffle(options);

        document.querySelector("#question-title").textContent = question.text;

        const cards = document.querySelectorAll(".option-card");

        cards.forEach((card, index) => {
            card.textContent = options[index];
            card.dataset.option = options[index];
            card.classList.remove("correct", "incorrect");
        });

        const resultado = await iniciarTimer(correctAnswer);

        if (resultado.correcta) {
            total_score = calcularPuntaje(resultado.tiempo, total_score);
        }

        actualizarPuntaje();
    }

    document.querySelector(".question-title").textContent =
        "¡Juego terminado!";

    document.querySelector(".question-number").textContent =
        `Puntaje final: ${Math.round(total_score)}`;

    document.querySelectorAll(".option-card").forEach(card => {
        card.style.display = "none";
    });

    document.querySelector("#next-option").hidden = true;


}

function calcularPuntaje(time, current_score) {
    return current_score + (time * 10);
}

function actualizarPuntaje() {
    document.querySelector(".puntaje").textContent =
        `Puntaje: ${Math.round(total_score)}`;
}

function iniciarTimer(correctAnswer) {

    return new Promise((resolve) => {

        let inicio = performance.now();
        let terminado = false;

        const nextOption = document.querySelector("#next-option");
        nextOption.hidden = true;

        const cards = document.querySelectorAll(".option-card");

        const timeout = setTimeout(() => {

            if (terminado) return;

            terminado = true;

            cards.forEach(card => {

                if (card.dataset.option === correctAnswer) {
                    card.classList.add("correct");
                }

                card.onclick = null;
            });

            nextOption.hidden = false;

            nextOption.onclick = () => {

                nextOption.hidden = true;
                nextOption.onclick = null;

                cards.forEach(card => {
                    card.classList.remove("correct", "incorrect");
                });

                resolve({
                    correcta: false,
                    tiempo: 0
                });
            };

        }, 30000);

        cards.forEach(card => {

            card.onclick = () => {

                if (terminado) return;

                terminado = true;

                clearTimeout(timeout);

                const transcurrido = (performance.now() - inicio) / 1000;
                const tiempoRestante = Math.max(0, 30 - transcurrido);

                cards.forEach(c => c.onclick = null);

                if (card.dataset.option === correctAnswer) {

                    card.classList.add("correct");

                    nextOption.hidden = false;

                    nextOption.onclick = () => {

                        nextOption.hidden = true;
                        nextOption.onclick = null;

                        cards.forEach(c => {
                            c.classList.remove("correct", "incorrect");
                        });

                        resolve({
                            correcta: true,
                            tiempo: tiempoRestante
                        });

                    };

                } else {

                    card.classList.add("incorrect");

                    cards.forEach(c => {

                        if (c.dataset.option === correctAnswer) {
                            c.classList.add("correct");
                        }

                    });

                    nextOption.hidden = false;

                    nextOption.onclick = () => {

                        nextOption.hidden = true;
                        nextOption.onclick = null;

                        cards.forEach(c => {
                            c.classList.remove("correct", "incorrect");
                        });

                        resolve({
                            correcta: false,
                            tiempo: 0
                        });

                    };

                }

            };

        });

    });

}