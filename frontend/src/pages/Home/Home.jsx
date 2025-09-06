import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import TopFoodDisplay from '../../components/TopFoodDisplay/TopFoodDisplay'  
import './Home.css';

const Home = () => {
  const [category, setCategory] = useState('All')

  return (
    <div>
      <Header />
      <ExploreMenu hideTitle={false} category={category} setCategory={setCategory}/>
     <TopFoodDisplay category={category} />  {/* <-- only top dishes */}
    </div>
  )
}

export default Home
