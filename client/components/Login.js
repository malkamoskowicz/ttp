import React from 'react'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            validEmail: false,
            validPassword: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }  
    
    handleSubmit(event) {
        return false
    }

    render(){
        const styles = {
            container: {
                margin: "auto",
                padding: "20px",
                borderColor: "black",
                borderStyle: "solid",
                display: "flex",
                flexDirection: "column",
                width: "300px",
                marginTop: "100px"
            }
        }
        return (
            <form onSubmit={this.handleSubmit} name={name} style={styles.container}>
                <h1>Sign In</h1>
                <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder={"email"}
                />
                <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder={"password"}
                />
            </form>   
        )    
    }
}