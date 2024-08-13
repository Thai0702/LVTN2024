import React, { useEffect, useRef, useState } from 'react'
import NavbarAdmin from './NavbarAdmin'
import { BE_URL } from '../../utils/Url_request';
import axios from 'axios';

const AccountSV = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listaccount, setListAcoount] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/api-admin/account/sv`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            search: searchTerm 
          }
        });
        setListAcoount(response.data);
      } catch (error) {
        console.error("Error fetching account list:", error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleFileUpload = async () => {
    const token = localStorage.getItem("token");
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post(`${BE_URL}/api-admin/account/gv/excel`, formData, {
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

  return (

    <div>
      <NavbarAdmin />
      <div className="container-admin-account">
        <div className="row">
          <div className="col-12">
            <p className="listaccount">Danh sách tài khoản Sinh viên</p>
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
          <div className="col-12 col-md-2">
            <input
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-responsive mt-5 table-bordered custom-table">
            {listaccount.length > 0 ? ( 
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col-3">Họ tên</th>
                  <th scope="col">Email</th>

                  <th scope="col-4">Hành động</th>
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
            ) : (
              <div className="col-12">
                <h3 className="text-center mt-5">Không có tài khoản này</h3>
              </div>
            )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSV