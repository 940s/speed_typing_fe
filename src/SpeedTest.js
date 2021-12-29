import React from 'react';
import axios from 'axios';


class SpeedTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WPM: [],
      testText: 'Please press Start Test below',
      userText: '',
      startTime:0,
      endTime:0,
      accuracy:''
    }


  }

  getText = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API}get_text`);
      console.log('app get data: ', response.data)
      let text = response.data.text;

      this.setState({

        testText: text,
        startTime: Date.now()
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
    let time = this.getTime()

    console.log('getResults time: ', time)
    let userText = {
      original: this.state.testText,
      comparison: this.state.userText,
      time: time
    }
    console.log('getResults userText:', userText)
    try {
      const userTextResponse = await axios.post(`${process.env.REACT_APP_API}post_wpm`, JSON.stringify(userText));
      this.setState({
        WPM: userTextResponse.data.wpm,
        accuracy: userTextResponse.data.accuracy
      })
      console.log(userTextResponse);

    } catch (error) {
      console.log('this is the post error: ', error.message)
    }
  }


  render() {
    console.log('SpeedTest state: ', this.state)
    return (
      <>
        <header></header>
        <main>
          <h1>Please enter the following text</h1>
          <p style={{margin: "0px auto", maxWidth: "75%"}}>{this.state.testText}</p>
          <form action="/action_page.php">
            <label for="lname">Enter text here:</label>
            <input type="text" id="lname" name="lname" size="85" onChange={(event) => this.setState({ userText: event.target.value })} />
            <input type="submit" id="submit" value="Submit" onClick={(event) => this.getResults(event)} />
          </form>
          <button onClick={this.getText}>Start Test</button>
          <p>WPM: {this.state.WPM}</p>
          <p>Accuracy: {this.state.accuracy}</p>
        </main>
        <footer></footer>


      </>

    );
  }
}

export default SpeedTest;