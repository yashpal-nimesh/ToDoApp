function Reducer(state = { item: [] }, action) {


    switch (action.type) {

        case "InitToDo":

            return { ...state, item: action.payload }


        case "RefreshToDo":

            return { ...state, item: action.payload }

        default: return state;
    }
}
export default Reducer;