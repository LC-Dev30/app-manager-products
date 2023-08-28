import {FormEvent, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginClientService } from '../services/serviceClient';
import Swal from 'sweetalert2'

export const Login = () => {
    localStorage.clear()
    const route = useNavigate()

    const [stopCarga,setStopCarga] = useState(false)

    async function loginClient(userAccount:FormEvent){
        setStopCarga(true)
        userAccount.preventDefault();
       try {
        const res = await loginClientService(userAccount)
         
        if(res?.data != null && res.status == 200){
            localStorage.setItem('tokenClient',res.data.token)
            const dataString = JSON.stringify(res.data.clientValidation.data)
            localStorage.setItem('dataClient',dataString)   
            setStopCarga(false)
            return route('/products');     
        }

       } 
       catch (error:any) {
        setStopCarga(false)
        Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2500
    })
       }
    }
    
    return (
        <section>
        <h2 className='text-center bg-light text-muted'>Welcome</h2>
        <div className='d-flex justify-content-center'>
          <div hidden={!stopCarga} className="spinner-border" role="status">
            {/* Spinner content */}
          </div>
        </div>
        <form onSubmit={loginClient} className="container col-md-6 col-lg-4 card p-3 mt-5">
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Email address</label>
            <input name='email' type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Password</label>
            <input name='password' type="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Access</button>
          <div className="text-center">
            <span className="text-link">You do not have an account? <Link to={"/register"}>Create an account</Link></span>
          </div>
        </form>
      </section>
      
)
}