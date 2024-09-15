


const insert = document.querySelector('.insertSubmit')
if (insert) {
    insert.addEventListener('click', () => {
        const data = {
            brandName: document.getElementById('brand_name').value,
            prodName: document.getElementById('product_name').value,
            ram: document.getElementById('ram').value,
            rom: document.getElementById('rom').value,
            battery: document.getElementById('battery').value,
            processor: document.getElementById('processor').value,
            chargingSpeed: document.getElementById('charging_speed').value,
            network: document.getElementById('network').value,
            price: document.getElementById('price').value,
            origin: document.getElementById('origin').value
        }

        fetch('http://localhost:3000/submit', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert("Mobile Inserted Successfully!!")
                }
            })

    })
}



// ################# FOR DETAIL HTML #################

const userDetail = document.querySelector('.userDetail')

if(userDetail){
    userDetail.addEventListener('click', (event)=>{
        event.preventDefault()
        let productName = location.href.slice(43).replace('%20' , " ");
        let productPrice = location.href.slice(location.href.lastIndexOf('s')+1).replace('%20' , " ");
       

        const data = {
            name : document.getElementById('name').value,
            email : document.getElementById('email').value,
            phone : document.getElementById('phone').value,
            address : document.getElementById('address').value,
            orderDate : document.getElementById('orderDateInput').value,
            deliveryDate : document.getElementById('deliveryDateInput').value,
            productName : productName,
        }
      
        fetch('http://localhost:3000/submit?id=1',{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)

        })
        .then(response =>{
            if(response.ok){
                alert("Data Inserted Successfully!!")
            }
        })
    })
}


