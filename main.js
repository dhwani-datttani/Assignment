const submit=document.getElementById("submit");
        const loginform=document.getElementById("loginForm");
       
        function login(){
            const message=document.getElementById("message");
            console.log("i am getting called")
            const username=document.getElementById("username").value;
            const password=document.getElementById("password").value;

            const request={
                login_id:username,
                password:password
            };

            console.log(JSON.stringify(request))

            fetch("https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",{
               method:"post",
               body:JSON.stringify(request),
               headers: {
                        'content-type': 'application/json',
                        //'Access-Control-Allow-Origin': '*'
                    }
                
            })
            .then(response => {
                console.log(response)
                
                if (!response.ok) {
                     throw new Error("Network response was not ok");
                }
                return response.json();
            })
            
            .then(data =>{
                console.log("here",data)
                if(data.token){
                    const token=data.token;
                    message.innerText="Authentication successful. Bearer token: " + token;
                }
                else{
                    message.innerText=error;
                }
            })
            .catch(error =>{

                message.innerText=error;
            });
        }
        function createCustomerForm(){
            const customerData={
                first_name:document.getElementById("first_name").value,
                last_name:document.getElementById("last_name").value,
                street:document.getElementById("street").value,
                address:document.getElementById("address").value,
                city:document.getElementById("city").value,
                state:document.getElementById("state").value,
                email:document.getElementById("email").value,
                phone:document.getElementById("phone").value,
            };
            console.log(first_name)
            if(first_name === null|| first_name === "" || first_name === undefined){
                alert("first name is mandatory!!")
                return
            }
            if(last_name === null ||last_name === ""|| last_name === undefined){
                alert("first name is mandatory!!")
                return
            }
            const token='dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
            const api="https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create";

            const request={
                method:"post",
                headers:{
                    'content-type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                    'cmd':'create'
                },
                body:JSON.stringify(customerData)
            };
            console.log("i am getting called")  
            fetch(api,request)
            console.log("i entered")
            console.log(first_name)
            .then(response => {
                if (response.status === 200) {
                     return response.json();
                } 
                else { 
                    return response.json().then(data => {
                    console.error("API Error: First Name or Last Name is missing");
                });
            }
       
         
    })
}
             