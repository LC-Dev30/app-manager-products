import { FormEvent } from "react"
import {registerClientService} from '../services/serviceClient'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

export const Register = () => {

    const route = useNavigate()

    async function registerClient(formClient: FormEvent){
       formClient.preventDefault();

       const registerConfirm = await registerClientService(formClient);
       
       if(registerConfirm){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'account registered successfully',
            showConfirmButton: false,
            timer: 2500
        })
       }
    }

    return (
        <div className="d-flex flex-column">
        <button onClick={() => route('/')} className="btn btn-link">Atras</button>
        <form onSubmit={registerClient} className="container card col-md-6 col-lg-4 p-3 needs-validation mt-3" noValidate>
          <h3 className="text-center text-muted">Create Account</h3>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Your name</label>
            <input type="text" name="name" className="form-control" id="validationCustom01" placeholder="names and surnames" required />
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Phone</label>
            <input type="tel" name="phone" className="form-control" id="validationCustom02" required />
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Gmail</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <input type="text" name="gmail" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
              <div className="invalid-feedback">
                Please choose a username.
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Password</label>
            <input name="pass" type="password" className="form-control" placeholder="at least 6 characters" id="validationCustom03" required />
            <div className="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Confirm Password</label>
            <input name="passConfirm" type="password" className="form-control" id="validationCustom05" required />
            <div className="invalid-feedback">
              Please provide a valid zip.
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">Create</button>
          </div>
        </form>
      </div>
      
)
}