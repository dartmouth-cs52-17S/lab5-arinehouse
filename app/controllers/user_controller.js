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

  if (!email || !password) {
    res.status(422).send('You must provide an email and password');
  }

  // Check if the email already exists in the system
  User.find({ email }, (err, data) => {
    if (data == null) {
      res.status(409).send('This email address is already registered');
    } else {
      res.sendStatus(200);
    }
    // If not, create a new user
    const user = new User();
    user.email = email;
    user.password = password;
    user.save()
    .then((result) => {
      res.send({ token: tokenForUser(user) });
      res.json({ message: 'Post created!' });
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
