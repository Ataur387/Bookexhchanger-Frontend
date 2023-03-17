import axios from "axios";
export async function getUserProfileById(userId, token){
	return new Promise((resolve, reject) => {
		axios.post('http://192.168.0.11:3000/user', {id : userId}, { 
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