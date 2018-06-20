import React, { Component } from 'react';
import ImageCard from "./components/ImageCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Column from "./Column";
import Row from "./Row";
import images from "./data.json";
import './App.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    console.log(array);
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    images,
    currentScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: []
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
  } else {
    this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: "Doom awaits you..."
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    if (newScore === 12) {
      this.setState({ rightWrong: "You have chosen wisely. Congratulations on your impending doom!" });
    }
    this.handleShuffle();
    console.log(this.handleShuffle)

  };

  handleReset = () => {
      this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "You have chosen poorly. Please hold while we load your doom...",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledImages = shuffleArray(images);
    console.log(shuffledImages);
    this.setState({ images: shuffledImages });
  };

  render() {
    return (
      <Wrapper>
          <Nav
            title="Clicks of Doom"
            score={this.state.currentScore}
            topScore={this.state.topScore}
            rightWrong={this.state.rightWrong}
          />

          <Title>
            DOOM!!!!
            <p>Each image below is different even though they all look the same. When an image is clicked, the board will shuffle.</p>
            <p>You won't know where the image you clicked on moved to. You're only hope is to choose each click wisely in hopes that you won't click on one that has already been clicked.</p>
          </Title>

          <Container>
            <Row>
              {this.state.images.map(blue => (
                <Column size="md-3 sm-6">
                  <ImageCard
                    key={blue.id}                    
                    handleClick={this.handleClick}
                    handleIncrement={this.handleIncrement}
                    handleReset={this.handleReset}
                    handleShuffle={this.handleShuffle}
                    shake={!this.state.currentScore && this.state.topScore}
                    id={blue.id}
                    image={blue.image}
                  />
                </Column>
              ))} 
            </Row>
          </Container>
        </Wrapper>
    );
  }
}

export default App;
