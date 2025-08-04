import "./index.css"

function App() {


  return (
    <>
      <h1> Reset Password</h1>

      <form>
        <fieldset>
          <label htmlFor="new-password">New password</label>
          <input type="password" name="new-password" id="new-password" aria-describedby="password-requirements"></input>

          <label htmlFor="confirm-password">Confirm new password</label>
          <input type="password" name="confirm-password" id="confirm-password" aria-describedby="password-requirements"></input>
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

        <button type="submit">Reset Password</button>
      </form>
    </>
  )
}

export default App
