// Save Highscore to local storage
const highScoresContainer = document.getElementById("high-scores-container");
const scores = JSON.parse(localStorage.getItem("score_data")) || [];

// Displays Highscores on a page and checks if no high score is recorded 
function displayScores() {
  console.log(scores, "<==scores");

  if (scores.length > 0) {
    highScoresContainer.innerHTML = `
    <table id="high-score-table">
    <tr>
      <th>No</th>
      <th>Username</th>
      <th>Score</th>
    </tr>
    </table>
    `;
    const highScoreTable = document.getElementById("high-score-table");
    console.log(highScoreTable, "hcs");
    scores.forEach((score, id) => {
      highScoreTable.innerHTML += `
           <tr>
  <td>${id + 1}</td>
  <td>${score.username}</td>
  <td>${score.score}</td>
</tr>
           `;
    });
  }else{
    highScoresContainer.innerHTML = `<h1>No high scores available, play game to add high scores :)</h1>`
  }
}

displayScores();
