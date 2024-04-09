import React, { useState, useEffect } from 'react';
import "./RegisterAccount.css"

function RegisterAccount() {
  const [user_id, setUserId] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_type, setUserType] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('http://localhost:3000/accounts');
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
      } else {
        console.error('Error fetching accounts: ', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching accounts: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id,
          user_password,
          user_email,
          user_type,
          phone_number,
          full_name,
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // After successful registration, update the accounts list
        fetchAccounts();
      } else {
        console.error('Error registering user: ', await response.text());
      }
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };

  const isEmptyValue = (value) => {
    return !value || value.trim().length === 0;
  };

  const isEmailValue = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const validateForm = () => {
    const error = {};
    if (isEmptyValue(user_type)) {
      error["userType"] = "User type Is Required";
    }
    if (isEmptyValue(user_password)) {
      error["password"] = "Password Is Required";
    }
    if (isEmptyValue(confirm_password)) {
      error["confirmPassword"] = "Confirm Password Is Required";
    } else if (confirm_password !== user_password) {
      error["confirmPassword"] = "Passwords do not match";
    }
    if (isEmptyValue(user_email)) {
      error["userEmail"] = "Email Is Required";
    } else if (!isEmailValue(user_email)) {
      error["userEmail"] = "Email is invalid";
    }
    if (isEmptyValue(phone_number)) {
      error["phoneNumber"] = "Phone Is Required";
    }
    if (isEmptyValue(full_name)) {
      error["fullName"] = "Full Name Is Required";
    }
    setFormError(error);
    return Object.keys(error).length === 0;
  }
  const handleDeleteAccount = async (accountId) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/${accountId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Account deleted successfully');
        // Sau khi xóa tài khoản thành công, cập nhật danh sách tài khoản
        fetchAccounts();
      } else {
        console.error('Error deleting account: ', await response.text());
      }
    } catch (error) {
      console.error('Error deleting account: ', error);
    }
  };
  
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src="https://i.pinimg.com/236x/f7/be/c8/f7bec8acbe58578f6f7f65423c777a13.jpg" alt="Your Logo" />
          </div>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div className="register-page">
        <div className="register-form-container">
          <h1 className="title">Register account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="user_type" className="form-label">
                User Type
              </label>
              <input type="text" id="user_type" placeholder="User Type" value={user_type} onChange={(e) => setUserType(e.target.value)} />
              {formError.userType && <p className="error-message">{formError.userType}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="user_email" className="form-label">
                Email
              </label>
              <input type="email" id="user_email" placeholder="Email" value={user_email} onChange={(e) => setUserEmail(e.target.value)} />
              {formError.userEmail && <p className="error-message">{formError.userEmail}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="user_password" className="form-label">
                Password
              </label>
              <input type="password" id="user_password" placeholder="Password" value={user_password} onChange={(e) => setUserPassword(e.target.value)} />
              {formError.password && <p className="error-message">{formError.password}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <input type="password" id="confirm_password" placeholder="Confirm Password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
              {formError.confirmPassword && <p className="error-message">{formError.confirmPassword}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phone_number" className="form-label">
                Phone
              </label>
              <input type="text" id="phone_number" placeholder="Phone Number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
              {formError.phoneNumber && <p className="error-message">{formError.phoneNumber}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="full_name" className="form-label">
                Full name
              </label>
              <input type="text" id="full_name" placeholder="Full Name" value={full_name} onChange={(e) => setFullName(e.target.value)} />
              {formError.fullName && <p className="error-message">{formError.fullName}</p>}
            </div>

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
          <h2>List of Accounts</h2>
          <ul>
            {accounts.map((account, index) => (
              <li key={index}>
                {account.user_email} - {account.full_name}
                <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RegisterAccount;
