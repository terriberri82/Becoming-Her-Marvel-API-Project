document.addEventListener('DOMContentLoaded', () => {
  const greeting = document.getElementById('greeting');
  const name = localStorage.getItem('userName');
  greeting.textContent = name ? `Welcome ${name}!` : "Welcome!";

  const bonusSection = document.getElementById('bonus-question');
  const resultSection = document.getElementById('result-summary');
  const quizFormContainer = document.querySelector('.quiz-form-container');

  if (bonusSection) {
    bonusSection.classList.add('no-display');
    bonusSection.classList.remove('show-bonus');
  }
  if (resultSection) {
    resultSection.classList.add('no-display');
  }

  const quizForm = document.getElementById('quizForm');
  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

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

    const formData = new FormData(quizForm);
    for (let [key, value] of formData.entries()) {
      if (scores.hasOwnProperty(value)) {
        scores[value]++;
      }
    }

    const maxScore = Math.max(...Object.values(scores));
    const topCharacters = Object.keys(scores).filter(char => scores[char] === maxScore);
    quizFormContainer.style.display = 'none';

    if (topCharacters.length === 1) {
      showHeroineResult(topCharacters[0]);
    } else {
      bonusSection.classList.remove('no-display');
      bonusSection.classList.add('show-bonus');
      bonusSection.scrollIntoView({ behavior: 'smooth' });

      const bonusForm = document.getElementById('bonusForm');
      bonusForm.addEventListener('submit', function handleBonus(e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="bonus"]:checked');
        if (selected) {
          bonusSection.classList.remove('show-bonus');
          bonusSection.classList.add('no-display');
          showHeroineResult(selected.value);
          bonusForm.removeEventListener('submit', handleBonus);
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
  resultCard.classList.remove('no-display');
  resultCard.style.display = "flex";
  resultCard.scrollIntoView({ behavior: 'smooth' });

  viewHeroineBtn.classList.add('heroine-btn');
  viewHeroineBtn.onclick = () => {
    window.location.href = `heroines.html?name=${encodeURIComponent(heroineName)}`;
  };
}
