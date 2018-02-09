import React, { Component } from 'react';
import Letter from './Letter';

class Word extends Component {
    render() {
        return(
            <div>
                {this.props.word.split('').map((element, index) => {
                    let letter = element.toUpperCase();
                    return this.props.isLetterInWord(letter, this.props.guessedLetters) ? 
                        <Letter key={index} letter={letter} inKeyBoard={false} className="Word-letter"/> : 
                        <Letter key={index} letter="_" inKeyBoard={false} className="Word-letter"/>})}
            </div>
        );
    }
}

export default Word;