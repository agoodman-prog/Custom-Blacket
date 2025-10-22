const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let users = {
  "player1": {
    tokens: 100,
    inventory: []
  }
};

const packItems = [
  { name: "Common Blook", rarity: "common", chance: 0.6 },
  { name: "Rare Blook", rarity: "rare", chance: 0.3 },
  { name: "Legendary Blook", rarity: "legendary", chance: 0.1 }
];

function openPack() {
  const roll = Math.random();
  let cumulative = 0;
  for (let item of packItems) {
    cumulative += item.chance;
    if (roll <= cumulative) return item;
  }
  return packItems[0]; // fallback
}

app.post('/open-pack', (req, res) => {
  const user = users["player1"];
  if (user.tokens < 10) return res.status(400).json({ error: "Not enough tokens" });

  user.tokens -= 10;
  const item = openPack();
  user.inventory.push(item);
  res.json({ item, tokens: user.tokens, inventory: user.inventory });
});

app.get('/status', (req, res) => {
  res.json(users["player1"]);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
