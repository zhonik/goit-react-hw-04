import axios from 'axios';

const accessKey = 'gJFaNZF8R5vVKOg4QJ3G7kSzE-rMPXoLqSjoU-2FMUs';

export const instance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    common: { Authorization: `Client-ID ${accessKey}` },
  },
  params: {
    total_pages: null,
  },
});

// axios.defaults.baseURL = 'https://api.unsplash.com';
// axios.defaults.headers.common['Authorization'] = `Client-ID ${accessKey}`;
// axios.defaults.params = {
//   page: 1,
//   per_page: 20,
//   orientation: 'landscape',
// };

export const fetchPhotosWithQuery = async (query, page) => {
  const response = await instance.get('/search/photos', {
    params: {
      query: query,
      page: page,
      per_page: 20,
      orientation: 'landscape',
    },
  });
  console.log(response.data);
  instance.defaults.params.total_pages = response.data.total_pages;
  return response.data.results;
};
