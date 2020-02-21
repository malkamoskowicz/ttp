import React from 'react'
import axios from 'axios'

export default class Rransactions extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            transactions: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async componentDidMount() {
        const {data} = await axios.get('/api/transactions')
        this.setState({
            transactions: data
        })
    }

    render(){
        const styles = {
            container: {
                marginTop: "10px",
                width: "90%",
                margin: "auto"
            },
            transaction: {
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
            <div>
                <h1 style={styles.container}>Transactions</h1>
                {this.state.transactions.map(transaction => 
                    (<div key={transaction.id} style={styles.transaction}>
                        <p>{transaction.code}</p>
                        <p>{transaction.quantity} shares</p>
                        <p>${transaction.totalPrice}</p>
                    </div>)
                )}
            </div>
        )    
    }

}