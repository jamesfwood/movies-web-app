import React from 'react'
import { connect } from 'react-redux'

import ListControls from './ListControls'
import MovieTile from './MovieTile'
import WatchSummary from './WatchSummary'

import './styles/css/Watchlist.css';

class Watchlist extends React.Component {
/*
  constructor() {
    super();

    //this.updateDimensions = this.updateDimensions.bind(this)
  }
*/


  //updateDimensions() {
   
   /* if(window.innerWidth < 500) {
      this.setState({ width: 450, height: 102 });
    } else {
      let update_width  = window.innerWidth-100;
      let update_height = Math.round(update_width/4.4);
      this.setState({ width: update_width, height: update_height });
    }
*/

    /*console.log('body.width', document.body.clientWidth)
    
    console.log('window.innerWidth', window.innerWidth)

    const tileWidth = (document.body.clientWidth + 120) / 5

    //console.log('window.innerWidth', window.innerWidth)
    
    console.log('tileWidth', tileWidth)

    this.setState({tileWidth})
  }
*/
  //var width = document.body.clientWidth;


  /**
   * Add event listener
   */
  componentDidMount() {
   // this.updateDimensions()
   // window.addEventListener("resize", this.updateDimensions)

  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {

   // console.log('destroying watchlist')

   // window.removeEventListener("resize", this.updateDimensions)
    //window.removeEventListener("orientationchange", this.updateOrientation)
  }

  render() {

    const {movies, showControlPanel, orientation} = this.props

    let tileWidth = 185
    
    if (orientation === 'landscape' && !showControlPanel) {
        tileWidth = 188.9
    }
    else if (orientation === 'portrait') {

      if (showControlPanel) {
        tileWidth = 166
      }
      else {
        tileWidth = 176
      }
    }

    let totalHours = 0
    for (const movie of movies) {
      totalHours += movie.duration
    }

    totalHours = Math.round(totalHours / 1000 / 60 / 60 * 10) / 10

    return (
      <div className="watchlist">
        { 
          showControlPanel && <ListControls displayMovieCount={movies.length} displayTotalHours={totalHours}/>
        }
        <section>
          {
            !showControlPanel && <WatchSummary movieCount={movies.length} totalHours={totalHours}/>
          }
            <div className={ showControlPanel ? "movieList" : "movieList2" }>
              {
                movies.map( movie =>
                  <MovieTile key={movie.filename} movie={movie} width={tileWidth} />
                )
              }
            </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showControlPanel: state.app.showControlPanel,
    orientation: state.app.orientation
  }
}

export default connect(mapStateToProps)(Watchlist)
