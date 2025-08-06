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
  const [errors, setErrors] = useState<string[]>([])

  //capture values from each input field
  const captureInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    console.log(formData)
  }

  const validatePassword = (password: string) => {
    console.log(password)
    if (password.length < 8) {
      setErrors(prev => ([
        ...prev,
        "Your password must be at least 8 characters long."
      ])
      )
    }

    //testing lowercase
    if (!/[a-z]/.test(password)) {
      setErrors(prev => ([
        ...prev,
        "Your password must include at least 1 lowercase character."
      ])
      )
    }

    //testing uppercase
    if (!/[A-Z]/.test(password)) {
      setErrors(prev => ([
        ...prev,
        "Your password must include at least 1 uppercase character."
      ])
      )
    }
    //testing number
    if (!/\d/.test(password)) {
      setErrors(prev => ([
        ...prev,
        "Your password must include at least 1 number"
      ])
      )
    }

    //testing special characters
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setErrors(prev => ([
        ...prev,
        "Your password must include at least 1 special character"
      ]))
    }
  }


  //add onSubmit to form
  //prevent form submit default
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validatePassword(formData.password)
    //if no show error message
    if (formData.password !== formData.confirmedPassword) {
      setErrors(prev => ([
        ...prev,
        "Your password does not match. Try again"
      ])
      )
      return
    }
    console.log(errors)
    if (errors.length > 0) {
      return
    }
    // setErrors([])
    console.log("You have successfully updated your password.")



    //are the values the exact same
    //if yes form can be submitted with thank you message

  }

  console.log('update')

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
        {errors.length > 0 && <p>{errors}</p>}

        <button type="submit" >Reset Password</button>
      </form>
    </>
  )
}

export default App
