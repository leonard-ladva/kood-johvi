const UserID = '12'
const matchesBox = document.querySelector('div.matches')
// getAuthToken gets the API authentication token and returns it 
async function getAuthToken() {
	return fetch("https://intra.proekspert.ee/pulse-johvi/auth", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username: 'user', password: 'user'})
	})
	.then(resp => resp.json())
	.then(data => {
		return data.token
	})
}

// getCurrentUserSkill
async function getCurrentUserSkills() {
	const token = await getAuthToken()

	return fetch(`https://intra.proekspert.ee/pulse-johvi/api/employees/${UserID}?expand=skills`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`, 
			'Content-Type': 'application/json',
		},
	})
	.then(resp => resp.json())
	.then(data => {
		const skills = []
		for(let skill of data.skills) {
			skills.push(skill.name)
		}
		return skills
	})
}


// getProjects
async function getAllProjects() {
	const token = await getAuthToken()

	return fetch(`https://intra.proekspert.ee/pulse-johvi/api/projects?expand=technologies`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`, 
			'Content-Type': 'application/json',
		},
	})
	.then(resp => resp.json())
	.then(data => {
		return data	
	})
}

async function main() {
	const matches = new Set()

	const skills = await getCurrentUserSkills()
	const projects = await getAllProjects()
	console.log(skills)

	for(let project of projects) {
		for(let technology of project.technologies) {
			
			console.log("TECH:", technology)
			if(skills.includes(technology)) {
				matches.add(project.name)
			}
		}	
	}
	console.log("Matches:", matches)

	for(let match of matches) {
		const project =  document.createElement('h1')
		project.textContent = match
		project.classList.add('MuiChip-root', 'jss91', 'MuiChip-outlined', 'jss92')

		matchesBox.appendChild(project)
	}
}
main()