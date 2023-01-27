const db = require('../db');

const isAdmin = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM kayttaja WHERE email = $1', [
      req.decoded?.email,
    ]);
    const isAdmin = result.rows[0].admin;
    if (isAdmin) {
      return next();
    }
    res.status(403).send({
      success: false,
      message: 'Sinulla ei ole oikeuksia tämän komennon käyttöön!',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Virhe admin oikeuksien tarkistamisessa',
      error: error,
    });
  }
};

module.exports = {
  isAdmin,
};
