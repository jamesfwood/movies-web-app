import React from 'react'
import { connect } from 'react-redux'

import { setRuntimeRange } from '../actions/'

import nouislider from 'nouislider'
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'


import '../styles/css/modal.css'

import 'nouislider/distribute/nouislider.min.css'
import '../styles/css/noUiSlider.css'

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


function convertMins(mins) {

    var minutes = Math.floor(mins % 60)
    mins /= 60
    var hours = Math.floor(mins)

    return hours + "h " + minutes + "min";
}
/*
function convertToMins(runtime) {

    let values = runtime.split(' ')

    let hours = parseInt(values[0].replace('h', ''), 10)
    let mins = parseInt(values[1].replace('min', ''), 10)

    return hours * 60 + mins
}
*/

class MyModal extends React.Component{

    handleSliderUpdate = (values) => {

        const slider = document.getElementById('slider')
        let children = slider.getElementsByClassName('noUi-handle')

        for (let i = 0; i < 2; i++) {

            const val = parseInt(values[i], 10)
            children[i].dataset.value = convertMins(val)
        }
    }

    handleSliderChange = (values, setRuntimeRange) => {

        const vals = [ parseInt(values[0], 10), parseInt(values[1], 10) ]
        console.log('this', this)
        console.log("updating slider!", vals)

        setRuntimeRange(vals)
    }

    
    componentDidMount() {

        disableScroll()

        const { filters, maxMinutes } = this.props

        let slider = document.getElementById('slider')
        nouislider.create(slider, {
            start: filters.runtimeRange,
            step: 1,
            margin: 30,
            animationDuration: 300,
    /*        tooltips: [ true, true ],
            format: {
                to: function ( value ) {
                    return convertMins(value)
                },
                from: Number
            },*/
            connect: true, 
            range: { 'min': 0, 'max': maxMinutes}
        })

        //let c = slider.querySelectorAll('.noUi-connect')

        //c[0].classList.add('c-1-color')

        const self = this

        const { setRuntimeRange } = this.props

        slider.noUiSlider.on('change', function(values) {
            self.handleSliderChange(values, setRuntimeRange)
        })

        slider.noUiSlider.on('update', function(values) {
            self.handleSliderUpdate(values, setRuntimeRange)
        })
    }

    componentWillUnmount()
    {
        console.log("destroying modal")

        enableScroll()

        let slider = document.getElementById('slider')

        slider.noUiSlider.destroy()
    }

   render(){
      const { onRequestClose } = this.props;

      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.ScaleUp}
            >
            <div className="modal">
                <div className="modal-header">Close</div>
                <div className="modal-body">
                    <hr/>
                    <div className='noUiSlider sliderContainer' id='slider'/>
                    
                    <hr/>
                    <button onClick={ModalManager.close}>Close Modal</button>
                </div>
            </div>
         </Modal>
      );
   }
}


const mapStateToProps = state => {

    let max = 0

    for (let i = 0; i < state.movies.length; i++) {
        if (state.movies[i].duration > max)
            max = state.movies[i].duration
    }

  return {
    filters: state.filters,
    maxMinutes: Math.round(max / 1000 / 60) + 10
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRuntimeRange: values => {
      dispatch(setRuntimeRange(values))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyModal)
