//  * Hooks
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'

// * React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

const CreateRecipe = () => {

  //  ! State

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
    remedies: []
  })

  // * Esential Oil Ingredient
  const [eoData, setEoData] = useState({
    essential_oil: parseInt(''),
    quantity: parseFloat(''),
    measurement: ''
  })

  // * Base Oil Ingredient
  const [boData, setBoData] = useState({
    base_oil: parseInt(''),
    quantity: parseFloat(''),
    measurement: ''
  })

  // * Other Ingredient
  const [oiData, setOiData] = useState({
    other_ingredient: parseInt(''),
    quantity: parseFloat(''),
    measurement: ''
  })

  // * Recipe ID
  const [recipeId, setRecipeId] = useState(parseInt(''))
  
  //  * Categories
  const [applicationOptions, setApplicationOptions] = useState([])
  const [applicationData, setApplicationData] = useState([])
  const [remedyOptions, setRemedyOptions] = useState([])
  const [remedyData, setRemedyData] = useState([])
  
  const [selectedRemedies, setSelectedRemedies] = useState()
  const [selectedApplications, setSelectedApplication] = useState()
  
  const [error, setError] = useState([])

  // * Requests

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/applications`)
        console.log('application data', data)
        setApplicationData(data)
        let dataMapped = data.map((keys) => { return keys.name })
        console.log(dataMapped)
        let applicationOptions = data.map(application => ({ value: application.id, label: application.name }))
        console.log('application options?', applicationOptions)
        setApplicationOptions(applicationOptions)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

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

  //  ! Execution
  
  // * Recipe Handlers
  const handleRecipeChange = (event) => {
    setRecipeData({ ...recipeData, [event.target.name]: event.target.value})
    setError({ ...error, [event.target.name]: '' })
    console.log('recipedata',recipeData)
  }

  const handleRemedyChange = (selectedRemedies) => {
    console.log('selected Remedy->', selectedRemedies)
    console.log('selected Remedy->', selectedRemedies[0].value)
    const selectedRemedyIds = selectedRemedies.map((item) => {return item.value} )
    console.log('selectedRemedyIds->', selectedRemedyIds)
    setRecipeData({ ...recipeData, 'remedies' : selectedRemedyIds})
    console.log('recipe data after remedies---->', recipeData)
  }

  const handleApplicationChange = (selectedApplications) => {
    const selectedApplicationIds = selectedApplications.map((item) => {return item.value} )
    setRecipeData({ ...recipeData, 'applications' : selectedApplicationIds})
    console.log('recipe data after applications---->', recipeData)
  }

  const handleRecipeSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/recipes/createrecipe/`, recipeData)
    } catch (error) {
      setError(error)
      }
    }

  // * Essential Oil Handlers
  const handleEoChange = (event) => {
    setEoData({ ...eoData, [event.target.name]: event.target.value })
    setError({ ...error, [event.target.name]: '' })
    console.log('eodata',eoData)
  }

  const handleEoSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/recipes/eoamounts/`, eoData)
    } catch (error) {
      setError(error)
      }
  }

  // * Base Oil Handlers
  const handleBoChange = (event) => {
    setBoData({ ...boData, [event.target.name]: event.target.value })
    setError({ ...error, [event.target.name]: '' })
    console.log('bodata',boData)
  }

  const handleBoSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/recipes/boamounts/`, boData)
    } catch (error) {
      setError(error)
      }
  }

  // * Other Ingredient Handlers
  const handleOiChange = (event) => {
    setOiData({ ...oiData, [event.target.name]: event.target.value })
    setError({ ...error, [event.target.name]: '' })
    console.log('oidata',oiData)
  }

  const handleOiSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/recipes/oiamounts/`, oiData)
    } catch (error) {
      setError(error)
      }
  }

  return (
    <Container className="form-wrapper min-vh-100">
    {/* <Row> */}
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
        <Select  value={selectedRemedies} name="remedies" options={remedyOptions}  className="basic-multi-select" classNamePrefix="select" isMulti onChange={handleRemedyChange} >
        </Select>
      </Row>
      <Row>
        <label htmlFor="applications">Applications</label>
        <Select  value={selectedApplications} name="applications" options={applicationOptions}  className="basic-multi-select" classNamePrefix="select" isMulti onChange={handleApplicationChange} >
        </Select>
      </Row>
      {/* Public*/}
      <Row className="checkbox">
        <Col className="col-2 ps-0">
          <label htmlFor="public">Public</label>
        </Col>
        <Col className="col-10">
          <input
            onInput={handleRecipeChange}
            type="checkbox"
            name="public"
            value={recipeData.public}
            defaultChecked
            required
            />
        </Col>
      </Row>
      {/* Submit */}
        <input type="submit" value="Add Recipe" className="btn dark" />
    </form>
    {/* </Row> */}
  </Container>
  )

}

export default CreateRecipe