import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard';

class App extends Component {
    constructor() {
        super();
        this.state = {categories: [
            {category: "Animals", words: ["lion", "tiger", "hippopotamus", "dinosaur", "rabbit"]},
            {category: "Fruits and Vegetables", words: ["cucumber", "avocado", "strawberry", "lemon", "tomato"]}
            ],
            chosenCategory: "", lives: 10
        }
    }

    chooseCategory = (event) => {
        this.setState({chosenCategory: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <h1 className="App-header">HANGMAN GAME!</h1>
                {(this.state.chosenCategory === "") ?
                (<div>
                    <div className="Category">Choose a category:</div>
                    {this.state.categories.map((element, index) => <button type="button" key={index} value={element.category} 
                        onClick={this.chooseCategory}> {element.category} </button>)}
                    <div className="Category">You'll have {this.state.categories[0].words.length} words in each category, 
                        and {this.state.lives} attempts to guess each word. <br/>Have fun :)</div>
                </div>) :
                (<div>
                    <div className="Category">Category chosen: {this.state.chosenCategory}</div>
                    <GameBoard words={this.state.categories.filter(element => element.category === 
                        this.state.chosenCategory)[0].words} lives={this.state.lives} />
                </div>)}
            </div>
        );
    }
}

export default App;