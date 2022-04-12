import axios from 'axios';

// 'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
// 'X-RapidAPI-Key': 'a1dd2d471bmsh77ca3cff033605dp1dcb69jsn9d4948bda332'

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

// const options = {
//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
//   },
//   headers: {
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
//     'X-RapidAPI-Key': 'a1dd2d471bmsh77ca3cff033605dp1dcb69jsn9d4948bda332'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

export const getPlaceData = async (type, sw, ne) => {
    try{
        const { data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
          }
        });
        console.log(data)
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
      params: { lon: lng, lat: lat },
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
      }
    });
    return data;
  } catch (error) {
    console.log(error)
  }
}