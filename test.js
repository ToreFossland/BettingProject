const axios = require('axios')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmU3MGY0ZmNlNWFjYjYzNDFmNTFiYSIsImlhdCI6MTYwODQwNjM2MCwiZXhwIjoxNjA4NDA5OTYwfQ.5eRXu8hJVKyDw3vWeokol6WPxKu3Mrdm1NbZhnehUYE"
axios.get("http://localhost:5000/teams/team-id", { data: { teamName: "Arsenal" }, headers: { "x-auth-token": token, 'Content-type': 'application/json' } })
    .then(res => console.log(res.data))
