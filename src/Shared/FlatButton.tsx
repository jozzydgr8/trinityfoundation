type props = {
    title:string,
    onClick:()=>void,
    className?:string
}
export const FlatButton = ({title, onClick, className}:props)=>{
    return(
        <button className={`btn btn-lg  ${className}`} onClick={onClick}>{title}</button>
    )
}