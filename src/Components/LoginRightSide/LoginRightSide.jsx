import React, { useRef, useState } from 'react'
import "./LoginRightSide.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import { Link, useNavigate } from 'react-router-dom'
const LoginRightSide = (props) => {
    const mailRef = useRef()
    const passwordRef = useRef()

    const [loginError, setLoginError] = useState(false)

    const loginNavigate = useNavigate()

    return (
        <div className='rightSideDiv'>
            <div className='rightSideHeader'>
                <h2>{props.headerText}</h2>
                <p className='headerSubText'>{props.headerSubText}</p>
            </div>
            <Input
                logo="./Assest/Icons/Mail.png"
                alt="Mail"
                type="email"
                inputName="EMAIL ADDRESS"
                inputId="inputEmail"
                HtmlFor="inputEmail"
                placeholder="example123@mail.ru"
                inputRef={mailRef}
            />
            <div>
                <Input
                    logo="./Assest/Icons/Key.png"
                    alt="Key"
                    type="password"
                    inputName="PASSWORD"
                    inputId="inputPassword"
                    HtmlFor="inputPassword"
                    placeholder="******"
                    inputRef={passwordRef}
                />
                <p className={loginError ? "loginError" : "loginErrorNone"}>* Email address / password is invalid</p>
            </div>


            <div className='rightSideBootom'>
                <Button
                    backgroundColor="#503E9D1A"
                    color="#503E9D"
                    buttonText="Sign in"
                    onClick={() => {
                        fetch('http://54.86.107.194/api/auth/login', {
                            method: "POST",
                            body: JSON.stringify({
                                email: mailRef.current.value,
                                password: passwordRef.current.value,
                            }),
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                            .then(response => response.json())
                            .then(result => {
                                console.log(result)
                                if (result.Message === "Successfully logged in! Your access token") {
                                    setLoginError(false)
                                    sessionStorage.setItem("accsesToken", result.access_token)
                                    sessionStorage.setItem("userID", result.user_id)
                                    loginNavigate("/Home")

                                } else {
                                    setLoginError(true)
                                }
                            })
                    }}
                />

                <Link to={"/forgotPassword"} >Forgot password?</Link>

                <Link to={"/CreateAccount"}>
                    <Button
                        backgroundColor="#503E9D"
                        color="#F7FAFC"
                        buttonText="Create an account"
                    />
                </Link>
            </div>
        </div>
    )
}

export default LoginRightSide