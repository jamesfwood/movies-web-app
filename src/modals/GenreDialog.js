import React from 'react'
import { connect } from 'react-redux'

import { updateGenre, updateAllGenres } from '../actions/'


import '../styles/css/modal.css'
import '../styles/css/buttons.css'
import '../styles/css/GenreModal.css'

class GenreDialog extends React.Component {
    
    handleGenre = (event) => {
        
            const genre = event.target.value
    
            const { updateGenre } = this.props
    
            updateGenre(genre, event.target.checked)
        }
      
        handleGenreOnOff = (display) => {
    
            const { updateAllGenres } = this.props;
    
            updateAllGenres(display)
    
            this.forceUpdate()      // TODO: Why is this needed??
        }

        /*
        
                    <!--
                            <label key={g.name} htmlFor={g.name}>
                            <input type="checkbox" id={g.name} value={g.name} checked={g.display} onChange={this.handleGenre}/>
                            
                            {g.name}
                            </label>
 -->
 */

    render () {

        const { genres } = this.props;
        
        return (
            
                    <div id="genreModal" className="modal">

                    <div className="modal-content">
                        <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Genres</h2>
                        </div>
                        <div className="modal-body">
                        
                        <div>
                    <button className="button" onClick={() => this.handleGenreOnOff(true)}>Set All ON</button>
                    <button className="button" onClick={() => this.handleGenreOnOff(false)}>Set All OFF</button>
                    </div>
                    <hr/>
                    
                    <div className="genreModalList">
                    {
                        genres.map( g =>
                         
                            
                            <div key={g.name} className="genreBox">
                        <label className="switch" htmlFor={g.name}>
                            <input type="checkbox" id={g.name} value={g.name} checked={g.display} onChange={this.handleGenre} />
                            <span className="slider round"></span>
                        </label><div className="genreBoxText">{g.name}</div>
                    </div>

                        )
                    }
                    </div>

                        </div>
                        <div className="modal-footer">
                        <h3>Turn Genres On to Display, and Off to Hide</h3>
                        </div>
                    </div>

                    </div>
        )
    }
}


    const mapStateToProps = state => {
        return {
          genres: state.filters.genres
        }
      }
      
      const mapDispatchToProps = dispatch => {
        return {
          updateGenre: (name, display) => {
            dispatch(updateGenre(name, display))
          },
          updateAllGenres: (display) => {
              dispatch(updateAllGenres(display))
          }
        }
      }
      
      export default connect(mapStateToProps, mapDispatchToProps)(GenreDialog)
      