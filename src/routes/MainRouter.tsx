import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/GuestPages/LoginPage/LoginPage";
import { SignupPage } from "../pages/GuestPages/SignupPage/SignupPage";
import { EmployeeHomePage } from "../pages/EmployeePages/EmployeeHomePage";
import { ReimbursementPage } from "../pages/ManagerPages/ReimbursementPage/ReimbursementPage";
import { UsersPage } from "../pages/ManagerPages/UsersPage/UsersPage";
import UpdateUserInfoForm from "../components/User/UpdateUserInfoForm";


export const MainRouter = createBrowserRouter([

    {
        path: '/',
        element: <App/>,
        children: [
            { path: 'login', element: <LoginPage/> },
            { path: 'signup', element: <SignupPage/> },
            { path: 'employee/home', element: <EmployeeHomePage/> },
            { path: 'account/update_profile', element: <UpdateUserInfoForm/> },
            { path: 'manager/reimbursement', element: <ReimbursementPage/> },
            { path: 'manager/users', element: <UsersPage/> },
        ]
    }

]);