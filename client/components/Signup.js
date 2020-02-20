import React from 'react'
import axios from 'axios'

export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            validName: false,
            validEmail: false,
            validPassword: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }  
    
    async handleSubmit(event) {
        event.preventDefault()

        const {name, email, password} = this.state

        // validate fields
        if (!name.length || !email.length || !password.length) {
            alert("all fields are required")
            return
        }

        const userInfo = {
            name,
            email,
            password
        }
        const { data } = await axios.post("/auth/signup", userInfo)

        console.log('sign up res', data)

        if (data.name) {
            if (data.name  === "SequelizeUniqueConstraintError")
                alert("email already in use")
            else alert("error signup up, please try again")
        }

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
                <h1>Register</h1>
                <input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder={"name"}
                />
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
                <button onClick={this.handleSubmit}>
                    <p>submit</p>
                </button>
            </form>   
        )    
    }
}