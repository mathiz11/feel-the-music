import React, {createContext, useContext, useReducer} from "react"

export const initialState = {
    token: undefined
}

export const ACTIONS = {
    SET_TOKEN: 'set_token'
}

const StoreContext = createContext()

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_TOKEN:
            return {
                token: action.payload.token
            }
        default:
            return state
    }
}

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext)