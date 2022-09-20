import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { API_URL } from './config'

// IMPORT PAGE COMPONENTS
import HomePage from './components/HomePage'
import PageNavBar from './components/PageNavBar'
import NotFoundPage from './components/NotFoundPage'
import Footer from "./components/Footer"
import About from "./components/About"

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import BasesIndex from './components/bases/BasesIndex'
import BaseSingle from './components/bases/BaseSingle'

import EssentialsIndex from './components/essentials/EssentialsIndex'
import EssentialSingle from './components/essentials/EssentialSingle'

import RecipesIndex from './components/recipes/RecipesIndex'
import RecipeSingle from './components/recipes/RecipeSingle'
import CreateRecipe from './components/recipes/CreateRecipe'
import EditRecipe from './components/recipes/EditRecipe'

import ProfileDetail from './components/profile/ProfileDetail'
import PublicProfile from './components/profile/PublicProfile'
import SavedRecipes from './components/profile/SavedRecipes'
import CreatedRecipe from './components/profile/CreatedRecipes'



function App() {


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
          <Route path='/recipes/:recipeId/edit' element ={<EditRecipe />} />
          <Route path="/about" element={<About />} />
          <Route path='/profile' element ={<ProfileDetail />} />
          <Route path='/profile/:username' element ={<PublicProfile />} />
          <Route path='/savedrecipes/' element ={<SavedRecipes />} />
          <Route path='/createdrecipes/' element ={<CreatedRecipe />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;


