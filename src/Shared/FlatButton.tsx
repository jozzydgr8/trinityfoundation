import { JSX } from "react"

type props = {
    title?:string,
    onClick?:()=>void,
    className?:string,
    disabled?: boolean,
    children?: JSX.Element,
     icon?: JSX.Element,
      iconTwo?: JSX.Element,
}
export const FlatButton = ({title, onClick, className, disabled, children, icon, iconTwo}:props)=>{
    return(
        <button className={`btn btn-lg  ${className}`} onClick={onClick} disabled={disabled} >{iconTwo} {title} {children} {icon}</button>
    )
}