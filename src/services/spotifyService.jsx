import axios from 'axios';

const getAccessToken = async () => {
  const clientId = 'd94bab6eb9cd4bf196b52b1e0f168222';
  const clientSecret = '2452c13ac474448da6f4b528332ac6cb';

  const response = await axios.post('https://accounts.spotify.com/api/token', 
  new URLSearchParams({
    'grant_type': 'client_credentials'
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    }
  });

  return response.data.access_token;
};

const searchTracks = async (query, token) => {
  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      q: query,
      type: 'track'
    }
  });

  return response.data.tracks.items;
};

export { getAccessToken, searchTracks };
