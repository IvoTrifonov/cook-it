import jwtDecode from 'jwt-decode';

export function getLocalUser() {
  const token = localStorage.getItem('user');
  let user;

  try {
    user = jwtDecode(token);
  } catch (error) { }

  return user;
}