// INDEX.HTML PAGE
// Notes: Form for name and enter button needs timer so that it appears after the movie intro plays 
// When user inputs name and presses enter, page needs to go to quiz page. The user's name then appears on the quiz page.

const video = document.getElementById("intro-video");
const accessPage = document.querySelector('.access-page');

video.addEventListener('ended', () => {
  accessPage.style.display = 'block';
  accessPage.style.opacity = 0;

  setTimeout(() => {
    accessPage.style.transition = 'opacity 1s ease-in-out';
    accessPage.style.opacity = 1;
  }, 100);
});

// Music player 
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

  
  document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', () => {
      console.log(`Navigating to ${link.getAttribute('href')} and triggering corresponding GET request`);
    });
  });
});

 // User inputs name into form and presses enter. They are routed to the quiz page that show "Welcome______"

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.querySelector('input[name="text"]').value;

  if (name.trim() !== "") {
    localStorage.setItem('userName', name);

    // Loading card
    const loadingCard = document.getElementById('loading-card');
    loadingCard.classList.remove('no-display');
    loadingCard.classList.add('show-loading');

    const heroines = [
      "Black Widow", "Gamora", "Jean Grey", "Nebula", "Storm",
      "Scarlet Witch", "Rogue", "Wasp", "Mystique", "Kate Bishop"
    ];
    const randomHeroine = heroines[Math.floor(Math.random() * heroines.length)];

    try {
      const response = await fetch(`/api/characters?name=${encodeURIComponent(randomHeroine)}`);
      if (!response.ok) throw new Error(`Failed to fetch data for ${randomHeroine}`);
      const data = await response.json();
      console.log(`Fetched data for ${randomHeroine}:`, data);

      setTimeout(() => {
        window.location.href = 'quiz.html';
      }, 1500); 
    } catch (error) {
      console.error("Error fetching heroine data:", error);
      loadingCard.textContent = "Oops! Something went wrong. Please try again.";
    }
  }
});

//Skip the quiz to go to Meet the Heroines page

const heroinesLink = document.getElementById('meet-heroines-link');
if (heroinesLink) {
  heroinesLink.addEventListener('click', () => {
    console.log("GET request triggered to fetch Marvel heroines");
 
  });
}


