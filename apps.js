let entries = [];
let pool = 0;

// JOIN FUNCTION
const API_URL = "https://script.google.com/macros/s/AKfycbxFDCUUI9Qj1-9Mr5t3kDD0LcGcnUubl1rvNjNkHyzoe_-5ziAG4mUElY_3iNQJOMVffw/exec";

function joinDraw() {
  const name = document.getElementById("name").value;
  const tokens = document.getElementById("tokens").value;

  if (!name || !tokens) return alert("Fill all fields");

  fetch(API_URL + "?name=" + name + "&tokens=" + tokens)
    .then(res => res.text())
    .then(data => {
      alert("Entry submitted!");
    });
}
  const name = document.getElementById("name").value;
  const tokens = parseInt(document.getElementById("tokens").value);

  if (!name || !tokens) return alert("Enter name + tokens");

  entries.push({
    name,
    tokens
  });

  updateUI();
}

// UPDATE UI
function updateUI() {
  const table = document.getElementById("entryTable");
  table.innerHTML = "";

  let totalEntries = 0;
  let participants = entries.length;

  entries.forEach(e => {
    totalEntries += e.tokens;

    const row = `<tr>
      <td>${e.name}</td>
      <td>${e.tokens}</td>
      <td>${e.tokens}</td>
    </tr>`;
    table.innerHTML += row;
  });

  document.getElementById("totalEntries").innerText = totalEntries;
  document.getElementById("participants").innerText = participants;
  document.getElementById("poolAmount").innerText = "$" + totalEntries * 1;
}

// SIMPLE COUNTDOWN (weekly reset)
function countdown() {
  const now = new Date();
  const next = new Date();

  next.setDate(now.getDate() + (7 - now.getDay()));
  next.setHours(18, 0, 0, 0);

  const diff = next - now;

  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerText =
    `${h}h ${m}m ${s}s`;
}

setInterval(countdown, 1000);

// DRAW SYSTEM (simple random picker)
function pickWinner() {
  if (entries.length === 0) return alert("No entries");

  let poolArray = [];

  entries.forEach(e => {
    for (let i = 0; i < e.tokens; i++) {
      poolArray.push(e.name);
    }
  });

  const winner = poolArray[Math.floor(Math.random() * poolArray.length)];

  document.getElementById("winner").innerText = winner;
}
