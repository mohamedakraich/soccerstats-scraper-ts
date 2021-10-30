import axios from 'axios';
import * as cheerio from 'cheerio';

import { leagues } from './leagues';
import { logMatch } from './utils';

const logLeague = async (league: any) => {
  try {
    const response = await axios.get(league.link, {
      responseType: 'text',
    });
    const html = response.data as string;
    let $ = cheerio.load(html);
    let matches = $('tr.odd[height="28"]');

    for (let m = 0; m < matches.length; m++) {
      let match: any = matches[m];
      logMatch(league.id, match);
    }
  } catch (e) {
    console.error(e);
  }
};

const logLeagues = async () => {
  for (let l = 0; l < leagues.length; l++) {
    await logLeague(leagues[l]);
  }
};

logLeagues();
