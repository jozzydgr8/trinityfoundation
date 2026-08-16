import { createContext, useReducer } from "react";
import { adminType, Blog, donorType, formType, subscribeType } from "../Types/Types";
export type valueProps =  stateProps & {dispatch: React.Dispatch<actionProps>};
type contextProps = {
    children:React.ReactNode
}
export type stateProps = {
    blog:Blog[] | null,
    loading:boolean,
    donors: donorType[] | null,
    subscribers:subscribeType[] | null,
    adminUsers: adminType[] | null,
    volunteers: formType[] | null,
}
type actionProps = blogAction | loadAction | donorAction | subscribeAction | adminAction | volunteeraction;

type blogAction = {
    payload:Blog[] ,
    type:'getBlogs' 
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
type volunteeraction = {
    payload:formType[],
    type:'getVolunteer'
}
const initialState = {
    blog:null,
    loading:false,
    donors:null,
    subscribers:null,
    adminUsers:null,
    volunteers:null
}
export const Context = createContext({}as valueProps)
const reducer = (state:stateProps, action:actionProps) =>{
    switch(action.type){
        case'getBlogs':
        return {...state, blog:action.payload}
        case'loading':
        return {...state, loading:action.payload}
        case'getDonors':
        return {...state, donors:action.payload}
        case'getSubscribers':
        return {...state, subscribers:action.payload}
        case 'getAdminUsers':
            return {...state, adminUsers:action.payload}
        case 'getVolunteer':
            return {...state, volunteers:action.payload}
        default : return state
    }
}
export const DataContext = ({children}:contextProps)=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{...state, dispatch}}>
        {children}
    </Context.Provider>
}