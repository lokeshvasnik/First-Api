require('dotenv').config();
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('/latest-projects', (req, res) => {
    const url = process.env.URL;

    request(url, (error, response, html) => {
        if (!error) {
            const $ = cheerio.load(html);

            let projects = [];

            $('.main-column').each(function () {
                projects.push({
                    name: $(this).find('.project-name').text(),
                    description: $(this).find('.description').text(),
                });
            });

            res.send({
                projects: projects,
            });
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
