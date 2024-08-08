import { LoggedInUserDetails, UserRole } from "../Interfaces/LoggedInUserDetails";

export function storeLoggedInUserDetails(userDetails:any){

    localStorage.setItem('firstName',userDetails.firstName);
    localStorage.setItem('lastName',userDetails.lastName);
    localStorage.setItem('username',userDetails.username);
    localStorage.setItem('role',userDetails.role);

}

export function getLoggedInUserDetails():LoggedInUserDetails{

    let user_role = undefined;
    let stored_role = localStorage.getItem('role');
    if(stored_role){
        if(stored_role.toLowerCase() == 'manager')
            user_role = UserRole.Manager;
        else
            user_role = UserRole.Employee;

    }
    return {
        firstName : localStorage.getItem('firstName'),
        lastName : localStorage.getItem('lastName'),
        username : localStorage.getItem('username'),
        role : user_role,
        token : localStorage.getItem('token'),
    }
}

export function isUserLoggedIn():boolean{

    const userDetails:LoggedInUserDetails = getLoggedInUserDetails();

    if(
        userDetails.firstName != null
        && userDetails.lastName != null
        && userDetails.username != null
        && userDetails.token != null
    ){
        return true;
    }

    return false;
}