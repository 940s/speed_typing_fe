import React from 'react';
import axios from 'axios';

class SpeedTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            WPM: [],
            testText: 'this is a test'
        }


    }

    getText = async () => {
        try {
          let response = await axios.get(`${process.env.REACT_APP_API}get_text`);
          console.log('app get data: ', response.data)
          let text = response.data;
          this.setState({ testText: text });
        } catch (error) {
          console.log('this is the get error: ', error.message)
        }
      }

      getResults = async()=>{
          try{
            console.log('test ')
          }catch(error){
            console.log('this is the get error: ', error.message)
          }
      }

    render() {
        return (
            <>
                <header></header>
                <main>
                    <h1>Please enter the following text</h1>
                    <p>{this.state.testText}</p>
                    <form action="/action_page.php">
                        <label for="lname">Enter text here:</label>
                        <input type="text" id="lname" name="lname" />
                        <input type="submit" value="Submit" onClick={this.getResults}/>
                    </form>
                    <button onClick={this.getText}>Start Test</button>
                    <p>WPM: {this.state.WPM}</p>
                </main>
                <footer></footer>

            
            </>

        );
    }
}

export default SpeedTest;