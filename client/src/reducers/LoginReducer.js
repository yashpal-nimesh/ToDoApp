function Reducer(state = { loggedIn: localStorage.getItem('user') }, action) {

    switch (action.type) {

        case "LoginAction":
            return { ...state, loggedIn: localStorage.getItem('user') }

        case "LogOutAction":
            return { ...state, loggedIn: null }

        default: return state;
    }
}
export default Reducer;