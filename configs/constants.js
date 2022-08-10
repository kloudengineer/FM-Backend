const HTTP_STATUS_CODES = {
  SUCCESS: 200,

  // 4XX Client-side Errors
  CLIENT_ERROR: 400,
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  // 5XX Server-side Errors
  INTERNAL_SERVER_ERROR: 500
}

module.exports = { HTTP_STATUS_CODES }