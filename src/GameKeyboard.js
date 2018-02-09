import React, { Component } from 'react';
import Letter from './Letter';

class GameKeyboard extends Component {
    constructor() {
        super();
        this.state = {letters: []};
    }

    classForLetter = (letter) => {
        let className = "";
        if (!this.props.isLetterInWord(letter, this.props.guessedLetters)) {
            className = "Keyboard-letter";
        } else if (this.props.isLetterInWord(letter, this.props.word)) { // correct guessed letter (included in word)
            className = "Checked-letter-correct";
        } else { // wrong guessed letter (not included in word)
            className = "Checked-letter-wrong";   
        }
        return className;
    }

    componentDidMount() {
        let lettersArray = [];
        for (let i = 0; i < 26; i++) {
            lettersArray.push(String.fromCharCode(65 + i));
        }
        this.setState({letters: lettersArray});
    }

    render() {
        return(
            <div className="Keyboard">
                {this.state.letters.map((element, index) => <Letter key={index} letter={element} inKeyBoard={true} 
                    guessLetter={this.props.guessLetter} className={this.classForLetter(element)}/>)}
            </div>
        );
    }
}

export default GameKeyboard;