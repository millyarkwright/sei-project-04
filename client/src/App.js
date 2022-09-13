import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { API_URL } from './config'

// IMPORT PAGE COMPONENTS
import HomePage from './components/HomePage'
import PageNavBar from './components/PageNavBar'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import BasesIndex from './components/bases/BasesIndex'
import BaseSingle from './components/bases/BaseSingle'

import EssentialsIndex from './components/essentials/EssentialsIndex'
import EssentialSingle from './components/essentials/EssentialSingle'

import RecipesIndex from './components/recipes/RecipesIndex'
import RecipeSingle from './components/recipes/RecipeSingle'
import CreateRecipe from './components/recipes/CreateRecipe'

import ProfileDetail from './components/profile/ProfileDetail'
import SavedRecipes from './components/profile/SavedRecipes'
import CreatedRecipe from './components/profile/CreatedRecipes'



function App() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get(`${API_URL}/recipes/`) // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  useEffect(() => {
    // if localstorage token exists, set axios default headers to token, if not, set to null
    const token = localStorage.getItem('aroma-token')
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      axios.defaults.headers.common["Authorization"] = null
    }
  }, [])

  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <PageNavBar/>
        <Routes>
          <Route path='/' element ={<HomePage />} />
          <Route path='/login' element ={<Login />} />
          <Route path='/register' element ={<Register />} />
          <Route path='/essentials' element ={<EssentialsIndex />} />
          <Route path='/essentials/:eoId' element ={<EssentialSingle />} />
          <Route path='/bases' element ={<BasesIndex />} />
          <Route path='/bases/:boId' element ={<BaseSingle />} />
          <Route path='/recipes' element ={<RecipesIndex />} />
          <Route path='/recipes/:recipeId' element ={<RecipeSingle />} />
          <Route path='/createrecipe' element ={<CreateRecipe />} />
          <Route path='/profile' element ={<ProfileDetail />} />
          <Route path='/savedrecipes/' element ={<SavedRecipes />} />
          <Route path='/createdrecipes/' element ={<CreatedRecipe />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;


