const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { token } = req.body;
  try {
    jwt.verify(token, process.env.REACT_APP_TOKEN_KEY);
    res.send({
      success: true,
      message: 'Token voimassa',
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Token ei ole enää voimassa. Kirjaudu sisään uudelleen!',
      error: error,
    });
  }
});

module.exports = router;
