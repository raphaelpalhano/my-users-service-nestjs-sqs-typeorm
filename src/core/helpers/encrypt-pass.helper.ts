import * as bcrypt from 'bcrypt';

export const encryptPassHelper = async (password: string) => {
  const saltRounds = 11; // force for strong password

  const crypted = bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      return hash;
    });
  });
  return crypted;
};
