import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";
import Avatar from "react-avatar";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./profile.css";
import numeral from "numeral";
import { Course } from '../../guest/CourseList/courseList';
import { authContext } from "../../../contexts/AuthContext";
import { _courses } from "../../guest/HomePage/data";
import request from "../../../configs/request";


function Profile() {
  const { auth } = useContext(authContext);
  const { user } = auth;
  const [myCourses, setMyCourses] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user)
    {
      setUserInfo(user);
      loadMyCourses();
      loadWatchList();
    }
  }, [user,location]);

  
  const loadMyCourses = async() => {
    const res = await request({
      method: "GET",
      url: `/courses/enrolled`,
    });

    if (res.code) {
      setMyCourses(res.data.rows);
    } else {
      alert("Lối. Hãy thử lại");
    }
  }
  
  const loadWatchList = async () => {
    const res = await request({
      method: "GET",
      url: `/courses/watch-list`,
    });

    if (res.code) {
      setWatchList(res.data.rows);
    } else {
      alert("Lối. Hãy thử lại");
    }
  }

  const loadUserInfo = async(id)=>{
    try{
       const res = await request({
      method: "GET",
      url: `/users/${id}`,
      });

      if(res.code) 
      {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        setUserInfo(res.data.data);
      }
      
    }catch(error)
    {
      alert('Error. Please try again');
    }
  }

  return (
    <>
      {userInfo && (
        <Row>
          <Col md={4} sm={12}>
            <div className="course-body">
              <h3>Account Information</h3>
              <Avatar name={userInfo.email} size="100" round="4px" />
              <h5 className="mt-2">
                <b>{userInfo.email}</b>
              </h5>
              <div>@{userInfo.fullname}</div>
              <button className="btn-cs btn-primary-cs mt-3 w-100" onClick={()=>setShowEdit(true)}>
                Edit Info
              </button>
              <button className="btn-cs btn-primary-cs mt-3 w-100" onClick={()=>setShowPassword(true)}>
                Change Password
              </button>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <div className="course-body">
              <h3>My Courses</h3>
              <div className="top-purchased-courses">
                {myCourses &&
                  myCourses.map((course, index) => {
                    return (
                      <div className="card-wrap-item" key={index}>
                        <Course course={course} type="private" />
                      </div>
                    );
                  })}
              </div>
              {myCourses.length === 0 && (
                <div className="my-5">
                  <small>Bạn chưa mua khóa học nào</small>
                </div>
              )}
            </div>{" "}
            <div className="course-body">
              <h3>Watch List</h3>
              <div className="top-purchased-courses">
                {watchList &&
                  watchList.map((course, index) => {
                    return (
                      <div className="card-wrap-item" key={index}>
                        <Course course={course} type="favour" />
                      </div>
                    );
                  })}
              </div>
              {watchList.length === 0 && (
                <div className="my-5">
                  <small>Bạn chưa yêu thích khóa học nào</small>
                </div>
              )}
            </div>
          </Col>
          <InfoModal user={userInfo} show={showEdit} onHide={()=>setShowEdit(false)} loadUserInfo={loadUserInfo} />
          <PasswordModal user={userInfo} show={showPassword} onHide={()=>setShowPassword(false)} />
        </Row>
      )}
    </>
  );
}


const InfoModal = ({user, loadUserInfo, show, onHide})=>{
  const [name, setName]=  useState('');
  const history = useHistory();

  useEffect(()=>{
    setName('');
  },[show]);

  useEffect(()=>{
   setName(user.fullname);
  },[user]);


  const editUser = async(e)=>{
    e.preventDefault();
    if(name)
    {
        try{
       const res = await request({
         method: "PUT",
         url: `/users`,
         data:{
           fullname:name,
         }
      });

      if(res.code) 
      {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        loadUserInfo(res.data.data.id);
        onHide();
      }
      
    }catch(error)
    {
      alert('Error. Please try again');
    }
    }else{
      alert('You must be fill your name');
    }
    
  }


  return(
    <Modal show={show} onHide={onHide} size="lg">
       <Modal.Header className="title-heading">
          Edit Profile
       </Modal.Header>
       <Modal.Body>
           {user && (
             <>
              <Form.Group className="w-100">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Group>
          <div className="mt-3 flex-end-center">
              <button className="btn-cs btn-primary-cs" onClick={(e)=>editUser(e)}>Update</button>
          </div>
          </>
        )}
       </Modal.Body>
    </Modal>
  )
}

const PasswordModal = ({user, show, onHide})=>{
  const [password, setPassword]=  useState('');
  const [oldPassword, setOldPassword]=  useState('');

  useEffect(()=>{
    setOldPassword('');
    setPassword('');
  },[show]);

  const editUser = async(e)=>{
    e.preventDefault();
    if(password && oldPassword)
    {
        try{
       const res = await request({
         method: "PUT",
         url: `/users`,
         data:{
           repassword:oldPassword,
           password,
         }
      });

      if(res.code) 
      {
        alert('Success');
        onHide();
      }
      
    }catch(error)
    {
      alert('Error. Please try again');
    }
    }else{
      if(!password)
        alert('You must be fill new password'); 
        
      if(!oldPassword)
        alert('You must be fill old password');
    }
    
  }

  return(
    <Modal show={show} onHide={onHide} size="lg">
       <Modal.Header className="title-heading">
          ChangePassword
       </Modal.Header>
       <Modal.Body>
           {user && (
             <Form>
            <Form.Group className="w-100">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
          </Form.Group>
          <Form.Group className="w-100">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </Form.Group>
          <div className="mt-3 flex-end-center">
              <button className="btn-cs btn-primary-cs" onClick={(e)=>editUser(e)}>Update</button>
          </div>
          </Form>
        )}
       </Modal.Body>
    </Modal>
  )
}

export default Profile;
