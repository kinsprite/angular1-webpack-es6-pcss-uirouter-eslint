
const books = [{
    id: 0,
    name: 'Modern Javascript',
    price: 99.9,
}];

const mapBooks = {
    0: books[0],
};

// https://github.com/imrefazekas/connect-rest#rest-functions

async function getAllService(request, content) {
    return books;
}

async function getOneService(request, content) {
    return mapBooks[request.parameters.bookId] || null;
}

async function putOneService(request, content) {
    const book = mapBooks[parseInt(request.parameters.bookId, 10)];

    if (book && content) {
        const bookId = book.id;
        Object.assign(book, content, { id: bookId });
        return book;
    }

    const error = new Error('invalid parameters');
    error.statusCode = 417;
    throw error;
}

async function postOneService(request, content, callback) {
    if (content) {
        const len = books.length;
        const bookId = len ? books[len - 1].id + 1 : 0;

        const book = Object.assign({}, content, { id: bookId });
        mapBooks[bookId] = book;
        books.push(book);
        return book;
    }

    const error = new Error('invalid parameters');
    error.statusCode = 417;
    throw error;
}

async function deleteOneService(request, content, callback) {
    const bookId = parseInt(request.parameters.bookId, 10);

    if (mapBooks[bookId]) {
        const book = mapBooks[bookId];
        delete mapBooks[bookId];
        books.splice(books.indexOf(book), 1);

        return { id: bookId };
    }

    const error = new Error('invalid parameters');
    error.statusCode = 417;
    throw error;
}

function booksApi(rest) {
    // 返回对象时，不需在第三个参数中设置 contentType utf-8
    rest.get('/books', getAllService);
    rest.get('/book/:bookId', getOneService);
    rest.post('/book', postOneService);
    rest.put('/book/:bookId', putOneService);
    rest.del('/book/:bookId', deleteOneService);
}

module.exports = booksApi;
