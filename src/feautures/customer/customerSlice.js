const initialCustomerState = {
    fullName: "",
    initialId: "",
    createdAt: ""
}

export default function customerReducer(state = initialCustomerState, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                initialId: action.payload.initialId,
                createdAt: new Date().toISOString()
            }

        case "customer/updateCustomer":
            return { ...state, fullName: action.payload }

        default:
            return state;
    }

}

export function createCustomer(fullName, initialId) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            initialId,
        }
    }
}
// store.dispatch(createCustomer("Shreyas", "id1"))

export function updateCustomer(updatedFullName) {
    return {
        type: "customer/updateCustomer",
        payload: updatedFullName
    }
}

// store.dispatch(updateCustomer("Sandesh"))

// console.log(store.getState());
