let questionField = document.querySelector(".quiz-quest h1")
let btnAnswer = document.querySelectorAll(".answer-btn")
let wrapper = document.querySelector(".wrapper")
let startScreen = document.querySelector(".start")
let quizScreen = document.querySelector(".quiz-quest")
let endScreen = document.querySelector(".end")
let startBtn = document.querySelector(".start-btn")
let restartBtn = document.querySelector(".restart-btn")
let endScreenTitle = document.querySelector(".end h1")
let quizCounter = document.querySelector(".quiz_counter")
let inputName = document.querySelector(".input-name")

let timerEl = document.querySelector(".timer")
let initialTimer

let signs = ["+", "-", "/", "*"]
let answerFromUser
let correctAnswersFromUser
let currentQuestion

function startTimer() {
    let number = 10
    timerEl.innerHTML = number

    initialTimer = setInterval(function() {
        if (number === 1) {
            timerEl.innerHTML = 0
            clearInterval(initialTimer)
            changeColor("red")
            nextQuestion()
        } else {
            number--
            timerEl.innerHTML = number
        }
    }, 1000)
}

class Question {
    constructor() {
        this.a = +rdnum(10, 80)
        this.b = +rdnum(10, 80)
        this.sign = shuffle(signs)[0]
        this.quest = `${this.a} ${this.sign} ${this.b}`
        if (this.sign == "+") this.answercorr = this.a + this.b
        if (this.sign == "-") this.answercorr = this.a - this.b
        if (this.sign == "/") this.answercorr = (this.a / this.b).toFixed(2)
        if (this.sign == "*") this.answercorr = this.a * this.b
        
        this.max = +this.answercorr + (+this.answercorr * 0.5)
        this.min = +this.answercorr - (+this.answercorr * 0.5)

        this.answers = [this.answercorr]

        while (this.answers.length < 5) {

          let rundomNumber = rdnum(this.min, this.max)

            if (!this.answers.includes(rundomNumber)) {
              this.answers.push(rundomNumber)
           }
        }
        shuffle(this.answers)
    }
display() {
    questionField.innerHTML = this.quest
    for (let i = 0; i < 5; i++) {
        btnAnswer[i].innerHTML = this.answers[i]
    }
  }
}


restartBtn.addEventListener("click", startQuiz)

for (let i = 0; i < 5; i++) {
    btnAnswer[i].addEventListener("click", function() {
        if(btnAnswer[i].innerHTML == currentQuestion.answercorr) {
         changeColor("green")
         correctAnswersFromUser += 1
        } else {
         changeColor("red")
        }

        clearInterval(initialTimer)
        nextQuestion()
    })
}

function rdnum (min, max) {

    if (max < 6 && min < 2) {
        return(Math.random() * (max - min) + min).toFixed(2)
    }

    return(Math.random() * (max - min) + min).toFixed()
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function changeColor(color) {
    wrapper.style.background = color

    setTimeout(function () {
        wrapper.style.background = "white"
    }, 800)
}

function nextQuestion() {
    toggletatusBtn(true)
    answerFromUser += 1

    setTimeout(function () {
        if (answerFromUser == 5) {
            endScreenTitle.innerHTML = `${inputName.value.trim()} have: ${correctAnswersFromUser}/${answerFromUser} correct answers`
            endScreen.style.display = "flex"
            quizScreen.style.display = "none"
        } else {
            quizCounter.innerHTML = answerFromUser + 1
            currentQuestion = new Question()
            currentQuestion.display()
            startTimer()
            toggletatusBtn(false)
        }
    }, 800)
}

function startQuiz() {
    toggletatusBtn(false)
    startScreen.style.display = "none"
    endScreen.style.display = "none"
    quizScreen.style.display = "flex"
    quizCounter.innerHTML = 1

    answerFromUser = 0
    correctAnswersFromUser = 0

    currentQuestion = new Question()
    currentQuestion.display()

    startTimer()
}

function toggletatusBtn(option) {
    for (let i = 0; i < 5; i++) {
        btnAnswer[i].disabled = option
    }
}

startBtn.addEventListener("click", function () {
	if (inputName.value.trim()) {
		startQuiz()
	} else {
		alert("Enter a name")
       
	}
})