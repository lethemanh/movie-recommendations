const savePreference = (payload: IPreference) => {
  localStorage.setItem('preference', JSON.stringify(payload));
}

const getPreference = () => {
  const preference = localStorage.getItem('preference');
  return preference ? JSON.parse(preference) : {
    favoriteGenres: [],
    favoriteCasts: [],
    favoriteCompanies: [],
  } as IPreference
}

export { savePreference, getPreference }
