export const logResult = (id: string, match: any) => {
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

    console.log(
      id +
        ' | ' +
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
  } else if (match.children[2].children[0].children[0].data === 'Aw. L') {
    const matchTime = match.children[2].children[0].children[0].data;
    console.log(
      id +
        ' | ' +
        '2' +
        ' | ' +
        matchDate +
        ' | ' +
        matchTime +
        ' | ' +
        firstTeam +
        ' | ' +
        secondTeam +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0' +
        ' | ' +
        '0'
    );
  }
};

export const logFixture = (id: string, match: any) => {
  const fixtureDate = match.children[0].children[0].children[0].data.trim();
  const firstTeam = match.children[1].children[0].data.trim();
  const fixtureTime =
    match.children[2].children[0].data === 'pp.'
      ? match.children[2].children[0].data
      : match.children[2].children[0].children[0].data;
  const secondTeam = match.children[3].children[0].data.trim();

  console.log(
    id +
      ' | ' +
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

export const logMatch = (id: string, match: any) => {
  if (match.children.length === 9) {
    logResult(id, match);
  } else if (match.children.length === 7) {
    logFixture(id, match);
  }
};
