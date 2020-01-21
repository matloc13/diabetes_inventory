const jwt = require('jsonwebtoken');

module.exports = (req, res, next)  => {

// const header = req.headers['authorization'];
// console.log(header);


//   const token = () => {
//     if (typeof header !== undefined) {
//     const bearer = header.split(' ');
//     const token = bearer[1];
//     console.log(bearer);
    
//     console.log(token);
    
//     return token.toString();
 
//   } else {
//     res.status(404);
//   }
// }
  const token = req.headers['authorization'].toString();

  if (!token) {
    res.status(401).send('<p>access denied</p>')
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next()
  } catch (error) {
    // res.status(400).send('invalid token');
    console.error(error);
  } finally {

  }
}
