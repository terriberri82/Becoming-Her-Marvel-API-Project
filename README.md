# Becoming Her: Marvel API Project

Discover your inner superhero. This project uses the Marvel Developer API to match users to one of 10 powerful Marvel heroines based on their personality. Users complete a 15-question quiz, optionally answer a bonus question, and are shown a dynamic result featuring custom styling, an API-driven character profile, and engaging navigation.

 Project Description

**Becoming Her** is an interactive web application that uses the [Marvel Developer API](https://developer.marvel.com) to reveal which Marvel heroine you are most like. After a cinematic intro and a name input, users take a personality quiz. Based on their answers, the site fetches real-time data from the Marvel API to display their matched heroine, including name, bio, and image.

 Installation

To run this project locally, follow the steps below:

 Prerequisites:**

- [Node.js](https://nodejs.org/) installed on your machine
- [Git](https://git-scm.com/) for cloning the repository

Step-by-Step Setup:**

**Clone the repository:**

   Bash
   git clone https://github.com/terriberri82/Becoming-Her-Marvel-API-Project.git
 
**Navigate into the project directory:
   cd Becoming-Her-Marvel-API-Project
**Install dependencies:
npm install
**Run the server:
node server.js
**Open your browser and go to:
http://localhost:3000

Usage
**Steps to use:**

1. A video intro will autoplay on load.
2. Once it ends, enter your name and press **Enter**.
3. Complete the 15-question personality quiz.
4. If there's a tie, a **bonus question** will appear to determine your heroine.
5. View your personalized result.
6. Click the **"Meet Your Heroine"** button to see your matched character's image and description, fetched dynamically via the Marvel API.

The site makes two key API calls:

### API Endpoints Used
- `/api/characters?name=CHARACTER_NAME` → Used to search characters by name
- `/api/characters/:id` → Used to retrieve image and detailed character info

Take the Quiz: Navigates to quiz.html where the user completes a quiz and a GET request determines their Marvel heroine match. You also have the option to skip the quiz and navigate to the Meet the Heroines page. 
Meet the Heroines: Navigates to heroines.html where GET requests pull heroine data and images from the Marvel API dynamically.

Contributions are welcome!
To contribute:
**Fork this repository
**Create a feature branch:
git checkout -b feature/your-feature-name
**Commit your changes:
git commit -m "Add feature description"
**Push to the branch:
git push origin feature/your-feature-name
**Open a Pull Request and describe what you changed.

This project is licensed under the MIT License.
You are free to use, modify, and distribute this project with proper attribution.
**Badges
![GitHub repo size](https://img.shields.io/github/repo-size/terriberri82/Becoming-Her-Marvel-API-Project)
![GitHub last commit](https://img.shields.io/github/last-commit/terriberri82/Becoming-Her-Marvel-API-Project)
![GitHub issues](https://img.shields.io/github/issues/terriberri82/Becoming-Her-Marvel-API-Project)
![GitHub pull requests](https://img.shields.io/github/issues-pr/terriberri82/Becoming-Her-Marvel-API-Project)
![GitHub](https://img.shields.io/github/license/terriberri82/Becoming-Her-Marvel-API-Project)


   
