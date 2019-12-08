function Reducer(state={item:[]},action){
    let NewItem=[];
    let StateItem=state.item;
    // console.log(state.item)

    switch(action.type){

            case "InitToDo":
    
                return {...state,item:action.payload}


        case "RefreshToDo":
    
            return {...state,item:action.payload}

                default : return state;
    }
}
export default Reducer;