const express = require('express');
const router = express.Router();
const db = require('../db');

// Hae kaikki vastaukset
router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM vastaus ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    res.status(500).send('Tenttivastausten haussa ilmeni ongelma ❌');
  }
});

module.exports = router;
