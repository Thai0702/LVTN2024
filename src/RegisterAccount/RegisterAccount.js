import React, { useState } from "react";
import "./RegisterAccount.css";

const initFormValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};
const isEmptyValue =(value)=>{
    return !value || value.trim().lenght <1;
};
const isEmailValue=(email)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export default function RegisterPage() {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormerror] = useState({});
    //luu tru loi kiem tra form rong
    const validateForm = () => {
        const error = {};
        if (isEmptyValue(formValue.firstName)) {
            error["firstName"] = "First Name Is Required";
        }
        if (isEmptyValue(formValue.lastName)) {
            error["lastName"] = "Last Name Is Required";
        }
        if (isEmptyValue(formValue.email)) {
            error["email"] = "Email Is Required";
        }
        else{
            if(!isEmailValue(formValue.email)){
                error["email"]="Email is invalid"
            }
        }
        if (isEmptyValue(formValue.password)) {
            error["password"] = "Password Is Required";
        }
        if (isEmptyValue(formValue.confirmPassword)) {
            error["confirmPassword"] = "Confirm Password Is Required";
        }
        else{
            if(formValue.confirmPassword !== formValue.password){
                error["confirmPassword"] ="Confirm password not match";
            }
        }
        setFormerror(error);
        return Object.keys(error).length ===0;
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };
    const handleSubmit = (event) => {

        event.preventDefault();
        if (validateForm()) {
            console.log("form value", formValue);
        } else {
            console.log("form invalid");
        }
    };
    console.log(formError);
    return (
        <div className="register-page">
            <div className="register-form-container">
                <h1 className="title">Register account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="first-name" className="form-lable">
                            First name
                        </label>
                        <input
                            id="first-name"
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={formValue.firstName}
                            onChange={handleChange}
                        />
                        {formError.firstName &&(
                            <div className="error-feelback">{formError.firstName}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="last-name" className="form-lable">
                            Last name
                        </label>
                        <input
                            id="last-name"
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={formValue.lastName}
                            onChange={handleChange}
                        />
                         {formError.lastName &&(
                            <div className="error-feelback">{formError.lastName}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-lable">
                            Email
                        </label>
                        <input
                            id="email"
                            className="form-control"
                            type="text"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                         {formError.email &&(
                            <div className="error-feelback">{formError.email}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-lable">
                            Password
                        </label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"
                            value={formValue.password}
                            onChange={handleChange}
                        />
                         {formError.password &&(
                            <div className="error-feelback">{formError.password}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirm-password" className="form-lable">
                            Confirm password
                        </label>
                        <input
                            id="confirm-password"
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            value={formValue.confirmPassword}
                            onChange={handleChange}
                        />
                         {formError.confirmPassword &&(
                            <div className="error-feelback">{formError.confirmPassword}</div>
                        )}
                    </div>
                    <button type="submit" className="submit-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
