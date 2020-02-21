import React from 'react'
import { connect } from 'react-redux'

const Transactions = props => {

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
            {props.transactions && props.transactions.map(transaction => 
                (<div key={transaction.id} style={styles.transaction}>
                    <p>{transaction.code}</p>
                    <p>{transaction.quantity} shares</p>
                    <p>${transaction.totalPrice ? Number(transaction.totalPrice).toFixed(2) : null}</p>
                </div>)
            )}
        </div>
    )    
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, null)(Transactions)