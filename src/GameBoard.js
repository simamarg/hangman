import React, { Component } from 'react';
import Word from './Word';

class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {words: [...this.props.words], score: 0, lives: 10, guessingWordIndex: 0};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({words: [...nextProps.words]});
        }
    }

    render() {
        return(
            <div>
                <div className="Score">Score: {this.state.score}</div>
                <div className="Lives">Lives: {this.state.lives}</div>
                <Word word={this.state.words[this.state.guessingWordIndex]} />
            </div>
        );
    }
}

export default GameBoard;