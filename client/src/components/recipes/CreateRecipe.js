//  * Hooks
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../helpers/auth'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'

// * React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // * Other IngrForm Fieldedient
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
    // console.log('checkbox value', event.target.name, event.target.checked)
    // console.log('RECIPE PUBLIC/PRIVATE', {...recipeData, [event.target.name]: event.target.checked})
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

    console.log('EVENT->', event)
    console.log('INDEX->', index)
    // console.log('Selected Essential Value->', event.value)
    // const selectedEssentialsId = selectedEssentials.map((item) => {return item.value} )
    // console.log('selectedEssentialsId->', selectedEssentialsId)
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
    // setEoFormFields({ ...eoFormFields, [event.target.name]: event.target.value })
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

  // const handleEoFormSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const { data } = await axios.post(`${API_URL}/recipes/eoamounts/`, eoFormFields)
  //   } catch (error) {
  //     setError(error)
  //     }
  // }

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
    // setEoFormFields({ ...eoFormFields, [event.target.name]: event.target.value })
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

  // const handleBoFormSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const { data } = await axios.post(`${API_URL}/recipes/boamounts/`, boFormFields)
  //   } catch (error) {
  //     setError(error)
  //     }
  // }

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

  // const handleOiFormSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const { data } = await axios.post(`${API_URL}/recipes/oiamounts/`, oiFormFields)
  //   } catch (error) {
  //     setError(error)
  //     }
  // }

  return (
    <Container className="recipe-form-wrapper min-vh-100">
      <ToastContainer />
      <h1>CREATE RECIPE</h1>
      <Row>
        <Col className="col-12" md="6">
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
                className="basic-multi-select"
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
                className="basic-multi-select"
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
            <input type="submit" value="Add Recipe" className="btn dark" />
          </form>
        </Col>
        <Col className="col-12" md="6">
          {/* Essential Oils */}
          <Row className="ingredient-form-container">
            {/* <form onSubmit={handleEoFormSubmit}> */}
            <form>
              <h4>Essential Oils</h4>
              {eoFormFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Select
                      name="essential_oil"
                      options={essentialOptions}
                      // value={selectedEssentials} 
                      onChange={event => handleEssentialChange(event, index)}
                      className="basic-single"
                      classNamePrefix="select"
                    >
                    </Select>
                    <input
                      name='quantity'
                      placeholder='Quantity'
                      onChange={event => handleEoFormChange(event, index)}
                      value={form.quantity}
                    />
                    <input
                      name='measurement'
                      placeholder='Measurement'
                      onChange={event => handleEoFormChange(event, index)}
                      value={form.measurement}
                    />
                    <button onClick={() => removeEoFields(index)}>Remove</button>
                  </div>
                )
              })}
              <button onClick={addEoFields}>Add More..</button>
            </form>
          </Row>

          {/* Base Oils */}
          <Row className="ingredient-form-container">
            {/* <form onSubmit={handleEoFormSubmit}> */}
            <form>
              <h4 className="fw-bold">Base Ingredients</h4>
              {boFormFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Select
                      name="base_oil"
                      options={baseOptions}
                      onChange={event => handleBaseChange(event, index)}
                      className="basic-single"
                      classNamePrefix="select"
                    >
                    </Select>
                    <input
                      name='quantity'
                      placeholder='Quantity'
                      onChange={event => handleBoFormChange(event, index)}
                      value={form.quantity}
                    />
                    <input
                      name='measurement'
                      placeholder='Measurement'
                      onChange={event => handleBoFormChange(event, index)}
                      value={form.measurement}
                    />
                    <button onClick={() => removeBoFields(index)}>Remove</button>
                  </div>
                )
              })}
              <button onClick={addBoFields}>Add More..</button>
            </form>
          </Row>

          {/* Other Indgredients */}
          <Row className="ingredient-form-container">
            {/* <form onSubmit={handleOiFormSubmit}> */}
            <form>
              <h4>Other Ingredients</h4>
              {oiFormFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Select
                      name="other_ingredient"
                      options={otherOptions}
                      onChange={event => handleOtherChange(event, index)}
                      className="basic-single"
                      classNamePrefix="select"
                    >
                    </Select>
                    <input
                      name='quantity'
                      placeholder='Quantity'
                      className='amount'
                      onChange={event => handleOiFormChange(event, index)}
                      value={form.quantity}
                    />
                    <input
                      name='measurement'
                      placeholder='Measurement'
                      className='amount'
                      onChange={event => handleOiFormChange(event, index)}
                      value={form.measurement}
                    />
                    <button onClick={() => removeOiFields(index)}>Remove</button>
                  </div>
                )
              })}
              <button onClick={addOiFields}>Add More..</button>
            </form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateRecipe