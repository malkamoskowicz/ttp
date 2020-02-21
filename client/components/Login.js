import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../reducers'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
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
        const {email, password} = this.state
        if (!email.length || !password.length) {
            alert("please enter both fields")
            return
        }
        const userInfo = {
            email,
            password
        }
        const { data } = await axios.put('/auth/login', userInfo)
        if (data.error) alert(data.error)
        else this.props.login()
    }

    render(){
        const styles = {
            container: {
                margin: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                width: "300px",
                marginTop: "100px",
                justifyContent: "center",
                alignItems: "center"
            },
            input: {
                padding: "10px",
                marginBottom: "10px",
                outline: "none",
                width: "80%"
            },
            button: {
                backgroundColor: "transparent",
                cursor: "pointer",
                outline: "none",
                width: "90%",
            },
            header: {
                fontSize: "20px"
            }
        }
        return (
            <form onSubmit={this.handleSubmit} name={name} style={styles.container}>
                <p style={styles.header}>Sign In</p>
                <input 
                    style={styles.input}
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder={"email"}
                />
                <input
                    style={styles.input}
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder={"password"}
                />
                <button onClick={this.handleSubmit} style={styles.button}>
                    <p>submit</p>
                </button>
            </form>   
        )    
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(login())
    }
}

export default connect(null, mapDispatchToProps)(Login)