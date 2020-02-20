import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Portfolio extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            quantity: '',
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
        const {quantity, code} = this.state
        if (!quantity.length || !code.length) {
            alert("please enter both fields")
            return
        }
        if (isNaN(quantity)) {
            alert("quantity must be a number")
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
                <h1>Cash - {this.props.cashBalance}</h1>
                <input
                    name="code"
                    type="text"
                    value={this.state.code}
                    onChange={this.handleChange}
                    placeholder={"code"}
                />
                <input
                    name="quantity"
                    type="text"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder={"quantity"}
                />
                <button onClick={this.handleSubmit}>
                    <p>submit</p>
                </button>
            </form>   
        )    
    }
}

const mapStateToProps = state => {
    return {
        cashBalance: state.cashBalance
    }
}

export default connect(mapStateToProps, null)(Portfolio)
