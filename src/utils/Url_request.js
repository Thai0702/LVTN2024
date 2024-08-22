// const BE_URL = "https://luanvan-1.onrender.com";
// const BE_URL = "https://luanvan-2.onrender.com"
const BE_URL = "http://localhost:8080";
// "http://localhost:8080/api";
// "https://luanvan.onrender.com/api"
// Module Account
const UserDetail = "/api-gv/account/token-detail";
const Get_Account = "/api-gv/account";
const Get_userId = "/class/api-gv/class/createdBy";//+ ${userId}"
const Get_Info_Account_student = "/api/account/student-detail"; // + ${accountId}"
const Get_Info_Account = "/api/account/token-detail"
const Get_list_Student_class = "/api/class/student-list";  // + {classId}"
const Upload_File = "/class/excel"; //+ {classId}"

// Admin
const Get_list_acount = "/api-admin/account";
const Delete_account = "/api-admin/account/delete"; // + {id}
const Update_account = "/api-admin/account/update"; // + {id}



//Module Class 
const Create_class = "/api-gv/class";
const Get_class = "/api-gv/class";
const Show_detail_class = "/api-gv/class/get"; //+ ${classId}"
const Delete_class = "/api-gv/class/delete"; // + {classId}"
const update_class = "/api-gv/classupdate";  // + {classId}"
const Get_class_CreateBy = "/api-gv/classcreatedBy"; // + {userId}"
const Get_class_Student_id = "/api-gv/classstudentId"; // + {studentId}"
const Show_list_student = "/api-gv/class"; // + ${classId}/student-list"




// Module Group
const Post_group = "/class/create-a-group"; // tao group
const Add_member_group = "/api/class/group/add-member"; //+ ${classId}/{groupId}/{accountId}   them 1 thanh vien vao group
const Get_ListClass_Joined = "/api/api-gv/user/joined-class";  // + {userId}"
const Delete_Student = "/api-gv/class/delete/student-list";  // + {classId}/{studentId}"
const Show_list_group_class = "/class"; //+ ${classId}/group-list"
const Delete_group = "/api/group"; //+ {groupId}" // xoa and sua 
const Join_group = "/api/class/group/join-group"; // +{classId}/{groupId}"
const Get_list_Student_Group = "/api/class/student-group-sorted"; // + /{classId}
const Join_class = "/api/join-class/form" // sinh vien tham gia lop bang ma lop

//Module project
const Create_project = "/api-gv/project/create-project"  // tao project 
const Show_project_group = "/group"; //+ ${groupId}/projects"
const Delete_project = "/api-gv/project/delete-project"; // +{id}
const Create_Project_log = "/api-gv/project/project-log"; // + {id} id cua project
const Get_all_projectLog = "/api-gv/project/project-log"  //+ {projectId}"
const Get_all_project_GroupId = "/api-gv/group/projects";  // + {id}"  id cua group 
const Get_project_Group = "/api-gv/project";  //+ {projectId}"
const Get_all_proJect = "/api-test/get-all-projects";

//Module request report and report submit
const Post_request_report = "/report-request";
const Get_report = "/report-request";// +${classId}
const Create_report = "/api-gv/report-request";
const Delete_report = "/api-gv/report-request/delete"; //+ {requestId}"
const Update_report = "/api-gv/report-request/update"; // + {requestId}"
const Get_all_report = "/api-gv/report-request";
const Get_report_classId = "/api-gv/report-request";  // + {classId}"
const Submit_report = "/api/report-submit";  //+ {requestId}/{reportTitle}/{reportDescription}"

// Module Security
const Login_All = "/api/authenticate/login";
const Register_All = "/api/authenticate/register";
const Forgot_pass = "/api/authenticate/forgot-password";
const Reset_pass = "/api/authenticate/reset-password";
const Change_pass = "/api/authenticate/change-password";


export {
  Get_Info_Account,
  Get_list_Student_class,
  Upload_File,
  Get_list_acount,
  Delete_account,
  Update_account,
  Create_class,
  Delete_class,
  update_class,
  Get_class_CreateBy,
  Get_class_Student_id,
  Add_member_group,
  Get_ListClass_Joined,
  Delete_Student,
  Join_group,
  Get_list_Student_Group,
  Create_project,
  Delete_project,
  Create_Project_log,
  Get_all_projectLog,
  Get_all_project_GroupId,
  Get_project_Group,
  Get_all_proJect,
  Get_all_report,
  Get_report_classId,
  Update_report,
  Create_report,
  BE_URL,
  Submit_report,
  UserDetail,
  Get_Account,
  Get_userId,
  Get_class,
  Show_detail_class,
  Show_list_student,
  Post_group,
  Show_list_group_class,
  Delete_group,
  Show_project_group,
  Post_request_report,
  Get_report,
  Delete_report,
  Join_class,
  Get_Info_Account_student,
  Login_All,
  Register_All,
  Forgot_pass,
  Reset_pass,
  Change_pass
};
