import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from "./ListBooks";

class SearchBook extends Component{

    state = {
        query: '',
        searchResults: []
    }

    updateQuery = (query) => {
        if (query!=='') {
            BooksAPI.search(query)
                .then((books) => {
                    if( books.length > 0 ) {
                        books.map(searchBook => {
                            let result = this.props.booksFromShelf.find(book => book.id === searchBook.id)
                            return searchBook.shelf = result ? result.shelf : 'none'
                        })

                        this.setState(() => ({
                            searchResults: books
                        }))
                    } else {
                        this.setState(() => ({
                            searchResults: []
                        }))
                    }
                })
        }

        this.setState(() => ({
            query: query,
            searchResults: []
        }))
    }

    render() {

        const { query, searchResults=[] } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.length > 0 && (
                            <ListBooks books={searchResults} onUpdateShelf={this.props.onUpdateShelf} />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook;