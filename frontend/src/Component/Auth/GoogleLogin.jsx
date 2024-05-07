import React
// { useEffect } 
from 'react'
// import { API_URL } from '../../config'

const GoogleLogin = () => {

    // useEffect(()=>{
    //     apiLogin()

    // },[])
    // const url = `${API_URL}/api/v1/ecommerce/products?page=1&limit=10`
    // console.log(url,"......")
    // const apiLogin=async()=>{
    //     const data = await fetch (url)
    //     const getValue = await data.json()
    //     console.log(getValue,"oj......")

    // }
  return (
    <>
       <form>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-5">
      <input type="email" class="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-5">
      <input type="password" class="form-control" id="inputPassword3"/>
    </div>
  </div>
  <fieldset class="row mb-3 pe-auto">
    
    <div class=" col-sm-5 cursor-pointer">
     
      Login with Google
      
    </div>
  </fieldset>
 <div className='col-sm-5'>
 <button type="submit" class="btn btn-primary">Sign in</button>

 </div>
</form>
    </>
  )
}

export default GoogleLogin