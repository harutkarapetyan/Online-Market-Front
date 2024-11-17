import React, { useState } from 'react'
import "./Navigation.css"
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { activePageRecoil } from '../../Atom'

const Navigation = () => {

    const [activePage, setActivePage] = useRecoilState(activePageRecoil)
    const [userDataFetch, setUserDataFetch] = useState(false)
    const userId = Number(sessionStorage.getItem("userID"))
    const userBarrerToken = sessionStorage.getItem("accsesToken")
    const [userMail, setUserMail] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userImage, setUserImage] = useState(null)

    if (!userDataFetch) {
        fetch(`http://54.86.107.194/api/auth/get-one-user-by-id/${userId}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + `${userBarrerToken}`,
            }
        })
            .then(response => response.json())
            .then(result => {
                setUserMail(result.email)
                setUserName(result.name)
               
                console.log(result);
                console.log("aaaaaaaaaaaaaa");

            })

            fetch(`http://54.86.107.194/api/auth/get_profile_image/${userId}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json "
                }
              })
                .then(response => {
                    console.log(response);
                    
                    if (response.ok === true) {
                        setUserImage(response.url)
                    }
                })
                
                
        setUserDataFetch(true)
    }

    console.log(userImage);
    
    return (
        <div className='navigation'>
            <div >
                <Link
                    onClick={() => {
                        setActivePage("home")
                    }}
                    className='logoLink'
                    to={"/Home"}>
                    <img width={40} height={32} src="./Assest/Icons/burger.png" alt="burger" />
                    <p>Nibble</p>
                </Link>
                <div className='linksDiv'>
                    <Link
                        to={"/Home"}
                        onClick={() => {
                            setActivePage("home")
                        }}

                        className={activePage === "home" ? "link active" : "link"}
                    >
                        <img width={24} height={24} src="./Assest/Icons/Home.png" alt="Home" />
                        <p>Home</p>
                    </Link>
                    <Link
                        to={"/Explore"}
                        onClick={() => {
                            setActivePage("explore")

                        }}
                        className={activePage === "explore" ? "link active" : "link"}
                    >
                        <img width={24} height={24} src="./Assest/Icons/Explore.png" alt="Explore" />
                        <p>Explore</p>
                    </Link>
                    <Link
                        to={'/Favourites'}
                        onClick={() => {
                            setActivePage("favourites")
                        }}
                        className={activePage === "favourites" ? "link active" : "link"}
                    >
                        <img width={18} height={24} src="./Assest/Icons/Favoutites.png" alt="Favourites" />
                        <p>Favourites</p>
                    </Link>
                    <Link
                        to={'/Orders'}
                        onClick={() => {
                            setActivePage("orders")
                        }}
                        className={activePage === "orders" ? "link active" : "link"}
                    >
                        <img width={24} height={24} src="./Assest/Icons/Orders.png" alt="Orders" />
                        <p>Orders</p>
                    </Link>
                    <Link
                        to={'/Messages'}
                        onClick={() => {
                            setActivePage("messages")
                        }}
                        className={activePage === "messages" ? "link active" : "link"}
                    >
                        <img width={24} height={24} src="./Assest/Icons/Message.png" alt="Messages" />
                        <p>Messages</p>
                    </Link>
                    <Link
                        to={'/Settings'}
                        onClick={() => {
                            setActivePage("settings")
                        }}
                        className={activePage === "settings" ? "link active" : "link"}
                    >
                        <img width={24} height={24} src="./Assest/Icons/Settings.png" alt="Settings" />
                        <p>Settings</p>
                    </Link>
                </div>
            </div>
            <div className='navigationBootom'>
                <div className='asaidDiv'>
                    <div className='asaidFirst'>
                        <div className='closeDiv'>
                            <img width={12} height={12} src="./Assest/Icons/Close.png" alt="close" />
                        </div>
                        <img width={64} height={64} src="./Assest/Icons/fireIcon.png" alt="fireIcon" />
                        <h3>
                            Free delivery on
                            all orders over <span>$25</span>
                        </h3>
                        <p>
                            It is a limited time offer that will expire soon.
                        </p>
                        <button>
                            Order now
                            <img width={16} height={16} src="./Assest/Icons/Arrow-right.png" alt="Arrow-right" />
                        </button>
                    </div>
                    <div className='asaidSeccond'>

                    </div>
                    <div className='asaidThird'>

                    </div>
                </div>
                <div className='userDiv'>
                    <div className='userLogoDiv'>
                        <img width={48} height={48} src={`${userImage}`}alt="userImage" />
                    </div>
                    <div>
                        <h3>{userName}</h3>
                        <p>{userMail}</p>
                    </div>
                    <img width={14} height={24} src="./Assest/Icons/IconUpAndDown.png" alt="IconUpAndDown" />
                </div>
            </div>
        </div>
    )
}

export default Navigation