// Get DOM elements
const startButton = document.getElementById('startButton');
const quizSection = document.getElementById('quizSection');
const videoPlayer = document.getElementById('videoPlayer');
const options = document.querySelectorAll('.option');
const result = document.getElementById('result');

const videos = [
    { src: 'videos/BottomLeft.mp4', correctAnswer: 'Bottom left' },
    { src: 'videos/BottomLeft2.mp4', correctAnswer: 'Bottom left' },
    { src: 'videos/Center.mp4', correctAnswer: 'Center' },
    { src: 'videos/Center2.mp4', correctAnswer: 'Center' },
    { src: 'videos/TopRight.mp4', correctAnswer: 'Top right' },
    { src: 'videos/TopRight2.mp4', correctAnswer: 'Top right' },
    { src: 'videos/BottomMiddle.mp4', correctAnswer: 'Bottom middle' },
    { src: 'videos/BottomMiddle2.mp4', correctAnswer: 'Bottom middle' },
    { src: 'videos/TopLeft.mp4', correctAnswer: 'Top left' },
    { src: 'videos/TopLeft2.mp4', correctAnswer: 'Top left' },
    { src: 'videos/MiddleLeft.mp4', correctAnswer: 'Middle left' },
    { src: 'videos/MiddleLeft2.mp4', correctAnswer: 'Middle left' },
    { src: 'videos/MiddleRight.mp4', correctAnswer: 'Middle right' },
    { src: 'videos/MiddleRight2.mp4', correctAnswer: 'Middle right' },
    { src: 'videos/TopMiddle.mp4', correctAnswer: 'Top middle' },
    { src: 'videos/TopMiddle2.mp4', correctAnswer: 'Top middle' },
    { src: 'videos/BottomRight.mp4', correctAnswer: 'Bottom right' },
    { src: 'videos/BottomRight2.mp4', correctAnswer: 'Bottom right' }
];

// Start quiz
startButton.addEventListener('click', () => {
    // Hide start button and show quiz section
    startButton.classList.add('hidden');
    quizSection.classList.remove('hidden');

    // Select random video
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    videoPlayer.src = randomVideo.src;
    videoPlayer.play();

    // Reset result message and enable options
    result.textContent = '';
    options.forEach(option => {
        option.disabled = false;
        option.classList.remove('correct', 'incorrect');
    });

    // Set correct answer for selected video
    options.forEach(option => {
        if (option.textContent === randomVideo.correctAnswer) {
            option.dataset.correct = 'true';
        } else {
            option.dataset.correct = 'false';
        }
    });
});

options.forEach(option => {
    option.addEventListener('click', () => {
        if (option.dataset.correct === 'true') {
            result.textContent = 'Correct';
            result.style.color = 'green';
        } else {
            result.textContent = 'Incorrect';
            result.style.color = 'red';
        }

        // Highlight correct and incorrect options
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