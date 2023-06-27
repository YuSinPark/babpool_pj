import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FindMemberId = () => {
    let navigate = useNavigate();

    const memberPhoneInputRef = useRef(null);
    const memberEmailInputRef = useRef(null);
    const [memberIds, setMemberIds] = useState([]);
    
    const submitHandler = (event) => {
        event.preventDefault();

        const postData = {
            memberEmail: memberEmailInputRef.current.value,
            memberPhone: memberPhoneInputRef.current.value
        }

        axios.post(`${process.env.REACT_APP_API_ROOT}/member/findMyId`, postData)
            .then(response => {
                const memberId = response.data.data
                setMemberIds(memberId)
            })
            .catch(error => {
                if(error.response.data.msg === '아이디가 없습니다'){
                    alert("아이디가 존재하지 않습니다, 회원가입을 진행해주세요!")
                    navigate("/OwnerLogin", {replace: true})
                }
            })
    }

    return (
        <section className='findId'>
            <form onSubmit={submitHandler} action=''>
                <h1>이메일과 전화번호를 입력해주세요</h1>
                <div>
                    <label htmlFor='memberEmail'>이메일</label>
                    <input type='email' id='memberEmail' required ref={memberEmailInputRef}/>
                </div> 
                <div>
                    <label htmlFor='memberPhone'>전화번호</label>                    
                    <input type='tel' id='memberPhone' required ref={memberPhoneInputRef}/>
                </div>                  
                <div>
                {memberIds.length > 0 ? (
                    <div>
                        <h2>회원님의 아이디</h2>
                        <ul>
                            {memberIds.map((id, index) => (
                                <li key={index}>{id}</li>
                            ))}
                        </ul>
                        <div className='reset'>
                            <div onClick={() => {window.location.href = '/OwnerLogin';}}>로그인 페이지로 이동</div>
                            
                            <div onClick={() => {window.location.href = '/ResetPassword';}}>임시 비밀번호 발급</div>
                        </div>    
                    </div>
                ) : 
                    <div>
                        <button type='submit'>아이디 찾기</button>
                    </div> 
                }
                </div>
            </form>
        </section>
    )
}

export default FindMemberId