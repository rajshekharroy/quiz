
const questionContainer = document.querySelector(".question");
const selectNum = document.querySelector(".select-num");
const setNum = document.querySelector('.setnum');
const attempt = document.querySelector('.attempt')
const question_page = document.querySelector('.question-page')
const timer = document.querySelector('.timer');
const optionContainer = document.querySelector(".options");
const question_no = document.querySelector(".question-no");
const next = document.querySelector(".next");
const timerInput = document.querySelectorAll('.timer-input')
// const answercon = document.querySelector('.answer')
const topicSubmit = document.querySelector('.topic-submit')
const topicOption = document.querySelectorAll('#topic-option')
const topic = document.querySelector('.topic')
const constitutionApi ="https://raw.githubusercontent.com/rajshekharroy/quiz_apis/main/indian_constitution.json";
const ancientHistory = "https://raw.githubusercontent.com/rajshekharroy/quiz_apis/main/ancient_history_world_%26_india.json"
const webdevApi = "https://raw.githubusercontent.com/rajshekharroy/quiz_apis/main/webdev.json";
const mathApi = "https://raw.githubusercontent.com/rajshekharroy/quiz_apis/main/math.json"
let questionData = [];
let updateNum = 0;
let score = 0;
let timerInterval;
let questionNumber = 1;
let currentIndex;
let selectedValue;








topicOption.forEach((topic) => {
  topic.addEventListener("change", (evt)=>{
    selectedValue = evt.target.value;
   if(selectedValue !== "choose"){
    topicSubmit.classList.remove("hide")
   }else {
    topicSubmit.classList.add("hide")
   }
  })
});
topicSubmit.addEventListener("click",()=>{
  topic.classList.add("hide");
  attempt.classList.remove("hide")
})


setNum.addEventListener("click",startQuiz) 
  function startQuiz() {
    updateNum = selectNum.value
    answeredQuestions = [];
    if(updateNum < 10 || updateNum > 100){
      alert("Please enter a value between 10 to 100")
    }else {
    attempt.classList.add("hide")
    question_page.classList.remove("hide")
    next.classList.add('hide')
    showQuestion();
      startTimer()
    }
  }
 

function startTimer(){


  timerInput.forEach((input) => {
    if (input.checked) {
      time = parseInt(input.value);
      timer.innerText = `Time left: 00:${time}`
      timer.style.backgroundColor = "green"
    }
  });
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      const formattedTime = time < 10 ? `0${time}` : time;
      timer.style.backgroundColor = time > 8 && time <= 60 ? "green" : time > 4 && time <= 8 ? "orange" : time > 0 && time <= 4 ? "red" : "white";
      timer.innerText = `Time left: 00:${formattedTime}`;
    }else {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

// const quiz = async () => {
//   const data = await (await fetch(constitutionApi)).json();
//   questionData = data;
// };

topicOption.forEach((topic)=>{
  topic.addEventListener("change", async (evt) => {
    const selectedApi = evt.target.value;
    let apiUrl;
    
    if (selectedApi === "constitutionApi") {
      apiUrl = constitutionApi;
    } else if (selectedApi === "ancientHistory"){
      apiUrl = ancientHistory;
    } else if (selectedApi === "webdevApi") {
      apiUrl = webdevApi;
    }else if (selectedApi === "mathApi"){
      apiUrl = mathApi;
    }
    const data = await (await fetch(apiUrl)).json();
    questionData = data;
  })
})








const getUniqueIndex = (questionData, answeredQuestions) => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * questionData.length);
  } while (answeredQuestions.includes(randomIndex));
  answeredQuestions.push(randomIndex);
  return randomIndex;
};


let answeredQuestions = [];

const showQuestion = () => {

  currentIndex = getUniqueIndex(questionData, answeredQuestions);
  const currentQuestion = questionData[currentIndex];
  // answercon.innerText = currentQuestion[currentQuestion.answer]
  
  questionContainer.innerText = currentQuestion.question;
  optionContainer.innerHTML = `
  <li>${currentQuestion.A}</li>
  <li>${currentQuestion.B}</li>
  <li>${currentQuestion.C}</li>
  <li>${currentQuestion.D}</li>
  `
  question_no.innerText = `Question No. ${questionNumber}`
  optionContainer.querySelectorAll("li").forEach((li)=>{
    li.classList.add("hover-effect");
  })
  firstClick = true;
  next.classList.add('hide')
};

let resultList = "";

const nextQuestion = () =>{
questionNumber++
clearInterval(timerInterval);
timer.innerText = ""
timer.classList.remove('hide');
if(questionNumber <= updateNum){
    showQuestion()
    startTimer()
}else {
  let backgroundColor;
  answeredQuestions.forEach((question,index)=>{
    const list = questionData[question];
    const questionList = `${index + 1}. ${list.question}`;
    if(answered.includes(list[list.answer])){
      backgroundColor = "green"
    }else{ backgroundColor= "red"}
    const answerList = `<div class = "answer-list"><img src = "arrow.gif"><p>${list[list.answer]}</p></div>`;
    resultList += `<div class = "list" style="background-color: ${backgroundColor}"><p class = "question-list">${questionList}</p>${answerList}</div>`
    

  })
    question_page.innerHTML = `<div class = "congrats-msg" >
      <h2>🎉 Congratulations! 🎉</h2> <p>You have completed the quiz!</p><p>Your score is 🏆 <span class = "score">${score} </span></p><p>Thank you for participating! 🙌</p>
    </div><details><summary>Click here to see details</summary>${resultList}</details>`
}
firstClick1 = true;
}



next.addEventListener("click",nextQuestion);
let firstClick = true;
let firstClick1 = true;
const answered = [];

optionContainer.addEventListener("click",(evt)=>{
  const finalAns = evt.target.tagName;
  if (firstClick && finalAns === "LI") {
    evt.target.classList.add('selected')
    firstClick = false;
    optionContainer.querySelectorAll("li").forEach((li)=>{
      if (li !== evt.target) {
        li.classList.add('disable');
      }
      li.style.cursor = "default"
      timer.classList.add('hide');
      li.classList.remove("hover-effect");
      clearInterval(timerInterval)
      next.classList.remove('hide')
    })
  }
    const currentQuestion = questionData[currentIndex];
 

    if(evt.target.innerText === currentQuestion[currentQuestion.answer] && !evt.target.classList.contains('disable') && firstClick1){
      score++;
      firstClick1 = false;
      answered.push(currentQuestion[currentQuestion.answer])
    }
})
  // quiz();

