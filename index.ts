import axios from 'axios';
import * as cheerio from 'cheerio';

import { leagues } from './leagues';
import { logFixture, logMatch } from './utils';

for (let l = 0; l < leagues.length; l++) {
  axios
    .get(leagues[l].link, {
      responseType: 'text',
    })
    .then((response) => {
      const html = response.data as string;
      let $ = cheerio.load(html);
      let matches = $('tr.odd[height="28"]');

      for (let m = 0; m < matches.length; m++) {
        let match: any = matches[m];
        logMatch(leagues[l].id, match);
      }
    })
    .catch((e) => {
      console.error(e);
    });
}
