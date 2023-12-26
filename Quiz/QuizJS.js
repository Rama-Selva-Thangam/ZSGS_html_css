const javaQuizData = {
  questions: [
    {
      question: "1) What is the purpose of the 'break' statement in Java?",
      options: [
        "To exit a loop or switch statement",
        "To skip the execution of code inside loops",
        "To forcefully terminate the program",
        "None of the above",
      ],
      answer: "To exit a loop or switch statement",
    },
    {
      question:
        "2) Which keyword is used to implement multiple inheritances of interfaces in Java?",
      options: ["extends", "implements", "inherit", "interface"],
      answer: "implements",
    },
    {
      question:
        "3) What is the default value of the elements in a Java array of integers?",
      options: ["0", "1", "-1", "null"],
      answer: "0",
    },
    {
      question: "4) What is the purpose of the 'super' keyword in Java?",
      options: [
        "To call the superclass constructor",
        "To access the superclass methods and fields",
        "To refer to the current instance of the class",
        "To indicate that a method is final",
      ],
      answer: "To access the superclass methods and fields",
    },
    {
      question: "5) In Java, what does the 'final' keyword signify?",
      options: [
        "The variable cannot be changed once assigned",
        "The class cannot be inherited",
        "The method cannot be overridden",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      question:
        "6) What is the output of the following code snippet?\nint x = 5;\nSystem.out.println(x++ + ++x);",
      options: ["10", "11", "12", "13"],
      answer: "12",
    },
    {
      question:
        "7) Which of the following access specifiers can be used for an interface in Java?",
      options: ["public", "private", "protected", "All of the above"],
      answer: "public",
    },
    {
      question:
        "8) What is the main advantage of using the 'StringBuilder' class in Java?",
      options: [
        "It is synchronized and thread-safe",
        "It is more memory-efficient than 'String'",
        "It provides methods for string manipulation",
        "It allows direct access to individual characters",
      ],
      answer: "It is more memory-efficient than 'String'",
    },
    {
      question:
        "9) Which of the following is a valid declaration of a method in an interface?",
      options: [
        "void methodName() { }",
        "final void methodName() { }",
        "static void methodName() { }",
        "abstract void methodName();",
      ],
      answer: "abstract void methodName();",
    },
    {
      question: "10) What is the purpose of the 'this' keyword in Java?",
      options: [
        "To refer to the current instance of the class",
        "To call a superclass constructor",
        "To create a new instance of the class",
        "To indicate the end of a method",
      ],
      answer: "To refer to the current instance of the class",
    },
  ],
};

const quizTitle = document.getElementById("quiz-title");
const quizContent = document.getElementById("question");
const quizOptions = document.getElementById("options");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const finalScoreDiv = document.getElementById("final-score");
nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", showFinalScore);
let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentQuestion = javaQuizData.questions[currentQuestionIndex];
  quizTitle.innerText = `Question ${currentQuestionIndex + 1}`;
  quizContent.innerText = currentQuestion.question;
  quizOptions.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = option;
    listItem.dataset.index = index;
    listItem.addEventListener("click", checkAnswer);
    quizOptions.appendChild(listItem);
  });
}

function checkAnswer(event) {
  const selectedOptionIndex = event.target.dataset.index;
  const currentQuestion = javaQuizData.questions[currentQuestionIndex];
  if (currentQuestion.answer === currentQuestion.options[selectedOptionIndex]) {
    event.target.classList.add("success");
    score++;
  } else {
    event.target.classList.add("wrong");
    const correctIndex = currentQuestion.options.findIndex(
      (option) => option === currentQuestion.answer
    );
    quizOptions.childNodes[correctIndex].classList.add("success");
  }

  nextBtn.style.display = "block";
}

function nextQuestion() {
  quizOptions.childNodes.forEach((option) => {
    option.classList.remove("success", "wrong");
    option.removeEventListener("click", checkAnswer);
  });

  if (currentQuestionIndex < javaQuizData.questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
  }
}

function showFinalScore() {
  quizContent.style.display = "none";
  quizOptions.style.display = "none";
  finalScoreDiv.style.display = "block";
  finalScoreDiv.querySelector(
    "#final-score"
  ).innerText = `Your Score: ${score}`;
  submitBtn.style.display = "none";
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  quizContent.style.display = "block";
  quizOptions.style.display = "block";
  finalScoreDiv.style.display = "none";
  submitBtn.style.display = "block";
}

loadQuestion();