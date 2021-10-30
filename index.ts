import axios from 'axios';
import * as cheerio from 'cheerio';

const logMatch = (match: any) => {
  const matchDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const FT = match.children[2].children[0].children[0].children[0].data;
  const secondTeam = match.children[3].children[0].data.trim();
  const FHT = match.children[5].children[0].children[0].data.replace(
    /[{()}]/g,
    ''
  );
  //Fulltime result
  const HFTG = FT.split(' - ')[0];
  const AFTG = FT.split(' - ')[1];

  //First halftime result
  const HFHTG = FHT.split('-')[0];
  const AFHTG = FHT.split('-')[1];

  //Second halftime result
  const HSHTG = parseInt(HFTG) - parseInt(HFHTG);
  const ASHTG = parseInt(AFTG) - parseInt(AFHTG);

  console.log(
    '2' +
      ' | ' +
      matchDate +
      ' | ' +
      ' ' +
      ' | ' +
      firstTeam +
      ' | ' +
      secondTeam +
      ' | ' +
      HFTG +
      ' | ' +
      AFTG +
      ' | ' +
      HFHTG +
      ' | ' +
      AFHTG +
      ' | ' +
      HSHTG +
      ' | ' +
      ASHTG
  );
};

const logFixture = (match: any) => {
  const fixtureDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const fixtureTime = match.children[2].children[0].children[0].data;
  const secondTeam = match.children[3].children[0].data.trim();

  console.log(
    '0' +
      ' | ' +
      fixtureDate +
      ' | ' +
      fixtureTime +
      ' | ' +
      firstTeam +
      ' | ' +
      secondTeam
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
      } else if (match.children.length === 7) {
        logFixture(match);
      }
    }
  })
  .catch((e) => {
    console.error(e);
  });
