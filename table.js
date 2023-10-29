    const token='dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
        function getList(){
            fetch("https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list",{
                method:"get",
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(response =>response.json())
            .then(data =>{
            // console.log(data)
                this.cust=data
                const table=document.querySelector("table");
                table.innerHTML=`
                <tr>
                <th>First Name</th>
                <th>Last Name</th>s
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
            </tr>
            ${data.map(customer =>
            `<tr data-uuid="${customer.uuid}">
                <td>${customer.first_name}</td>
                <td>${customer.last_name}</td>
                <td>${customer.address}</td>
                <td>${customer.city}</td>
                <td>${customer.state}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td class="action-buttons">
                    <button class="delete-button" onclick=" deleteCustomer('${customer.uuid}')">-</button>
                    <span class="edit-icon" onclick="visitUpdatePage('${customer.uuid}')">&#9998;</span>

                </td>
            </tr>
            `).join(' ')}
            `;
            });
        }
        function deleteCustomer(uuid){
            fetch(`https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=`+uuid,{
                method:"post",
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'content-type': 'application/json',

                }
            })
            .then(response =>{
                if (response.status === 200) {
                const trow=document.querySelector(`tr[data-uuid="${uuid}"]`);
                if (trow){
                    trow.remove();
                }
                else{
                    console.log("error")
                }
            }
            else if (response.status === 500) {
                console.error("Error: Not deleted");
            }
            else {
                console.error("API Error: Unknown error with status code " + response.status);
            }
            })
            .catch(error =>{
                console.log(error)
            });

                document.querySelector("table").addEventListener("click", function (event) {
                    if (event.target.classList.contains("delete-button")) {
                        const uuid = event.target.closest("tr").getAttribute("data-uuid");
                        deleteCustomer(uuid);
                    }
                });
            
    }
    function visitUpdatePage(uuid){
        console.log("setting cust here ",uuid)
        this.edit_cust=uuid;
        location.replace("http://127.0.0.1:5500/update_customer.html?data="+uuid)
        getList();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('data');
    console.log(uuid)
function updateCustomerForm(){
  console.log("i am getting called")
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
    if(first_name === null || first_name === undefined){
        alert("first name is mandatory!!")
        return
    }
    if(last_name === null || last_name === undefined){
        alert("first name is mandatory!!")
        return
    }
    
    const token='dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM='
    const api="https://cors-anywhere.herokuapp.com/https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid="+uuid;

    const request={
        method:"post",
        headers:{
            'content-type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(customerData)
    };
    console.log("i am getting called")  
    fetch(api,request)

    .then(response => {
        console.log(response)
        
        if (!response.ok) {
             throw new Error("Network response was not ok");
        }else{
            alert("updated succesfully")
        return response.json();
        }
    })
        .catch(error => {
            console.log(error);
        });
    }
getList();