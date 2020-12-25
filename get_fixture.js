const axios = require('axios')
const teamNumber = "33"

const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v2/fixtures/team/' + teamNumber + '/last/1',
    params: { timezone: 'Europe/London' },
    headers: {
        'x-rapidapi-key': '463ba4ea68msh410878360976a73p16d447jsn1f3fe0d76941',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data.api.fixtures);
}).catch(function (error) {
    console.error(error);
});