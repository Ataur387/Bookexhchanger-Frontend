import axios from "axios";
export async function getFriendRequests (token) {
    return new Promise((resolve, reject) => {
      axios.get('http://192.168.0.11:3000/friends/requests', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }