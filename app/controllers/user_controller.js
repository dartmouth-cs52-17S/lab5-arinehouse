import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password || !username) {
    res.status(422).send('You must provide an email, password, and username');
    return;
  }

  // Check if the email already exists in the system
  User.findOne({ email }, (err, data) => {
    if (err) {
      res.status(500).json({ err });
      return;
    } else if (data) {
      res.status(409).send('This email address is already registered');
      return;
    }
    // If not, create a new user
    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;
    user.save()
    .then((result) => {
      res.send({ token: tokenForUser(user) });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  });
};

// encodes a new function for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
