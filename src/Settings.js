import React from 'react'
import { connect } from 'react-redux'

import { Button } from './Buttons'


import { fetchMovies, clearList } from './actions/'

class Settings extends React.Component {

    updateWatchlist = () => {
        const {clearList, updateList} = this.props
        
        clearList()
        updateList()
      }

      render() {

        return (
      
            <div>
                <h1>Settings</h1>

                <Button text={'Update Watchlist'} onClick={this.updateWatchlist} />
                
            </div>
        )
    }
}

/*
const mapStateToProps = state => {
    
        return {
            null
            //filters: state.filters,
           // sortByValue: state.filters.sortBy
        }
    }
    */
    
const mapDispatchToProps = dispatch => {
    return {
    updateList: () => {
        dispatch(fetchMovies())
    },
    clearList: () => {
        dispatch(clearList())
    }
    }
}

export default connect(null, mapDispatchToProps)(Settings)
