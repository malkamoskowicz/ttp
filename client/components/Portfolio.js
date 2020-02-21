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
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async componentDidMount() {
        const portfolio = await axios.get('/api/portfolio')
        console.log('port', portfolio)
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
            console.log('data', data)
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
                    <p>buy</p>
                </button>
                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
            </form>   
        )    
    }
}

const mapStateToProps = state => {
    return {
        cashBalance: state.cashBalance
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buy: (stockInfo) => dispatch(buy(stockInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
