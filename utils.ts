export const getResult = (id: string, match: any): string[] => {
  const row: string[] = [];
  const matchDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const secondTeam = match.children[3].children[0].data.trim();
  if (match.children[2].children[0].children[0].data !== 'Aw. L') {
    const FT = match.children[2].children[0].children[0].children[0].data;
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

    return [
      id,
      2,
      matchDate,
      '',
      firstTeam,
      secondTeam,
      HFTG,
      AFTG,
      HFHTG,
      AFHTG,
      HSHTG,
      ASHTG,
    ];
  } else if (match.children[2].children[0].children[0].data === 'Aw. L') {
    const matchTime = match.children[2].children[0].children[0].data;

    console.log('Found One');
    return [
      id,
      2,
      matchDate,
      '',
      firstTeam,
      secondTeam,
      '3',
      '0',
      '0',
      '0',
      '3',
      '0',
    ];
  }
  return [];
};

export const getFixture = (id: string, match: any): string[] => {
  const fixtureDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const fixtureTime =
    match.children[2].children[0].data === 'pp.'
      ? match.children[2].children[0].data
      : match.children[2].children[0].children[0].data;
  const secondTeam = match.children[3].children[0].data.trim();

  return [
    id,
    '0',
    fixtureDate,
    fixtureTime,
    firstTeam,
    secondTeam,
    '',
    '',
    '',
    '',
    '',
    '',
  ];
};

export const getMatch = (id: string, match: any): string[] => {
  if (match.children.length === 9) {
    return getResult(id, match);
  } else if (match.children.length === 7) {
    return getFixture(id, match);
  }
  return [];
};
