const fname = document.querySelector(".fname");
const lname = document.querySelector(".lname");
const country = document.querySelector(".country");
const score = document.querySelector(".score");
const submitBtn = document.querySelector("#submitBtn");
const container = document.querySelector(".container");
const emptyUser = document.getElementById("empty-user")
let playerList = [];
console.log(playerList);

function handleRemove(id){
  playerList.splice(id, 1);
  updateCard();
}

function handleIncrement(id){ 
  playerList[id].score += 5;
  updateCard()
}

function handleDecrement(id){ 
  playerList[id].score -= 5;
  updateCard(); 
}

const updateCard = () => {
  playerList.sort((a, b) => a.score - b.score);
  let showdata = "";
  playerList.forEach((player , index) => {
    showdata += 
        `<div class="card">
           <span>${player.fullname}</span>
           <span>${player.country}</span>
           <span>${player.score}</span> 
           <span>${player.date}</span>
           <button onClick="handleIncrement(${index})" class="increment">+5</button>
           <button onClick="handleDecrement(${index})" class="decrement">+5</button>
          <button onClick="handleRemove(${index})" class="decrement">&#x1F5D1;</button>
        </div>`;
  });
  container.innerHTML = playerList && playerList.length != 0 ? showdata : emptyUser.textContent
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from submitting normally
  const firstName = fname.value;
  const lastName = lname.value;
  const selectedCountry = country.value;
  const userScore = Number(score.value);
  const date = new Date();
  const month =
    date.getMonth() > 9 ? `${date.getMonth()}` : `0${date.getMonth()}`;
  const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
  const today = `${day}-${month}-${date.getFullYear()}`;
  console.log(today, day);
  if (
    !firstName ||
    !lastName ||
    !selectedCountry ||
    isNaN(userScore) ||
    userScore < 0 ||
    userScore > 100
  ) {
    alert(
      "Please fill out all fields and ensure the score is a valid number between 0 and 100."
    );
    return;
  }
 
  // Perform validation and display results here...
  // Example:
  else {
    alert(
      `Thank you, ${firstName} ${lastName}! Your score for ${selectedCountry} is ${userScore}.`
    );
    let player = {
      id: playerList.length + 1, // Auto-incrementing ID for each player
      fullname: `${firstName} ${lastName}`,
      country: selectedCountry,
      score: userScore,
      date: today,
    };
    playerList.push(player);
    updateCard();
    // Clear form fields
    fname.value = "";
    lname.value = "";
    country.value = "";
    score.value = "";
  }
  console.log(playerList);
});
