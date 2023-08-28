import {FormEvent} from 'react';
import {serviceCreateProduct} from '../services/crudProduct'

export function Modal(){

  async function capturarValues(eventForm:FormEvent){
    eventForm.preventDefault();
    await serviceCreateProduct(eventForm);
  }
         
return (
<div className="modal fade" id={"exampleModal"} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h1 className="modal-title fs-5 text-center text-secondary" id="exampleModalLabel">New Product</h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
      <form onSubmit={capturarValues}>
        <div className="mb-3">
          <label className="col-form-label">Product Name:</label>
          <input name='Nombre' type="text" className="form-control"/>
        </div>
        <div className="mb-3">
          <label  className="col-form-label">Descrition:</label>
          <textarea name='Descripcion' className="form-control" id="message-text"></textarea>
        </div>
        <div className="mb-3">
          <label className="col-form-label">Price:</label>
          <input name='Precio' type="number" className="form-control" id="recipient-name"/>
        </div>
        <div className="mb-3">
          <label className="col-form-label">Category:</label>
          <select name='Categoria' className="form-select">
              <option value="1">Technology</option>
              <option value="2">Electronics</option>
              <option value="3">Clothes</option>
              <option value="3">other</option>
          </select>
        </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
    </div>
      </form>
    </div>
  </div>
</div>
</div>
)
}