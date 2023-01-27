const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/', async (req, res, next) => {
  let { email, password } = req.body;

  let existingUser;
  let passwordMatch = false;
  try {
    const userQueryText = 'SELECT * FROM kayttaja WHERE email = ($1)';
    const { rows } = await db.query(userQueryText, [email]);
    existingUser = rows[0];
    passwordMatch = await bcrypt.compare(password, existingUser.salasana);
  } catch {
    return res.status(400).send('Käyttäjätunnus tai salasana väärin!');
  }
  if (!existingUser || !passwordMatch) {
    const error = Error(
      'Väärät kirjautumistiedot! Tarkista sähköposti sekä salasana ja yritä uudestaan.'
    );
    return res.status(401).send({
      success: false,
      errorMessage: error,
    });
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        isAdmin: existingUser.admin,
      },
      process.env.REACT_APP_TOKEN_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    console.error(err);
    const error = new Error('Virhe! Jotain meni pieleen kirjautuessa.');
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: 'Kirjautuminen onnistui! 🏄‍♂️',
    user: {
      token: token,
    },
  });
});

module.exports = router;
