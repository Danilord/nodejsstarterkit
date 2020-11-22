const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const cookie = require('cookie-parser');
const body = require('body-parser');
const {
  main
} = require('../routes');
const jwt = require('jsonwebtoken')

const MainController = require('../controllers/main')

/*
 * HTTP server class.
 */
exports.HTTP = class HTTP {


  /* Class constructor. */
  constructor({
    config
  } = {}) {
    this.config = config;
    this.app = null;
    this.server = null;
  }


  /* Returns a promise which starts the server. */
  async listen() {

    if (this.server) return this;

    // Express configuration
    this.app = express();
    this.app.use(cookie())
    this.app.use(body.json())
    this.app.use(body.urlencoded({
      extended: true
    }))
    this.app.use(cors())
    this.app.use(helmet())
    this.app.disable('x-powered-by')

    /* This login controller must exist before the main rount config */
    this.app.post('/login', MainController.login)

    this.app.use((req, res, next) => {
      const authHeader = req.headers.authorization

      const secretToken = 'superSecretToken';

      if (authHeader) {

        /* Takes only the token for verificaiton from the authHeader*/
        const token = authHeader.split(' ')[1]
        jwt.verify(token, secretToken, (err, user) => {
          if (err) {
            return res.sendStatus(403)
          }

          req.user = user
          /* when executed will go to main */
          next()
        })
      } else {
        res.sendStatus(500)
      }

    })

    /* Route configuration */
    this.app.use('/', main)

    await new Promise((resolve) => {
      let {
        httpPort,
        httpHost
      } = this.config;
      this.server = this.app.listen(httpPort, httpHost, resolve);
    });
  }

  /* Returns a promise which stops the server. */
  async close() {
    if (!this.server) return this;

    await new Promise((resolve) => {
      this.server.close(resolve);
      this.server = null;
      this.app = null;
    });
  }

}