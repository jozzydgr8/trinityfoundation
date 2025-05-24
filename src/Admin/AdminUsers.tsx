import { UseDataContext } from "../Context/UseDataContext"

export const AdminUsers = ()=>{
    const {adminUsers} = UseDataContext();
    return(
        <section>
            <div className="container-fluid">
                {adminUsers?.map(admin=>(
                    <div key={admin.id}>{admin.email}</div>
                ))}
            </div>
        </section>
    )
}