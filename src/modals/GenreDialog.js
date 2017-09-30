import React from 'react'
import { connect } from 'react-redux'

import { updateGenre, updateAllGenres } from '../actions/'


import '../styles/css/modal.css'

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
                    <button onClick={() => this.handleGenreOnOff(true)}>Set All ON</button>
                    <button onClick={() => this.handleGenreOnOff(false)}>Set All OFF</button>
                    </div>
                    <hr/>
                   
                    {
                        genres.map( g =>
                         
                                
                                <label key={g.name} className='onoffswitch-label' htmlFor={g.name}>
                                <input className="onoffswitch-checkbox" type="checkbox" id={g.name} value={g.name} checked={g.display} onChange={this.handleGenre}/>
                                
                                {g.name}
                                </label>
                               
                          
                        )
                    }

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
      