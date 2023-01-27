const express = require('express');
const router = express.Router();
const db = require('../db');

/* KYSYMYKSET */

// Lisää uusi kysymys ja liitä se olemassa olevaan tenttiin
router.post('/kysymykset', async (req, res) => {
  const { kysymys, tentti_id, pisteet } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const kysymysQuery =
      'INSERT INTO kysymys (kysymys) VALUES ($1) RETURNING id';
    const { rows } = await client.query(kysymysQuery, [kysymys]);
    const kysymys_id = rows[0].id;
    const insertQuestionToExam =
      'INSERT INTO tentti_kysymys_liitos(tentti_id, kysymys_id, pisteet) VALUES ($1, $2, $3)';
    const insertQuestionToExamValues = [tentti_id, kysymys_id, pisteet];
    await client.query(insertQuestionToExam, insertQuestionToExamValues);
    await client.query('COMMIT');
    console.log(`Kysymys luotu ja yhdistetty tenttiin ID:llä ${tentti_id} ✅`);
    res.status(200).send({
      message: `Kysymys luotu ja yhdistetty tenttiin ID:llä ${tentti_id} ✅`,
      kysymys_id,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Virhe kysymyksen luomisessa:', error);
    res.status(500).send('Virhe kysymyksen luonnissa');
  } finally {
    client.release();
  }
});

// Poista kysymys ID:n avulla
router.delete('/kysymykset/:id', async (req, res) => {
  try {
    const liitosQuery =
      'DELETE FROM tentti_kysymys_liitos WHERE kysymys_id = ($1)';
    await db.query(liitosQuery, [req.params.id]);
    res.status(200).send({
      success: true,
      message: `Kysymys ID:llä ${req.params.id} poistettiin onnistuneesti ✅`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Kysymys ID:llä ${req.params.id} ei onnistuttu poistamaan ❌`,
    });
  }
});

// Muokkaa kysymyksen tietoja ID:n avulla
router.put('/kysymykset/:id', async (req, res) => {
  const { kysymys } = req.body;

  try {
    const text = 'UPDATE kysymys SET kysymys = ($1) WHERE id = ($2)';
    const values = [kysymys, req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Kysymys ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Kysymys ID:llä ${req.params.id} ei onnistuttu päivittämään ❌`);
  }
});

/* TENTIT */

// Hae KAIKKI tentit
router.get('/tentit', async (req, res) => {
  try {
    const text = 'SELECT * FROM tentti ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.status(200).send({
      success: true,
      results: rows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Tenttien haussa ilmeni ongelmia',
      errorMessage: error,
    });
    console.error(`admin: tenttien haussa ilmeni ongelma: ${error}`);
  }
});

// Lisää uusi tentti
router.post('/tentit', async (req, res) => {
  try {
    const { nimi, kuvaus, voimassaolo, pvm, max_pisteet } = req.body;
    const values = [nimi, kuvaus, voimassaolo, pvm, max_pisteet];
    const text =
      'INSERT INTO tentti (nimi, kuvaus, voimassaolo, pvm, max_pisteet) VALUES ($1, $2, $3, $4, $5)';

    await db.query(text, values);
    res.status(200).send({
      success: true,
      message: 'Tentti lisätty onnistuneesti! ✅',
    });
  } catch (error) {
    console.error('Virhe tentin tallennuksessa:', error);
    res.status(500).send({
      success: false,
      message: 'Tentin tallennuksessa ilmeni virhe',
      errorMessage: error,
    });
  }
});

// Poista tentti ID:n avulla
router.delete('/tentit/:id', async (req, res) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const tenttiQuery = 'DELETE FROM tentti WHERE id = ($1)';
    const liitosQuery =
      'DELETE FROM tentti_kysymys_liitos WHERE tentti_id = ($1)';
    await client.query(liitosQuery, [req.params.id]);
    await client.query(tenttiQuery, [req.params.id]);
    await client.query('COMMIT');
    res.status(200).send({
      success: true,
      message: `Tentti ID:llä ${req.params.id} poistettiin onnistuneesti ✅`,
    });
  } catch (error) {
    console.error('Tentin poistossa ilmeni virhe:', error);
    res.status(500).send({
      success: false,
      message: 'Tentin poistossa ilmeni virhe',
      errorMessage: error,
    });
  } finally {
    client.release();
  }
});

/* VASTAUKSET */

// Lisää uusi vastaus
router.post('/vastaukset', async (req, res) => {
  const { onkoOikein, vastaus, kysymys_id } = req.body;
  const values = [onkoOikein, vastaus, kysymys_id];

  try {
    const text =
      'INSERT INTO vastaus (oikein, teksti, kysymys_id) VALUES ($1, $2, $3) returning id';
    const { rows } = await db.query(text, values);
    res.status(200).send({
      success: true,
      vastaus_id: rows[0].id,
      message: 'Tenttivastaus tallennettu onnistuneesti ✅',
    });
  } catch (error) {
    console.error('Virhe:', error);
    res.status(500).send({
      success: false,
      message: 'Tenttivastauksen tallentamisessa ilmeni ongelma ❌',
      errorMessage: error,
    });
  }
});

// Poista vastaus ID:n avulla
router.delete('/vastaukset/:id', async (req, res) => {
  try {
    const text = 'DELETE FROM vastaus WHERE id = ($1)';
    await db.query(text, [req.params.id]);
    res.status(200).send({
      success: true,
      message: `Vastaus ID:llä ${req.params.id} poistettiin onnistuneesti ✅`,
    });
  } catch (error) {
    console.error('Virhe:', error);
    res.status(500).send({
      success: false,
      message: `Vastausta ID:llä ${req.params.id} ei onnistuttu poistamaan ❌`,
      errorMessage: error,
    });
  }
});

// Muokkaa vastauksen tietoja ID:n avulla
router.put('/vastaukset/:id', async (req, res) => {
  const { onkoOikein, vastaus } = req.body;

  try {
    const text =
      'UPDATE vastaus SET oikein = ($1), teksti = ($2) WHERE id = ($3)';
    const values = [onkoOikein, vastaus, req.params.id];
    await db.query(text, values);
    res.status(200).send({
      success: true,
      message: `Vastaus ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Vastauksen ID:llä ${req.params.id} ei onnistuttu päivittämään ❌`,
      errorMessage: error,
    });
  }
});

module.exports = router;
