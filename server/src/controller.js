const pool = require("./db");

const getAllBooks = async function () {
    try {
        console.log(pool);
        const res = await pool.query("SELECT * FROM books");
        return res.rows;
    } catch (error) {
        throw new Error(`Error in getAllBooks function: ${error.message}`);
    }
};

const findByID = async function (id) {
    if (!id) {
        throw new Error(`id parameter is required for findById function`);
    }
    try {
        const res = await pool.query(`SELECT * FROM books WHERE isbn = $1`, [
            id.toString(),
        ]);
        if (res.rowCount === 0) {
            throw new Error(`No book with isbn = ${id}`);
        }
        return res.rows[0];
    } catch (error) {
        throw new Error(`Error in findByID function: ${error.message} `);
    }
};

const createBook = async function (book) {
    if (!book) {
        throw new Error(`book parameter is required for createBook function`);
    }

    const requiredFields = ['isbn', 'name', 'author', 'pages'];

    for (const field of requiredFields) {
        if (!book[field]) {
            throw new Error(`${field} is required for new book`);
        }
    }

    try {
        const bookInfo = Object.keys(book).join(", ");
        const values = Object.values(book);
        const valueSymbols = Object.values(book)
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        const res = await pool.query(
            `INSERT INTO books (${bookInfo}) VALUES (${valueSymbols})`,
            [...values]
        );
        return true;
    } catch (error) {
        throw new Error(`Error in createBook function: ${error.message}`);
    }
};

const updateBook = async function (id, fieldsToUpdate) {
    if (!fieldsToUpdate || !id) {
        throw new Error("fieldsToUpdate and id parameters are required for updateBook function");
    }

    try {
        const updateFields = Object.keys(fieldsToUpdate)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");
        const values = Object.values(fieldsToUpdate);
        const query = {
            text: `UPDATE books SET ${updateFields} WHERE isbn = $${values.length + 1}`,
            values: [...values, id.toString()],
        };

        const res = await pool.query(query);

        if (res.rowCount === 0) {
            throw new Error(`No book found with isbn ${id}`);
        }

        return true;
    } catch (error) {
        throw new Error(`Error in updateBook function: ${error.message}`);
    }
};

const deleteBook = async function (id) {
    try {
        book = await findByID(id.toString());
        if (!book) throw (`This book doesn't exist`);
        await pool.query(`DELETE FROM books WHERE isbn = $1`, [id.toString()])
    } catch (error) {
        throw new Error(`Error in deleteBook function: ${error.message}`);
    }
};

module.exports = { getAllBooks, findByID, createBook, updateBook, deleteBook };
