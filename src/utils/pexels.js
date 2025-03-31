import { createClient } from 'pexels';

export const pexelsClient = createClient('gjOiqujyTqmRLSok09mU613oy9zyoQPcu4sUdmXzLhiwbsIkXpL1lK9W');

export const fetchCityImage = async (cityName, setCityImage, client) => {
  const refinedQuery = `${cityName} city landscape`;
  try {
    const res = await client.photos.search({ query: refinedQuery, per_page: 1 });
    if (res.photos && res.photos.length > 0) {
      const img = new Image();
      img.src = res.photos[0].src.large2x;
      img.onload = () => setCityImage(img.src);
    } else {
      setCityImage(null);
    }
  } catch (err) {
    console.error("Erreur récupération image Pexels :", err);
    setCityImage(null);
  }
};
