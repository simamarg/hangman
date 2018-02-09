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
            chosenCategory: ""
        }
    }

    chooseCategory = (event) => {
        this.setState({chosenCategory: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <h1>HANGMAN</h1>
                {(this.state.chosenCategory === "") ?
                (<div>
                    {this.state.categories.map((element, index) => <button type="button" key={index} value={element.category} 
                        onClick={this.chooseCategory}> {element.category} </button>)}
                </div>) :
                (<div>
                    <div className="Category">Category chosen: {this.state.chosenCategory}</div>
                    <GameBoard words={this.state.categories.filter(element => element.category === 
                        this.state.chosenCategory)[0].words}/>
                </div>)}
            </div>
        );
    }
}

export default App;