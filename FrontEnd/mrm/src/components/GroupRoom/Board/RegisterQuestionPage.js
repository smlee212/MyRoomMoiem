import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link, useParams, useLocation } from 'react-router-dom';

import { Grid } from '@mui/material';
import { Box } from '@mui/system';

import PageIcon from '../../MyRoom/MyRoomItem/PageIcon';
import GroupProfile from '../GroupRoomItem/GroupProfile';
import CalendarBox from '../../Calendar/Calendar';
import MenuBtn from '../GroupRoomItem/MenuBtn';
import GroupMemberList from '../GroupRoomItem/GroupMemberList';

import RegisterOrEditQuestion from "./RegisterOrEditQuestion";
import { questionArticleActions } from "../../../slice/questionArticleSlice";


function RegisterQuestionPage (props) {

  const dispatch = useDispatch();
	const params = useParams();
  const groupId = params.groupId;

  const {user, id, group, views, date, editDate, title, content, picture, status} = useSelector((state) =>
  ({
    user: state.userInfoReducers.user,
    group: state.groupInfoReducers.group,
    id: state.questionArticleReducers.id,
    views: state.questionArticleReducers.views,
    date: state.questionArticleReducers.date,
    editDate: state.questionArticleReducers.editDate,  
    title: state.questionArticleReducers.title,
    content: state.questionArticleReducers.content,
    picture: state.questionArticleReducers.picture,
    status: state.questionArticleReducers.status
  }), shallowEqual)

  const formData = new FormData()

  const [TitleValue, setTitleValue] = useState(title)
  const [ContentValue, setContentValue] = useState(content)

  // 새 글인지 수정인지
  const [IsForUpdate, setIsForUpdate] = useState(false);
  const search = useLocation();

  //여기 체크
  useEffect(() => {
    const paramsSearch = new URLSearchParams(search).get('search');
    const isRegisterForEdit = paramsSearch.split("=")[1]

    if (isRegisterForEdit === 'true') {
      console.log('true')
      dispatch(questionArticleActions.fetchQuestionArticle(id))
      setIsForUpdate(true);
    } else {
      console.log('false')
    }
    setTitleValue(title);
    setContentValue(content);
  }, [id]);

  const onRegisterChange = (event) => {
    const { name, value } = event.target;
    dispatch(questionArticleActions.changeQuestionRegisterInput({ name: name, value: value }));
  };

  const [image, setImage] = useState({ name: "" })
  
  const onImageChange = (event) => {
    console.log("event ======", event)
    console.log("event.target", event.target)
    console.log("event.target.files[0]", event.target.files[0])
    setImage(()=>event.target.files[0])
    console.log("image", image)
  }

  const onSubmitQuestionArticle = (event) => {
    event.preventDefault();

    if (title === "" || title === null || title === undefined) {
      alert("제목을 작성하십시오.");
      return false;
    }
    if (
      content === "" ||
      content === null ||
      content === undefined
    ) {
      alert("내용을 작성하십시오.");
      return false;
    }

    const formdata = new FormData();
    formdata.append('picture', image)
    const questionArticleForRegister = {
      title: title, content: content, room_id: groupId, user_id: user.id, picture: formdata
    };

    const questionArticleForUpdate = {
      content: content, id: id, status: status, picture: formdata, title: title, user_id: user.id
    };

    if (IsForUpdate) {
      console.log('업데이트 ㄱㄱ')
      dispatch(questionArticleActions.updateQuestionArticle(questionArticleForUpdate)); // 추가
    } else {
      console.log('작성 ㄱㄱ')
      dispatch(questionArticleActions.registerQuestionArticle(questionArticleForRegister));
    } 
  }


  return (
    <Grid container>
      <Box
        sx={{
          width: "5vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#4A4A4A",
        }}>
        <Box>
          <Link to={`/myroom`}><PageIcon room={{}}/></Link>
        </Box>
        <Box
          sx={{
            width: "4vw",
            height: "5px",
            backgroundColor: "#FFFFFF",
            borderRadius: "10px"
          }}>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
          <Box>
            {user.myRooms.map((room, index) => {
              return (<Link to={`/group/`+room.id}><PageIcon room={room}/></Link>)
            })}
          </Box>
          <Box>
            <Box
              sx={{
                width: "4rem",
                height: "4rem",
                marginTop: "25px",
                marginBottom: "25px",
                backgroundColor: "#FFFFFF",
                borderRadius: "15px",
                transform: "rotate(45deg)",
                boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.35)",
                ":hover": {
                  transform: "rotate(0)",
                  transition: "0.8s",
                }
              }}>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "95vw",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Box
          sx={{
            width: "288px",
            height: "98vh",
            paddingY: "1vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ebe5d1",
          }}>
          <GroupProfile />
          {/* 해당 groupId의 경로로 이동할 수 있도록 변경해야함 */}
          <Link to={`/group/${groupId}`}><MenuBtn name={"Home"} /></Link>
          <Link to={`/group/${groupId}/chat`}><MenuBtn name={"채팅방"} /></Link>
          <Link to={`/group/${groupId}/openvidu`}><MenuBtn name={"화상채팅방"} /></Link>
          <Link to={`/group/${groupId}/board`}><MenuBtn name={"게시판"} /></Link>
          <Link to={`/group/${groupId}/question`}><MenuBtn name={"Q&A"} /></Link>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>

          <Box sx={{mt:5}}>
            <RegisterOrEditQuestion
              id={id}
              titleValue={title}
              contentValue={content}
              groupId={groupId}
              user_id={user.id}
              handleRegisterChange={onRegisterChange}
              onImageHandler={onImageChange}
              handleSubmit={onSubmitQuestionArticle}
              updateRequest={IsForUpdate}
              formData = {formData}
              picture={image.name}
              status={status}/>
          </Box>
        </Box>   

        <Box
          sx={{
            width: "288px",
            height: "98vh",
            paddingY: "1vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ebe5d1",
          }}>
          <CalendarBox />
          <Box
            sx={{
              width: "250px",
              height: "550px",
              marginTop: "20px",
              paddingY: '20px',
              borderRadius: "30px",
              backgroundColor: "#FFFFFF",
              boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.35)",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <h3>그룹 인원</h3>
            <hr align="center" width="80%"/>    
            {group.users 
            ? group.users.map((user, index) => {
              return (<GroupMemberList user={user}/>)
            })
            : <div></div>
            }
          </Box>
          <Box
            sx={{
              width: "250px",
              height: "80px",
              marginTop: "20px",
              borderRadius: "30px",
              backgroundColor: "#FFFFFF",
              border: '5px solid #c45c5c',
              boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.35)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ':hover': {
                cursor: 'pointer'
              }
            }}>
            <h2>탈퇴하기</h2>
          </Box>
        </Box>
      </Box>
    </Grid>
    

      
    


    
  )
}

export default RegisterQuestionPage;