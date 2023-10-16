const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try{
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      {username: username, secret: username, first_name: username},
      {headers: {"private-key": "e046e74f-9b57-467f-b55c-8160c96d4f61"}}
    )
    return res.status(response.status).json(response.data);
  }catch(error){
    return res.status(error.response.status).json(error.response.data);
  }
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
});