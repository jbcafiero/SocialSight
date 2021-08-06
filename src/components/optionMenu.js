import React from 'react'

export default function OptionMenu(props) {
    const buttonStyles = {
        color: 'white',
        padding: '10px 0 10px 0',
        width: '30%',
        borderRadius: '4px',
        margin: '10px 10% 10px 10%'
    }
    const leftButton = {
        float: 'left',
        background: '#f9a60d'
    }
    const rightButton = {
        float: 'right',
        background: '#ec2d2d'
    }
    const container = {
        height: '80px',
        width: '100%',
        background: 'grey',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px'
    }
    return (
        <div style={container}>
            
            <div style={{...buttonStyles, ...leftButton}}>
                Edit
            </div>
            <div style={{...buttonStyles, ...rightButton}}>
                Delete
            </div>
            
        </div>
    )
}
