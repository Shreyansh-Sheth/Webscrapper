const siteUrl =
  "https://store.steampowered.com/search/?filter=topsellers&page=";
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const dataSetting = ".title";
const pageLengthMin = 1;
const pageLengthMax = 20;

async function fetchData(i) {
  const result = await axios.get(siteUrl + "" + i);
  return cheerio.load(result.data);
}

async function scrape() {
  let data = [];
  for (let i = 0; i < 5; i++) {
    const DOM = await fetchData(i);
    await console.log(DOM);
    await data.push(...DOM(dataSetting).toArray());
  }

  console.log(data);
  await saveData(data);
}

function saveData(data) {
  let out = "<html><body>";
  data.forEach(element => {
    out += `<div class="box"><h3>${element.children[0].data}</h3><br><p></p></div>`;
  });

  fs.writeFileSync("data.html", out);
}
scrape();
