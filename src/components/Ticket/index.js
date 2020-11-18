import React from 'react';
import moment from 'moment'
import './index.css';

class Ticket extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const filter = this.props.filter
            .filter(item => item.checked)
            .map(item => item.steps);
        console.log(filter);
        const filteredTickets = filter.includes('all') ? this.props.tickets : this.props.tickets.filter(({segments}) => segments.every(({stops}) => filter.includes(stops.length)));
        const firstFive = filteredTickets.slice(0, 5);
        const tickets = firstFive.map(({carrier, price, segments}, idx) => (
            <div className="ticket" key={idx}>
                <div className="ticket__header segment">
                    <div
                        className="segment__item segment__item_left ticket__price">{price.toFixed().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} Р
                    </div>
                    <div className="segment__item segment__item_center"/>
                    <div className="segment__item segment__item_right"><img src={`//pics.avs.io/99/36/${carrier}.png`}
                                                                            alt={carrier} className="ticket__carrier"/>
                    </div>
                </div>

                <div>{segments.map(({date, destination, duration, origin, stops}, idx) => {
                    return (
                        <div className="segment" key={idx}>
                            <div className="segment__item segment__item_left">
                                <div className="segment__title">{origin} - {destination}</div>
                                <div
                                    className="segment__data">{moment(date).format('HH:mm')} - {moment(date).add(duration, 'minutes').format('HH:mm')}</div>
                            </div>
                            <div className="segment__item segment__item_center">
                                <div className="segment__title">В ПУТИ</div>
                                <div className="segment__data">{Math.floor(duration / 60)}ч {duration % 60}м</div>
                            </div>
                            <div className="segment__item segment__item_right">
                                <div
                                    className="segment__title">{`${stops.length} ${['ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДОК'][(stops.length % 100 > 4 && stops.length % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(stops.length % 10 < 5) ? stops.length % 10 : 5]]}`}</div>
                                <div className="segment__data">{stops.join(',')}</div>
                            </div>
                        </div>
                    )
                })}</div>
            </div>
        ));
        return (
            <div>
                {tickets}
            </div>
        );
    }
}

export default Ticket;