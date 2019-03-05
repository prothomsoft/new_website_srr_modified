import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";
import keys from "../config/keys";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

export const passportStrategy = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user); // first parameter is error, but their is none so null, and user is success
                    }
                    return done(null, false); // second the user is false
                })
                .catch(err => console.log(err));
        })
    );
};
