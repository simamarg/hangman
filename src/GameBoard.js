import React, { Component } from 'react';
import Word from './Word';
import GameKeyboard from './GameKeyboard';
import swal from 'sweetalert';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: [...this.props.words], score: 0, lives: this.props.lives, currWordIndex: 0, guessedLetters: "",
            remainingLettersInCurrWord: this.props.words[0].split(''), showGreatJob: false
        };
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
                this.setState({showGreatJob: true});
                setTimeout(() => {
                    this.setState(prevState => ({
                        currWordIndex: prevState.currWordIndex + 1, guessedLetters: "",
                        remainingLettersInCurrWord: prevState.words[prevState.currWordIndex + 1].split(''),
                        lives: this.props.lives, showGreatJob: false
                    }));
                }, 2500);
            } else { // user guessed all the words in the list
                setTimeout(() => {
                    swal({
                        title: `Congratulations, you won! :)`,
                        text: `Your score is: ${this.state.score}`,
                        icon: `success`,
                        button: `Play again!`
                    });
                    this.props.restartGame();
                }, 1000);
            }
        }
    }

    gameOver = () => {
        if (this.state.lives === 0) {
            setTimeout(() => {
                swal({
                    title: `Sorry, you lost... :(`,
                    text: `Your score is: ${this.state.score}`,
                    icon: `error`,
                    button: `Try again!`
                });
                this.props.restartGame();
            }, 1000);
        }
    }

    guessLetter = (letter) => {
        if (this.isLetterInWord(letter, this.state.words[this.state.currWordIndex])) { // correct guess
            this.setState(prevState => ({
                score: prevState.score + 10, guessedLetters: prevState.guessedLetters + letter,
                remainingLettersInCurrWord: prevState.remainingLettersInCurrWord.filter(element =>
                    element.toUpperCase() !== letter)
            }),
                this.moveToNextWord);
        } else { // wrong guess
            let score = this.state.score;
            if (score - 5 > 0) {
                score -= 5;
            } else {
                score = 0;
            }
            this.setState(prevState => ({
                lives: prevState.lives - 1, guessedLetters: prevState.guessedLetters + letter,
                score: score
            }), this.gameOver);
        }
    }

    componentDidMount() {
        this.setState({
            words: [...this.props.words], score: 0, lives: this.props.lives, currWordIndex: 0, guessedLetters: "",
            remainingLettersInCurrWord: this.props.words[0].split(''), showGreatJob: false
        });
    }

    render() {
        let word = this.state.words[this.state.currWordIndex];
        let image = `/assets/hangman${this.state.lives}.png`;
        return (
            <div>
                <div className="Score">Score: {this.state.score}, Lives: {this.state.lives}</div>
                <Word word={word} guessedLetters={this.state.guessedLetters}
                    isLetterInWord={this.isLetterInWord} showGreatJob={this.state.showGreatJob} />
                {/* {this.state.showGreatJob ? <img src={greatJob}/> : null} */}
                <GameKeyboard guessLetter={this.guessLetter} guessedLetters={this.state.guessedLetters}
                    isLetterInWord={this.isLetterInWord} word={word} />
                {this.state.lives < 10 ? <img className="Man" src={process.env.PUBLIC_URL + image} alt="hangman-drawing" /> 
                    : null}
            </div>
        );
    }
}

export default GameBoard;