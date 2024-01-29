class BookService {
  constructor() {
    this.URI = "http://localhost:3000/api/books";
  }

  async getBooks() {
    try {
      const response = await fetch(this.URI);
      const books = await response.json();
      return books;
    } catch (error) {
      console.error("Se Produjo un error al obtener el libro: ", error);
    }
  }

  async postBook(book) {
    try {
      const response = await fetch(this.URI, {
        method: "POST",
        body: book,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Se Produjo un error al grabar el libro: ", error);
    }
  }
  async deleteBook(bookId) {
    try {
      const response = await fetch(`${this.URI}/${bookId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return console.error(error);
    }
  }
}

export default BookService;
