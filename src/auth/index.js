import { getMySeller } from "../services/seller-service"

//
export const isLogedIn=()=>{
    let data =localStorage.getItem("data")
    if(data != null){
        return true
    }else{
        return false
    }
}


// do login
export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    data.user.roles.map(role=>{
        if(role.name==="ROLE_SELLER"){
            getMySeller().then(data=>{
                localStorage.setItem("seller",JSON.stringify(data))
            })
            
        }
    })
    next();
}

export const isSeller=()=>{
    let seller = localStorage.getItem("seller")
    if(seller!= null){
        return true
    }else{
        return false
    }
}

export const getCurrentSellerDetails=()=>{
    if(isSeller()){
        return JSON.parse(localStorage.getItem("seller"))
    }else{
        return undefined
    }
}

export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}

export const getCurrentUserDetail=()=>{
    if(isLogedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    }else{
        return undefined
    }
}

export const getUserRoles=()=>{
    if(isLogedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user?.roles;
    }else{
        return undefined
    }
}

export const getToken=()=>{
    if(isLogedIn){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return undefined
    }
}