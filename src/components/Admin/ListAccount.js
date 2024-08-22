import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { BE_URL } from "../../utils/Url_request";
import NavbarAdmin from "./NavbarAdmin";
import listaccount from "./css/ListAccount.css";
import axios from "axios";

const ListAccount = () => {
  const [listaccount, setListAcoount] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAccounttList = async () => {
      try {
        const response = await fetch(`${BE_URL}/api-admin/account`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setListAcoount(data);
      } catch (error) {
        console.error("Error fetching account list:", error);
      }
    };
    fetchAccounttList();
  });

  const handleFileUpload = async () => {
    const token = localStorage.getItem("token");
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post(`${BE_URL}/api-admin/class/excel`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        window.alert("File uploaded successfully!");

        window.location.reload(false);
      } catch (error) {
        window.alert("File uploaded fail!");
      }
    } else {
      console.error("No file selected or class not selected");
      window.alert("No file selected or class not selected!");
    }
  };

  const handleDeleteAccount = async (userId) => {
    if (!userId) {
      console.error("request ID is missing or undefined");
      window.alert("request ID is missing or undefined");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      window.alert("No token found");
      return;
    }

    const confirmed = window.confirm("Bạn có chắc muốn xóa tài khoản này không?");
    if (!confirmed) {

      return;
    }

    try {
      const responseDelete = await fetch(
        
        `${BE_URL}/api-admin/account/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (responseDelete.ok) {

        setListAcoount((prevListReport) =>
          prevListReport.filter((account) => account.userId !== userId)
        );
        window.alert("Xóa tài khoản thành công.");
        window.location.reload(true);
 
      } else {
        const errorData = await responseDelete.json();
        console.error(
          "Lỗi khi xóa tài khoản:",
          errorData.message || responseDelete.statusText
        );
        window.alert(
          "Xảy ra lỗi khi xóa tài khoản: " +
            (errorData.message || responseDelete.statusText)
        );
      }
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản:", error);
      window.alert("Xảy ra lỗi khi xóa tài khoản");
    }
  };

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    password: "",
    email: "",
    type: "",
    phoneNumber: "",
    fullName: "",
  });
  const handleUpdate = (classItem) => {
    setUpdateData(classItem);
    setShowUpdateForm(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await fetch(
        `${BE_URL}/api-admin/account/update/${updateData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(updateData),
        }
      );
      if (response.ok) {

        window.alert("Sửa tài khoản thành công!")
        setShowUpdateForm(false);
        

      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };


  return (
    <div>
      <NavbarAdmin />
      <div className="container-admin-account">
        <div className="row">
          <div className="col-12">
            <p className="listaccount">List Account</p>
          </div>
          <div className="col-12 col-md-4">
            <input type="file" ref={fileInputRef} className="form-control" />
          </div>
          <div className="col-12 col-md-2">
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2 mt-md-0"
              onClick={handleFileUpload}
            >
              Add
            </button>
          </div>
          <div className="table-responsive mt-5 table-bordered custom-table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col-3">Họ tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Type</th>

                  <th scope="col-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listaccount.map((account, index) => (
                  <tr key={account.userId}>
                    <th scope="row">{index + 1}</th>
                    <td>{account.fullName}</td>
                    <td>{account.email}</td>
                    <td>{account.type}</td>

                    <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        className="btn btn-warning me-md-2 w-100 w-md-auto"
                        type="button"
                        onClick={() => handleUpdate(account)}
                      >
                        EDIT
                      </button>
                      {showUpdateForm &&
                            updateData.userId === account.userId && (
                              <div className="update-form-project mt-2">
                                <form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <label htmlFor="email">
                                      Email:{" "}
                                    </label>
                                    <input
                                      id="email"
                                      type="text"
                                      name="email"
                                      value={updateData.email}
                                      onChange={handleInputChange}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="type">
                                      Loại:{" "}
                                    </label>
                                    <input
                                      id="type"
                                      type="text"
                                      name="type"
                                      value={updateData.type}
                                      onChange={handleInputChange}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="phoneNumber">
                                      Số điện thoại:{" "}
                                    </label>
                                    <input
                                      id="phoneNumber"
                                      type="text"
                                      name="phoneNumber"
                                      value={updateData.phoneNumber}
                                      onChange={handleInputChange}
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="fullName">
                                      Họ và tên:{" "}
                                    </label>
                                    <input
                                      id="fullName"
                                      type="text"
                                      name="fullName"
                                      value={updateData.fullName}
                                      onChange={handleInputChange}
                                      className="form-control"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                    
                                  >
                                    Lưu
                                  </button>
                                </form>
                              </div>
                            )}
                      <button
                        className="btn btn-danger w-100 w-md-auto"
                        type="button"
                        onClick={() => handleDeleteAccount(account.userId)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAccount;
