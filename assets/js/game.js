//* Get elements

const question = document.querySelector('#question'),
    choises = Array.from(document.querySelectorAll('.choise-text')),
    progressText = document.querySelector('#progressText'),
    scoreText = document.querySelector('#score'),
    progressBarFull = document.querySelector('#progressBarFull');



let currentQuestion = {},
    acceptAnswers = true,
    score = 0,
    questionCounter = 0,
    availableQuestions = [];

let questions = [{
        question: "Tərəfləri 12 sm, 13 sm və 5 sm olan üçbucağın perimetrini tapın.",
        choise1: '48sm',
        choise2: '40sm',
        choise3: '28sm',
        choise4: '30sm',
        answer: 4
    },
    {
        question: "Balıqçı 15 kq balıq ovladı və onları bir birindən fərqlənən 5 hissəyə ayırdı. Bunu necə etdi?",
        choise1: '2,4,4,1,5',
        choise2: '3,2,1,5,4',
        choise3: '1,2,4,5,6',
        choise4: 'edə bilməz',
        answer: 2
    },
    {
        question: "Bir qutuda 40 ədəd qələm, digər qutuda isə onun yarısı qədər az qələm var.Bütün qələmlərin yarısının yarısı nə qədərdir?",
        choise1: '15',
        choise2: '60',
        choise3: '30',
        choise4: '20',
        answer: 1
    },
    {
        question: "Bir qarpızın və onunla eyni olan digər qarpızın yarısının birlikdə çəkisi 9 kq-dır. Qarpızın çəkisi nə qədərdir?",
        choise1: '4',
        choise2: '9',
        choise3: '8',
        choise4: '6',
        answer: 4
    },
    {
        question: "Boşqabda 6 dilim çörək var. İki dilim çörəyi iki bərabər yerə böldülər. Boşqabda neçə dilim çörək oldu?",
        choise1: '6',
        choise2: '10',
        choise3: '8',
        choise4: '9',
        answer: 3
    },
    {
        question: "Bu gün qardaş bacısından 4 yaş böyükdür. 5 ildən sonra o, bacısından neçə yaş böyük olar?",
        choise1: '4',
        choise2: '9',
        choise3: '1',
        choise4: '20',
        answer: 1
    },
    {
        question: "6 kartof 30 dəqiqəyə bişir. Sizcə bir kartof necə dəqiqəyə bişər?",
        choise1: '10',
        choise2: '5',
        choise3: '30',
        choise4: '15',
        answer: 3
    },
    {
        question: "Vaşaq 6 saat ərzində 600 kq , pələng isə ondan iki dəfə tez yeyir.Onlar birlikdə bu qədər əti neçə saata yeyər?",
        choise1: '4',
        choise2: '3',
        choise3: '1',
        choise4: '2',
        answer: 4
    },
    {
        question: "Tutuquşunun, pişiyin və köpəyin birlikdə 8 yaşı var. 2 ildən sonra onların birlikdə yaşları nə qədər olar?",
        choise1: '8',
        choise2: '14',
        choise3: '10',
        choise4: '12',
        answer: 2
    },
    {
        question: "Aynur ön tərəfdən ikinci , arxa tərəfdən isə dördüncü olan partanın arxasında oturmuşdur. Bu sıradakı partaların sayıni tapa bilərsinizmi?",
        choise1: '4',
        choise2: '3',
        choise3: '5',
        choise4: '6',
        answer: 3
    },


];

const SCORE_POINTS = 100;
const MAX_QUESTION = 10;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTION) {
        localStorage.setItem('mostResentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.inneText = `Question ${questionCounter} of ${MAX_QUESTION}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION)*100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choises.forEach(choise => {
        const number = choise.dataset['number'];
        choise.innerText = currentQuestion['choise' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptAnswers = true;
}

choises.forEach(choise => {
    choise.addEventListener('click', e => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoise = e.target;
        const selectedAnswer = selectedChoise.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoise.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoise.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);


    });
});

function incrementScore(num) {
    score += num;
    scoreText.inneText = score;
}

startGame();