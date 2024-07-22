import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { BE_URL } from "../../../utils/Url_request";
import NavbarAdmin from "./NavbarAdmin";
import listaccount from "./css/ListAccount.css";
import axios from "axios";

const ListAccount = () => {
  const [listaccount, setListAcoount] = useState([]);
  const fileInputRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  //lấy danh sách report of class id
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
  // upload file
  // upload file
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
        // Load lại trang sau khi thêm thành công
        window.location.reload(false);
      } catch (error) {
        window.alert("File uploaded fail!");
      }
    } else {
      console.error("No file selected or class not selected");
      window.alert("No file selected or class not selected!");
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
                  <th scope="col">Họ tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listaccount.map((account, index) => (
                  <tr key={account.userId}>
                    <th scope="row">{index + 1}</th>
                    <td>{account.fullName}</td>
                    <td>{account.email}</td>
                    <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        className="btn btn-warning me-md-2 w-100 w-md-auto"
                        type="button"
                      >
                        EDIT
                      </button>
                      <button
                        className="btn btn-danger w-100 w-md-auto"
                        type="button"
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
