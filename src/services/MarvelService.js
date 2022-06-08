import useHttp from './../hooks/http.hook';

const useMarvelService = () => {
  const {loading, error, request, clearError} = useHttp();
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = process.env.REACT_APP_MARVEL_API_KEY;
  const _baseOffset = 210
  
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey
    }`);
    return res.data.results.map(item => _transformCharacter(item));
  }
  
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
    return _transformCharacter(res.data.results[0]);
  }
  
  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
  }
  }
  
  return {loading, error, getAllCharacters, getCharacter, clearError}
};

export default useMarvelService;
