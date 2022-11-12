const fetchFacetsABI = async (diamondAddress) => {
  const fullUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${diamondAddress}&apikey=${API_KEY}`;
}