export type ListProduct = {
   idProduct:number,
   name:string,
   description:string,
   price:number,
   category:string
}

export type AddProduct = {
  Name:string 
  Description:string 
  Price: string
  Category:string
}

export type UpdateProduct = {
  IdProduct:number
  Name:string 
  Description:string 
  Price: string
  Category:string
}

export type LoginModel = {
  Gmail:string,
  Password:string
}

export type AddClient = {
  NamesAndSurnames:string,
  Phone:string,
  Gmail:string,
  Password:string
}

export interface ProspList {
  listProduct:ListProduct[]
  updateProduct:any
}

export type ClientData = {
email:string,
namesAndSurnames:string
phone:string
}
