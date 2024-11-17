import React, { useState } from 'react'
import "./Food.css"
const Food = ({foodName,rate,kinde,foodID,imagesFetchName}) => {
    
    const [foodImage, setfoodImage] = useState(null)

    console.log(imagesFetchName);
    

 if (imagesFetchName === "food") {
    fetch(`http://54.86.107.194/api/food/get_food_image/${foodID}`,{
        method:"GET",
        headers: {
             "content-type": "application/json "
        }
    })
    .then(response => setfoodImage(response.url))
    console.log("aaaaaaaaaaaa");
    
 }

 if (imagesFetchName === "drink") {
    fetch(`http://54.86.107.194/api/drink/get_image/${foodID}`,{
        method:"GET",
        headers: {
             "content-type": "application/json "
        }
    })
    .then(response => setfoodImage(response.url))
    console.log("bbbbbbbbbbbbb");
    
 }

   
    
    
    
    return (
        <div key={foodID} className='food'>
            <div className='foodimgdiv'>
                <img className='foodimg'  src={foodImage} alt="food" />
            </div>

            <div className='foodDescription'>
                <div className='foodDescriptionHeader'>
                    <h4>{foodName}</h4>
                    <p>Free Delivery</p>
                </div>
                <div className='foodDescriptionBootom'>
                    <div>
                        <img width={16} height={16} src="./Assest/Icons/Star.png" alt="star" />
                        <h4>{rate}</h4>
                    </div>
                    <div>
                        <img width={16} height={16} src="./Assest/Icons/Silverware.png" alt="Silverware" />
                        <p>{kinde}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Food