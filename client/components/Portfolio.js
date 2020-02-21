import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {token} from '../../secrets'
import {buy} from '../reducers'

class Portfolio extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            quantity: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.buyStock = this.buyStock.bind(this)
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
        else if (isNaN(quantity)) {
            alert("quantity must be a number")
        }
        else if (quantity % 1 != 0) {
            alert("quantity must be a whole number")
        }

        // if all fields are valid, continue to attempt to buy stock
        else this.buyStock()
    }

    async buyStock() {
        try {
            const {data} = await axios.get(`https://cloud.iexapis.com/stable/stock/${this.state.code}/quote?token=${token}`, )
            const totalPrice = data.latestPrice * this.state.quantity
            if (totalPrice > this.props.cashBalance) {
                alert('you do not have enough cash to buy')
            }
            else this.props.buy({
                code: data.symbol,
                quantity: this.state.quantity,
                totalPrice,
            })
        }
        catch(err) {
            alert('invalid ticker code')
        }
    }

    render(){
        const styles = {
            box: {
                margin: "auto",
                width: "300px",
                padding: "20px",
                borderColor: "black",
                borderStyle: "solid",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px"
            },
            container: {
                display: "flex",
                flexDirection: "column"
            },
            stock: {
                padding: "20px",
                borderColor: "black",
                borderStyle: "solid",
                display: "flex",
                width: "90%",
                margin: "auto",
                marginTop: "10px",
                justifyContent: "space-around"
            }
        }
        return (
            <div style={styles.container}>
                <h1>Portfolio</h1>
                <form onSubmit={this.handleSubmit} name={name} style={styles.box}>
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
                        <p>buy</p>
                    </button>
                    <a href="https://iexcloud.io" target="_blank">Data provided by IEX Cloud</a>
                </form> 
                <div>
                    {this.props.portfolio && this.props.portfolio.map(item =>
                        (<div key={item.code} style={styles.stock}>
                            <p>code {item.code}</p>
                            <p>quanity{item.quantity}</p>
                        </div>)
                    )}
                </div>
            </div>
        )    
    }
}

const mapStateToProps = state => {
    return {
        cashBalance: state.cashBalance,
        portfolio: state.portfolio
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buy: (stockInfo) => dispatch(buy(stockInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
