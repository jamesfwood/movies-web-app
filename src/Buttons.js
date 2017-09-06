import React from 'react'

export class AcceptButton extends React.Component {

    handleClick = () => {

        const { onClick, id } = this.props

        onClick(id)
    }

    render() {

        const {text} = this.props

        return (
            <div>
                <button onClick={this.handleClick}>{text}</button>
            </div>
        )
    }
}
