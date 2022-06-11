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
  
  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map(item => _transformComics(item));
  }
  
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
    return _transformCharacter(res.data.results[0]);
  }
  
  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey
    }`)
    return _transformComics(res.data.results[0]);
  }
  
  const _transformComics = (comics) => {
    return {
      name: comics.title,
      id: comics.id,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      price: comics.prices[0].price ? comics.prices[0].price + '$' : null,
      url: comics.urls[0].url,
      description: comics.description,
      pages: comics.pageCount,
    }
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
  
  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
};

export default useMarvelService;
