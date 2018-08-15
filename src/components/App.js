import React, { Component, Fragment } from 'react';
import cowsay from 'cowsay-browser';
import styles from './App.css';

class App extends Component {

  state = {
    content: 'The cow says moo',
    cows: [],
    cow: 'default',
    url: 'https://www.beginningfarmers.org/wp-content/uploads/sites/4/2018/03/DSCN0028-550x264.jpeg'
  };


  render() {

    const { content, cows, cow, url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h2>SUPER COOL MEME STUFF</h2>
        </section>

        <section className="cow-say">
            <span ref ={node => this.image = node}>
              <CowSay content={content} cow={cow} url={url}/>
            </span>
        </section>
      </main>
    );
  }
}

function CowSay({ content, cow, url }) {
  
  const cowSaid = cowsay.say({
    text: content || ' ',
    f: cow
  });

  return (
    <Fragment>
      <pre style={{ background:`url(${url}) no-repeat`}}>{cowSaid}</pre>
    </Fragment>
  );
}

export default App;