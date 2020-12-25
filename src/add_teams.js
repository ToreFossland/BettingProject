const axios = require('axios')

const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v2/teams/league/2790',
    headers: {
        'x-rapidapi-key': '463ba4ea68msh410878360976a73p16d447jsn1f3fe0d76941',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    const teams = response.data.api.teams;
    for (var i = 0; i < teams.length; i++) {
        let teamName = teams[i].name;
        let teamId = teams[i].team_id;
        axios.post("http://localhost:5000/teams/add", { teamName: teamName, teamId: teamId })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
}).catch(function (error) {
    console.error(error);
});