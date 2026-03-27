import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { "image": randomImage })
});


app.get('/earth', (req, res) => {
    
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', { planetEarth });
});

app.get('/mercury', (req, res) => {

    let mercury = planets.getMercury();
    console.log(mercury);
    res.render('mercury', { mercury });
});

app.get('/venus', (req, res) => {

    let venus = planets.getVenus();
    console.log(venus);
    res.render('venus', { venus });
});

app.get('/mars', (req, res) => {

    let mars = planets.getMars();
    console.log(mars);
    res.render('mars', { mars });
});

app.get('/jupiter', (req, res) => {

    let jupiter = planets.getJupiter();
    console.log(jupiter);
    res.render('jupiter', { jupiter });
});

app.get('/saturn', (req, res) => {

    let saturn = planets.getSaturn();
    console.log(saturn);
    res.render('saturn', { saturn });
});

app.get('/uranus', (req, res) => {

    let uranus = planets.getUranus();
    console.log(uranus);
    res.render('uranus', { uranus });
});

app.get('/neptune', (req, res) => {

    let neptune = planets.getNeptune();
    console.log(neptune);
    res.render('neptune', { neptune });
});

app.get('/pluto', (req, res) => {

    let pluto = planets.getPluto();
    console.log(pluto);
    res.render('pluto', { pluto });
});


app.get('/nasa', async (req, res) => {
    let today = new Date().toISOString().split('T')[0];
    let url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${today}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        res.render("nasa", {
            title: data.title,
            url: data.url,
            explanation: data.explanation
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching NASA data");
    }
});


app.listen(3000, () => {
    console.log('server started');
});
