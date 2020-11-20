import React from 'react';
import './index.css';

class Sorting extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="sorting">
                <ul className="sorting__tabs">
                    <li id="price" className={`sorting__tab ${this.props.sorting == 'price' ? 'is-active' : ''}`}
                        onClick={this.props.handleSorting}>
                        Самый дешевый
                    </li>
                    <li id="speed" className={`sorting__tab ${this.props.sorting == 'speed' ? 'is-active' : ''}`}
                        onClick={this.props.handleSorting}>
                        Самый быстрый
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sorting;
