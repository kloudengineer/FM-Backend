const admin = require('../configs/firebase')
const { HTTP_STATUS_CODES } = require('../configs/constants')

async function verifyToken(req, res, next){

  const token = req.headers?.authorization?.split(' ')[1];

  try {
    if (token) {
      const decodedToken = await admin.auth().verifyIdToken(token)

      if (decodedToken){
        req.user = decodedToken
        return next()
      }
    }

    return res.status(HTTP_STATUS_CODES.NOT_AUTHORIZED).send("Unauthorized!")
  } catch (e) {

    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(`Internal Server Error: ${e}`)
  }
}

module.exports = { verifyToken }