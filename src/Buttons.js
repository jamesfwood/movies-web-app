import React from 'react'

import './styles/css/buttons.css'

export class AcceptButton extends React.Component {

    handleClick = () => {

        const { onClick, id } = this.props

        onClick(id)
    }

    render() {

        const {text} = this.props

        return (
            <div>
                <button className="button" onClick={this.handleClick}>{text}</button>
            </div>
        )
    }
}

export class Button extends React.Component {
    
        handleClick = () => {
    
            const { onClick } = this.props
    
            onClick()
        }
    
        render() {
    
            const {text} = this.props
    
            return (
                <div>
                    <button className="button" onClick={this.handleClick}>{text}</button>
                </div>
            )
        }
    }
    