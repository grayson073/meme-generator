import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';

class App extends Component {

  state = {
    headerContent: 'HEYYYYY',
    footerContent: '!!!!!!!',
    url: 'np'
  };

  handleMemeChoose = (url = '') => {
    this.setState({ url });
  };

  handleHeaderChange = (headerContent = '') => {
    this.setState({ headerContent });
  };

  handleFooterChange = (footerContent = '') => {
    this.setState({ footerContent });
  };

  handleExport = () => {
    const meme = document.getElementById('background');
    dom2image.toBlob(meme)
      .then(blob => {
        fileSaver.saveAs(blob, 'super-meme.png');
      });
  };

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
          <p>
            <button onClick={this.handleExport}>Save Meme!</button>
          </p>
          <Meme url={url} headerContent={headerContent} footerContent={footerContent}/>
        </section>
      </main>
    );
  }
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

export default App;