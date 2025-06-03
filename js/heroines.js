const urlParams = new URLSearchParams(window.location.search);
const selectedHeroine = urlParams.get('name');

const heroines = [
  "Black Widow",
  "Gamora",
  "Jean Grey",
  "Nebula",
  "Storm",
  "Scarlet Witch",
  "Rogue",
  "Wasp",
  "Mystique",
  "Kate Bishop",

];

const descriptions = {
  "Black Widow": "A master of strategy and silent precision, Black Widow leads with quiet strength and unshakable resolve. Her power lies not just in combat, but in the choices she makes to protect others while staying three steps ahead.",
  "Gamora": "Forged through trials and redemption, Gamora is a fierce protector who channels her past into purposeful action. Her strength is rooted in loyalty, survival, and the courage to change.",
  "Jean Grey": "Wise, introspective, and emotionally rich, Jean Grey carries immense power tempered by deep empathy. She seeks peace through inner transformation and uses her insight to guide and uplift those around her.",
  "Nebula": "Scarred but unbroken, Nebula embodies raw emotional resilience. Her path from vengeance to self-discovery proves that true strength is forged in survival—and that healing begins with reclaiming your identity.",
  "Storm": "Graceful under pressure and unwavering in purpose, Storm is a force of nature who leads with compassion and clarity. She brings both renewal and strength, balancing her emotions with elemental power.",
  "Scarlet Witch": "Driven by emotion and shaped by loss, Scarlet Witch turns pain into purpose. Her power is mystical, intuitive, and deeply tied to the heart—a reminder that vulnerability can be a source of incredible strength.",
  "Rogue": "Courageous and fiercely protective, Rogue defends others at all costs. She embraces second chances and proves that identity isn't fixed—it’s formed by how we love, protect, and grow.",
  "Wasp": "Inventive and quick-thinking, Wasp navigates challenges with curiosity and courage. She balances optimism with grit, proving that adaptability and intellect are just as mighty as physical strength.",
  "Mystique": "Complex and ever-evolving, Mystique thrives in fluidity and reinvention. Her power lies in embracing transformation, challenging expectations, and adapting with purpose.",
  "Kate Bishop": "A sharp-witted archer with fierce determination, Kate proves that courage and loyalty, not powers, make a true hero. She is quick to act, confident in her aim, and rises as a leader through heart and grit.",
};



heroines.forEach(hero => {
  if (!selectedHeroine || selectedHeroine === hero) {
    fetch(`/api/characters?name=${encodeURIComponent(hero)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${hero}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          console.warn(`${hero} not found.`);
          return;
        }

        const character = data[0];
        const name = character.name;
        const id = character.id;
        const description = descriptions[name];

        fetch(`/api/characters/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch image for ${name}`);
            }
            return response.json();
          })
          .then(detailData => {
            const result = detailData.data.results[0];
            const imgSrc = `${result.thumbnail.path}.${result.thumbnail.extension}`;
            createHeroCard(name, imgSrc, description);
          });
      })
      .catch(error => console.error(error));
  }
});



function createHeroCard(name, imgSrc, description) {
  const container = document.getElementById("heroines-container");

  const card = document.createElement("section");
  card.classList.add("hero-card");

  card.innerHTML = `
    <h2>${name}</h2>
    <img src="${imgSrc}" alt="${name}" />
    <p>${description}</p>`;

  container.appendChild(card);
}


//Getting individual data

const resultSummary = document.getElementById("result-summary");
const resultName = document.getElementById("result-name");
const viewHeroineBtn = document.getElementById("view-heroine-btn");

function displayFinalHeroine(heroineName) {
  resultName.textContent = heroineName;
  resultSummary.style.display = "flex";

  viewHeroineBtn.onclick = () => {
    // Redirect to heroines page with query param
    window.location.href = `heroines.html?name=${encodeURIComponent(heroineName)}`;
  };
}

if (selectedHeroine) {
  const backBtn = document.createElement('button');
  backBtn.textContent = 'Meet All Heroines';
  backBtn.onclick = () => {
    window.location.href = 'heroines.html';
  };
  document.getElementById('heroines-container').after(backBtn);
}