fetch('/api/characters')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return response.json();
  })
  .then(characters => {
    console.log('Marvel characters:', characters);
    characters.forEach(hero => {
      const li = document.createElement('li');
      li.textContent = hero.name;
      document.querySelector('#characterList').appendChild(li);
    });
  })
  .catch(error => {
    console.error('Front-end error fetching characters:', error.message);
  });


  // For now this is showing the first 20 characters
  // Will narrow the data down to 10 women 
  // just checking If I am able to successfully request the data first. 
  // Choosing this API Seemed a little bit more advanced than what I learned learned in lesson 13. And had to learn 
  //Node to understand and complete this. 
