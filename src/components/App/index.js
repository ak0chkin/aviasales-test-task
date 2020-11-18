import React from 'react';
import './index.css';
import Ticket from "../Ticket";
import Filter from "../Filter";

let searchId = '', tickets = [];
const abortController = new AbortController();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: '',
            tickets: [],
            filter: [{
                steps: 'all',
                text: 'Все',
                checked: true
            }, {
                steps: 0,
                text: 'Без пересадок',
                checked: false
            }, {
                steps: 1,
                text: '1 пересадка',
                checked: false
            }, {
                steps: 2,
                text: '2 пересадки',
                checked: false
            }, {
                steps: 3,
                text: '3 пересадки',
                checked: false
            }]
        }
        this.handleFilter = this.handleFilter.bind(this);
    }

    async fetchSearchId() {
        const response = await fetch('https://front-test.beta.aviasales.ru/search', {
            method: 'GET',
            headers: {Accept: 'application/json'},
            signal: abortController.signal
        });
        if (response.status !== 200) {
            console.log(`An error has occurred: ${response.statusText}`);
        } else {
            const data = await response.json()
            searchId = data.searchId;
        }
    }

    async fetchTickets(searchId) {
        const response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`, {
            method: 'GET',
            headers: {Accept: 'application/json'},
            signal: abortController.signal
        })
        if (response.status === 502) {
            await this.fetchTickets(searchId);
        } else if (response.status !== 200) {
            console.log(`An error has occurred: ${response.statusText}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.fetchTickets(searchId);
        } else {
            const data = await response.json()
            tickets = [...tickets, ...data.tickets];
            console.log(tickets);
            if (data.stop) {
                abortController.abort();
            } else {
                await this.fetchTickets(searchId);
            }
        }
    }

    handleFilter(e) {
        this.setState(state => ({
            filter: state.filter.map(item => item.steps == e.target.value ? {...item, checked: e.target.checked} : item)
        }));
    }

    componentDidMount() {
        this.fetchSearchId()
            .then(() => {
                this.fetchTickets(searchId).then(() => {
                    this.setState({
                        searchId,
                        tickets
                    });
                });
            });
    }

    render() {
        return (
            <div className="App">
                <Filter filter={this.state.filter} onChange={this.handleFilter} />
                <Ticket searchId={this.state.searchId} tickets={this.state.tickets} filter={this.state.filter}/>
            </div>
        );
    }
}

export default App;
