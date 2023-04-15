import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, getDoc, where, getFirestore, doc, updateDoc } from "firebase/firestore";
import axios from 'axios';
import Checkuphistory from "./Checkuphistory";
import { getAuth } from 'firebase/auth';
// import LineGraph from 'react-line-graph'
import LineChart from "./LineChart";
import BarChart from "./Barchart";
import Sugarlevel from "./Sugarlevel";
function Profile() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [checkupHistory, setCheckupHistory] = useState([]);
  const [edit, setEdit] = useState(false);
  const history = useHistory();
  const auth1 = getAuth();

  

  const getUserdata = async () => {
    const db = getFirestore(); // initialize Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const newuser1 = docSnap.data();
      setHeight(newuser1.height);
      setWeight(newuser1.weight);
      setGender(newuser1.gender);
      setBmi(newuser1.bmi);
      setBloodgroup(newuser1.bloodgroup);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  const updateUserProfile = async () => {
    try {
      const db = getFirestore(); // initialize Firestore
      const frankDocRef = doc(db, "users", user.uid);
      console.log(user.uid);
      const bmi1 = calculateBMI();
      var gender1 = document.getElementsByName("gender")[0].value;
      var bloodgroup1 = document.getElementsByName("bloodgroup")[0].value;

      const data = {
        name: name,
        weight: weight,
        height: height,
        gender: gender1,
        bmi: bmi1,
        bloodgroup: bloodgroup1,
        checkupHistory: checkupHistory
      };
      console.log(data);
      updateDoc(frankDocRef, data)
        .then(frankDocRef => {
          console.log("A New Document Field has been added to an existing document");
        })
        .catch(error => {
          console.log(error);
        });

    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const addCheckupHistory = () => {
    const timestamp = new Date().toISOString();
    const newCheckup = {
      date: timestamp,
      time: timestamp,
      note: "",
      title: ""
    };
    setCheckupHistory([...checkupHistory, newCheckup]);
  };

  const updateCheckupHistory = (index, field, value) => {
    const newCheckupHistory = [...checkupHistory];
    newCheckupHistory[index][field] = value;
    setCheckupHistory(newCheckupHistory);
  };

  const [heartminute, setheartminute] = useState([]);

  


  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/fitness");
    
    getUserdata();
   
  }, [user, loading]);

  function hideit(e) {
    if (edit) {
      updateUserProfile();
      setEdit(false);
    } else {
      setEdit(true);
    }
    var elements = document.getElementsByClassName("hideit");
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].style.display === "grid") {
        elements[i].style.display = "none";
      } else {
        elements[i].style.display = "grid";
      }
    }
  }
  function updateGender() {
    var gender = document.getElementsByName("gender")[0].value;
    document.getElementById("gender").value = gender;
    setGender(gender);
  }
  function calculateBMI() {
    const heightMeters = height / 100; // convert height to meters
    const bmi = weight / (heightMeters * heightMeters);
    setBmi(bmi.toFixed(2)); // round BMI to 2 decimal places
    return bmi.toFixed(2);
  }

  const [checkup, setCheckup] = useState({
    date: "",
    time: "",
    reason: "",
    notes: "",
    tablets: "",
    doses: "",
  });

  const handleCheckupChange = (e) => {
    const { name, value } = e.target;
    setCheckup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [checkups, setCheckups] = useState([
    {
      date: '2022-03-01',
      time: '10:00',
      reason: 'Annual Checkup',
      notes: 'Everything looks good!',
      tablets: 'Vitamin C',
      doses: '1 tablet daily'
    },
    {
      date: '2022-05-15',
      time: '14:30',
      reason: 'Follow-up Appointment',
      notes: 'Patient reports feeling better.',
      tablets: 'Paracetamol',
      doses: '2 tablets as needed'
    },
    {
      date: '2022-09-10',
      time: '11:15',
      reason: 'Flu Shot',
      notes: 'Patient did not report any adverse reactions.',
      tablets: 'N/A',
      doses: 'N/A'
    }
  ]);

 
  return (
    <>
      {/* {console.log(user)} */}
      <div className="dashboard" >
        <div className="dashboard1">
          <div className="dashboard1image">
            <img className="imageprofile" src={user ? user.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" />
            {edit ?
              <button style={{ marginTop: '20px', padding: '7px', borderRadius: '5px', backgroundColor: '#000015', color: 'white', border: 'none' }} label="edit" onClick={hideit}>Save</button>
              :
              <button style={{ marginTop: '20px', padding: '7px', borderRadius: '5px', backgroundColor: '#000015', color: 'white', border: 'none' }} label="edit" onClick={hideit}>Edit</button>

            }
          </div>
          <div className="dashboard__container">
            <text style={{ color: 'white', paddingTop: '5px', textTransform: 'capitalize', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}> Welcome Back ! {user ? user.displayName : ""}</text>

            <div>
              <label htmlFor="weight">Weight (kg): {weight}</label>
              <input className="hideit" type="text" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
              <label htmlFor="height">Height (cm): {height}</label>
              <input className="hideit" type="text" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div>
              <label htmlFor="BMI">Your BMI : {bmi}</label>
            </div>
            <div>
              <label htmlFor="gender">Gender: {gender} </label>
              <select className="hideit" name="gender" onchange={updateGender}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="bloodgroup"  >Blood Group: {bloodgroup}</label>
              <select className="hideit" name="bloodgroup">
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

            </div>


          </div>
        </div>
        <div>
          {/* <LineGraph data={data} /> */}
          <LineChart/>
          <BarChart/>
          <Sugarlevel/>
        </div>
        <div>
          <div style={{color: 'white',padding:'15px',fontWeight:'bold'}}>Checkup history :</div>
          <Checkuphistory checkups={checkups} />
        </div>
        
      </div>
    </>
  )
};
export default Profile;