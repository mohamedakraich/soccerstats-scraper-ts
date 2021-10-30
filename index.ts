import axios from 'axios';
import * as cheerio from 'cheerio';

const logMatch = (match: any) => {
  const firstTeam = match.children[1].children[0].data.trim();
  const fullTime = match.children[2].children[0].children[0].children[0].data;
  const secondTeam = match.children[3].children[0].data.trim();
  const halfTime = match.children[5].children[0].children[0].data.replace(
    /[{()}]/g,
    ''
  );

  console.log(
    firstTeam + ' | ' + fullTime + ' | ' + secondTeam + ' | ' + halfTime
  );
};

const url =
  'https://www.soccerstats.com/results.asp?league=england&pmtype=bydate';

axios
  .get(url, {
    responseType: 'text',
  })
  .then((response) => {
    const html = response.data as string;
    let $ = cheerio.load(html);
    let matches = $('tr.odd[height="28"]');

    for (let m = 0; m < matches.length; m++) {
      let match: any = matches[m];
      if (match.children.length === 9) {
        logMatch(match);
      }
    }
  })
  .catch((e) => {
    console.error(e);
  });
