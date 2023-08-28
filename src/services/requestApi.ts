import axios from "axios";

export async function getData(url:string){
    try{
      let response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('tokenClient')}`
        }
      })

      if(response.status != 200){
         throw new Error()
      }

      return await response.data;
    }
    catch(err){
      //console.log(err);   
    }
}

export async function postData(url:string,data:any){
  try{
    const res = await axios.post(url,data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenClient')}`
      }
    })

    if(res.status == 200 || 201){
      return res;
    }
  }

  catch(err:any){
    console.log(err);
    
    switch (err.request.status) {
      case 400:
        throw new Error('Datos incorrectos o campos vacios')
      case 401:
        throw new Error('Sin Autorizacion')
      case 404:
        throw new Error('No encontrado')
      case 500:
        throw new Error('Problemas en el servidor')
      default:
        throw new Error('Ha ocurrido un problema')
    }
  }
}

export async function updateData(url:string,data:any){
  try{
    const res = await axios.put(url,data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenClient')}`
      }
    })

    if(res.status == 200){
      return res;
    }
  }
  catch(err:any){
    console.log(err);
  }
}

export async function deleteData(url:string){
  try{
    const res = await axios.delete(url,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenClient')}`
      }
    })
    if(res.status == 200){
      return res;
    }
  }
  catch(err:any){
    console.log(err);
  }
}