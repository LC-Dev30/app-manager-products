import { FormEvent } from "react";
import {deleteData, getData, postData, updateData} from './requestApi'
import { AddProduct, UpdateProduct } from "../models/product.model";


export async function serviceGetProduct(){
  const listProducts = await getData('https://localhost:7210/api/Products/Products')

  if(listProducts != null){
    return listProducts;
  }
}

export async function serviceCreateProduct(e:FormEvent){

  let url = 'https://localhost:7210/api/Products/Product'
  const target = e.target as HTMLFormElement
  const formData = new FormData(target);

  const productData: AddProduct = {
    Name: formData.get("Name") as string,
    Description: formData.get("Description") as string,
    Price: formData.get("Price") as string,
    Category: formData.get("Category") as string,
  };
   
  return await postData(url,productData)
}

export async function serviceProductUpdate(eventForm:FormEvent,idProduct:number){
  const form = eventForm.target as HTMLFormElement
  let formdata = new FormData(form)
  
  let clientUpdate:UpdateProduct = {
    IdProduct: idProduct,
    Name: formdata.get('Name') as string,
    Description: formdata.get('Description') as string,
    Price: formdata.get('Price') as string,
    Category: formdata.get('Category') as string
  }

  let res = await updateData('https://localhost:7210/api/Products/Product',clientUpdate) 
  return res;
}

export async function serviceProductDelete(idProduct:number){

  const resApi = await deleteData(`https://localhost:7210/api/Products/Product/${idProduct}`)

  if(resApi?.status == 200){
    return true;
  }
  return false;
}



