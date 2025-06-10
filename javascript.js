function Book(title, author, pages, id, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, id, read);

    myLibrary.push(book);
    render(myLibrary);

}

function render(myLibrary) {
    const library = document.querySelector(".library");
    library.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement("div");
        const bookTitle = document.createElement("div");
        const bookAuthor = document.createElement("div");
        const bookPages = document.createElement("div");
        const toggleButtonDiv = document.createElement("div");
        const toggleButton = document.createElement("button");
        const deleteButtonDiv = document.createElement("div");
        const deleteButton = document.createElement("button");

        bookDiv.classList.add("book-card");
        bookTitle.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");
        toggleButtonDiv.classList.add("toggle-button");
        deleteButtonDiv.classList.add("delete-button");

        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages}`;
        toggleButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
        deleteButton.textContent = "Delete";

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(toggleButtonDiv);
        bookDiv.appendChild(deleteButtonDiv);
        toggleButtonDiv.appendChild(toggleButton);
        deleteButtonDiv.appendChild(deleteButton);
        library.appendChild(bookDiv);

        bookDiv.classList.add(book.read ? "read" : "unread");

        toggleButton.addEventListener("click", () => {
            book.read = !book.read;
            render(myLibrary);
        })

        deleteButton.addEventListener("click", () => {
            if(confirm("Are you sure you want to delete this book?")) {
                const index = myLibrary.findIndex(b => b.id === book.id);
                myLibrary.splice(index, 1);
                render(myLibrary);
            }
        })

    })
}

function resetForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    bookForm.style.display = "none"; 
}

const myLibrary = [];
const addBook = document.querySelector("#addBook");
const bookForm = document.querySelector("#bookForm");
const closeForm = document.querySelector("#closeForm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

addBook.addEventListener("click", () => {
    bookForm.style.display = "block";
})

closeForm.addEventListener("click", () => {
    resetForm();
})

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    addBookToLibrary(title, author, pages, read);
    resetForm(); 
})

addBookToLibrary("Book1", "Author1", "500", true);
addBookToLibrary("Book2", "Author2", "100", false);