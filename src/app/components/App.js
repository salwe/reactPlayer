import React, { Component } from 'react';
import Header from "./Header";
import { MusicList } from "./MusicList";

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
