import React, { Component } from 'react';
import Letter from './Letter';

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {word: this.props.word};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({word: nextProps.word});
        }
    }

    render() {
        return(
            <div>
                {this.state.word.split('').map((element, index) => <Letter key={index} letter={element.toUpperCase()}/>)}
            </div>
        );
    }
}

export default Word;