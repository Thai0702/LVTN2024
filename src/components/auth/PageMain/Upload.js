import React from "react";
import  { useEffect } from 'react';
import useDrivePicker from 'react-google-drive-picker'
import Navbar from '../Navbar'

const GoogleDriverPicker = () => {
    const [openPicker, authResponse] = useDrivePicker();  
    const handleOpenPicker = () => {
        openPicker({
          clientId: "295331828447-t2qfu6ibjilh2e6oavg80meqqc1sk5am.apps.googleusercontent.com",
          developerKey: "AIzaSyAk4Hm8ZryXAfuKs2tyEHEY2mv2BsTK61s",
          viewId: "DOCS",
          // token: token, // pass oauth token in case you already have one
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          // customViews: customViewsArray, // custom view
          callbackFunction: (data) => {
            if (data.action === 'cancel') {
              console.log('User clicked cancel/close button')
            }
            console.log(data)
          },
        })
      }
    return (
        <div>
        <Navbar />
        <div>
            <button onClick={() => handleOpenPicker()}>Open Picker</button>
        </div>
        </div>
    )
}

export default GoogleDriverPicker;