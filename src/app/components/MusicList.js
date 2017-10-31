import React from "react";
import { connect } from "react-redux";

import { SoundItem } from "./SoundItem";
import { playSound } from "../actions/soundActions";
import { addSound } from "../actions/soundActions";
import {store} from "../store";

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
        console.log(json);
        json.forEach(sound => store.dispatch(addSound({sound})));
    }

    render() {
        if (this.state.musicList.length) {
            return (
                <div>
                    {this.state.musicList.map((el, i) => <SoundItem key={i} music={el} />)}
                </div>
            );
        }
        else return <div>Loading...</div>;
    };
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        tasks: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeTask: (id) => {
            dispatch(removeTask(id));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MusicList);