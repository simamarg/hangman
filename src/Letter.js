import React, { Component } from 'react';

class Letter extends Component {
    render() {
        return(
            <span>{this.props.letter}</span>
        );
    }
}

export default Letter;