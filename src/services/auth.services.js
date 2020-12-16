import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';



const localUserOpts = {
  usernameField: "email"
}

const localUserLogin = new LocalStrategy(
  localUserOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, {}, { message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна', success: false });
      } else if (!user.authenticateUser(password)) {
        return done(null, {}, { message: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна', success: false });
      }

      return done(null, user, { message: 'Амжилттай нэвтэрлээ.', success: true });
    } catch (e) {
      return done(e, false);
    }
  }
);

const jwtUserOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: "testsecret"//getSecret()
}

const jwtUserStrategy = new JWTStrategy(jwtUserOpts, async (payload, done) => {
  try {
    console.log(payload._id);
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use("localUser", localUserLogin);
passport.use("jwtUser", jwtUserStrategy);

export const authUserLogin = passport.authenticate("localUser", { session: false });
export const authUserJwt = passport.authenticate("jwtUser", { session: false });

