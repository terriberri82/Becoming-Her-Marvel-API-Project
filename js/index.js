
  // INDEX.HTML PAGE
  // Notes: Form for name and enter button needs timer so that it appears after the movie intro plays 
  //When user input name and presses enter page needs to go to quiz page. The user's name the entered
  //  appears on the quiz page. 
const video =document.getElementById("intro-video");
const accessPage = document.querySelector('.access-page')

video.addEventListener('ended',() =>{
  accessPage.style.display = 'block';
  accessPage.style.opacity =0;

  setTimeout(() =>{
    accessPage.style.transition = 'opacity 1s ease-in-out';
    accessPage.style.opacity = 1;
  }, 100)
})

//Music player 
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');

  function playAudioOnce() {
    console.log("Trying to play audio...");
    audio.play().catch(err => {
      console.log("Autoplay blocked:", err);
    });

    window.removeEventListener('mousemove', playAudioOnce);
    window.removeEventListener('click', playAudioOnce);
  }

  window.addEventListener('mousemove', playAudioOnce);
  window.addEventListener('click', playAudioOnce);
});



 // User inputs name into form and presses enter. They are routed to the quiz page that show "Welcome______"

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('input[name="text"]').value;

  if (name.trim() !== "") {
    localStorage.setItem('userName', name);
    window.location.href = 'quiz.html'; 
  }
});



