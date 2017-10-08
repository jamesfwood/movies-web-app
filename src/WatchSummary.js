import React from 'react'
import { connect } from 'react-redux'

import { displayControlPanel } from './actions/'


function convertMins(mins) {
  
    var minutes = Math.floor(mins % 60)
    mins /= 60
    var hours = Math.floor(mins)

    return hours + "h " + minutes + "min";
}

class WatchSummary extends React.Component {

    handleShowControlPanel = () => {

        const {displayControlPanel} = this.props

        displayControlPanel(true)
    }

  render() {

    const { movieCount, totalHours } = this.props

    const sortMessage = () => {

      const { filters } = this.props
      
      const sortBy = filters.sortTypes.find(s => s.value === filters.sortBy).name

      return (
        'Sort: ' + sortBy + ' (' + (filters.sortOrder === 'asc' ? 'Ascending' : 'Descending') + ')'
      )
    }

    const genreMessage = () => {

      const { genreCount } = this.props

      if (genreCount === -1) {
        return 'All'
      }
      else
        return genreCount
    }

    const displayRuntimeRange = () => {
      
        const { runtimeRange, filters } = this.props
        
        if (filters.runtimeRange[0] < runtimeRange.min) {

            if (filters.runtimeRange[1] > runtimeRange.max) {
                return (
                    'All'
                )
            }
            else {
                return (
                    '≤ ' + convertMins(filters.runtimeRange[1])
                )
            }
        }
        else if (filters.runtimeRange[1] > runtimeRange.max) {
            return (
                '≥ ' + convertMins(filters.runtimeRange[0])
            )
        }

        return (
            convertMins(filters.runtimeRange[0]) + ' to ' + convertMins(filters.runtimeRange[1])
        )
    }

    return (
    <div className='watchsummary'>
      <div className='summaryOnOff' onClick={this.handleShowControlPanel}></div>
      <div className='summaryItem'>{ sortMessage() }</div>
      <div className='summaryItem'>Displaying: { movieCount } ({totalHours} hrs)</div>
      <div className='summaryItem'>Genres: { genreMessage() }</div>
      <div className='summaryItem'>Runtime: { displayRuntimeRange() }</div>
    </div>
    )
  }
}

const mapStateToProps = state => {

  let genreCount = 0
  
  for (const genre of state.filters.genres) {
      if (genre.display) {
        genreCount++
      }
  }

  if (genreCount === state.filters.genres.length) {
    genreCount = -1
  }

  // Get runtime Range
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
    genreCount,
    filters: state.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayControlPanel: (display) => {
      dispatch(displayControlPanel(display))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchSummary)

