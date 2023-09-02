let form = document.querySelector("form")
let main = document.querySelector(".main")
let clearall = document.querySelector("#clr")
// console.log(form)
form.addEventListener("submit" ,(event)=>{
    let name = event.target.uname.value;
    let email =event.target.email.value
    let phone = event.target.phone.value
    let checkStatus = 0;
    event.preventDefault()
    // console.log(name, email,phone)
// console.log(event)

//send data to ocal storage we always push data into the local storage 
//first we get previous data of local sotrage and then push new data
//data in localstorage always will be in the form of string 
//  use json.parse method which give data in original form,array ,object
//at first time theire will be no data in the local storage so it will give [] at place of null
let userData = JSON.parse(localStorage.getItem("userDetail")) ?? [];

//logic that stop same data into localstorage
//use for of loop 
//in for of loop the variable v stora the  one value at a time 
//in array the v holds the values like 10,15
//in objects array v variable holds the objects ,by acess the object5 key we track the values of 
//objet
for (const v of userData) {
    // console.log(v.name)
    if (v.email ==email || v.phone == phone){
        checkStatus=1;
        //if there is 100 entrys it will loped 100 time 
        // so use break key word it will terminste the at its first accrance
        break; 
    }
        // console.log(checkStatus)

}
// console.log(checkStatus)
// is same data founded it will alert
if(checkStatus == 1){
    alert("Email and phone number already exits")
}
// if match not found else it will store the data
else{
// take userDetail data from localstorage and add user data object array
userData.push({
    'name' : name , 
    'email' : email , 
    'phone' : phone  

})
//set data at localstorage by key name userDetail and data into the form of string
localStorage.setItem("userDetail",JSON.stringify(userData))
//call display function to display data after sumition without refresh the page 
display()
//reset the form elment
event.target.reset()
// console.log(userData)
}
} )


// display data in in main block each object creates her own block
let display = ()=>{
    let userData = JSON.parse(localStorage.getItem("userDetail")) ?? [];
// console.log(userData)
finalData =" ";
// foreach loop's ele,emt hold the object and i hold index of array
userData.forEach((element,i )=> {
    // console.log(element)
    // console.log(i)
    finalData +=`<div class="items">
    <span onclick=remove(${i})>&times;</span>
    <h5>Name</h5>
    <div>${element.name}</div>
    <h5>E-mail</h5>
    <div>${element.email}</div>
    <h5>phone</h5>
    <div>${element.phone}</div>
</div>`

});
main.innerHTML = finalData;

}
let remove=(index)=>{
// alert(index)
let userData = JSON.parse(localStorage.getItem("userDetail")) ?? [];
userData.splice(index,1)
localStorage.setItem("userDetail",JSON.stringify(userData))
display();
}

clearall.addEventListener("click", ()=>{
    localStorage.clear("userDetail")
    display();
})
display();