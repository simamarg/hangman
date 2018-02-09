import React, { Component } from 'react';

class Letter extends Component {
    onHandleClick = () => {
        if (this.props.inKeyBoard) {
            this.props.guessLetter(this.props.letter);
        }
    }

    render() {
        return(
            <div className={this.props.className} onClick={this.onHandleClick}>{this.props.letter}</div>
        );
    }
}

export default Letter;