const express = require('express');
const router = express.Router();
const { getAllBooks, findByID, createBook, updateBook, deleteBook } = require('./controller');
const bodyParser = require('body-parser');

router.get('/books', async (req, res) => {
    try {
        const books = await getAllBooks();
        res.json(books);
    } catch (error) {
        console.error('Error when get all books: ' + error);
        res.status(404).send(error.message);
    }
})

router.get('/books/:id', async (req, res) => {
    try {
        const book = await findByID(req.params.id);
        res.json(book);
    } catch (error) {
        console.error(`Error when get a book with id=${req.params.id}: ${error}`);
        res.status(404).send(error.message);
    }
})

router.post('/books', bodyParser.json(), async (req, res) => {
    try {
        await createBook(req.body);
        res.status(201).send(`Create book successful\n `)
    } catch (error) {
        console.error(`Error when post a new book ${error}`);
        res.status(400).send(error.message);
    }
})

router.patch('/books/:id', bodyParser.json(), async (req, res) => {
    try {
        const id = req.params.id;
        const fieldToUpdate = req.body;
        await updateBook(id, fieldToUpdate);
        res.send(`Update book successful\n`)
    } catch (error) {
        console.error(`Error when modify this book with id=${req.params.id} \n ${error}`);
        res.status(404).send(error.message);
    }
})

router.delete('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteBook(id);
        res.status(204).end(`Delete book successful`);
    } catch (error) {
        console.error(`Error when delete book with id=${req.params.id}`);
        res.status(404).send(error.message);
    }
})

module.exports = router;