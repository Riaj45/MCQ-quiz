function startQuiz() {
      document.getElementById('start-btn').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'block';
    }
    
    
    
    
    
    
    
    
    
    const quizData = [
    
     {
    
        question: '1. Who appoints the Chairman of the UPSC ??',
        options: ['(1)President', '(2)Speaker of Lok Sabha', '(3)Chief Justice of India.', '(4)Prime Minister'],
        correctAnswer: '(1)President'
      },
    
    {
    
        question: '2. Which planet is no longer considered a part of our solar system?',
        options: ['(1)Jupiter', '(2)Uranus', '(3)Pluto', '(4)Earth'],
        correctAnswer: '(3)Pluto'
      },
    
    
    
    {
    
        question: '3. Copa America was formerly known as-----',
        options: ['(1)Sumo wrestling', '(2)Taekwondo', '(3)Handball', '(4)Football'],
        correctAnswer: '(1)Sumo wrestling'
      },
    
    
    
    
    
    
    
    
    
    {
    
        question: '4. Which is the largest state in India in terms of area?',
        options: ['(1)Uttar Pradesh', '(2)Gujarat', '(3)Madhya Pradesh', '(4)Rajasthan'],
        correctAnswer: '(4)Rajasthan'
      },
    
    
    
    {
    
        question: '5. Who, among the following, has the final right to sanction the expenditure of public money in India ?',
        options: ['(1)Prime Minister', '(2)Parliament', '(3)Speaker', '(4)President'],
        correctAnswer: '(4)President'
      },
    
    
    
    
    
    {
    
        question: '6. One feature distinguishing the Rajya Sabha from the Vidhan Parishad is',
        options: ['(1)Power of impeachment', '(2)Indirect election', '(3)Nomination of members', '(4)Tenure of membership'],
        correctAnswer: '(1)Power of impeachment'
      },
    
    
    
    {
    
        question: ' 7. A person who is not a member of Parliament can be appointed as a Minister by the President for a maximum period of',
        options: ['(1)9 months', '(2)3 months', '(3)6 months', '(4)12 months(1 year) '],
        correctAnswer: '(3)6 months'
      },
    
    
    
      {
        question: '8.Who is first chief minister(PREMIERS) of west bengal?',
        options: ['(1)Dr. Prafulla Chandra Ghosh', '(2)Shri Jyoti Basu', '(3)Shri Buddhadeb Bhattacharjee', '(4)Shri Prafulla Chandra Sen '],
        correctAnswer: '(1)Dr. Prafulla Chandra Ghosh'
      },
      {
        question: '9.The oldest company in India?',
        options: ['(1)khan limited', '(2)tata', '(3)Bombay Burmah Trading Corporation Limited', '(4)jana corporation'],
        correctAnswer: '(3)Bombay Burmah Trading Corporation Limited'
      },
      {
        question: '10.Who is founder of google?',
        options: ['(1)Larry Page', '(2)Sergey Brin', '(3)jhon martin', '(4) option (1) and (2)'],
        correctAnswer: '(4) option (1) and (2)'
      },
      {
        question: '11.Who is first president in ?',
        options: ['(1)ramlal ghosh', '(2)Rajendra Prasad ', '(3)bahadur khan', '(4)lakshmi kar'],
        correctAnswer: '(2)Rajendra Prasad'
      },
      {
        question: '12.Who is 1st chief minister in india??',
        options: ['(1)rajendra prasad', '(2)Pandit Govind Ballabh Pant', '(3)ram bhadur', '(4)none of these'],
        correctAnswer: '(2)Pandit Govind Ballabh Pant'
      },
      {
        question: '13.Who is founder of tata?',
        options: ['(1)Jamsetji Nusserwanji', '(2)Nusserwanji Tata', '(3)ratan tata', '(4)natarajan tata'],
        correctAnswer: '(1)Jamsetji Nusserwanji'
      }
    ];

    let currentQuestion = 0;
    let timer;
    let userScore = 0;
    let incorrectAnswers = 0;
    let optionsLocked = false;

    function loadQuestion() {
      const questionContainer = document.getElementById('question-container');
      const optionsContainer = document.getElementById('options-container');
      const timerContainer = document.getElementById('timer-container');

      questionContainer.textContent = quizData[currentQuestion].question;
      optionsContainer.innerHTML = '';

      const form = document.createElement('form');

      quizData[currentQuestion].options.forEach((option, index) => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'options';
        input.value = option;
        input.id = `option${index}`;

        const label = document.createElement('label');
        label.textContent = option;
        label.setAttribute('for', `option${index}`);

        const optionWrapper = document.createElement('div');
        optionWrapper.className = 'option-wrapper';
        optionWrapper.appendChild(input);
        optionWrapper.appendChild(label);

        form.appendChild(optionWrapper);
        form.appendChild(document.createElement('br')); // Add line break after each option
      });

      optionsContainer.appendChild(form);

      clearTimeout(timer);
      timerContainer.style.display = 'none';
    }

    function checkAnswer() {
      if (optionsLocked) {
        alert('Options are locked. Please wait for the timer.');
        return;
      }

      const userAnswer = document.querySelector('input[name="options"]:checked');
      if (userAnswer) {
        const correctAnswer = quizData[currentQuestion].correctAnswer;

        if (userAnswer.value === correctAnswer) {
          alert('Correct!');
          userScore++;
          incorrectAnswers = 0;
        } else {
          alert('Incorrect. Try again!');
          incorrectAnswers++;

          if (incorrectAnswers === 2) {
            lockOptions(10);
            return;
          }
        }

        currentQuestion++;
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          document.getElementById('quiz-container').style.display = 'none';
          document.getElementById('certificate-page').style.display = 'block';
        }
      } else {
        alert('Please select an option.');
      }
    }

    function lockOptions(seconds) {
      const timerContainer = document.getElementById('timer-container');
      let remainingTime = seconds;

      timerContainer.style.display = 'block';
      optionsLocked = true;

      function updateTimer() {
        timerContainer.textContent = `Retry in ${remainingTime} seconds`;
        remainingTime--;

        if (remainingTime < 0) {
          clearTimeout(timer);
          timerContainer.style.display = 'none';
          optionsLocked = false;
          incorrectAnswers = 0;
          loadQuestion();
        } else {
          timer = setTimeout(updateTimer, 1000);
        }
      }

      updateTimer();
    }

    function showCertificate() {
      const userName = document.getElementById('name-input').value;
      const certificateContainer = document.getElementById('certificate');

      if (userName.trim() !== '') {
        certificateContainer.innerHTML = `<p>This is to certify that<h3>${userName} </h3>has successfully completed the MCQ Quiz with a score of ${userScore}/${quizData.length}.</p>`;
        certificateContainer.style.background = 'url(" https://i.postimg.cc/cJxh0ZTW/png.png")';
        certificateContainer.style.backgroundSize = 'cover';
        certificateContainer.style.color = '#1b1b1b';
        certificateContainer.style.padding = '80px';
        certificateContainer.style.borderRadius = '8px';
        certificateContainer.style.marginTop = '20px';
        certificateContainer.style.textAlign = 'center';
        certificateContainer.style.display = 'block';
      } else {
        alert('Please enter your name.');
      }
    }

    loadQuestion();
    
    window.addEventListener('load', function() {
  const loader = document.getElementById('loading-overlay');
  loader.style.display = 'none';
});