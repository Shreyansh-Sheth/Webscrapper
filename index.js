//url to website
//in this case steam top seller games
const siteUrl =
  "https://store.steampowered.com/search/?filter=topsellers&page=";

//specific tag , class ,id  in which your data is
const dataSetting = ".title";

//limit of page from to
const pageLengthMin = 1;
const pageLengthMax = 20;


const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function fetchData(i) {
  const result = await axios.get(siteUrl + "" + i);
  return cheerio.load(result.data);
}

async function scrape() {
  let data = [];
  for (let i = pageLengthMin; i < pageLengthMax; i++) {
    const DOM = await fetchData(i);
    await console.log(DOM);
    await data.push(...DOM(dataSetting).toArray());
  }

  console.log(data);
  await saveData(data);
}

//this will save data as html to another file call data.html
function saveData(data) {
  let out = "<html><body>";
  data.forEach(element => {
    out += `<div class="box"><h3>${element.children[0].data}</h3><br><p></p></div>`;
  });

  fs.writeFileSync("data.html", out);
}

//start chain of function
scrape();
