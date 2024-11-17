import React from 'react'
import "./Login.css"
import LeftSideLogo from '../../Components/LeftSideLogo/LeftSideLogo'
import LoginRightSide from '../../Components/LoginRightSide/LoginRightSide'

const Login = () => {
  const phoneRegex = /^\+\(\d{3}\)\d{2}-\d{3}-\d{3}$/;
  console.log(phoneRegex.test("+(374)97-734-003"));
  

  return (
    <div className='loginDiv'>
        <LeftSideLogo/>
        <LoginRightSide headerText="Welcome" headerSubText = "Sign in to your account to continue" />
    </div>
  )
}

export default Login