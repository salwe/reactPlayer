import React, { Component } from 'react';
import Header from "./components/Header";
import { MusicList } from "./components/MusicList";

class App extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div>
                    <MusicList />
                </div>
            </div>
        );
    }
}

export default App;
