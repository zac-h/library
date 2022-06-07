let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R Tolkien',
        pages: '600',
        readStatus: true,
        toggleReadStatus: function(){
            this.readStatus = !this.readStatus;
        }
    },
];

function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus
}

Book.prototype.toggleReadStatus = function(){
    this.readStatus = !this.readStatus;
}

function addBookToLibrary(form){

    var title = form.title.value;
    var author = form.author.value; 
    var pages = form.pages.value; 
    var readStatus = form.readStatus.checked;
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    document.getElementById('myForm').reset();
    closeForm();
    displayBooks(myLibrary);
    return false;
}

function updateReadStatus(e){
    var cardId = e.target.parentElement.getAttribute('id');
    var cardObject = myLibrary[cardId];
    cardObject.toggleReadStatus();
    displayBooks(myLibrary);
}

function removeFromLibrary(e){
    var cardId = e.target.parentElement.getAttribute('id');
    myLibrary.splice(cardId,1);
    displayBooks(myLibrary);
}

function displayBooks(library){
    const cardContainer = document.getElementById('cardContainer')
    removeAllChildNodes(cardContainer);
    library.forEach((book, index) => {
        
        var card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', index);
        cardContainer.appendChild(card);

        var P = document.createElement('p');
        P.innerText = 'Title: ' + book.title;      
        card.appendChild(P);

        var P = document.createElement('p');
        P.innerText = 'Author: ' + book.author;      
        card.appendChild(P);

        var P = document.createElement('p');
        P.innerText = 'Pages: ' + book.pages;      
        card.appendChild(P);

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'DELETE BOOK';
        deleteButton.setAttribute('id', 'deleteBtn');
        deleteButton.addEventListener('click', removeFromLibrary);
        card.appendChild(deleteButton);

        var readButton = document.createElement('button');
        if(book.readStatus === true){
            readButton.innerText = 'READ'
            readButton.setAttribute('class', 'btn-green')
        }else{
            readButton.innerText = 'NOT READ'
            readButton.setAttribute('class', 'btn-red')
        }
        readButton.setAttribute('id', 'readButton');
        readButton.addEventListener('click', updateReadStatus);
        card.appendChild(readButton);
    });
}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function openForm() {
    document.getElementById("formContainer").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("formContainer").style.display = "none";
}

