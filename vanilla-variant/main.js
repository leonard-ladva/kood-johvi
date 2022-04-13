// getAuthToken gets the API authentication token and returns it 
function getAuthToken() {
	const myheaders = new Headers()
	myheaders.append('Content-Type', 'application/json')
	
	return fetch("https://intra.proekspert.ee/pulse-johvi/auth", {
	method: 'POST',
	headers: myheaders,
	body: JSON.stringify({ username: 'user', password: 'user'})
})
.then(resp => resp.json())
.then(data => {
	return data.token
})
}

getAuthToken().then(token => {






})

