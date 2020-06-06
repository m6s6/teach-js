import * as React from 'react';
import User from './User';


const UserList = props=>{
    const{users}=props;
    return(
        <div>
            {users.map(userItem=><User key={userItem.name}{...userItem}/>)}
        </div>
    )
}

export default UserList;