/* var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v2/teams/league/2',
    headers: {
        'x-rapidapi-key': '463ba4ea68msh410878360976a73p16d447jsn1f3fe0d76941',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data.api);
}).catch(function (error) {
    console.error(error);
});
*/
var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v2/fixtures/team/2879/last/1',
    params: { timezone: 'Europe/London' },
    headers: {
        'x-rapidapi-key': '463ba4ea68msh410878360976a73p16d447jsn1f3fe0d76941',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data.api.fixtures[0]);
    if (response.data.api.fixtures[0].score.fulltime) {
        console.log("ja")
    }
}).catch(function (error) {
    console.error(error);
});

/*
var axios = require("axios").default;

var options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v2/teams/search/ajman',
    headers: {
        'x-rapidapi-key': '463ba4ea68msh410878360976a73p16d447jsn1f3fe0d76941',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data.api);
}).catch(function (error) {
    console.error(error);
});  */