import React from "react";

export const Music = ({music}) => {
    return (
        <div>
            <p>{music.author} - {music.title}</p>
            <audio src={music.src} controls></audio>
        </div>
    );
};