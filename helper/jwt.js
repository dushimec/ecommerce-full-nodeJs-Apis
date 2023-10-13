const { expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.my_secret

  return expressjwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
  }).unless({
    path: [
      { url: /\/product(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/category(.*)/, methods: ['GET', 'OPTIONS'] },

      '/users/login',
      '/users/register',

    ]
  })
}

function isRevoked(req, res, next) {
  if (req.user.isAdmin) {
    next()
  }
    res.status(500).json(error)
}


module.exports = authJwt;
