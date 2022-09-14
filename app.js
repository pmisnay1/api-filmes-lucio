const express = require('express');
const res = require('express/lib/response');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let movies = [
    {
        id: "1",
        titulo: "Inception",
        diretor: "Christopher Nolan",
        lancamento: "16/07/2010",
    },
    {
        id: "2",
        titulo: "The Irishman",
        diretor: "Martin Scorsese",
        lancamento: "27/09/2019",
    },
];

app.get("/movie", (req, res) => {
    res.json(movies);
});

app.post('/movie', (req, res) => {
    const movie = req.body

    console.log(movie);
    movies.push(movie);
    res.send('Filme adicionado a lista!');
});

app.get('/movie/:id', (req,res) => {
    const id = req.params.id

    for (let movie of movies) {
        if(movie.id === id) {
            res.json(movie)
            return
        }
    }
    res.status(404).send('movie not found!')
})

app.delete('/movie/:id', (req,res) => {
    const id = req.params.id

    movies = movies.filter(movie => {
        if (movie.id !== id) {
            return true;
        }
        return false;
    });
    res.send("FIlme foi apagado!");
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));