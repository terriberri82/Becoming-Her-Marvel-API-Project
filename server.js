

const express = require('express');
const fetch = require('node-fetch');
const md5 = require('md5');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(` ${req.method} ${req.url}`);
  next();
});


const publicKey = '50c7dbbabf17b87ff73fce173c5f352b';
const privateKey = '1df1b0af39a08407d60f6dfcb9e0259949a2695a';

// *Note what this does: Serve static front-end files (HTML, CSS, JS)
app.use(express.static(__dirname));

// API route to fetch Marvel characters
app.get('/api/characters', async (req, res) => {
  try {
    const name = req.query.name;
    console.log('Requested name:', name);
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    let url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    if (name) {
      url += `&name=${encodeURIComponent(name)}`; 
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("Marvel API responded with:", response.status, response.statusText);
      return res.status(response.status).json({ error: 'Marvel API request failed' });
    }

    const json = await response.json();
    
    res.json(json.data.results);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Server error while fetching Marvel data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




// API route to fetch a Marvel character by ID
app.get('/api/characters/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Marvel API (by ID) responded with:", response.status, response.statusText);
      return res.status(response.status).json({ error: 'Marvel API request by ID failed' });
    }

    const json = await response.json();
    res.json(json); 
  } catch (err) {
    console.error("ERROR fetching by ID:", err.message);
    res.status(500).json({ error: 'Server error while fetching Marvel character by ID' });
  }
});
