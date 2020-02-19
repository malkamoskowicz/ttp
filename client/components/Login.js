import React from 'react'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        return (
            <div>
                <p>here will sign in</p>
            </div>
        )    
    }

}