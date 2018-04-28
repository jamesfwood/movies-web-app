import React from 'react'
import { connect } from 'react-redux'

//import { withRouter } from 'react-router-dom'
//import { ModalManager } from 'react-dynamic-modal'

import { changeSortOrder, sortBy, displayControlPanel, fetchMovies, clearList } from './actions/'

import { Button } from './Buttons'

import RuntimeDialog from './modals/RuntimeDialog'
import GenreDialog from './modals/GenreDialog'

import './styles/css/ListControls.css'

function convertMins(mins) {

    var minutes = Math.floor(mins % 60)
    mins /= 60
    var hours = Math.floor(mins)

    return hours + "h " + minutes + "min";
}

class ListControls extends React.Component {
/*
    constructor () {
        super();
        this.state = {
          showModal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
      */

/*

      handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }
*/
    handleHideControlPanel = () => {

        const {displayControlPanel} = this.props

        displayControlPanel(false)
    }
/*
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

    handleClose = (e) => {
        
                if (e.target.parentElement.classList.contains('sidePanel')) {
                    this.props.history.goBack()
                }
            }
*/

    openGenreModal = () => {
        const modal = document.getElementById('genreModal');
        
        modal.style.display = 'block'

        // Get the button that opens the modal
        //var btn = document.getElementById("myBtn");
        
        // Get the <span> element that closes the modal
        var span = modal.getElementsByClassName("close")[0];
        
        // When the user clicks the button, open the modal 
        //btn.onclick = function() {
        //    modal.style.display = "block";
        //}
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it

        function myEvent(event) {

            if (event.target === modal) {
                modal.style.display = "none";

                window.removeEventListener(touchEvent, myEvent)
                
     //           document.body.style.overflowY = ''
            }
        }

        const touchEvent = 'ontouchstart' in window ? 'touchend' : 'click'

        window.addEventListener(touchEvent, myEvent)

     //   document.body.style.overflowY = 'hidden'
    }


    openRuntimeModal = () => {
        const modal = document.getElementById('runtimeModal');
        
        modal.style.display = 'block'

        // Get the button that opens the modal
        //var btn = document.getElementById("myBtn");
        
        // Get the <span> element that closes the modal
        var span = modal.getElementsByClassName("close")[0];
        
        // When the user clicks the button, open the modal 
        //btn.onclick = function() {
        //    modal.style.display = "block";
        //}
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it

        function myEvent(event) {

            if (event.target === modal) {
                modal.style.display = "none";

                window.removeEventListener(touchEvent, myEvent)
                
     //           document.body.style.overflowY = ''
            }
        }

        const touchEvent = 'ontouchstart' in window ? 'touchend' : 'click'

        window.addEventListener(touchEvent, myEvent)

     //   document.body.style.overflowY = 'hidden'
    }

    // TODO:  Move Modal to React Component and make it on mount add overflow-y: hidden to body to stop scrolling
    //document.body.style.overflow-y = 'hidden'

    render() {
        const { filters, changeSortOrder, sortBy, sortByValue, totalCount, totalHours, displayMovieCount, displayTotalHours } = this.props
        
        let displayAll = true

        for (const genre of filters.genres) {
            if (!genre.display) {
                displayAll = false;
                break;
            }
        }

        const displayRuntimeRange = () => {

            const { runtimeRange } = this.props
            
            if (filters.runtimeRange[0] < runtimeRange.min) {

                if (filters.runtimeRange[1] > runtimeRange.max) {
                    return (
                        <div className="displayAll">All</div>
                    )
                }
                else {
                    return (
                        <div className="runtime">
                            ≤ {convertMins(filters.runtimeRange[1])}
                        </div>
                    )
                }
            }
            else if (filters.runtimeRange[1] > runtimeRange.max) {
                return (
                    <div className="runtime">
                        ≥ {convertMins(filters.runtimeRange[0])}
                    </div>
                )
            }

            return (
                <div className="runtime">{convertMins(filters.runtimeRange[0])} to {convertMins(filters.runtimeRange[1])}</div>
            )
        }

        return (
            <section className="sidePanel">

                <GenreDialog/>
                <RuntimeDialog/>
                <div className="closePanel">
                    <div className="closeIcon" onClick={this.handleHideControlPanel}></div>
                    <div className="closeText">Hide Panel</div>
                </div>
                <div className="sortPanel">
                    
                    <div className="title">Sort Order</div>
                    <div className="sortOrder">
                        <div className={ filters.sortOrder === 'asc' ? 'sortItem active' : 'sortItem'}><a onClick={() => changeSortOrder('asc')}>Ascending</a></div>
                        <div className={ filters.sortOrder === 'desc' ? 'sortItem active' : 'sortItem'}><a onClick={() => changeSortOrder('desc')}>Descending</a></div>
                    </div>

                    <div className="sortBy">Sort By
                        <div className="select">
                        <select value={sortByValue} onChange={ e => sortBy(e.target.value)}>
                            { 
                                filters.sortTypes.map( s => 
                                    <option key={s.value} value={s.value}>{s.name}</option>)
                            }
                        </select>
                        </div>
                    </div>
                </div>
                
                <div className="genrePanel">
                    <div className="title">Displaying Genres</div>
                    {
                        displayAll === true ? <div className='displayAll'>All</div> :
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
                    }
                    <Button text={'Filter Genres'} onClick={this.openGenreModal} />
                </div>

                <div className='runtimePanel'>
                    <div className="title">Runtime Range</div>
                    { displayRuntimeRange() }
                    <Button text={'Filter Runtime'} onClick={this.openRuntimeModal} />
                </div>

                <div className="statsPanel">
                    <div className="title">Statistics</div>
                    <div className="statsItem">
                        <div>Displaying: {displayMovieCount} ({displayTotalHours} hrs)</div>
                    </div>
                    <div className="statsItem">
                        <div>Total: {totalCount} ({totalHours}hrs)</div>
                    </div>

                </div>

            </section>
        )
    }
}

const mapStateToProps = state => {

    let totalHours = 0, totalCount = 0
    for (const movie of state.movies) {
        if (movie.omdb) {
            totalHours += movie.duration
            totalCount++
        }
    }

    totalHours = Math.round(totalHours / 1000 / 60 / 60 * 10) / 10

    let range = { min: Number.MAX_VALUE, max: 0 }
    
    for (const movie of state.movies) {
        if (movie.duration > range.max)
            range.max = movie.duration
        if (movie.duration < range.min)
            range.min = movie.duration
    }

    range.min = Math.floor(range.min / 1000 / 60)
    range.max = Math.ceil(range.max / 1000 / 60)

    return {
        runtimeRange: range,
        filters: state.filters,
        sortByValue: state.filters.sortBy,
        totalHours,
        totalCount
    }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSortOrder: (order) => {
      dispatch(changeSortOrder(order))
    },
    sortBy: (sort) => {
        dispatch(sortBy(sort))
    },
    displayControlPanel: (display) => {
      dispatch(displayControlPanel(display))
    },
    updateList: () => {
        dispatch(fetchMovies())
    },
    clearList: () => {
        dispatch(clearList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListControls)
