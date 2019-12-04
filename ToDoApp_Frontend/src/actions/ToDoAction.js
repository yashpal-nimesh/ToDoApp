
export function InitToDo(item){
    return{
type:"InitToDo",
payload : item
}}


export function RefreshToDo(x){
    return{
type:"RefreshToDo",
payload :x
}}