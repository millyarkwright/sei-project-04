//  * Hooks
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getToken } from '../helpers/auth'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'

// * React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

const EditRecipeNew = () => {
  const navigate = useNavigate()

  //  ! State
  // * Recipe ID
  const { recipeId } = useParams()

  // * Base Recipe
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    makes: '',
    step_one: '',
    step_two: '',
    step_three: '',
    public: true,
    applications: [],
    remedies: [],

  })


  //  * Categories
  const [applicationOptions, setApplicationOptions] = useState([])
  const [applicationData, setApplicationData] = useState([])
  const [remedyOptions, setRemedyOptions] = useState([])
  const [remedyData, setRemedyData] = useState([])

  const [selectedRemedies, setSelectedRemedies] = useState()
  const [selectedApplications, setSelectedApplications] = useState()


  const [error, setError] = useState([])

  // ! Requests

  // * Applications
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/applications`)
        console.log('application data', data)
        setApplicationData(data)
        let dataMapped = data.map((keys) => { return keys.name })
        console.log(dataMapped)
        let applicationOptions = data.map(application => ({ value: application.id, label: application.name }))
        // console.log('application options?', applicationOptions)
        setApplicationOptions(applicationOptions)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  // * Remedies
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/remedies`)
        console.log('remedy data', data)
        setRemedyData(data)
        let remedyOptions = data.map(remedy => ({ value: remedy.id, label: remedy.name }))
        setRemedyOptions(remedyOptions)

        console.log('mapped remedies->', data.map((keys) => { return keys.name }))
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])


  // * GET RECIPE DATA
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/recipes/${recipeId}`)
        setRecipeData({
          name: data.name,
          description: data.description,
          makes: data.makes,
          step_one: data.step_one,
          step_two: data.step_two,
          step_three: data.step_three,
          public: data.public,
          // applications: data.applications.map((item) => {return item.id}),
          // remedies: data.remedies.map((item)=> {return item.id}),
          applications: [],
          remedies: [],
        })

        console.log('RECIPE DATA PREPOP', data)

        let currentRemedies = data.remedies.map(remedy => ({ value: remedy.id, label: remedy.name }))
        console.log('REMEDY OPTIONS--->', currentRemedies)
        setSelectedRemedies(currentRemedies)

        let currentApplications = data.applications.map(application => ({ value: application.id, label: application.name }))
        setSelectedApplications(currentApplications)


      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  // * Checking recipeData after its been updated

  useEffect(() => {
    console.log('updated RecipeData-->', recipeData)
  }, [recipeData])




  //  ! Execution

  // * Recipe Handlers

  const handleRecipeChange = (event) => {
    setRecipeData({ ...recipeData, [event.target.name]: event.target.value })
    setError({ ...error, [event.target.name]: '' })
    console.log('recipedata', recipeData)
  }

  const handleCheckBoxChange = (event) => {
    // console.log('checkbox value', event.target.name, event.target.checked)
    // console.log('RECIPE PUBLIC/PRIVATE', {...recipeData, [event.target.name]: event.target.checked})
    setRecipeData({ ...recipeData, [event.target.name]: event.target.checked })
  }


  const handleRemedyChange = (selectedRemedies) => {
    console.log('selected Remedy->', selectedRemedies)
    const selectedRemedyIds = selectedRemedies.map((item) => { return item.value })
    console.log('selectedRemedyIds->', selectedRemedyIds)
    setSelectedRemedies([...selectedRemedies])
    setRecipeData({ ...recipeData, 'remedies': selectedRemedyIds })
    console.log('recipe data after remedies---->', recipeData)
  }

  const handleApplicationChange = (selectedApplications) => {
    const selectedApplicationIds = selectedApplications.map((item) => { return item.value })
    setSelectedApplications([...selectedApplications])
    setRecipeData({ ...recipeData, 'applications': selectedApplicationIds })
    console.log('recipe data after applications---->', recipeData)
  }

  const handleRecipeSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.patch(`${API_URL}/recipes/${recipeId}`, recipeData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      navigate(`/recipes/${recipeId}`)
    } catch (error) {
      setError(error)
    }
  }


  return (
    <Container id="edit-recipe" className="recipe-form-wrapper min-vh-100">
      <div className="header-wrapper">

        <h1>EDIT RECIPE</h1>
      </div>
      {Object.keys(recipeData).length &&
        <form onSubmit={handleRecipeSubmit} className="justify-content-between">
          <h3 className="text-center">Recipe Details</h3>
          {/* Recipe name */}
          <Row>
            <label htmlFor="name">Recipe Name</label>
            <input
              onInput={handleRecipeChange}
              type="text"
              name="name"
              value={recipeData.name}
              required
            />
          </Row>
          {/* Description */}
          <Row>
            <label htmlFor="description">Description</label>
            <textarea
              onInput={handleRecipeChange}
              name="description"
              value={recipeData.description}
              required
            />
          </Row>
          {/* Makes */}
          <Row>
            <label htmlFor="makes">Makes</label>
            <input
              onInput={handleRecipeChange}
              type="text"
              name="makes"
              value={recipeData.makes}
              placeholder="How much does this recipe make..."
              required
            />
          </Row>
          {/* Step1 */}
          <Row>
            <label htmlFor="step_one">Step 1</label>
            <textarea
              onInput={handleRecipeChange}
              name="step_one"
              value={recipeData.step_one}
              required
            />
          </Row>
          <Row>
            <label htmlFor="step_two">Step 2</label>
            <textarea
              onInput={handleRecipeChange}
              name="step_two"
              value={recipeData.step_two}
            />
          </Row>
          <Row>
            <label htmlFor="step_three">Step 3</label>
            <textarea
              onInput={handleRecipeChange}
              name="step_three"
              value={recipeData.step_three}
            />
          </Row>
          {/* Categories */}
          <Row>
            <label htmlFor="remedies">Remedy</label>
            <Select
              value={selectedRemedies}
              name="remedies"
              options={remedyOptions}
              className="basic-multi-select mb-3"
              classNamePrefix="select"
              isMulti
              onChange={handleRemedyChange} >
            </Select>
          </Row>
          <Row>
            <label htmlFor="applications">Applications</label>
            <Select
              value={selectedApplications}
              name="applications"
              options={applicationOptions}
              className="basic-multi-select mb-3"
              classNamePrefix="select"
              isMulti
              onChange={handleApplicationChange} >
            </Select>
          </Row>
          {/* Public*/}
          <Row className="checkbox">
            <Col className="col-2 ps-0">
              <label htmlFor="public">Public</label>
            </Col>
            <Col className="col-10">
              <input
                onInput={handleCheckBoxChange}
                type="checkbox"
                name="public"
                defaultChecked
              />
            </Col>
          </Row>
          {/* Submit */}
          <input type="submit" value="Update Recipe" className="recipe-submit" />
        </form>
      }
    </Container>
  )
}

export default EditRecipeNew