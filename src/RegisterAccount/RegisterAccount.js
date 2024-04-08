import React from "react";
import "./RegisterAccount.css"
export default function RegisterPage() {
    return (
        <div className="register-page">
            <div className="register-form-container">
                <h1 className="title">Register account

                </h1>
                <form>
                    <div>
                        <label htmlFor="first-name" className="form-lable">
                            Frist name
                        </label>
                        <input 
                        id="first-name"
                        className="form-control"
                        type="text"
                        name="firstName">
                        </input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="last-name" className="form-lable">
                            Last name
                        </label>
                        <input 
                        id="last-name"
                        className="form-control"
                        type="text"
                        name="LastName">
                        </input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-lable">
                            Email
                        </label>
                        <input 
                        id="email"
                        className="form-control"
                        type="text"
                        name="email">
                        </input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-lable">
                            Password
                        </label>
                        <input 
                        id="password"
                        className="form-control"
                        type="password"
                        name="password">
                        </input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirm-password" className="form-lable">
                            Confirm password
                        </label>
                        <input 
                        id="confirm-password"
                        className="form-control"
                        type="password"
                        name="confirmPassword">
                        </input>
                    </div>
                    <button type="submit" className="submit-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );


}