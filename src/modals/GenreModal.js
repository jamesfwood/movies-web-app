import React from 'react'
import { connect } from 'react-redux'

import { updateGenre, updateAllGenres } from '../actions/'

import { Modal, ModalManager, Effect } from 'react-dynamic-modal'


import '../styles/css/modal.css'
import '../styles/css/OnOffSwitch.css'
import '../styles/css/GenreModal.css'

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}




class MyModal extends React.Component{

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

    componentDidMount() {

        disableScroll()

    }

    componentWillUnmount()
    {
        console.log("destroying modal")

        enableScroll()

    }

   render(){
      const { onRequestClose, genres } = this.props;

      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.ScaleUp}
            >
            <div className="modal">
                <div className="modal-header">Close</div>
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
                    <div>
                    <button onClick={ModalManager.close}>Close Modal</button>
                    </div>
                </div>
            </div>
         </Modal>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
