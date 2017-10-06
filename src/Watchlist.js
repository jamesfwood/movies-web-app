import React from 'react'
import { connect } from 'react-redux'

import ListControls from './ListControls'
import MovieTile from './MovieTile'
import WatchSummary from './WatchSummary'

import './styles/css/Watchlist.css';

class Watchlist extends React.Component {

  constructor() {
    super();
    this.state = {
      tileWidth:  185
    }

    //this.updateDimensions = this.updateDimensions.bind(this)
  }


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
  }

  render() {

    const {movies, showControlPanel} = this.props

    return (
      <div className="watchlist">
        { 
          showControlPanel && <ListControls movieCount={movies.length}/>
        }
        <section>
          {
            !showControlPanel && <WatchSummary movieCount={movies.length}/>
          }
            <div className={ showControlPanel ? "movieList" : "movieList2" }>
              {
                movies.map( movie =>
                  <MovieTile key={movie.filename} movie={movie} width={this.state.tileWidth} />
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
    showControlPanel: state.app.showControlPanel
  }
}

export default connect(mapStateToProps)(Watchlist)
