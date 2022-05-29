class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = process.env.REACT_APP_MARVEL_API_KEY;
  
  getResource = async (url) => {
    const responce = await fetch(url);
    
    if (!responce.ok) {
      throw new Error(`Could not fetch ${url}. Status error: ${responce.status}`)
    }
    
    return responce.json();
  }
  
  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey
    }`);
    return res.data.results.map(this._transformCharacter());
  }
  
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`)
    return this._transformCharacter(res.data.results[0]);
  }
  
  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
  }
  }
};

export default MarvelService;
