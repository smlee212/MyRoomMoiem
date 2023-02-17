import React, {useState} from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css"
import { useSelector, useDispatch } from 'react-redux';


import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { postTodoData } from "./TodoLogic";
import { useNavigate } from 'react-router-dom';
// import moment from "moment/moment";

// export function changeFormat(date, format) {
//   if (moment(date).isValid()) {
//     return moment(date).format(format);
//   } else {
//     return null;
//   }
// }


const CreateTodoModal = ({ onClose }) => {
  const navigate = useNavigate();
    // onchange
    const handleClose = () => {
      onClose?.();
    };
  const dispatch = useDispatch()
  
  const {user, group} = useSelector((state) => ({
    user: state.userInfoReducers.user,
    group: state.groupInfoReducers.group
  }))
    
    // const [ roomId, setroomId ] = useState('');
    const [ tags, settags ] = useState('');
    const [ content, setcontent ] = useState('');
    const [ selectedDate, setSelectedDate ] = useState('');

    // const onChange1 = e => {setroomId(e.target.value)}
    const onChange2 = e => {settags(e.target.value)}
    const onChange3 = e => {setcontent(e.target.value)}
    // const onChange4 = e => {setSelectedDate(e.target.value)}

    // console.log(selectedDate);
    // console.log("CreateTodoModal =====", roomId, tags, content, selectedDate)

    // const date = {
    //   date: {
    //     date: changeFormat(selectedDate, "yyyy-MM-DD")
    //   }
    // } 

    return (
      <Overlay>
        <ModalWrap>
          <Contents>
            <h1>할일 생성하기</h1>
            <InputWithLabel 
              id="roomId"
              label="| 그룹명" 
              // name="roomId" 
              // placeholder={group.name}
              // onChange={onChange1}
              value={group.name}
            />
            <InputWithLabel 
              id="tags"
              label="| 태그" 
              // name="tags" 
              placeholder="React 강의"
              onChange={onChange2}
              // value={tags}
            />
            <InputWithLabel 
              id="content"
              label="| 내용" 
              // name="content" 
              placeholder="Chapter1 수강"
              onChange={onChange3}
              // value={content}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="date"
                label="Custom input"
                value={selectedDate}
                // onChange={onChange4}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InputWithLabel 
                      id="date"
                      label="| 날짜" 
                      // placeholder="React 강의"
                      ref={inputRef} {...inputProps} 
                      sx={{ width: "60%" }}
                    />
                  {/* <input ref={inputRef} {...inputProps} /> */}
                  {InputProps?.endAdornment}
                </Box>
                  )}
              />
            </LocalizationProvider>

            <CloseButton onClick={() => {
              postTodoData({ user, group, tags, content, selectedDate, dispatch,navigate });
              handleClose();}}
            >등록</CloseButton>
            <CloseButton onClick={handleClose}>뒤로</CloseButton>

          </Contents>
        </ModalWrap>
      </Overlay>
      );
    };
  
  export default React.memo(CreateTodoModal);

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
height: 100%;
width: 100%;
background: rgba(0, 0, 0, 0.2);
z-index: 9999;
`;

const ModalWrap = styled.div`
  position: absolute;
  width: 680px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background-color: #4A4A4A;
  top: 50%;
  left: 50%;
  box-Shadow: 5px 5px 8px;
  transform: translate(-50%, -50%);
`;

const Label = styled.div` 
  // float: left;
  text-align: left;
  font-size: 20px;
  color: white;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
width: 450px;
height: 50px;
// width: 100%;
margin: 10px;
outline: none;
border-radius: 15px;
line-height: 2.5rem;
font-size: 20px;
padding-left: 1rem;
padding-right: 0.5rem;
`;

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const InputWithLabel = ({label, ...rest}) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest}/>
  </Wrapper>
);

const Contents = styled.div`
  // position: absolute;
  // margin-top: 20px;
  // vertical-align: middle;
  text-align: center;
  h1 {
    color: white;
    font-size: 40px;
    font-weight: 600;
    // text-align: center;
  }
`;


const CloseButton = styled.button`
// float : right;
width: 110px;
height: 60px;
margin-top: 20px;
margin-left: 10px;
// margin: 30px;
font-size: 20px;
// border: none;
background-color: #ffffff;
border-radius: 20px;
box-Shadow: 5px 5px 8px;
cursor: pointer;
&:hover {
  background-color: #898989;
}
`;
