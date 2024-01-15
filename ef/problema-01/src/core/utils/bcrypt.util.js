import bcrypt from "bcrypt";

export function hashedPassword(password, length = 10) {
  const salt = bcrypt.genSaltSync(length);
  return bcrypt.hashSync(password, salt);
}

export function compareHashedPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
