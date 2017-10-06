import React from "react";
import { Music } from "./MusicItem";

export class MusicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: []
        }
    }

    componentDidMount() {
        this.loadData("../json/musicList.json");
    }

    async loadData(path) {
        const res = await fetch(path);
        const json = await res.json();

        this.setState({ musicList: json});
    }

    render() {
        if (this.state.musicList.length) {
            return (
                <div>
                    {this.state.musicList.map((el, i) => <Music key={i} music={el} />)}
                </div>
            );
        }
        else return <div>Loading...</div>;
    };
}