const startButton = document.getElementById('startButton');
const quizSection = document.getElementById('quizSection');
const videoPlayer = document.getElementById('videoPlayer');
const options = document.querySelectorAll('.option');
const result = document.getElementById('result');

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

function startQuiz() {
    quizSection.classList.remove('hidden');
    selectRandomVideo();
}

function selectRandomVideo() {
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    videoPlayer.src = randomVideo.src;
    
    videoPlayer.load();
    videoPlayer.addEventListener('loadeddata', () => {
        videoPlayer.play().catch(error => {
            console.log('Playback prevented:', error);
        });
    });

    result.textContent = '';
    options.forEach(option => {
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });

    options.forEach(option => {
        if (option.textContent.trim() === randomVideo.correctAnswer.trim()) {
            option.dataset.correct = 'true';
        } else {
            option.dataset.correct = 'false';
        }
    });

    timeLeft = randomVideo.timer;
    clearInterval(timer);
    timer = setInterval(updateTimer, 10);
}

function updateTimer() {
    timeLeft -= 0.01;

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

startButton.addEventListener('click', startQuiz);
