//  * Hooks
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'
// * Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// * React
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//  * Helpers
import { getToken } from '../helpers/auth'

const CreateRecipe = () => {

  //  ! State
  const navigate = useNavigate()
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
    eo_amount: [],
    bo_amount: [],
    oi_amount: [],
  })

  // * Esential Oil Form Field
  const [eoFormFields, setEoFormFields] = useState([{
    essential_oil: '',
    quantity: '',
    measurement: ''
  },])

  // * Base Oil Form Field
  const [boFormFields, setBoFormFields] = useState([{
    base_oil: '',
    quantity: '',
    measurement: ''
  },])

  // * Other Ingredient Form Field
  const [oiFormFields, setOiFormFields] = useState([{
    other_ingredient: '',
    quantity: '',
    measurement: ''
  },])

  // * Recipe ID
  const [recipeId, setRecipeId] = useState(parseInt(''))

  //  * Categories
  const [applicationOptions, setApplicationOptions] = useState([])
  const [applicationData, setApplicationData] = useState([])
  const [remedyOptions, setRemedyOptions] = useState([])
  const [remedyData, setRemedyData] = useState([])
  const [essentialOptions, setEssentialOptions] = useState([])
  const [baseOptions, setBaseOptions] = useState([])
  const [otherOptions, setOtherOptions] = useState([])


  const [selectedRemedies, setSelectedRemedies] = useState()
  const [selectedApplications, setSelectedApplication] = useState()
  const [selectedEssentials, setSelectedEssentials] = useState()
  const [selectedBases, setSelecteBases] = useState()
  const [selectedOthers, setSelecteOthers] = useState()

  const [error, setError] = useState([])

  // ! Requests

  // * Applications
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/applications/`)
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

  // * Remedies
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/remedies/`)
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

  // * ESSENTIAL OIL OPTIONS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/essentialoils/`)
        let essentialOptions = data.map(essential => ({ value: essential.id, label: essential.name }))
        setEssentialOptions(essentialOptions)
        console.log('essentialOptions', essentialOptions)
      } catch (error) {
        setError(error)
        console.log('ESSENTIAL OIL ERROR', error)
      }
    }
    getData()
  }, [])

  // * BASE OIL OPTIONS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/baseoils/`)
        let baseOptions = data.map(base => ({ value: base.id, label: base.name }))
        setBaseOptions(baseOptions)
        console.log('baseOptions', baseOptions)
      } catch (error) {
        setError(error)
        console.log('BASE OIL ERROR', error)
      }
    }
    getData()
  }, [])

  // * OTHER INGREDIENT  OPTIONS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/recipes/otheringredients/`)
        let otherOptions = data.map(other => ({ value: other.id, label: other.name }))
        setOtherOptions(otherOptions)
        console.log('otherOptions', otherOptions)
      } catch (error) {
        setError(error)
        console.log('OTHER OIL ERROR', error)
      }
    }
    getData()
  }, [])

  // * UPDATING RECIPE DATA WITH INGREDIENTS

  // useEffect(() => {

  //   setRecipeData({ ...recipeData, 'eo_amount' : eoFormFields, 'bo_amount' : boFormFields, 'oi_amount' : oiFormFields})
  //   console.log('updated eo formfield---->', eoFormFields)
  //   console.log('updated bo formfield---->', boFormFields)
  //   console.log('updated io formfield---->', oiFormFields)
  // },[eoFormFields, boFormFields, oiFormFields])

  useEffect(() => {
    setRecipeData({ ...recipeData, 'eo_amount': eoFormFields })
    console.log('updated eo formfield---->', eoFormFields)
  }, [eoFormFields])

  useEffect(() => {
    setRecipeData({ ...recipeData, 'bo_amount': boFormFields })
    console.log('updated bo formfield---->', boFormFields)
  }, [boFormFields])

  useEffect(() => {
    setRecipeData({ ...recipeData, 'oi_amount': oiFormFields })
    console.log('updated eo formfield---->', oiFormFields)
  }, [oiFormFields])

  //  ! Execution

  // * Recipe Handlers

  const handleRecipeChange = (event) => {
    setRecipeData({ ...recipeData, [event.target.name]: event.target.value })
    setError({ ...error, [event.target.name]: '' })
    console.log('recipedata', recipeData)
  }

  const handleCheckBoxChange = (event) => {
    setRecipeData({ ...recipeData, [event.target.name]: event.target.checked })
  }


  const handleRemedyChange = (selectedRemedies) => {
    console.log('selected Remedy->', selectedRemedies)
    const selectedRemedyIds = selectedRemedies.map((item) => { return item.value })
    console.log('selectedRemedyIds->', selectedRemedyIds)
    setRecipeData({ ...recipeData, 'remedies': selectedRemedyIds })
    console.log('recipe data after remedies---->', recipeData)
  }

  const handleApplicationChange = (selectedApplications) => {
    const selectedApplicationIds = selectedApplications.map((item) => { return item.value })
    setRecipeData({ ...recipeData, 'applications': selectedApplicationIds })
    console.log('recipe data after applications---->', recipeData)
  }

  const handleRecipeSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/recipes/createrecipe/`, recipeData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      navigate('/recipes')
    } catch (error) {
      console.log('----ERROR-----', error)
      setError(error)
      if ('name' in error.response.data.detail) {
        toast.error(error.response.data.detail.name[0], {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      if ('measurement' in error.response.data.detail) {
        toast.error(error.response.data.detail.measurement[0], {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      if ('quantity' in error.response.data.detail) {
        toast.error(error.response.data.detail.quantity[0], {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }

    }
  }

  // * Essential Oil Handlers
  const handleEssentialChange = (event, index) => {
    console.log('eo change event', event)
    let data = [...eoFormFields]
    data[index]['essential_oil'] = event.value
    console.log('HandleEssentialChange DATA -->', data)
    setEoFormFields(data)
    console.log('eo amount data after ---->', eoFormFields)
  }
  useEffect(() => {
    console.log('updated RecipeData-->', recipeData)
  }, [recipeData])

  const handleEoFormChange = (event, index) => {
    let data = [...eoFormFields]
    data[index][event.target.name] = event.target.value
    setEoFormFields(data)
    setError({ ...error, [event.target.name]: '' })
    console.log('eoFormFields', eoFormFields)
  }

  const addEoFields = (event) => {
    event.preventDefault()
    let object = {
      essential_oil: '',
      quantity: '',
      measurement: ''
    }
    setEoFormFields([...eoFormFields, object])
  }

  const removeEoFields = (index) => {
    let data = [...eoFormFields];
    data.splice(index, 1)
    setEoFormFields(data)
  }

  // * Base Oil Handlers

  const handleBaseChange = (event, index) => {
    console.log('EVENT->', event)
    console.log('INDEX->', index)
    let data = [...boFormFields]
    data[index]['base_oil'] = event.value
    console.log('HandleBaseChange DATA -->', data)
    setBoFormFields(data)
    console.log('bo amount data after ---->', eoFormFields)
  }

  const handleBoFormChange = (event, index) => {
    let data = [...boFormFields]
    data[index][event.target.name] = event.target.value
    setBoFormFields(data)
    setError({ ...error, [event.target.name]: '' })
    console.log('boFormFields', boFormFields)
  }


  const addBoFields = (event) => {
    event.preventDefault()
    let object = {
      base_oil: '',
      quantity: '',
      measurement: ''
    }
    setBoFormFields([...boFormFields, object])
  }

  const removeBoFields = (index) => {
    let data = [...boFormFields];
    data.splice(index, 1)
    setBoFormFields(data)
  }

  // * Other Ingredient Handlers

  const handleOtherChange = (event, index) => {
    console.log('EVENT->', event)
    console.log('INDEX->', index)
    let data = [...oiFormFields]
    data[index]['other_ingredient'] = event.value
    console.log('HandleOtherChange DATA -->', data)
    setOiFormFields(data)
    console.log('oi amount data after ---->', oiFormFields)
  }

  const handleOiFormChange = (event, index) => {
    let data = [...oiFormFields]
    data[index][event.target.name] = event.target.value
    setOiFormFields(data)
    setError({ ...error, [event.target.name]: '' })
    console.log('oiFormFields', oiFormFields)
  }

  const addOiFields = (event) => {
    event.preventDefault()
    let object = {
      other_ingredient: '',
      quantity: '',
      measurement: ''
    }
    setOiFormFields([...oiFormFields, object])
  }

  const removeOiFields = (index) => {
    let data = [...oiFormFields];
    data.splice(index, 1)
    setOiFormFields(data)
  }


  return (
    <Container className="recipe-form-wrapper min-vh-100">
      <ToastContainer />
      <div className="header-wrapper">

        <h1>Create Your Recipe</h1>
      </div>
      <form onSubmit={handleRecipeSubmit} className="justify-content-between">

        <Row>
          <Col className="col-12" md="6">
            <h3 className="text-start">Recipe Details</h3>
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
          </Col>
          <Col className="col-12 ingredient-form-wrapper " md="6">
            <h3 className="text-start">Ingredients</h3>
            {/* Essential Oils */}
            <Row className="ingredient-form-container">
              <form className=''>
                <h4>Essential Oils</h4>
                {eoFormFields.map((form, index) => {
                  return (
                    <div key={index} className='mt-2' >
                      <Select
                        name="essential_oil"
                        options={essentialOptions}
                        onChange={event => handleEssentialChange(event, index)}
                        className="basic-single select-ingredients"
                        classNamePrefix="select"
                      >
                      </Select>
                      <Row className="amounts mt-1">
                        <Col className="col-4">
                          <input
                            name='quantity'
                            placeholder='Quantity'
                            onChange={event => handleEoFormChange(event, index)}
                            value={form.quantity}
                          />
                        </Col>
                        <Col className="col-5">
                          <input
                            name='measurement'
                            placeholder='Measurement'
                            onChange={event => handleEoFormChange(event, index)}
                            value={form.measurement}
                          />
                        </Col>
                        <Col className="col-3">
                          <button className='remove' onClick={() => removeEoFields(index)}>Remove</button>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
                <Row>
                  <button onClick={addEoFields}>Add More..</button>
                </Row>
              </form>
            </Row>

            {/* Base Oils */}
            <Row className="ingredient-form-container">
              <form>
                <h4>Base Ingredients</h4>
                {boFormFields.map((form, index) => {
                  return (
                    <div key={index} className='mt-2'>
                      <Select
                        name="base_oil"
                        options={baseOptions}
                        onChange={event => handleBaseChange(event, index)}
                        className="basic-single select-ingredients"
                        classNamePrefix="select"
                      >
                      </Select>
                      <Row className="amounts mt-1">
                        <Col className="col-4">
                          <input
                            name='quantity'
                            placeholder='Quantity'
                            onChange={event => handleBoFormChange(event, index)}
                            value={form.quantity}
                          />
                        </Col>
                        <Col className="col-5">
                          <input
                            name='measurement'
                            placeholder='Measurement'
                            onChange={event => handleBoFormChange(event, index)}
                            value={form.measurement}
                          />
                        </Col>
                        <Col className="col-3">
                          <button className='remove' onClick={() => removeBoFields(index)}>Remove</button>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
                <Row>

                  <button onClick={addBoFields}>Add More..</button>
                </Row>
              </form>
            </Row>

            {/* Other Indgredients */}
            <Row className="ingredient-form-container">
              <form>
                <h4>Other Ingredients</h4>
                {oiFormFields.map((form, index) => {
                  return (
                    <div key={index} className='mt-2' >
                      <Select
                        name="other_ingredient"
                        options={otherOptions}
                        onChange={event => handleOtherChange(event, index)}
                        className="basic-single select-ingredients"
                        classNamePrefix="select"
                      >
                      </Select>
                      <Row className="amounts mt-1">
                        <Col className="col-4">
                          <input
                            name='quantity'
                            placeholder='Quantity'
                            className='amount'
                            onChange={event => handleOiFormChange(event, index)}
                            value={form.quantity}
                          />
                        </Col>
                        <Col className="col-5">
                          <input
                            name='measurement'
                            placeholder='Measurement'
                            className='amount'
                            onChange={event => handleOiFormChange(event, index)}
                            value={form.measurement}
                          />
                        </Col>
                        <Col className="col-3">
                          <button className='remove' onClick={() => removeOiFields(index)}>Remove</button>
                        </Col>
                      </Row>
                    </div>

                  )
                })}
                <Row>

                  <button  onClick={addOiFields}>Add More..</button>
                </Row>
              </form>
            </Row>

          </Col>
        </Row>
        <Row>

          <input type="submit" value="Create Recipe" className="recipe-submit" />
        </Row>
      </form>
    </Container>
  )
}

export default CreateRecipe