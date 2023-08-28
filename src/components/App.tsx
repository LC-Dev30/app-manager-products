import {FormEvent, useEffect,useState,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceCreateProduct, serviceGetProduct, serviceProductDelete, serviceProductUpdate } from '../services/crudProduct';
import { ClientData, ListProduct } from '../models/product.model';
import {optionsCategory} from '../services/util'
import Swal from 'sweetalert2'
import '../css/util.css'

export const App = () => {
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

    const route = useNavigate();
    
    const p_Name = useRef<HTMLInputElement>(null)
    const p_description = useRef<HTMLTextAreaElement>(null)
    const p_price = useRef<HTMLInputElement>(null)
    const p_category = useRef<HTMLSelectElement>(null)

    const [textButton,setTextButton] = useState('Add')
    const [textModal,setTextModal] = useState('Add Product')
    const [listProduct,setListProduct] = useState<ListProduct[]>([])
    const [idProduct,setIdProduct] = useState(0)
    const [ListUI,setListUI] = useState(false)
    const [clientData,setClientData] = useState<ClientData>()
    
    useEffect(() => {
      if(localStorage.getItem('tokenClient') == null){
        route('/');
        return;
      }
   
      serviceGetProduct()
      .then(e => {
        setListProduct(e.data)
        getDataClient()
      })
      .catch(() => {
        route('/')
      });
     setListUI(false)
    },[ListUI])
    
    //get data client
    function getDataClient(){
      let cadenaObj = localStorage.getItem('dataClient');
  
      if(cadenaObj){
          let client:ClientData = JSON.parse(cadenaObj)
          if(client != null){
            setClientData(client)
          }
        }
      }
      
    //create product
async function _createProduct(eventForm:FormEvent){
    try {
      eventForm.preventDefault();

    if(textButton == 'Update'){
        _updateProduct(eventForm)
        return;
    }

    await serviceCreateProduct(eventForm);

    Toast.fire({
      icon: 'success',
      title: 'Added Product'
    })

    setListUI(true)
    } catch (error:any) {
      Toast.fire({
        icon: 'error',
        title: error.message
      })
    }
 }

    //get Product values for Update
    async function _getProductValue(productId: number) {
      setIdProduct(productId);
      const searchProduct = listProduct.find(product => product.idProduct === productId);
  
      if (!searchProduct) return;
  
      const { name, description, price, category } = searchProduct;
      const indexCategory = optionsCategory.findIndex(c => c.name === category);
  
      if (p_Name.current && p_description.current && p_price.current && p_category.current) {
          setTextButton('Update');
          setTextModal('Update Product');
          p_Name.current.value = name;
          p_description.current.value = description;
          p_price.current.value = price.toString();
          p_category.current.selectedIndex = indexCategory !== -1 ? indexCategory : 0;
      }
  }
  

//  update product
    async function _updateProduct(eventForm:FormEvent) {
        eventForm.preventDefault()
        let res = await serviceProductUpdate(eventForm,idProduct)

        if(res?.status == 200){
            setIdProduct(0);
            Toast.fire({
              icon: 'success',
              title: 'Updated Product'
            })
            setListUI(true)
        }
    }

    //delete product
    async function _deleteProduct(idProduct:number){
       const confirmDelete = confirm('Are you sure you want to delete the product?')

       if(confirmDelete){
        const res = await serviceProductDelete(idProduct)

        if(res){
          Toast.fire({
            icon: 'success',
            title: 'Deleted Product'
          })
          setListUI(true)
        }
      }
    }

    //inputs and button modal reset
    function _inputAndButtonReset(){
        setTextModal('Add Product')
        setTextButton('Add')
     if (p_Name.current && p_description.current && p_price.current && p_category.current){
        p_Name.current.value = '';
        p_description.current.value = ''
        p_price.current.value = ''
        p_category.current.value = ''
     }
   }

   // Sign off funtion
   function SignOff(){
     localStorage.clear()
     route('/')
   }
      
    return (
      <main>
      <div className='d-flex justify-content-between p-2'>
        <h4 className='card-header text-center p-2'>-{clientData?.namesAndSurnames}-</h4>
        <div className="dropdown">
        
        <img className='img_configuraciones dropdown-toggle' id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" src="./src/assets/images/configuraciones.png" alt="" />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button onClick={SignOff} className="text-danger dropdown-item" type="button">Sign off</button></li>
          </ul>
        </div>
      </div>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="card p-4 m-3">
          <h2 className="text-center mb-4 card-header text-muted">Product Manager</h2>
          <div className='d-flex justify-content-between'>
            <button onClick={_inputAndButtonReset} type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">New Product</button>
            <span>amount: <strong className='text-muted'>{listProduct.length}</strong></span>
          </div>
          {/* table the products */}
          <div className="table-responsive mt-3">
            <table className="table table-hover">
              <thead className='table-dark'>
                <tr>
                  <th scope="col" className='text-white'>Product Name</th>
                  <th scope='col' className='text-white'>Description</th>
                  <th scope="col" className='text-white'>Price</th>
                  <th scope="col" className='text-white'>Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  listProduct.map((e: ListProduct) => (
                    <tr key={e.idProduct}>
                      <td className="col-6 col-md-3">{e.name}</td>
                      <td className="col-12 col-md-4">{e.description}</td>
                      <td className="col-6 col-md-2 col-lg-1 text-success">RD${e.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="col-6 col-md-3 col-lg-2 d-flex align-items-center gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => _getProductValue(e.idProduct)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Edit</button>
                        <button onClick={() => _deleteProduct(e.idProduct)} className="btn btn-danger">Eliminate</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {listProduct.length === 0 ? <span className='text-center'>There is no products to display.</span> : ""}
        </div>
      </div>
    
      {/* Window Modal */}
      <div className="modal fade" id={"exampleModal"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="text-center text-secondary" id="exampleModalLabel">{textModal}</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={_createProduct}>
                <div className="mb-3">
                  <label className="col-form-label">Product Name:</label>
                  <input ref={p_Name} name='Name' type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Description:</label>
                  <textarea ref={p_description} name='Description' className="form-control" id="message-text"></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Price:</label>
                  <input ref={p_price} name='Price' type="number" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category:</label>
                  <select ref={p_category} name='Category' className="form-select">
                    {
                      optionsCategory.map((option,i) => (
                        <option key={i} value={option.value}>{option.name}</option>
                      ))
                    }   
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{textButton}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
    </main>    
)
}