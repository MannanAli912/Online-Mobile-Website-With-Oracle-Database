




const deleteBtn = document.getElementById('delete')

const prodName = document.getElementById('product_id')

deleteBtn.addEventListener('click', (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/getData?prodName=${prodName.value}`)
        .then(response => response.json())
        .then(data => {
            let table = document.querySelector('.data');
            console.log(data);
            table.innerHTML = `
        <table class="table table-striped text-center" >
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand Id</th>
                    <th>Specification ID</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(row => `
                    <tr>
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                        <td>${row[3]}</td>
                        <td class="deleteIcon"><i class="fa-solid fa-trash-can" style="color: #f41010;} "></i></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `
            const deleteIcon = document.querySelector('.deleteIcon');
            deleteIcon.addEventListener('mouseover', () => {
                deleteIcon.style.cursor = 'pointer';
            })
            deleteIcon.addEventListener('click', (event) => {
                console.log(prodName.value)
                fetch(`http://localhost:3000/delete?prodName =${prodName.value}`, {

                    method: 'DELETE'
                })
                    .then((response => {
                        if (response.ok) {
                            alert("Data Deleted Successfully")
                        }
                    }))


            })
        })
})




