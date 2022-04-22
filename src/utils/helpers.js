export const getTokenFromLs = () => { 
  return localStorage.getItem(`token`)
}

export const setTokenInLs = ( value) => { 
  return localStorage.setItem(`token`, value);
}