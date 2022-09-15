//  * Hooks
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getToken } from '../helpers/auth'
// * Axios & URL
import axios from 'axios'
import { API_URL } from '../../config'

// * React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'

const EditRecipe = () => {

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
  const { recipeId } = useParams()

  //  * Categories
  const [applicationOptions, setApplicationOptions] = useState([])
  const [applicationData, setApplicationData] = useState([])
  const [remedyOptions, setRemedyOptions] = useState([])
  const [remedyData, setRemedyData] = useState([])
  const [essentialOptions, setEssentialOptions] = useState([])
  const [baseOptions, setBaseOptions] = useState([])
  const [otherOptions, setOtherOptions] = useState([])

  const [selectedRemedies, setSelectedRemedies] = useState()
  const [selectedApplications, setSelectedApplications] = useState()
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

  // * ESSENTIAL OIL OPTIONS
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/essentialoils/`)
        let essentialOptions = data.map(essential => ({ value: essential.id, label: essential.name }))
        setEssentialOptions(essentialOptions)
        // console.log('essentialOptions', essentialOptions)
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
          applications: data.applications,
          remedies: data.remedies,
          // eo_amount: '',
          // bo_amount: '',
          // oi_amount:''
        })
        
        console.log('RECIPE DATA PREPOP', data)
        
        let currentRemedies = data.remedies.map(remedy => ({ value: remedy.id, label: remedy.name }))
        console.log('REMEDY OPTIONS--->', currentRemedies)
        setSelectedRemedies(currentRemedies)

        let currentApplications = data.applications.map(application => ({ value: application.id, label: application.name }))
        setSelectedApplications(currentApplications)

        // Set Current Essentials Form Field
        let currentEssentials = data.essential_oil_amount.map(object => ({
          essential_oil: { value: object.essential_oil.id, label: object.essential_oil.name },
          quantity: object.quantity,
          measurement: object.measurement
        }))
        console.log('currentEssentials--->', currentEssentials)
        setEoFormFields(currentEssentials)

        // Set Current Bases Form Field
        let currentBases = data.base_oil_amount.map(object => ({
          base_oil: { value: object.base_oil.id, label: object.base_oil.name },
          quantity: object.quantity,
          measurement: object.measurement
        }))
        console.log('currentBases--->', currentBases)
        setBoFormFields(currentBases)
        
        // Set Current Other Form Field
        let currentOthers = data.other_ingredient_amount.map(object => ({
        other_ingredient: { value: object.other_ingredient.id, label: object.other_ingredient.name },
        quantity: object.quantity,
        measurement: object.measurement
        }))
        console.log('currentOthers--->', currentOthers)
        setOiFormFields(currentOthers)

      
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


  // * UPDATING RECIPE DATA WITH INGREDIENTS

  useEffect(() => {
    let formattedEoFormFields = eoFormFields.map(object => ({
      essential_oil:  object.essential_oil.value,
      quantity: object.quantity,
      measurement: object.measurement
    }))
    
    setRecipeData({ ...recipeData, 'eo_amount': formattedEoFormFields })
    console.log('formattedEoFormField---->', formattedEoFormFields)
  }, [eoFormFields])


  useEffect(() => {
    let formattedBoFormFields = boFormFields.map(object => ({
      base_oil:  object.base_oil.value,
      quantity: object.quantity,
      measurement: object.measurement
    }))
    setRecipeData({ ...recipeData, 'bo_amount': formattedBoFormFields })
    console.log('formattedBoFormField---->', formattedBoFormFields)
  }, [boFormFields])

  useEffect(() => {
    let formattedOiFormFields = oiFormFields.map(object => ({
      other_ingredient:  object.other_ingredient.value,
      quantity: object.quantity,
      measurement: object.measurement
    }))
    setRecipeData({ ...recipeData, 'oi_amount': formattedOiFormFields })
    console.log('formattedOiFormField---->', formattedOiFormFields)
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
    console.log('selected Remedy->', selectedRemedies[0].value)
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
      const { data } = await axios.patch(`${API_URL}/recipes/createrecipe/`, recipeData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
    } catch (error) {
      setError(error)
    }
  }

  // * Essential Oil Handlers
  const handleEssentialChange = (event, index) => {
    let foundEssential = essentialOptions.filter((item) => item.value === event.value)
    console.log('FIND ESSENTIAL', foundEssential)
    console.log('Selected Essential Value->', event.value)
    let data = [...eoFormFields]
    data[index]['essential_oil'] = foundEssential[0]
    console.log('HandleEssentialChange DATA -->', data)
    setEoFormFields(data)
    console.log('eo amount data after ---->', eoFormFields)
  }

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
    let foundBase = baseOptions.filter((item) => item.value === event.value)
    console.log('FIND BASE', foundBase)
    console.log('Selected Base Value->', event.value)

    let data = [...boFormFields]
    data[index]['base_oil'] = foundBase[0]
    console.log('HandleBaseChange DATA -->', data)
    setBoFormFields(data)
    console.log('bo amount data after ---->', boFormFields)
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
    let foundOther = otherOptions.filter((item) => item.value === event.value)
    console.log('FIND OTHER', foundOther)
    console.log('Selected Base Value->', event.value)

    let data = [...oiFormFields]
    data[index]['other_ingredient'] = foundOther[0]
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
      <h1>EDIT RECIPE</h1>
      {Object.keys(recipeData).length && 
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
          {/* <Row className="ingredient-form-container">
            <form>
              <h4>Essential Oils</h4>
              {eoFormFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Select
                      name="essential_oil"
                      options={essentialOptions}
                      // defaultValue={form.essential_oil} 
                      placeholder={form.essential_oil.label}
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
          </Row> */}

          {/* Base Oils */}
          {/* <Row className="ingredient-form-container">
            {/* <form onSubmit={handleEoFormSubmit}> 
            <form>
              <h4 className="fw-bold">Base Ingredients</h4>
              {boFormFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Select
                      name="base_oil"
                      options={baseOptions}
                      placeholder={form.base_oil.label}
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
            </Row> */}

          {/* Other Indgredients */}
          {/* <Row className="ingredient-form-container">
            <form>
              <h4>Other Ingredients</h4>
              {oiFormFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Select
                      name="other_ingredient"
                      options={otherOptions}
                      placeholder={form.other_ingredient.label}
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
          </Row> */}
        </Col>
      </Row>
}
    </Container>
  )
}

export default EditRecipe