import React from 'react'

export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    render(){
        return (
            <div>
                <p>here will sign up</p>
            </div>
        )    
    }

}