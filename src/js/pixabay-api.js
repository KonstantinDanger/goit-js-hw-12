import axios from 'axios';

export const hitsPerPage = 15;

const API_KEY = '49409178-3b63951a4472504068603616d';
const url = 'https://pixabay.com/api/';

export default async function fetchImages(query, pageIndex) {
  try {
    const response = await axios.get(url, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: hitsPerPage,
        page: pageIndex,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}
