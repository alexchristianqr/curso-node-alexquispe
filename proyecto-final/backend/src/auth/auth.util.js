export function checkInputPasswords(payload) {
  const { password, repetPassword } = payload;
  return password === repetPassword;
}
