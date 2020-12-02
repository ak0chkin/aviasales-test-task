import React from 'react';
import moment from 'moment'
import './index.css';

function Ticket(props) {
    const filter = props.filter
        .filter(item => item.checked)
        .map(item => item.steps);
    const filteredTickets = filter.includes('all') ? props.tickets : props.tickets.filter(({segments}) => segments.every(({stops}) => filter.includes(stops.length)));
    const sortedTickets = filteredTickets.sort((a, b) => props.sorting === 'price' ? a.price - b.price : (a.segments.reduce((acc, curr) => acc.duration + curr.duration) - b.segments.reduce((acc, curr) => acc.duration + curr.duration)));
    const firstFive = sortedTickets.slice(0, 5);
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
                                className="segment__title">{`${stops.length} ${['Пересадка', 'Пересадки', 'Пересадок'][(stops.length % 100 > 4 && stops.length % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(stops.length % 10 < 5) ? stops.length % 10 : 5]]}`}</div>
                            <div className="segment__data">{stops.join(', ')}</div>
                        </div>
                    </div>
                )
            })}</div>
        </div>
    ));
    if (tickets.length > 0) {
        return (
            <div className="ticket-wrap">
                {tickets}
            </div>
        );
    }
    return (
        <div>
            <svg className="spinner__svg" viewBox="0 0 50 50">
                <circle className="spinner__circle" cx="25" cy="25" r="20" fill="none"/>
            </svg>
        </div>

    )
}

export default Ticket;