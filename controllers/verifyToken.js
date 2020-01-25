const jwt = require('jsonwebtoken');

module.exports = (req, res, next)  => {
  const token = req.headers['authorization'].toString();

  if (!token) {
    res.status(401).send('<p>access denied</p>')
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next()
  } catch (error) {
    
    console.error(error);
    res.sendStatus(400).send('access denied invalid token');
  } finally {

  }
}
