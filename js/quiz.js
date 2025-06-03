document.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  const name = localStorage.getItem('userName');

  greeting.textContent = name ? `Welcome ${name}!` : "Welcome!";

  const bonusSection = document.getElementById('bonus-question');
  if (bonusSection) {
    bonusSection.style.display = 'none';
  }

  const quizForm = document.getElementById('quizForm');
  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset scores
    const scores = {
      "Black Widow": 0,
      "Gamora": 0,
      "Jean Grey": 0,
      "Nebula": 0,
      "Storm": 0,
      "Scarlet Witch": 0,
      "Rogue": 0,
      "Wasp": 0,
      "Mystique": 0,
      "Kate Bishop": 0
    };

    // Tally answers
    const formData = new FormData(quizForm);
    for (let [key, value] of formData.entries()) {
      if (scores.hasOwnProperty(value)) {
        scores[value]++;
      }
    }

    const maxScore = Math.max(...Object.values(scores));
    const topCharacters = Object.keys(scores).filter(char => scores[char] === maxScore);

    if (topCharacters.length === 1) {
      showHeroineResult(topCharacters[0]);
    } else {
      // Tie – show bonus
      bonusSection.style.display = 'flex';

      const bonusForm = document.getElementById('bonusForm');
      bonusForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="bonus"]:checked');
        if (selected) {
          showHeroineResult(selected.value);
        }
      });
    }
  });
});


function showHeroineResult(heroineName) {
  const resultCard = document.getElementById('result-summary');
  const resultName = document.getElementById('result-name');
  const viewHeroineBtn = document.getElementById('view-heroine-btn');

  resultName.textContent = heroineName;
  resultCard.style.display = "flex";

  
  viewHeroineBtn.onclick = () => {
    window.location.href = `heroines.html?name=${encodeURIComponent(heroineName)}`;
  };
}

