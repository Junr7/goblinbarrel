// Get DOM elements
const startButton = document.getElementById('startButton');
const quizSection = document.getElementById('quizSection');
const videoPlayer = document.getElementById('videoPlayer');
const options = document.querySelectorAll('.option');
const result = document.getElementById('result');

const videos = [
    { src: 'videos/TopLeft.mp4', correctAnswer: 'Top left' },
    { src: 'videos/TopMiddle.mp4', correctAnswer: 'Top middle' },
    { src: 'videos/TopRight.mp4', correctAnswer: 'Top right' },
    { src: 'videos/MiddleLeft.mp4', correctAnswer: 'Middle left' },
    { src: 'videos/Center.mp4', correctAnswer: 'Center' },
    { src: 'videos/MiddleRight.mp4', correctAnswer: 'Middle right' },
    { src: 'videos/BottomLeft.mp4', correctAnswer: 'Bottom left' },
    { src: 'videos/BottomMiddle.mp4', correctAnswer: 'Bottom middle' },
    { src: 'videos/BottomRight.mp4', correctAnswer: 'Bottom right' }
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

    // Set the correct answer for the selected video
    options.forEach(option => {
        if (option.textContent === randomVideo.correctAnswer) {
            option.dataset.correct = 'true';
        } else {
            option.dataset.correct = 'false';
        }
    });
});

// Add event listeners to options
options.forEach(option => {
    option.addEventListener('click', () => {
        // Check if selected option is correct
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