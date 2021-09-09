const express = require("express");
const env = require('dotenv').config();
const app = express();
const PORT = process.env.SERVER_PORT;
const { graphqlHTTP } = require("express-graphql");
const http = require("http");
const cors = require("cors");



app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
  })
);
app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

