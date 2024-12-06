const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposite":
            return { ...state, balance: state.balance + action.payload }

        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }

        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.loanPurpose
            }

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        default:
            return state;
    }

}


export function deposite(amount, currency) {
    if (currency === "USD") return {
        type: "account/deposite",
        payload: amount
    }
    return async function (dispatch, getState) {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await response.json()
        const converted = data.rates.USD;
        dispatch({
            type: "account/deposite",
            payload: converted
        })
    }
}

// store.dispatch(deposite(1000))
// console.log(store.getState());


export function withdraw(amount) {
    return {
        type: "account/withdraw",
        payload: amount
    }
}
// store.dispatch(withdraw(1000))
// console.log(store.getState());

export function requestLoan(amount, loanPurpose) {
    return {
        type: "account/requestLoan",
        payload: {
            amount,
            loanPurpose
        }
    }
}
// store.dispatch(requestLoan(1000, "Buy car!"))
// console.log(store.getState());

export function payLoan() {
    return {
        type: "account/payLoan"
    }
}

// store.dispatch(payLoan())
// console.log(store.getState());

