import React from 'react'
import { connect } from 'react-redux'

const Transactions = props => {

    const styles = {
        container: {
            marginTop: "10px",
            width: "100%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
        },
        transaction: {
            padding: "15px",
            borderTop: "1px solid black",
            display: "flex",
            width: "100%",
            margin: "auto",
            marginTop: "6px",
            justifyContent: "space-around",
        },
        header: {
            fontSize: "28px",
        },
        transactionsContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "80%"
        }
    }
    return (
        <div style={styles.container}>
            <p style={styles.header}>Transactions</p>
            <div style={styles.transactionsContainer}>
                {props.transactions && props.transactions.map(transaction => 
                (<div key={transaction.id} style={styles.transaction}>
                    <p>{transaction.code}</p>
                    <p>{transaction.quantity} shares</p>
                    <p>${transaction.totalPrice ? Number(transaction.totalPrice).toFixed(2) : null}</p>
                </div>)
            )}
            </div>
        </div>
    )    
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, null)(Transactions)