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
                <input id={`cb${idx}`} type="checkbox" value={item.steps}
                       checked={item.checked} onChange={this.props.onChange}/><label htmlFor={`cb${idx}`}>{item.text}</label>
            </div>
        ));
        return (
            <div className="filter">
                Количество пересадок
                {filter}
            </div>
        );
    }
}

export default Filter;