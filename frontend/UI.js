import BookService from "./services/BookService";
import { format } from "timeago.js";

const bookService = new BookService();

class UI {
  async renderBooks() {
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById("books-cards");
    booksCardContainer.innerHTML = "";
    books.forEach((element) => {
      const div = document.createElement("div");
      div.className = "";
      div.innerHTML = `
        <div class="card m-2">
            <div class="row">
                <div class="col-md-4">
                    <img src="http://localhost:3000/${
                      element.imagePath
                    }" alt="" class="img-fluid" />
                </div>
                <div class="col-md-8">
                    <div class="card-block px-2">
                        <h4 class="card-title">${element.title}</h4>
                        <p class="card-text">${element.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${
                          element._id
                        }">X</a>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                ${format(element.created_at)}
        </div>
        `;
      booksCardContainer.appendChild(div);
    });
  }
  async addANewBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }
  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }
  clearBookForm() {
    document.getElementById("book-form").reset();
  }
  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement("div");
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".col-md-4");
    const bookForm = document.querySelector("#book-form");
    container.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector(".message").remove();
    }, secondsToRemove);
  }
}

export default UI;
