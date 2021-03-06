import React from "react";
import "../Assets/App.css";
import * as BooksAPI from "../BooksAPI";

class BookCard extends React.Component {
  state = {
    bookshelf: "",
  };
  componentDidMount() {
    const getBookshelf = async () => {
      const bookDetails = await BooksAPI.get(this.props.id);
      this.setState({ bookshelf: bookDetails.shelf });
    };
    getBookshelf();
  }
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.imgURL})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              id={this.props.id}
              onChange={() => this.props.updateShelf(this.props.id)}
            >
              <option selected disabled>
                Move to...
              </option>
              {this.state.bookshelf === "currentlyReading" ? (
                <option value="currentlyReading">
                  {" "}
                  &#10003; Currently Reading
                </option>
              ) : (
                <option value="currentlyReading"> Currently Reading</option>
              )}
              {this.state.bookshelf === "wantToRead" ? (
                <option value="wantToRead"> &#10003; Want to Read</option>
              ) : (
                <option value="wantToRead"> Want to Read</option>
              )}
              {this.state.bookshelf === "read" ? (
                <option value="read"> &#10003;Read</option>
              ) : (
                <option value="read"> Read</option>
              )}
              {this.state.bookshelf === "none" ? (
                <option value="none"> &#10003;None</option>
              ) : (
                <option value="none"> None</option>
              )}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        {this.props.author && (
          <div className="book-authors">
            {this.props.author.map((authorName, index) => (
              <span key={index}>{authorName}</span>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default BookCard;
