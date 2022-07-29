const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      async (jwtPayload, done) => {
        try {
          const user = jwtPayload.user;
          done(null, user); 
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
}