const jwt = require('jsonwebtoken')

/* Authentication process */
const login = async (req, res) => {
  const {
    username,
    password
  } = req.body;

  const token = 'superSecretToken';

  if (username === 'admin' && password === 'admin') {
    const jsonToken = jwt.sign({
      username,
      role: 'admin'
    }, token);

    return res.status(200).json({
      token: jsonToken,
    });
  }

  return res.status(500).send(`Error on Main controller`);
}


module.exports = {
  login
}