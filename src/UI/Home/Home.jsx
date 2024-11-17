import React, { useState } from 'react'
import "./Home.css"
import Navigation from '../../Components/Navigation/Navigation'
import Food from '../../Components/Food/Food'

const Home = () => {

    const [allFoods, setallFoods] = useState([])
    const [allFoodsFetchState, setAllFoodsFetchState] = useState(false)
    const [allDrink, setAllDrink] = useState([])

    if (!allFoodsFetchState) {
        fetch('http://54.86.107.194/api/food/get_all_foods?page=1', {
            method: "GET",
            headers: {
                "content-type": "application/json "
            }
        })
            .then(response => response.json())
            .then(result => {
                setallFoods(result.foods)
            })


        fetch('http://54.86.107.194/api/drink/get_all_drinks?page=1', {
            method: "GET",
            headers: {
                "content-type": "application/json "
            }
        })
            .then(response => response.json())
            .then(result => {
              
                setAllDrink(result.drinks)

            })

        setAllFoodsFetchState(true)
    }


    


    return (
        <div className='home'>
            <Navigation />
            <div className='a'>

                <div className='foodSection'>
                    <div className='foodSectionHeaders'>
                        <h3>Food</h3>
                        <p>See All <img src="./Assest/Icons/Chevron-right.png" alt="Chevron-right" /></p>
                    </div>
                    <div className='allFoods' >
                        {
                            allFoods.map(el => {
                           

                                return (
                                    <Food
                                        foodName={el.food_name}
                                        rate={el.rating}
                                        kinde={el.kind}
                                        foodID={el.food_id}
                                        imagesFetchName={"food"}
                                    />
                                )
                            })

                        }
                    </div>
                </div>
                <div className='dirnkSection'>
                    <div className='foodSectionHeaders'>
                        <h3>Drink</h3>
                        <p>See All <img src="./Assest/Icons/Chevron-right.png" alt="Chevron-right" /></p>
                    </div>
                    <div className='allFoods'>
                        {
                            allDrink.map(el => {
                                console.log(el);
                                
                                return (
                                    <Food
                                        foodName={el.drink_name}
                                        rate={el.rating}
                                        kinde={el.kind}
                                        foodID={el.drink_id}
                                        imagesFetchName={"drink"}
                                    />
                                )
                            })
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home