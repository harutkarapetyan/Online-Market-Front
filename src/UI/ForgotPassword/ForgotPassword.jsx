import React, { useEffect, useRef, useState } from 'react'
import "./ForgotPassword.css"
import LeftSideLogo from '../../Components/LeftSideLogo/LeftSideLogo'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'

const ForgotPassword = () => {

    const mailRef = useRef()
    const personalCodeRef = useRef()
    const newPasswordRef = useRef()
    const confirmPasswordRef = useRef()
    const [userMail, setUserMail] = useState(sessionStorage.getItem("forgotMailForFetch") || "")
    const [forgotCardState, setForgotCardState] = useState(false)
    const [forgotFetchState, setForgotFetchState] = useState(false)
    const [personalCodeState, setPersonalCodeState] = useState(false)
    const [resetRequestButton, setResetRequestButton] = useState(true)
    const [resetPasswordButton, setResetPasswordButton] = useState(false)
    const [perosnalCodeError,setPersonalCodeError] =useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const passwordRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)


    const mailForFetch = () => {
        let arr = []
        for (let i = 0; i < userMail.length; i++) {
            arr.push(userMail[i])
        }

        arr.map((el, index) => {
            if (el === "@") {
                arr[index] = "%40"
                console.log(arr.join(""));
            }
            return arr
        })
        sessionStorage.setItem("forgotMail", userMail)
        sessionStorage.setItem("forgotMailForFetch", arr.join(""))
    }



    useEffect(() => {

        if (forgotFetchState) {
            mailForFetch()
            setForgotFetchState(false)
        }

    }, [forgotFetchState])

    return (
        <div className='forgotPassword'>
            <LeftSideLogo />
            <div className='forgotRightSide'>
                <div className='forgotHeader'>
                    <h2>Forgot password?</h2>
                    <p>Please enter your email address to continue</p>
                </div>
                <div>
                    <Input
                        logo="./Assest/Icons/Mail.png"
                        alt="Mail"
                        type="email"
                        inputName="EMAIL ADDRESS"
                        inputId="inputEmail"
                        HtmlFor="inputEmail"
                        placeholder="example123@mail.ru"
                        inputRef={mailRef}
                        onChange={(event) => {
                            setUserMail((prevstat) => prevstat = event.target.value)
                        }}
                    />
                </div>
                <div className={personalCodeState ? 'personalCodeDiv' : 'personalCodeDivNone'}>
                    <div className='forgotInputDiv'>
                        <Input
                            logo="./Assest/Icons/Person.png"
                            alt="Mail"
                            type="email"
                            inputName="Personal Code"
                            inputId="personalCode"
                            HtmlFor="personalCode"
                            placeholder="Personal Code"
                            inputRef={personalCodeRef}
                            onChange={(event) => {
                                setUserMail((prevstat) => prevstat = event.target.value)
                            }}
                        />
                        <p className={perosnalCodeError?"personalCodeError":"personalCodeErrorNone"}>* Your CODE is invalid</p>
                    </div>
                    <div className='forgotInputDiv'>
                        <Input
                            logo="./Assest/Icons/Key.png"
                            alt="Mail"
                            type="text"
                            inputName="New Password"
                            inputId="inputNewPassword"
                            HtmlFor="inputNewPassword"
                            placeholder="New Password"
                            inputRef={newPasswordRef}
                            onChange={(event) => {
                                setUserMail((prevstat) => prevstat = event.target.value)
                            }}
                        />
                        <p className={newPasswordError?"newPasswordError":"newPasswordErrorNone"}>* The password must contain at least 8 characters, at least one letter and one number</p>
                    </div>
                    <div className='forgotInputDiv'>
                        <Input
                            logo="./Assest/Icons/Key.png"
                            alt="Mail"
                            type="text"
                            inputName="Confirm Password"
                            inputId="inputConfirmPassword"
                            HtmlFor="inputConfirmPassword"
                            placeholder="Confirm Password"
                            inputRef={confirmPasswordRef}
                            onChange={(event) => {
                                setUserMail((prevstat) => prevstat = event.target.value)
                            }}
                        />
                        <p className={confirmPasswordError?"confirmPasswordError":"confirmPasswordErrorNone"}>* The new password does not match the current one</p>
                    </div>
                </div>

                <div className={resetRequestButton ? "resetRequsetButton" : "resetRequsetButtonNone"}>
                    <Button
                        backgroundColor="#503E9D"
                        color="#F7FAFC"
                        buttonText="Continue"
                        onClick={() => {
                            fetch(`http://54.86.107.194/api/password_reset/request/${userMail}`, {
                                method: "POST",
                                headers: {
                                    "content-type": "application/json"
                                }
                            })
                                .then(response => {
                                    // console.log(response);
                                    // console.log(userMail);

                                    if (response.statusText === "OK") {
                                        response.json()
                                        setForgotCardState(true)
                                        setForgotFetchState(true)
                                        setPersonalCodeState(true)
                                        setResetRequestButton(false)
                                        setResetPasswordButton(true)
                                    }else{
                                        setForgotCardState(false)
                                        setForgotFetchState(false)
                                        setPersonalCodeState(false)
                                        setResetRequestButton(true)
                                        setResetPasswordButton(false)
                                    }
                                })
                                .then(result => console.log(result))

                        }}
                    />
                </div>
                <div className={resetPasswordButton ? "resetPasswordButton" : "resetPasswordButtonNone"}>
                    <Button
                        backgroundColor="#503E9D"
                        color="#F7FAFC"
                        buttonText="Continue"
                        onClick={() => {
                            if (!passwordRegexp.test(newPasswordRef.current.value)) {
                                setNewPasswordError(true)
                            }else {
                                setNewPasswordError(false)
                            }

                            if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
                                setConfirmPasswordError(true)
                            }else {
                                setConfirmPasswordError(false)
                            }

                            if (passwordRegexp.test(newPasswordRef.current.value) && newPasswordRef.current.value === confirmPasswordRef.current.value) {
                                console.log(sessionStorage.getItem("forgotMail"));
                                console.log(Number(personalCodeRef.current.value));
                                console.log(newPasswordRef.current.value);
                                console.log(confirmPasswordRef.current.value);
                                
                                
                                
                                fetch('http://54.86.107.194/api/password_reset/reset', {
                                    method:"POST",
                                    body:JSON.stringify({
                                        email: sessionStorage.getItem("forgotMail"),
                                        code: Number(personalCodeRef.current.value),
                                        new_password: newPasswordRef.current.value,
                                        confirm_password: confirmPasswordRef.current.value
                                    }),
                                    headers: {
                                        "content-type": "application/json"
                                    }

                                })
                                .then(response => {
                                    console.log(response);
                                    
                                    response.json()
                                })
                                .then(result => {
                                    console.log(result);
                                    
                                })
                            }
                        }}
                    />
                </div>
            </div>
            <div className={forgotCardState ? "forgotSuccses" : "forgotNone"}>
                <div className='forgotCard' >
                    <div className='mailIconDiv'>
                        <img src="./Assest/Icons/MailWhite.png" alt="mailIcon" />
                    </div>
                    <div className='forgotCardTextDiv'>
                        <h2>Reset email sent</h2>
                        <p>We have just sent an email with a password reset password personal code to <span>{userMail}</span>.</p>
                    </div>
                    <div className='forgotButtonDiv'>
                        <Button
                            backgroundColor="#503E9D"
                            color="#F7FAFC"
                            buttonText="Got it"
                            onClick={() => {
                                setForgotCardState(false)
                            }}
                        />
                        <Button
                            backgroundColor="#F7F7F7"
                            color="#182135"
                            buttonText="Send again"
                            onClick={() => {
                                fetch(`http://54.86.107.194/api/password_reset/reset/${userMail}`, {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json"
                                    }
                                })
                                    .then(response => {

                                        if (response.statusText === "OK") {
                                            alert("sending succsesfuly")
                                            response.json()
                                        } else {
                                            alert("please try again")
                                        }
                                    })

                            }}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword