import { createContext, useReducer } from "react";
import { adminType, contextType, donorType, subscribeType } from "../Types/Types";
export type valueProps =  stateProps & {dispatch: React.Dispatch<actionProps>};
type contextProps = {
    children:React.ReactNode
}
export type stateProps = {
    data:contextType[] | null,
    loading:boolean,
    donors: donorType[] | null,
    subscribers:subscribeType[] | null,
    adminUsers: adminType[] | null,
}
type actionProps = dataAction | loadAction | donorAction | subscribeAction | adminAction;

type dataAction = {
    payload:contextType[] ,
    type:'getData' 
}
type adminAction = {
    payload:adminType[],
    type:'getAdminUsers'
}
type donorAction = {
    payload:donorType[],
    type:'getDonors'
}
type subscribeAction = {
    payload:subscribeType[],
    type:'getSubscribers'
}
type loadAction = { 
    payload: boolean,
    type:'loading'
}
const initialState = {
    data:null,
    loading:false,
    donors:null,
    subscribers:null,
    adminUsers:null,
}
export const Context = createContext({}as valueProps)
const reducer = (state:stateProps, action:actionProps) =>{
    switch(action.type){
        case'getData':
        return {...state, data:action.payload}
        case'loading':
        return {...state, loading:action.payload}
        case'getDonors':
        return {...state, donors:action.payload}
        case'getSubscribers':
        return {...state, subscribers:action.payload}
        case 'getAdminUsers':
            return {...state, adminUsers:action.payload}
        default : return state
    }
}
export const DataContext = ({children}:contextProps)=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{...state, dispatch}}>
        {children}
    </Context.Provider>
}