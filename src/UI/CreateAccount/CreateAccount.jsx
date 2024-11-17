import React, { useEffect, useRef, useState } from 'react'
import "./CreateAccount.css"
import LeftSideLogo from '../../Components/LeftSideLogo/LeftSideLogo'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { Link } from 'react-router-dom'

const CreateAccount = () => {
    const nameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const confirmPasswordRef = useRef("")
    const phoneNubmberRef = useRef()
    const imageInputRef = useRef()

    const emailRegexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    const passwordRegexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    const phoneRegex = /^\+\(\d{3}\)\d{2}-\d{3}-\d{3}$/;

    const [verifyCard, setVerifyCard] = useState(false)

    const [nameErrorState, setNameErrorState] = useState(false)
    const [emailErrorState, setemailErrorState] = useState(false)
    const [passwordErrorState, setpasswordErrorState] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [phoneNumberError, setphoneNumberError] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [emailExistError, setEmailExistError] = useState(false)

    const [buttonText, setButtonText] = useState(false)

    const [userImage, setUserImage] = useState(null)

    const imageInputClick = () => {
        imageInputRef.current.click()
    }

    const imagesInputFileChange = (event) => {
        const file = event.target.files[0];
        setUserImage(file);
    }





    useEffect(() => {
        if (nameRef.current.value.length > 2 && emailRegexp.test(emailRef.current.value) && passwordRegexp.test(passwordRef.current.value) && !confirmPasswordError) {
            setButtonText((prevstat) => prevstat = true)
        }
    }, [nameRef.current.value, emailRef.current.value, passwordRef.current.value, confirmPasswordError])

    return (
        <div className='createAccount'>
            <LeftSideLogo />
            <div className='createRightSide'>
                <div className='rightSideHeader'>
                    <h2 className='createH2'>Create an account</h2>
                    <p className='headerSubText'>Plese create an account to continue using our service</p>
                </div>
                <div className={buttonText ? "CreateInputDivNone" : "CreateInputDiv"}>
                    <Input
                        logo="./Assest/Icons/Profile.png"
                        alt="Mail"
                        type="email"
                        inputName="FULL NAME"
                        inputId="inputName"
                        HtmlFor="inputName"
                        placeholder="Jhon Doe"
                        inputRef={nameRef}
                    />
                    <p className={nameErrorState ? "nameError" : "nameErrorNone"}>* write your name</p>
                </div>
                <div
                    className={!buttonText ? 'imageInputDivNone' : 'imageInputDiv'}
                    onClick={imageInputClick}
                >
                    <img width={48} height={48} src="./Assest/Icons/add-image.png" alt="add-image" />
                    <p>Add your account image</p>
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        style={{ display: 'none' }}
                        onChange={imagesInputFileChange}
                    />
                </div>

                <div className={emailExist ? "CreateInputDivNone" : "CreateInputDiv"}>
                    <Input
                        logo="./Assest/Icons/Mail.png"
                        alt="Mail"
                        type="email"
                        inputName="EMAIL ADDRESS"
                        inputId="inputEmail"
                        HtmlFor="inputEmail"
                        placeholder="example123@mail.ru"
                        inputRef={emailRef}
                    />
                    <p className={emailErrorState ? "emailError" : "emailErrorNone"}>* Invalid email address</p>
                    <p className={emailExistError ? "emailError" : "emailErrorNone"}>* Email already exists</p>
                </div>
                <div className={buttonText ? "CreateInputDivNone" : "CreateInputDiv"}>
                    <Input
                        logo="./Assest/Icons/Key.png"
                        alt="Key"
                        type="text"
                        inputName="PASSWORD"
                        inputId="inputPassword"
                        HtmlFor="inputPassword"
                        placeholder="Password"
                        inputRef={passwordRef}
                    />
                    <p className={passwordErrorState ? "paswordError" : "paswordErrorNone"}>* The password must contain at least 8 characters, at least one letter and one number</p>
                </div>
                <div className={buttonText ? "CreateInputDivNone" : "CreateInputDiv"}>
                    <Input
                        logo="./Assest/Icons/Key.png"
                        alt="Key"
                        type="text"
                        inputName="CONFIRM PASSWORD"
                        inputId="confirmInputPassword"
                        HtmlFor="confirmInputPassword"
                        placeholder="Confirm password"
                        inputRef={confirmPasswordRef}
                    />
                    <p className={confirmPasswordError ? "confirmPasswordError " : "confirmPasswordErrorNone"}>* Passwords entered do not match</p>
                </div>



                <div className={!buttonText ? "CreatePhoneInputDivNone" : "CreatePhoneInputDiv"}>
                    <Input
                        logo="./Assest/Icons/call.png"
                        alt="Key"
                        type="text"
                        inputName="Phone Number"
                        inputId="PhoneNumber"
                        HtmlFor="PhoneNumber"
                        placeholder="+(374)97-734-003"
                        inputRef={phoneNubmberRef}
                    />
                    <p className={phoneNumberError ? "phoneNumberError" : "phoneNumberErrorNone"}>* Phone number format should be +(374)97-734-003</p>
                </div>


                <div className='createRightSideBootom'>
                    <Button
                        backgroundColor="#503E9D"
                        color="#F7FAFC"
                        buttonText={buttonText ? "Create an account" : "Countinue"}
                        onClick={() => {

                            if (!emailRegexp.test(emailRef.current.value)) {
                                setemailErrorState(true)
                            } else {
                                setemailErrorState(false)
                            }

                            if (!passwordRegexp.test(passwordRef.current.value)) {
                                setpasswordErrorState(true)
                            } else {
                                setpasswordErrorState(false)
                            }

                            if (nameRef.current.value.length <= 2) {
                                setNameErrorState(true)
                            } else {
                                setNameErrorState(false)
                            }

                            if (passwordRef.current.value === confirmPasswordRef.current.value && passwordRef.current.value !== "") {
                                setConfirmPasswordError(false)
                            } else {
                                setConfirmPasswordError(true)
                            }

                            if (nameRef.current.value.length > 2 && emailRegexp.test(emailRef.current.value) && passwordRegexp.test(passwordRef.current.value) && !confirmPasswordError) {
                                setButtonText((prevstat) => prevstat = true)
                                setEmailExist(true)
                            }

                            if (!phoneRegex.test(phoneNubmberRef.current.value)) {
                                setphoneNumberError(true)
                            } else {
                                setphoneNumberError(false)
                            }

                            if (userImage && buttonText && phoneRegex.test(phoneNubmberRef.current.value) && emailRegexp.test(emailRef.current.value)) {
                                const formData = new FormData();
                                formData.append('name', nameRef.current.value,);
                                formData.append('email', emailRef.current.value);
                                formData.append('password', passwordRef.current.value);
                                formData.append('confirm_password', confirmPasswordRef.current.value);
                                formData.append('phone_number', phoneNubmberRef.current.value);
                                formData.append('profile_image', userImage, userImage.name);

                                // console.log(userImage);


                                fetch('http://54.86.107.194/api/auth/add-user', {
                                    method: "POST",
                                    body: formData,
                                })
                                    .then(response => response.json())
                                    .then(result => {
                                        console.log(result);

                                        if (result.detail === 'Email already exists') {
                                            setEmailExist(false)
                                            setEmailExistError(true)
                                            alert("aaaa")
                                        }

                                        if (result.message === 'You have successfully registered') {
                                            setVerifyCard(true)
                                            nameRef.current.value = ""
                                            emailRef.current.value = ""
                                            passwordRef.current.value = ""
                                            confirmPasswordRef.current.value = ""
                                            phoneNubmberRef.current.value = ""
                                            setUserImage(null)
                                            setEmailExistError(false)
                                        }
                                    })
                                // 

                            }

                        }}
                    />

                    <p>Already have an account? <Link to={"/"}>Sign In</Link></p>
                </div>
            </div>
            <div className={verifyCard ? 'verifyDiv' : 'verifyDivNone'}>
                <div className='verifyCard'>
                    <div className='verifyCardIconDiv'>
                        <img width={24} height={24} src="./Assest/Icons/MailWhite.png" alt="mailIcon" />
                    </div>
                    <p>Please verify your accuount</p>
                    <Link onClick={() => {
                        setVerifyCard(false)
                        setButtonText(false)
                        setEmailExist(false)
                    }}
                        to={"https://mail.ru/"}
                        target='_blank'
                    >
                        Go to verify
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount