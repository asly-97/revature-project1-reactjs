import path from "path";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/GuestPages/LoginPage/LoginPage";
import { SignupPage } from "../pages/GuestPages/SignupPage/SignupPage";
import { EmployeeHomePage } from "../pages/EmployeePages/EmployeeHomePage";
import { ReimbursementPage } from "../pages/ManagerPages/ReimbursementPage/ReimbursementPage";
import { UsersPage } from "../pages/ManagerPages/UsersPage/UsersPage";
import UpdateUserInfoPage from "../pages/EmployeePages/UpdateUserInfoPage";


export const MainRouter = createBrowserRouter([

    {
        path: '/',
        element: <App/>,
        children: [
            { path: 'login', element: <LoginPage/> },
            { path: 'signup', element: <SignupPage/> },
            { path: 'employee/home', element: <EmployeeHomePage/> },
            { path: 'account/update_profile', element: <UpdateUserInfoPage/> },
            { path: 'manager/reimbursement', element: <ReimbursementPage/> },
            { path: 'manager/users', element: <UsersPage/> },
        ]
    }

]);