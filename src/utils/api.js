import axios from 'axios';

// const api = axios.create({
  
// })

async function api(method, url, data) {
  try {
    const response = await axios({ method, url, data });
  } catch (err) {

  }
}