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
            latestPricesAndColors: [],
            portfolioBalance: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.buyStock = this.buyStock.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.calculateRealtimeInfo = this.calculateRealtimeInfo.bind(this)
    }

    componentDidMount() {
        this.mounted = true

        // set short timeout to get real time data right away
        setTimeout(() => {
            if (!this.mounted) return
            this.calculateRealtimeInfo()
        }, 500)

        // set interval to continue to update data on interval until component is unmounted
        // we need a long interval due to limited api calls with current free plan
        setInterval(() => {
            if (!this.mounted) return
            this.calculateRealtimeInfo()
        }, 60000)
    }

    componentWillUnmount() {
        this.mounted = false
    }

    calculateRealtimeInfo() {

        // if component is unmounted or portfolio is not yet recieved, exit
        if (!this.props.portfolio) return

        // recalculate portfolio balance
        let portfolioBalance = 0

        // get portfolio and last updated latestPricesAndColors array
        const {portfolio} = this.props

        // loop through previously updated latestPricesAndColors
        const latestPricesAndColors = this.state.latestPricesAndColors.slice()

        // for each, get newly updates info
        portfolio.forEach((item, i)=> {
            axios.get(`https://cloud.iexapis.com/stable/stock/${item.code}/quote?token=${token}`)
            .then(stockInfo => {

                // update portfolio balance 
                portfolioBalance += stockInfo.data.latestPrice * item.quantity
                console.log('p in loop', portfolioBalance)

                const miniArray = []

                // calculate real time price
                miniArray[0] = (stockInfo.data.latestPrice * item.quantity).toFixed(2)

                // calculate background color
                const last = stockInfo.data.previousClose
                const curr = stockInfo.data.latestPrice
                if (last < curr) miniArray[1] = 'rgba(0,255,0,0.3)'
                else if (last > curr) miniArray[1] = 'rgba(255,0,0,0.6)'
                else miniArray[1] = 'rgba(192,192,192,0.4)'

                latestPricesAndColors[i] = miniArray
            })
            .then(() => {
                this.setState({latestPricesAndColors, portfolioBalance: `$${portfolioBalance.toFixed(2)}`})
            })
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }  
    
    // handle buy stock button
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
            // get data
            const {data} = await axios.get(`https://cloud.iexapis.com/stable/stock/${this.state.code}/quote?token=${token}`)
            const totalPrice = data.latestPrice * this.state.quantity

            // check if user can afford to buy
            if (totalPrice > this.props.cashBalance) {
                alert('you do not have enough cash to buy')
            }

            // complete purachase
            else this.props.buy({
                code: data.symbol,
                quantity: this.state.quantity,
                totalPrice,
            })

            // update real time info
            setTimeout(() => {
                this.calculateRealtimeInfo()
            }, 100)
        }
        catch(err) {
            alert('invalid ticker code')
        }
    }

    render(){
        const styles = {
            container: {
                marginTop: "10px",
                display: "flex",
                margin: "auto",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center"
            },
            stock: {
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-around",
            },
            header: {
                fontSize: "28px",
            },
            transactionsContainer: {
                display: "flex",
                flexDirection: "column",
                width: "80%",
            },
            box: {
                margin: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                width: "300px",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
                border: "1px black solid"
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
            link: {
                color: "black",
                padding: "10px",
                textDecoration: "none",
                fontSize: "12px",
            },
            stockContainer: {
                marginTop: "6px",
                padding: "15px"
            }
        }
        return (
            <div style={styles.container}>
                <p style={styles.header}>Portfolio {this.state.portfolioBalance || null}</p>
                <form onSubmit={this.handleSubmit} name={name} style={styles.box}>
                    <p style={styles.header}>Cash - ${Number(this.props.cashBalance).toFixed(2)}</p>
                    <input
                        style={styles.input}
                        name="code"
                        type="text"
                        value={this.state.code}
                        onChange={this.handleChange}
                        placeholder={"code"}
                    />
                    <input
                        style={styles.input}
                        name="quantity"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder={"quantity"}
                    />
                    <button onClick={this.handleSubmit} style={styles.button}>
                        <p>buy</p>
                    </button>
                    <a style={styles.link} href="https://iexcloud.io" target="_blank">Data provided by IEX Cloud</a>
                </form> 
                <div style={styles.transactionsContainer}>
                    {this.props.portfolio && this.props.portfolio.map((item, i) =>
                        (<div key={item.code} style={styles.stockContainer}>
                            <div style={{backgroundColor: this.state.latestPricesAndColors[i] && this.state.latestPricesAndColors[i][1]}}>
                                <div style={styles.stock}>
                                    <p>{item.code}</p>
                                    <p>{item.quantity}</p>
                                    <p>{this.state.latestPricesAndColors[i] ? `$${this.state.latestPricesAndColors[i][0]}` : 'loading'}</p>
                                </div>
                            </div>
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
        portfolio: state.portfolio,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buy: (stockInfo) => dispatch(buy(stockInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
