import React from 'react';
import './index.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const filter = this.props.filter.map((item, idx) => (
            <div key={idx} className="checkbox-wrap">
                <div className="checkbox-wrap__item">
                    <input id={`cb${idx}`} type="checkbox" value={item.steps}
                           checked={item.checked} onChange={this.props.onChange}/><label
                    htmlFor={`cb${idx}`}>{item.text}</label>
                </div>

            </div>
        ));
        return (
            <div className="filter">
                <div className="filter__title">Количество пересадок</div>
                {filter}
            </div>
        );
    }
}

export default Filter;