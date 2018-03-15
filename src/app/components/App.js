import React, { Component } from 'react';
import Header from './Header';
import MusicApp from '../containers/MusicApp';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <MusicApp />
            </div>
        );
    }
}

export default App;
