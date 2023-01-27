export const tenttiData = {
  dataInitialized: false,
  dataSaved: false,
  tentit: [
    {
      nimi: 'Maantieto',
      kysymykset: [
        {
          kysymys: 'Suomen pääkaupunki on...',
          vaihtoehdot: [
            { id: '1', vastaus: 'Helsinki', onkoOikea: true },
            { id: '2', vastaus: 'Turku', onkoOikea: false },
            { id: '3', vastaus: 'Jyväskylä', onkoOikea: false },
            { id: '4', vastaus: 'Rovaniemi', onkoOikea: false },
          ],
        },
        {
          kysymys: 'Japanin pääkaupunki on...',
          vaihtoehdot: [
            { id: '1', vastaus: 'Osaka', onkoOikea: false },
            { id: '2', vastaus: 'Hiroshima', onkoOikea: false },
            { id: '3', vastaus: 'Kyoto', onkoOikea: false },
            { id: '4', vastaus: 'Tokyo', onkoOikea: true },
          ],
        },
        {
          kysymys: 'Maapallo on litteä. Totta vai tarua?',
          vaihtoehdot: [
            { id: '1', vastaus: 'Totta', onkoOikea: false },
            { id: '2', vastaus: 'Tarua', onkoOikea: true },
          ],
        },
      ],
    },
    {
      nimi: 'Toinen tentti',
      kysymykset: [
        {
          kysymys: 'Hauki on kala.',
          vaihtoehdot: [
            { id: '22', vastaus: 'Kyllä', onkoOikea: true },
            { id: '23', vastaus: 'Ei', onkoOikea: false },
          ],
        },
        {
          kysymys: 'Avaruus on ääretön. Totta vai ei?',
          vaihtoehdot: [
            { id: '24', vastaus: 'Kyllä', onkoOikea: true },
            { id: '25', vastaus: 'Ei', onkoOikea: false },
          ],
        },
        {
          kysymys: 'Ääni kulkee valoa nopeammin.',
          vaihtoehdot: [
            { id: '26', vastaus: 'Kyllä', onkoOikea: false },
            { id: '27', vastaus: 'Ei', onkoOikea: true },
          ],
        },
      ],
    },
  ],
};
