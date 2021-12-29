import React from 'react';
import axios from 'axios';


class SpeedTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            WPM: [],
            testText: 'Please press Start Test below',
            userText:''
        }


    }

    getText = async () => {
        try {
          let response = await axios.get(`${process.env.REACT_APP_API}get_text`);
          console.log('app get data: ', response.data)
          let text = response.data.text;
          this.setState({ testText: text });
        } catch (error) {
          console.log('this is the get error: ', error.message)
        }
      }



      getResults = async (event)=>{
          event.preventDefault();
          let userText = this.state.userText
          try{
            const userTextResponse = await axios.post(`https://speed-typing-six.vercel.app/api/post_wpm`,userText);
   
            console.log(userTextResponse);

          }catch(error){
            console.log('this is the get error: ', error.message)
          }
      }

      h
    render() {
      console.log('SpeedTest state: ',this.state)
        return (
            <>
                <header></header>
                <main>
                    <h1>Please enter the following text</h1>
                    <p>{this.state.testText}</p>
                    <form action="/action_page.php">
                        <label for="lname">Enter text here:</label>
                        <input type="text" id="lname" name="lname" onChange={(event) => this.setState({userText: event.target.value })}/>
                        <input type="submit" value="Submit" onClick={(event) => this.getResults(event)}/>
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