import axios from 'axios';
import * as cheerio from 'cheerio';

import cliProgress from 'cli-progress';

import { leagues } from './leagues';
import { logMatch } from './utils';

const LEAGUES_LENGTH = 98;

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

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
  let counter = 0;
  bar.start(LEAGUES_LENGTH, 0);
  for (let l = 0; l < leagues.length; l++) {
    await logLeague(leagues[l]);
    counter++;
    bar.update(counter);
  }
  bar.stop();
};

logLeagues();
