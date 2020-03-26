import React from 'react';

function ColorChoice() {
    return (
        <header className="ChooseColor">
            <h2>Pick a Color!</h2>
            <div className="ColorOptions">
                <a href="/?color=black">Black</a>
                <a href="/?color=blue">Blue</a>
                <a href="/?color=brown">Brown</a>
                <a href="/?color=gray">Gray</a>
                <a href="/?color=green">Green</a>
                <a href="/?color=pink">Pink</a>
                <a href="/?color=purple">Purple</a>
                <a href="/?color=red">Red</a>
                <a href="/?color=white">White</a>
                <a href="/?color=yellow">Yellow</a>
            </div>
        </header>
    );
}

export default ColorChoice