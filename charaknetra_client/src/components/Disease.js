import axios from 'axios';
import qs from 'qs';
import React, {useState,useEffect} from 'react'
import {
  useHistory,
  Link
} from "react-router-dom";

export default function Disease({childToParent}) {
  let history = useHistory();
const showFileDetails="";
  
  const [formData, setFormData] = useState({
    '1': '1',
    '2': '1',
    '3': '1',
    '4': '1',
    '5': '1',
    '6': '1',
    '7': '1',
    '8': '16',
  });

//   const uploadFile0 = () => {
//     const _fileDes = document.getElementById('fileDesBox').value;
//     const _fileName = document.getElementById('fileNameBox').value;
//     uploadFile(_fileName, _fileDes)

//     history.push("/");
//   }

//******************************************function to send data to the ML Model */
const uploadFile0 = (event) => {
    event.preventDefault();

    const data = qs.stringify(formData);

    const config = {
      method: 'post',
      url: 'http://127.0.0.1:5000/predict',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert(response.data);

      //send dthis data to ipfs storage
      const formDataString = Object.values(formData).join(',');
      const tt=formDataString+','+response.data;
      childToParent(tt);

    })
    .catch(function (error) {
      console.log(error);
    });
}



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }


  const [html, setHtml] = useState('');

  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/predict')
  //     .then(response => response.text())
  //     .then(data => {
  //       setHtml(data);
  //     });
  // }, []);

  return (
    <div className="container text-center  mt-3 mb-5">
     
      {/* <Link to="/">
        <button style={{ width: '30%' }} className="btn btn-lg btn-outline-dark mt-4 mb-2">Check Uploaded Files</button>
      </Link> */}
      <div className="row">
        <div className="col bg-dark bg-gradient" style={{ borderRadius: 40 }}>
          <div class="m-5">
            <h1 className="">Enter Disease Parameters</h1>
            {/* <div class="m-5" >
              <input class="form-control" onChange={captureFile} type="file" id="formFile" />
            </div> */}

            <div className={`mx-5 text-start text-light ${showFileDetails ? "" : ""}`} id="fileDetailsBox">
              
              <div className="row mx-2 mt-2">
                <div class="col-6">
                  <label for="fileTypeBox" class="form-label">Pregnancies</label>
                  <input type="text" class="form-control" name="1" value={formData['1']} onChange={handleChange} id="fileTypeBox" placeholder="No. of Pregnancies"  />
                </div>
                <div class="col-6">
                  <label for="fileSizeBox" class="form-label">Glucose</label>
                  <input type="text" class="form-control" name="2" value={formData['2']} onChange={handleChange} id="fileSizeBox" placeholder="Glucose level in sugar"  />
                </div>
              </div>
              <div className="row mx-2 mt-2">
                <div class="col-6">
                  <label for="fileTypeBox" class="form-label">BloodPressure</label>
                  <input type="text" class="form-control" name="3" value={formData['3']} onChange={handleChange} id="fileTypeBox" placeholder="BloodPressure"  />
                </div>
                <div class="col-6">
                  <label for="fileSizeBox" class="form-label">SkinThickness</label>
                  <input type="text" class="form-control" name="4" value={formData['4']} onChange={handleChange} id="fileSizeBox" placeholder="SkinThickness"  />
                </div>
              </div>
              <div className="row mx-2 mt-2">
                <div class="col-6">
                  <label for="fileTypeBox" class="form-label">Insulin</label>
                  <input type="text" class="form-control" name="5" value={formData['5']} onChange={handleChange} id="fileTypeBox" placeholder="Insulin level"  />
                </div>
                <div class="col-6">
                  <label for="fileSizeBox" class="form-label">BMI</label>
                  <input type="text" class="form-control" name="6" value={formData['6']} onChange={handleChange} id="fileSizeBox" placeholder="Body Mass Index"  />
                </div>
              </div>
              <div className="row mx-2 mt-2">
                <div class="col-6">
                  <label for="fileTypeBox" class="form-label">DiabetesPedigreeFunction</label>
                  <input type="text" class="form-control" name="7" value={formData['7']} onChange={handleChange} id="fileTypeBox" placeholder="DiabetesPedigreeFunction"  />
                </div>
                <div class="col-6">
                  <label for="fileTypeBox" class="form-label">Age</label>
                  <input type="text" class="form-control" name="8" value={formData['8']} onChange={handleChange} id="fileTypeBox" placeholder="Age"  />
                </div>
              </div>

              <div class="mt-5 text-center">
                <button type="submit" onClick={uploadFile0} class="btn btn-warning">PREDICT DISEASE PROBABILITY</button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div >
  )
}







