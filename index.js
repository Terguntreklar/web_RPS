let books = [];
if (JSON.parse(window.localStorage.getItem("books")) != null) {
  books = JSON.parse(window.localStorage.getItem("books"));
}
displayBooks();
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      let outp = title + " by " + author + " No. of pages: " + pages;
      if (read == true) {
        outp += ", you've read it";
      } else outp += ", you haven't read it";
      return outp;
    };
  }
}
// add from form
function addBookToBooks() {
  let title = document.getElementById("bkName").value;
  let author = document.getElementById("authName").value;
  let pages = document.getElementById("bkNum").value;
  let read = document.getElementById("readBtn").checked;
  books.push(new Book(title, author, pages, read));
  window.localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}
//display on list
function displayBooks() {
  clearTb();
  let list = document.getElementById("tableBody");
  for (let i = 0; i < books.length; i++) {
    let element = books[i];
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${i}</td>
      <td>${element.title}</td>
      <td>${element.author}</td>
      <td>${element.pages}</td>
      <td>${element.read}</td>
      <td><a href=# id="delete-entry-${i}" onclick="removeFromBooks(${i})">X</a></td>
      <td><a href=# id="toggle-read-${i}" onclick="toggleBtnClick(${i})">toggle read</a></td>
      `;
    list.appendChild(row);
  }
}
//remove after click
function removeFromBooks(x) {
  books.splice(x, 1);
  window.localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}
//clicked the toggle button
function toggleBtnClick(x) {
  toggleRead(books[x]);
  window.localStorage.setItem("books", JSON.stringify(books));
  displayBooks();
}
function clearTb() {
  let list = document.getElementById("tableBody");
  list.innerHTML = "";
}
//toggle read
function toggleRead(book1) {
  if (book1.read == true) book1.read = false;
  else book1.read = true;
}
