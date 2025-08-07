import "./index.css"
import { useState } from "react"
import type { PasswordFormData } from "./types"

function App() {

  const [formData, setFormData] = useState<PasswordFormData>({
    password: '',
    confirmedPassword: ''
  })

  const [errors, setErrors] = useState<string[]>([])

  const [isSuccessful, setIsSuccessful] = useState<boolean>(false)

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)

  const captureInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVisbility = () => {
    setPasswordVisibility(prev => !prev)
  }

  const validatePassword = (password: string) => {
    const errors = []

    if (password.length < 8) {
      errors.push("Your password must be at least 8 characters long.")
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Your password must include at least 1 lowercase character.")
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Your password must include at least 1 uppercase character.")
    }

    if (!/\d/.test(password)) {
      errors.push("Your password must include at least 1 number")
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Your password must include at least 1 special character")
    }

    return errors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = validatePassword(formData.password)

    if (formData.password !== formData.confirmedPassword) {
      newErrors.push("Your password does not match. Try again.")
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return
    }

    setIsSuccessful(true)
  }

  return (
    <>
      <h1> Reset Password</h1>
      {isSuccessful &&
        <p className="success-message">You have successfuly updated your password</p>
      }
      {!isSuccessful &&
        <form id="password-form" onSubmit={handleSubmit}>
          <fieldset>
            <label className="password-label" htmlFor="password">New password<span className="sm-red-text">(Required)</span></label>
            <input
              type={passwordVisibility ? 'text' : 'password'}
              name="password" id="password"
              autoComplete="new-password"
              required
              aria-describedby={errors.length > 0 ? "error-messages" : "password-requirements"}
              onChange={captureInputValues}>
            </input>

            <label htmlFor="confirmedPassword" className="password-label">Confirm new password<span className="sm-red-text">(Required)</span></label>
            <input
              type={passwordVisibility ? 'text' : 'password'}
              name="confirmedPassword" id="confirmedPassword"
              autoComplete="new-password"
              required
              aria-describedby={errors.length > 0 ? "error-messages" : "password-requirements"}
              onChange={captureInputValues}>
            </input>
          </fieldset>

          <fieldset className="show-pass-section">
            <label htmlFor="show-password">Show password</label>
            <input type="checkbox" id="show-password" name="show-password" onChange={handleVisbility} />
          </fieldset>

          {errors.length <= 0 &&
            <div className="req-section" id="password-requirements" aria-live="polite">
              <p>Password requirements:</p>
              <ul>
                <li>At least 8 characters long</li>
                <li>Must include both uppercase and lowercase letters</li>
                <li>Must contain at least one number</li>
                <li>Must contain at least one special character (e.g., ! @ # $ %)</li>
              </ul>
            </div>
          }
          {errors.length > 0 &&
            <div className="req-section" id="error-messages">
              <p>Sorry, your password is not valid for the following reasons: </p>
              <ul>
                {errors.map((error, index) =>
                  <li key={index}>{error}</li>
                )}
              </ul>
            </div>
          }
          <button type="submit" >Reset Password</button>
        </form >}
    </>
  )
}

export default App
