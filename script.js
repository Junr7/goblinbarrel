// Get DOM elements
const startButton = document.getElementById('startButton');
const quizSection = document.getElementById('quizSection');
const videoPlayer = document.getElementById('videoPlayer');
const options = document.querySelectorAll('.option');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('time');

const videos = [
    { src: 'videos/BottomLeft.mp4', correctAnswer: 'Bottom left', timer: 4.09 },
    { src: 'videos/BottomLeft2.mp4', correctAnswer: 'Bottom left', timer: 5.51 },
    { src: 'videos/Center.mp4', correctAnswer: 'Center', timer: 3.57 },
    { src: 'videos/Center2.mp4', correctAnswer: 'Center', timer: 4.02 },
    { src: 'videos/TopRight.mp4', correctAnswer: 'Top right', timer: 3.49 },
    { src: 'videos/TopRight2.mp4', correctAnswer: 'Top right', timer: 4.22 },
    { src: 'videos/BottomMiddle.mp4', correctAnswer: 'Bottom middle', timer: 3.91 },
    { src: 'videos/BottomMiddle2.mp4', correctAnswer: 'Bottom middle', timer: 4.18 },
    { src: 'videos/TopLeft.mp4', correctAnswer: 'Top left', timer: 4.87 },
    { src: 'videos/TopLeft2.mp4', correctAnswer: 'Top left', timer: 3.60 },
    { src: 'videos/MiddleLeft.mp4', correctAnswer: 'Middle left', timer: 4.25 },
    { src: 'videos/MiddleLeft2.mp4', correctAnswer: 'Middle left', timer: 4.16 },
    { src: 'videos/MiddleRight.mp4', correctAnswer: 'Middle right', timer: 4.05 },
    { src: 'videos/MiddleRight2.mp4', correctAnswer: 'Middle right', timer: 4.35 },
    { src: 'videos/TopMiddle.mp4', correctAnswer: 'Top middle', timer: 4.09 },
    { src: 'videos/TopMiddle2.mp4', correctAnswer: 'Top middle', timer: 4.10 },
    { src: 'videos/BottomRight.mp4', correctAnswer: 'Bottom right', timer: 4.22 },
    { src: 'videos/BottomRight2.mp4', correctAnswer: 'Bottom right', timer: 4.62 }
];

let timer;
let timeLeft;

startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    quizSection.classList.remove('hidden');

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    videoPlayer.src = randomVideo.src;
    videoPlayer.play();

    result.textContent = '';
    options.forEach(option => {
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });

    options.forEach(option => {
        if (option.textContent === randomVideo.correctAnswer) {
            option.dataset.correct = 'true';
        } else {
            option.dataset.correct = 'false';
        }
    });

    timeLeft = randomVideo.timer;
    timerDisplay.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
});

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        result.textContent = 'Too late';
        result.style.color = 'red';
        options.forEach(option => {
            option.disabled = true;
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            }
        });
    }
}

options.forEach(option => {
    option.addEventListener('click', () => {
        clearInterval(timer);

        if (option.dataset.correct === 'true') {
            result.textContent = 'Correct';
            result.style.color = 'green';
        } else {
            result.textContent = 'Incorrect';
            result.style.color = 'red';
        }

        options.forEach(opt => {
            if (opt.dataset.correct === 'true') {
                opt.classList.add('correct');
            } else {
                opt.classList.add('incorrect');
            }
            opt.disabled = true;
        });
    });
});
