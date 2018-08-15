import React, { Component, Fragment } from 'react';
import cowsay from 'cowsay-browser';
import styles from './App.css';

class App extends Component {

  state = {
    content: 'This is a meme header',
    url: 'https://i.redd.it/awfefcu0c9g11.jpg'
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  }

  render() {

    const { content, url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h2>SUPER COOL MEME STUFF</h2>
        </section>

        <section>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
          <Meme content={content} url={url} onChange={this.handleContentChange}/>
        </section>
      </main>
    );
  }
}



function Meme({ url }) {

  return (
    <Fragment>
      <div id="background" style={{ background:`url(${url}) no-repeat`}}></div>
    </Fragment>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Select a meme by pasting a URL or uploading an image:<br/>
      <input size="100" value={url} onChange={({ target }) => onChoose(target.value)}/><br/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  )
}

function headerContent({ content, onChange }) {
  return (
    <input value={content} onChange={({ target }) => onChange(target.value)}/>
  );
}

export default App;