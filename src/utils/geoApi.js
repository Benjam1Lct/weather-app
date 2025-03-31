export const GEO_API_OPTIONS = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };
  
  const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
  
  export const fetchCities = async (input) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );
    const data = await response.json();
    return data;
  };
  
  export const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);
  
    const cleaned = citiesList.data.filter(city =>
      !city.name.toLowerCase().includes("arrondissement")
    );
  
    const includeParis = inputValue.toLowerCase().startsWith("par");
    if (includeParis) {
      const paris = {
        name: "Paris",
        countryCode: "FR",
        latitude: 48.8566,
        longitude: 2.3522,
      };
      cleaned.unshift(paris);
    }
  
    const unique = cleaned.filter((city, index, self) =>
      index === self.findIndex(c =>
        c.name === city.name && c.countryCode === city.countryCode
      )
    );
  
    const sorted = unique.sort((a, b) => {
      if (a.countryCode === 'FR' && b.countryCode !== 'FR') return -1;
      if (a.countryCode !== 'FR' && b.countryCode === 'FR') return 1;
      return 0;
    });
  
    const sliced = sorted.slice(0, 10);
  
    return {
      options: sliced.map(city => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };
  