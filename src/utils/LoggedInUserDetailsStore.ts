import { LoggedInUserDetails, UserRole } from "../Interfaces/LoggedInUserDetails";

export function storeLoggedInUserDetails(userDetails:any){

    localStorage.setItem('firstName',userDetails.firstName);
    localStorage.setItem('lastName',userDetails.lastName);
    localStorage.setItem('username',userDetails.username);
    localStorage.setItem('role',userDetails.role);

}

export function getLoggedInUserDetails():LoggedInUserDetails{

    return {
        firstName : localStorage.getItem('firstName'),
        lastName : localStorage.getItem('lastName'),
        username : localStorage.getItem('username'),
        role : localStorage.getItem('role')?.toLowerCase() == 'manager'? UserRole.Manager: UserRole.Employee,
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