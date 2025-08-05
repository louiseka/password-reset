import "./index.css"
import { useState } from "react"

function App() {

  //create an Object Type for the password data
  type PasswordFormData = {
    password: string,
    confirmedPassword: string
  }

  //create state for formdata
  const [formData, setFormData] = useState<(PasswordFormData)>({
    password: '',
    confirmedPassword: ''
  })

  //create state for error
  const [error, setError] = useState('')

  //capture values from each input field
  const captureInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    console.log(formData)
  }

  //add onSubmit to form
  //prevent form submit default
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("Form submitted, your password is:", formData.password)
  }



  //are the values the exact same
  //if yes form can be submitted with thank you message
  //if no show error message

  //a function to check if password passes 
  // at least 8 characters, 
  // contain upper and lowercase, 
  // contain at least 1 number, 
  // and at least 1 special character

  return (
    <>
      <h1> Reset Password</h1>

      <form id="password-form" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="password">New password</label>
          <input type="password" name="password" id="password" aria-describedby="password-requirements" onChange={captureInputValues}></input>

          <label htmlFor="confirmedPassword">Confirm new password</label>
          <input type="password" name="confirmedPassword" id="confirmedPassword" aria-describedby="password-requirements" onChange={captureInputValues}></input>
        </fieldset>
        <div className="req-section" id="password-requirements" aria-live="polite">
          <p>Password requirements:</p>
          <ul>
            <li>At least 8 characters long</li>
            <li>Must include both uppercase and lowercase letters</li>
            <li>Must contain at least one number</li>
            <li>Must contain at least one special character (e.g., ! @ # $ %)</li>
          </ul>
        </div>

        <button type="submit" >Reset Password</button>
      </form>
    </>
  )
}

export default App
