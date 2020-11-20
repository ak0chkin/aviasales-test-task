import React from 'react';
import './index.css';
import Ticket from "../Ticket";
import Filter from "../Filter";
import Sorting from "../Sorting";

let searchId = '', tickets = [];
const abortController = new AbortController();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchId: '',
            tickets: [],
            checkedCount: 3,
            sorting: 'price',
            filter: [{
                steps: 'all',
                text: 'Все',
                checked: false
            }, {
                steps: 0,
                text: 'Без пересадок',
                checked: true
            }, {
                steps: 1,
                text: '1 пересадка',
                checked: true
            }, {
                steps: 2,
                text: '2 пересадки',
                checked: true
            }, {
                steps: 3,
                text: '3 пересадки',
                checked: false
            }]
        }
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSorting = this.handleSorting.bind(this);
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

    handleSorting(e) {
        this.setState({
            sorting: e.target.id === 'price' ? 'price' : 'speed'
        });
    }

    handleFilter(e) {

        this.setState(state => {
            if (e.target.value === 'all') {
                return {
                    filter: state.filter.map(item => ({...item, checked: e.target.checked})),
                    checkedCount: e.target.checked ? 4 : 0
                }
            }
            if ((state.checkedCount + (e.target.checked ? 1 : -1)) === 4) {
                return {
                    filter: state.filter.map(item => ({...item, checked: true})),
                    checkedCount: 4
                }
            }
            return {
                filter: state.filter.map(item => item.steps === 'all' ? {
                    ...item,
                    checked: false
                } : item.steps == e.target.value ? {
                    ...item,
                    checked: e.target.checked
                } : item),
                checkedCount: (state.checkedCount + (e.target.checked ? 1 : -1))
            }
        });
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
                <Filter filter={this.state.filter} onChange={this.handleFilter}/>
                <div className="app-content">
                    <Sorting handleSorting={this.handleSorting} sorting={this.state.sorting}/>
                    <Ticket searchId={this.state.searchId} tickets={this.state.tickets} filter={this.state.filter}
                            sorting={this.state.sorting}/>
                </div>
            </div>
        );
    }
}

export default App;
