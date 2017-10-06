import React from 'react'
import { connect } from 'react-redux'


import { setRuntimeRange } from '../actions/'

import nouislider from 'nouislider'


import '../styles/css/modal.css'

import '../styles/css/RuntimeModal.css'

import 'nouislider/distribute/nouislider.min.css'
import '../styles/css/noUiSlider.css'


function convertMins(mins) {
    
        var minutes = Math.floor(mins % 60)
        mins /= 60
        var hours = Math.floor(mins)
    
        return hours + "h " + minutes + "min";
    }

class RuntimeDialog extends React.Component {
    
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

        //disableScroll()

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

        //enableScroll()

        let slider = document.getElementById('slider')

        slider.noUiSlider.destroy()
    }

    render () {

        return (
            
                    <div id="runtimeModal" className="modal">

                    <div className="modal-content">
                        <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Runtime</h2>
                        </div>
                        <div className="modal-body">
                        
                        <div className="runtimeContainer">
                            <div className='noUiSlider sliderContainer' id='slider'/>
                        </div>

                        </div>
                        <div className="modal-footer">
                        <h3>Set Runtime Range to Display</h3>
                        </div>
                    </div>

                    </div>
        )
    }
}


    
const mapStateToProps = state => {
    
    let max = 0

    for (let i = 0; i < state.movies.length; i++) {
        if (state.movies[i].duration > max)
            max = state.movies[i].duration
    }

    max = Math.round(max / 1000 / 60)

    return {
        filters: state.filters,
        maxMinutes: max + max % 15
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRuntimeRange: values => {
            dispatch(setRuntimeRange(values))
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuntimeDialog)
