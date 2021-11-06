import axios from 'axios';
import * as cheerio from 'cheerio';
import Excel from 'exceljs';

import cliProgress from 'cli-progress';
import { exit } from 'process';

import { leagues } from './leagues';
import { getMatch } from './utils';

const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('Soccerstats');

// add column headers
worksheet.columns = [
  { header: 'League', key: 'league_id' },
  { header: 'Status', key: 'status' },
  { header: 'Date', key: 'date' },
  { header: 'Time', key: 'time' },
  { header: 'Home_Team', key: 'home_team' },
  { header: 'Away_team', key: 'away_team' },
  { header: 'GHFT', key: 'GHFT' },
  { header: 'GAFT', key: 'GAFT' },
  { header: 'GH1HT', key: 'GH1HT' },
  { header: 'GA1HT', key: 'GA1HT' },
  { header: 'GH2HT', key: 'GH2HT' },
  { header: 'GA2HT', key: 'GA2HT' },
];

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const saveLeague = async (league: any) => {
  try {
    const response = await axios.get(league.link, {
      responseType: 'text',
    });
    const html = response.data as string;
    let $ = cheerio.load(html);
    let matches = $('#btable').first().find('tr.odd[height="28"]');
    for (let m = 0; m < matches.length; m++) {
      let match: any = matches[m];
      const row = getMatch(league.id, match);
      worksheet.addRow(row);
      //console.log(row);
    }
  } catch (e) {
    console.error(league.id, e);
    exit();
  }
};

const saveLeagues = async () => {
  let counter = 0;
  bar.start(leagues.length, 0);
  for (let l = 0; l < leagues.length; l++) {
    try {
      await saveLeague(leagues[l]);
      counter++;
      bar.update(counter);
    } catch (e) {
      console.error(l, e);
      exit();
    }
  }
  workbook.xlsx
    .writeFile('derek.xls')
    .then(() => {
      console.log('saved');
    })
    .catch((err) => {
      console.log('err', err);
    });

  bar.stop();
};

saveLeagues();
