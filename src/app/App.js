import React, { Component } from 'react';
import Header from "./components/Header";
import { MusicList } from "./components/MusicList";

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <MusicList />
                </div>
            </div>
        );
    }
}

export default App;
