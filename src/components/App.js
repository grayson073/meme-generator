import React, { Component, Fragment } from 'react';
import cowsay from 'cowsay-browser';
import styles from './App.css';

class App extends Component {

  state = {
    headerContent: 'Enter a meme header',
    footerContent: 'Enter a meme footer',
    url: 'https://i.redd.it/awfefcu0c9g11.jpg'
  };

  handleMemeChoose = (url = '') => {
    this.setState({ url });
  }

  handleHeaderChange = (headerContent = '') => {
    this.setState({ headerContent });
  }

  handleFooterChange = (footerContent = '') => {
    this.setState({ footerContent });
  }

  render() {

    const { headerContent, footerContent, url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h2>SUPER COOL MEME STUFF</h2>
        </section>

        <section>
          <Header headerContent={headerContent} onChange={this.handleHeaderChange}/>
          <Footer footerContent={footerContent} onChange={this.handleFooterChange}/>
          <Background url={url} onChoose={this.handleMemeChoose}/>
        </section>

        <section>
          <Meme url={url} headerContent={headerContent} footerContent={footerContent}/>
        </section>
      </main>
    );
  }
}



function Meme({ url, headerContent, footerContent }) {

  return (
    <Fragment>
      <div id="background" style={{ background:`url(${url}) no-repeat`}}>
        <div id="headerContent">{headerContent}</div>
        <div id="footerContent">{footerContent}</div>
      </div>
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

function Header({ headerContent, onChange }) {
  return (
    <label>
      Meme header:<br/>
      <input size="75" value={headerContent} onChange={({ target }) => onChange(target.value)}/><br/>
    </label>
  );
}

function Footer({ footerContent, onChange }) {
  return (
    <label>
      Meme Footer:<br/>
      <input size="75" value={footerContent} onChange={({ target }) => onChange(target.value)}/><br/>
    </label>
  );
}

export default App;