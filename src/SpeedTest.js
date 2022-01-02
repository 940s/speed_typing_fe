import React from 'react';
import axios from 'axios';
import TextColor from './TextColor';


class SpeedTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WPM: [],
      testText: 'Please select easy or hard difficulty',
      userText: '',
      startTime:0,
      endTime:0,
      accuracy:'',
      highScores: ''
    }

  }

  getEasyText = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API}get_easy_text`);
      console.log('app get data: ', response.data)
      let text = response.data.text;

      this.setState({

        testText: text,
        startTime: 0,
        userText: ''
      });
    } catch (error) {
      console.log('this is the get error: ', error.message)
    }
  }

  getHardText = async () => {
    document.inputForm.reset();
    try {
      let response = await axios.get(`${process.env.REACT_APP_API}get_text`);
      console.log('app get data: ', response.data)
      let text = response.data.text;

      this.setState({

        testText: text,
        startTime: 0,
        userText: ''
      });
    } catch (error) {
      console.log('this is the get error: ', error.message)
    }
  }

  getTime = () => {

    let time = Date.now()
    this.setState({
      endTime: time
    })
    let totalTime = (time - this.state.startTime)/1000
    console.log('getTime totalTime',totalTime)


    return totalTime
  }


  getResults = async (event) => {
    event.preventDefault();
    if(this.state.startTime === 0) {
      this.setState ({
        startTime: Date.now()
      })
    }
    let time = this.getTime()
    this.setState({
      userText: event.target.value
    })
    console.log('getResults time: ', time)
    let userText = {
      original: this.state.testText.substring(0, this.state.userText.length),
      comparison: this.state.userText,
      time: time
    }
    console.log('getResults userText:', userText)
    try {
      const userTextResponse = await axios.post(`${process.env.REACT_APP_API}post_wpm`, JSON.stringify(userText));
      let highScores = userTextResponse.data.hi_scores
      try {
        console.log(highScores)
        console.log('THIS IS THE MESSAGE!!' + JSON.parse(highScores))
      } catch {
        console.log('error parsing')
      }
      
      this.setState({
        WPM: userTextResponse.data.wpm,
        accuracy: userTextResponse.data.accuracy,
        highScores: highScores
      })
      console.log(userTextResponse);

    } catch (error) {
      console.log('this is the post error: ', error.message)
    }
  }

  saveScore = async () => {
    let overall = {
      "wpm": this.state.WPM,
      "accuracy": this.state.accuracy
    }

    try {
      let response = await axios.post(`${process.env.REACT_APP_API}post_hi_score`, JSON.stringify(overall));
      console.log('high score: ', response.data)
      this.setState({
        highScores: response.data.hi_scores
      })
    } catch (error) {
      console.log('this is the post high score error: ', error.message)
    }
  }


  render() {
    console.log('SpeedTest state: ', this.state)
    return (
      <>
        <header></header>
        <main>
          <h1>Welcome to the 940s Speed Typing Test</h1>
          <article style={{maxWidth: '48%', margin: '0px auto', fontSize: '20px'}}><TextColor id="testText" text={this.state.testText} userText={this.state.userText}/></article>
          <form action="/action_page.php" name='inputForm'>
            <label for="lname"></label>
            <input type="text" id="lname" autoComplete='off' placeholder='Enter text here...' name="lname" size="85" onChange={(event) => this.getResults(event)} />
          </form>
          <button onClick={this.getEasyText}>Easy Test</button>
          <button onClick={this.getHardText}>Hard Test</button>
          <br></br>
          <button id ='score' onClick={this.saveScore}>Save Score</button>
          <p>WPM: {this.state.WPM}</p>
          <p>Accuracy: {this.state.accuracy}%</p>
          <p>High Scores: </p>
          {this.state.highScores ?
          <ol start='0'>
            <li>Score:--- WPM: ---Accuracy:</li>
          {this.state.highScores.map(score => <li>{score.score}--------{score.wpm}--------{score.accuracy}</li>)}
          </ol> : ''}
        </main>
        <footer></footer>


      </>

    );
  }
}

export default SpeedTest;