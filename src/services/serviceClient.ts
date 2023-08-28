import { FormEvent } from "react";
import { AddClient, LoginModel } from "../models/product.model";
import { postData } from "./requestApi";

export async function loginClientService(userAccount:FormEvent){
    const form = userAccount.target as HTMLFormElement
    let formData = new FormData(form);

    const client:LoginModel = {
        Gmail: formData.get("email") as string,
        Password: formData.get("password") as string
    }

    const resultApi = await postData('https://localhost:7210/api/Login/login',client)
    
    if(resultApi != null && resultApi.status == 200){        
        return resultApi; 
    }

    return resultApi;
}

export async function registerClientService(formEvent: FormEvent){
   let targetForm = formEvent.target as HTMLFormElement

   const formData = new FormData(targetForm);

   const dataClient:AddClient= {
       NamesAndSurnames: formData.get('name') as string,
       Phone:formData.get('phone') as string,
       Gmail: formData.get('gmail') as string,
       Password: formData.get('pass') as string
   }

   const resApi = await postData('https://localhost:7210/api/Login/register',dataClient);

   if(resApi?.status == 200){
     return true
   }
   return null;
}