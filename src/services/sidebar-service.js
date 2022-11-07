export var isSidebarActive = false;

export const sidebarToggler=()=>{

        //console.log("sidebar()")
        var sideElement =document.getElementById("sideNavbar");
        var bodyElement =document.getElementById("bodyArea");
          if(!isSidebarActive){ 
            sideElement.classList.add("sideNavbar")
            bodyElement.classList.add("bodyArea")
            //setIsSidebarActive(true)
            isSidebarActive=true
          }else{
             // console.log("active tha")
            sideElement.classList.remove("sideNavbar")
            sideElement.style.display="none";
            bodyElement.classList.remove("bodyArea")
            //setIsSidebarActive(false);
            isSidebarActive=false
          }
}