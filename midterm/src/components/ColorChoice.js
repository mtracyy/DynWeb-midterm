import React from 'react';

function ColorChoice() {
    return (
        <header className="ChooseColor">
            <h2>Pick a Color!</h2>
            <div className="ColorOptions">
                <a href="/?color=black" className="button b1">Black</a>
                <a href="/?color=blue" className="button b2">Blue</a>
                <a href="/?color=brown" className="button b3">Brown</a>
                <a href="/?color=gray" className="button b4">Gray</a>
                <a href="/?color=green" className="button b5">Green</a>
                <a href="/?color=pink" className="button b6">Pink</a>
                <a href="/?color=purple" className="button b7">Purple</a>
                <a href="/?color=red" className="button b8">Red</a>
                <a href="/?color=white" className="button b9" >White</a>
                <a href="/?color=yellow" className="button b10">Yellow</a>
            </div>
        </header>
    );
}

export default ColorChoice