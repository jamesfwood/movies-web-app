import React from 'react'
import { connect, Provider } from 'react-redux'
import { ModalManager } from 'react-dynamic-modal'

import { changeSortOrder, sortBy } from './actions/'

import RuntimeModal from './modals/RuntimeModal'
import GenreModal from './modals/GenreModal'

import './styles/css/ListControls.css'

import store from './store'

function convertMins(mins) {

    var minutes = Math.floor(mins % 60)
    mins /= 60
    var hours = Math.floor(mins)

    return hours + "h " + minutes + "min";
}

class ListControls extends React.Component {

    openRuntimeModal = () => {
       ModalManager.open(<Provider store={store}>
           <RuntimeModal onRequestClose={() => true}/>
               </Provider>);
    }

    openGenreModal = () => {
       ModalManager.open(<Provider store={store}>
           <GenreModal onRequestClose={() => true}/>
               </Provider>);
    }

    render() {
        const { filters, changeSortOrder, sortBy, sortByValue, movieCount } = this.props

        
        return (
            <section className="sidePanel">
                <h3>Control Panel</h3>

                <span>Sort</span>
                <div><a onClick={() => changeSortOrder('asc')}>Ascending</a>
                <a onClick={() => changeSortOrder('desc')}>Descending</a>
                </div>
                <h3>{filters.sortOrder}</h3>
                <hr/>
                <div>Sort By
                    <select value={sortByValue} onChange={ e => sortBy(e.target.value)}>
                        { 
                            filters.sortTypes.map( s => 
                                <option key={s.value} value={s.value}>{s.name}</option>)
                        }
                    </select>
                </div>
                <hr/>
                <div>Displaying Genres
                    <ul className='genreList'>
                    {
                        filters.genres.map( g => 
                            {
                                if (g.display) {
                                    return (<li className='genreItem' key={g.name} >{g.name}</li>)
                                }

                                return (<div key={g.name}></div>)
                            }
                            
                        )
                        
                    }
                    </ul>
                    <button type="button" onClick={this.openGenreModal}>Filter...</button>
                </div>
                <hr/>
                <div className='runtime'>Runtime
                    <div>[{convertMins(filters.runtimeRange[0])} to {convertMins(filters.runtimeRange[1])}]</div>
                    <button type="button" onClick={this.openRuntimeModal}>Filter...</button> 
                </div>
                <hr/>
                <div>
                    <a>Movie Count: {movieCount}</a>
                    <hr/>
                    <a>Movie App</a>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        filters: state.filters,
        movieCount: state.movies.length,
        sortByValue: state.filters.sortBy
    }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSortOrder: (order) => {
      dispatch(changeSortOrder(order))
    },
    sortBy: (sort) => {
        dispatch(sortBy(sort))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListControls)
