import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
//import { ModalManager } from 'react-dynamic-modal'

import { changeSortOrder, sortBy, displayControlPanel, fetchMovies, clearList } from './actions/'

//import RuntimeModal from './modals/RuntimeModal'
import RuntimeDialog from './modals/RuntimeDialog'
//import GenreModal from './modals/GenreModal'
import GenreDialog from './modals/GenreDialog'

import './styles/css/ListControls.css'

//import store from './store'

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

      updateWatchlist = () => {
        const {clearList, updateList} = this.props
        
        clearList()
        updateList()
      }
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

    openModal = () => {
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


    openModal2 = () => {
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
        const { filters, changeSortOrder, sortBy, sortByValue, movieCount } = this.props
        
        return (
            <section className="sidePanel">

                <GenreDialog/>
                <RuntimeDialog/>
                <div className="closeIcon" onClick={this.handleHideControlPanel}></div>
                <div className="sortPanel">
                    
                    <div><span className="title">Sort Order</span></div>
                    <div className="sortOrder">
                        <div className={ filters.sortOrder === 'asc' ? 'active' : ''}><a onClick={() => changeSortOrder('asc')}>Ascending</a></div>
                        <div className={ filters.sortOrder === 'desc' ? 'active' : ''}><a onClick={() => changeSortOrder('desc')}>Descending</a></div>
                    </div>

                    <div className="sortBy">Sort By
                        <select value={sortByValue} onChange={ e => sortBy(e.target.value)}>
                            { 
                                filters.sortTypes.map( s => 
                                    <option key={s.value} value={s.value}>{s.name}</option>)
                            }
                        </select>
                    </div>
                </div>
                
                <div className="genrePanel">
                    <span className="title">Displaying Genres</span>
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
                    <button type="button" onClick={this.openModal}>Filter...</button>
                </div>

                <div className='runtimePanel'>
                    <span className="title">Runtime</span>
                    <div>{convertMins(filters.runtimeRange[0])} to {convertMins(filters.runtimeRange[1])}</div>
                    <button type="button" onClick={this.openModal2}>Filter...</button> 
                </div>

                <div className="statsPanel">
                <span className="title">Movie Count: {movieCount}</span>
                </div>

                <div className="updatePanel">
                    <button type="button" onClick={this.updateWatchlist}>Update List</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        filters: state.filters,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListControls))
