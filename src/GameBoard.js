import React, { Component } from 'react';
import Word from './Word';
import GameKeyboard from './GameKeyboard';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {words: [...this.props.words], score: 0, lives: 10, currWordIndex: 0, guessedLetters: "",
            remainingLettersInCurrWord: []};
    }

    isLetterInWord = (letter, word) => {
        let regex = new RegExp("[" + word.toUpperCase() + "]");
        if (regex.test(letter.toUpperCase())) {
            return true;
        }
        return false;
    }

    moveToNextWord = () => {
        if (!this.state.remainingLettersInCurrWord.length) { // user guessed the word
            if (this.state.currWordIndex < this.state.words.length - 1) { // there are still word to guess in the list
                this.setState(prevState => ({currWordIndex: prevState.currWordIndex + 1, guessedLetters: "", 
                    lives: 10, remainingLettersInCurrWord: prevState.words[prevState.currWordIndex + 1].split('')}));
            } else { // user guessed all the words from the list
                setTimeout(() => {alert(`Congratulations, you won the game! Your score is: ${this.state.score}`);}, 1000);
            }
        }
    }

    gameOver = () => {
        if (this.state.lives === 0) {
            setTimeout(() => {
                let restart = window.confirm(`Sorry, you lost :( Your score is:${this.state.score}. Press ok to restart game.`);
                if (restart) {
                    this.setState({score: 0, lives: 10, currWordIndex: 0, guessedLetters: "", remainingLettersInCurrWord: []});
                }
            }, 1000);
        }
    }

    guessLetter = (letter) => {
        if (this.isLetterInWord(letter, this.state.words[this.state.currWordIndex])) { // correct guess
            this.setState(prevState => ({score: prevState.score + 10, guessedLetters: prevState.guessedLetters + letter,
                remainingLettersInCurrWord: prevState.remainingLettersInCurrWord.filter(element => 
                    element.toUpperCase() !== letter)}),
                this.moveToNextWord);
        } else { // wrong guess
            let score = this.state.score;
            if (score - 5 > 0) {
                score -= 5;
            } else {
                score = 0;
            }
            this.setState(prevState => ({lives: prevState.lives - 1, guessedLetters: prevState.guessedLetters + letter, 
                score: score}), this.gameOver);
        }
    }

    componentDidMount() {
        this.setState({remainingLettersInCurrWord: this.state.words[0].split('')});
    }

    render() {
        let word = this.state.words[this.state.currWordIndex]; 
        return(
            <div>
                <div className="Score">Score: {this.state.score}</div>
                <div className="Lives">Lives: {this.state.lives}</div>
                <Word word={word} guessedLetters={this.state.guessedLetters}
                    isLetterInWord={this.isLetterInWord}/>
                <GameKeyboard guessLetter={this.guessLetter} guessedLetters={this.state.guessedLetters} 
                    isLetterInWord={this.isLetterInWord} word={word}/>
            </div>
        );
    }
}

export default GameBoard;