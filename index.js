const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "7d551870-4a7c-4b25-9fac-eab7de303ab6" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      // La requête a été faite et le serveur a répondu avec un statut différent de 2xx
      return res.status(e.response.status).json(e.response.data);
    } else if (e.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error(e.request);
      return res.status(500).json({ message: "No response received from server." });
    } else {
      // Quelque chose s'est mal passé lors de la configuration de la requête
      console.error('Error', e.message);
      return res.status(500).json({ message: "Error setting up request." });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
