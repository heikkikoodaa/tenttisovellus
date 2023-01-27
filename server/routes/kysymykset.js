const express = require('express');
const router = express.Router();
const db = require('../db');

// Hae kaikki kysymykset
router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM kysymys ORDER BY id ASC';
    const { rows } = await db.query(text);
    res.send(rows);
  } catch (error) {
    console.error('Tenttikysymysten haussa ilmeni ongelma:', error);
  }
});

module.exports = router;
