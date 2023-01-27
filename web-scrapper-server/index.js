const express = require("express");
config = require("dotenv").config();
const crawler = require("./crawler");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Use post /details to make request to the web crawler");
  console.log("get req");
  // crawler.crawlerFunc("https://en.wikipedia.org/wiki/Web_crawler","test.png",true)
});

app.post("/details", async (req, res) => {
  try {
    const { url, name, bool } = req.body;
    await crawler.crawlerFunc(url, name, bool);
    await res.status(200).sendFile(__dirname + `/${name}`);
    const time = new Date();
    console.log(`file was sent on ${time} `);
    file = __dirname + `/${name}`;
    setTimeout(() => {
      clean(file);
    }, 10000);
  } catch (error) {
    res.send("There is an issue with the server").status(400);
    console.log({ error });
  }
});
function clean(filename) {
  const time = new Date();
  fs.unlinkSync(filename);
  console.log(`File was deleted sucessfully on ${time}`);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
