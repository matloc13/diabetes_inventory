const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // console.log(req.headers['authorization']);
  console.log(req.cookie('auth-token'))
  // console.log(req);
  
  
  const token = req.cookie('auth-token');

  if (!token) {
    res.status(401).send('<p>access denied</p>')
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verifed;
  } catch (error) {
    // res.status(400).send('invalid token');
    console.error(error);
  } finally {
    next()
  }
}
