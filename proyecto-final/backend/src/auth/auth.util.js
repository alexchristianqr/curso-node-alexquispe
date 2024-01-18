export function checkInputPasswords(payload) {
  const { password, repeat_password } = payload;
  return password === repeat_password;
}
