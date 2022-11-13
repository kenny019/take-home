const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	next()
})


const data = {
		"graph": {
			"elements": {
				"createdAt": {
					"props": {
						"type": "Date",
						"descr": "Created at",
						"defVal": "new Date()",
						"name": "Created at"
					}
				},
				"name": {
					"props": {
						"type": "String",
						"descr": "Dashboard name",
						"name": "name"
					}
				}
			}
		},
		"title": "List of dashboards",
		"data": [
			{
				"_id": "628dc621adff4647dfdc397b",
				"name": "Test-Dasboard",
				"createdAt": "2022-05-27T09:30:59.758Z",
			},
			{
				"_id": "62907039adff4647dfdc39aa",
				"name": "Test-Dasboard 2",
				"createdAt": "2022-05-27T09:30:59.758Z",
			}
		]
	}

app.get('/api', function (req, res) {

	return res.json(data);
});


app.listen(process.env.PORT || 8080, () => {
		console.log(`express server running on ${process.env.PORT || 8080}`)
})