import React from 'react'
import { connect } from 'react-redux'

import { displayControlPanel } from './actions/'


class WatchSummary extends React.Component {

    handleShowControlPanel = () => {

        const {displayControlPanel} = this.props

        displayControlPanel(true)
    }

  render() {

    return (
    <div className='watchsummary'>
      <div className='summaryOnOff' onClick={this.handleShowControlPanel}></div>
      <div className='summaryItem'>Sort: Title (Ascending)</div>
      <div className='summaryItem'>Displaying: 144</div>
      <div className='summaryItem'>Genres: All</div>
      <div className='summaryItem'>Runtime: All</div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayControlPanel: (display) => {
      dispatch(displayControlPanel(display))
    }
  }
}

export default connect(null, mapDispatchToProps)(WatchSummary)

