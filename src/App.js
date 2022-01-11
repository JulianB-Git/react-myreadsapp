import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from "./ListBooks";
import SearchBook from "./SearchBook";

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books
          }))
        })
  }

  updateBookShelf = (book, shelf) => {
      this.setState((currentState) => ({
          books: currentState.books.map((b) => (
              b.id === book.id ? {...b, shelf: shelf}: b
          ))
      }))

      BooksAPI.update(book, shelf)
  }

  addBookToShelf = (book, shelf) => {
      book.shelf = shelf;

      const result = this.state.books.find(b => b.id === book.id)

      if (result === undefined) {
          this.setState((currentState) => ({
              books: currentState.books.concat([book])
          }))
      } else {
          return this.updateBookShelf(book, shelf)
      }

      BooksAPI.update(book,shelf)
  }

  render() {

    const currReadingList = this.state.books.filter(book => book.shelf === 'currentlyReading');
    const wantToReadList = this.state.books.filter(book => book.shelf === 'wantToRead');
    const readList = this.state.books.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
            <SearchBook booksFromShelf={this.state.books}  onUpdateShelf={(book, shelf) => { this.addBookToShelf(book, shelf) }}/>
        )} />
        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <ListBooks books={currReadingList} onUpdateShelf={(book, shelf) => { this.updateBookShelf(book, shelf) }}/>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <ListBooks books={wantToReadList} onUpdateShelf={(book, shelf) => { this.updateBookShelf(book, shelf) }}/>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <ListBooks books={readList} onUpdateShelf={(book, shelf) => { this.updateBookShelf(book, shelf) }}/>
                  </div>
                </div>
              </div>
              <div className="open-search">
                  <Link to='/search'>
                      <button>Add a book</button>
                  </Link>
              </div>
            </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
