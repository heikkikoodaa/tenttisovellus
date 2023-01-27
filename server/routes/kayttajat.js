const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hae kaikki käyttäjät
router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM kayttaja ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    res.status(500).send('Tenttikäyttäjien haussa ilmeni ongelma ❌');
  }
});

// Lisää uusi käyttäjä
router.post('/', async (req, res) => {
  try {
    const { nimi, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const values = [nimi, email, hashedPassword];
    const text =
      'INSERT INTO kayttaja (nimi, email, salasana) VALUES ($1, $2, $3)';
    await db.query(text, values);
    res.status(200).send({
      success: true,
      message: 'Tenttikäyttäjä tallennettu onnistuneesti ✅',
    });
  } catch (error) {
    console.log('Virhe käyttäjän tallennuksessa!', error);
    res.status(500).send({
      success: false,
      message: 'Tenttikäyttäjän tallennuksessa ilmeni ongelma ❌',
      errorMessage: error,
    });
  }
});

// Poista käyttäjä ID:n avulla
router.delete('/:id', async (req, res) => {
  try {
    const text = 'DELETE FROM kayttaja WHERE id = ($1)';
    const values = [req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Käyttäjä ID:llä ${req.params.id} poistettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Käyttäjää ID:llä ${req.params.id} ei onnistuttu poistamaan ❌`);
  }
});

// Muokkaa käyttäjän tietoja ID:n avulla
router.patch('/:id', async (req, res) => {
  const { nimi, email, isAdmin } = req.body;

  try {
    const text =
      'UPDATE kayttaja SET nimi = ($1), email = ($2), admin = ($3) WHERE id = ($4)';
    const values = [nimi, email, isAdmin, req.params.id];
    await db.query(text, values);
    res
      .status(200)
      .send(`Käyttäjä ID:llä ${req.params.id} päivitettiin onnistuneesti ✅`);
  } catch (error) {
    res
      .status(500)
      .send(`Käyttäjää ID:llä ${req.params.id} ei onnistuttu päivittämään ❌`);
  }
});

module.exports = router;
