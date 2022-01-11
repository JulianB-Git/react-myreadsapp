import React, { Component } from 'react';

class ListBooks extends Component {

    handleUpdateShelf = (book, shelf) => {
        if (this.props.onUpdateShelf) {
            this.props.onUpdateShelf(book, shelf)
        }
    }

    render() {

        const { books=[] } = this.props

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    {book.imageLinks !== undefined && (
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    )}
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.handleUpdateShelf(book ,event.target.value)}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors ? book.authors.join(", ") : 'No Authors found'}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListBooks;