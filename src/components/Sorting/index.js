import React from 'react';
import './index.css';

function Sorting(props) {
    return (
        <div className="sorting">
            <ul className="sorting__tabs">
                <li id="price" className={`sorting__tab ${props.sorting === 'price' ? 'is-active' : ''}`}
                    onClick={props.handleSorting}>
                    Самый дешевый
                </li>
                <li id="speed" className={`sorting__tab ${props.sorting === 'speed' ? 'is-active' : ''}`}
                    onClick={props.handleSorting}>
                    Самый быстрый
                </li>
            </ul>
        </div>
    );
}

export default Sorting;
