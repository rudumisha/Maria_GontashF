let question_field = document.querySelector('.question');
let answer_buttons = document.querySelectorAll('.answer');
let container_h3 = document.querySelector('.container_h3');
let container_main = document.querySelector('.main');
let container_start = document.querySelector('.start');
let start_button = document.querySelector('.start-btn');

let cookie = false;
let cookies = document.cookie.split('; ')

for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split('=')[i] == 'numbers_high_score') {
        cookie = cookies[i].split('=')[1]
        break
    }
}

if (cookie) {
    let data = cookie.split('/')
    container_h3.innerHTML = `Минулого разу ви дали ${data[1]}
    правильних відповідей із ${data[0]}.
    Точність - ${Math.round(data[1] * 100 / data[0])}%.</h3>`
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ['+', '-', '*', '/']
function getRandomSign() {
    return signs[randint(0, 3)]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
        let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
        [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
    }
}

class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') { this.correct = a + b }
        else if (sign == '-') { this.correct = a - b }
        else if (sign == '*') { this.correct = a * b }
        else if (sign == '/') { this.correct = Math.round((a / b) * 100) / 100 }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]
        shuffle(this.answers)

    }

    display() {
        question_field.innerHTML = this.question

        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

start_button.addEventListener('click', function () {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'
    current_question = new Question()
    current_question.display()

    correct_answer_given = 0
    total_answer_given = 0

    setTimeout(function () {
        let new_cookie = `numbers_high_score=${total_answer_given}/${correct_answer_given};
        max-age=1000000000`
        document.cookie = new_cookie
        container_main.style.display = 'none'
        container_start.style.display = 'flex'
        container_h3.innerHTML = `Ви дали ${correct_answer_given} правильний зі ${total_answer_given}.Точність - ${Math.round(correct_answer_given * 100 / total_answer_given)}%`
    }, 30000)
})

for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function () {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            correct_answer_given += 1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }

        total_answer_given += 1



        current_question = new Question()
        current_question.display()
    })
}
