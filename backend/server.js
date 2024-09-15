const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const port = 3000;

// CONNECTION
const dbconfig = {
    user: 'system',
    password: 'rameez',
    connectionString: 'localhost:1521/orclpdb'
};
async function insertMobile(data) {
    console.log(data);
    let connection;
    try {
        console.log("Making Connection...");
        connection = await oracledb.getConnection(dbconfig);
        console.log("Connection Successful...");


        const insertProductDetailsQuery = `
      BEGIN
        InsertProductDetails (
          :p_brandName,
          :p_origin,
          :p_ram,
          :p_rom,
          :p_battery,
          :p_processor,
          :p_chargingSpeed,
          :p_network,
          :p_productName,
          :p_price
        );
      END;
    `;

        const bindParams = {
            p_brandName: data.brandName,
            p_origin: data.origin,
            p_ram: data.ram,
            p_rom: data.rom,
            p_battery: data.battery,
            p_processor: data.processor,
            p_chargingSpeed: data.chargingSpeed,
            p_network: data.network,
            p_productName: data.prodName,
            p_price: data.price
        };

        // Execute the procedure through the server
        const result = await connection.execute(insertProductDetailsQuery, bindParams);

        await connection.commit();
        console.log("Data committed successfully.");
        return { success: true };

    } catch (err) {
        console.log("Database Connection Failed: " + err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// ############### INSERT USER DATA ##########

async function insertCustomerOrder(data) {
    console.log(data);
    let connection;
    try {
        console.log("Making Connection...");
        connection = await oracledb.getConnection(dbconfig);
        console.log("Connection Successful...");

        const insertCustomerOrderQuery = `
            BEGIN
                InsertCustomerOrder(
                    :p_name,
                    :p_email,
                    :p_phone,
                    :p_address,
                    TO_DATE(:p_orderDate, 'YYYY-MM-DD'),
                    TO_DATE(:p_deliveryDate, 'YYYY-MM-DD'),
                    :p_productName
                );
            END;
        `;

        const bindParams = {
            p_name: data.name,
            p_email: data.email,
            p_phone: data.phone,
            p_address: data.address,
            p_orderDate: data.orderDate,
            p_deliveryDate: data.deliveryDate,
            p_productName: data.productName
        };

        const result = await connection.execute(insertCustomerOrderQuery, bindParams);
        await connection.commit();
        console.log("Data committed successfully.");
        return { success: true };
    } catch (err) {
        console.log("Database Connection Failed: " + err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


app.post('/submit', async (req, res) => {
    const data = req.body;
    try {
        // console.log("data:", data);
        if (req.query.id == 1) {
            await insertCustomerOrder(data);
        }
        else {
            await insertMobile(data);
        }
        res.json({ message: 'Mobile data inserted successfully' });
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({ message: 'Failed to insert mobile data' });
    }
});


// ######################################

async function findData(prodName) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbconfig);
        const result = await connection.execute(
            `select * from products where product_name = :prodName`,
            [prodName.slice(0)]
        )

        return result.rows;


    }

    catch (err) {
        console.log(err)
    }
}

app.get('/getData', async (req, res) => {
    const prodName = req.query.prodName;
    try {
        const data = await findData(prodName);
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})

// ###### DELETE WALA KAAM ###############

async function deleteMobile(prodName){
  let connection;
  try{
      connection = await oracledb.getConnection(dbconfig);
      const result = await connection.execute(
          `delete from products where product_name = :prodName`,
          [prodName],   { autoCommit: true }
      );
      console.log(result)
  }
  catch(error){
      console.log("ERROR WHILE DELETING DATA: "+error.message)
  }
  finally{
      if(connection){
          try{
              await connection.close();
              console.log("Database Connection Closed.");
          }
          catch(err){
              console.log("Error While closing the database connection:",err)
          }
      }
  }
}

app.delete('/delete' , async (req,res)=>{
  const prodName = req.query['prodName ']
  console.log(prodName)
  
  try{
      const orderDelete  = await deleteMobile(prodName);
  }
  catch(err){
      console.log("ERROR: "+err.message);
      res.status(500).json({ message: "Internal Server Error" });
  }

})

app.listen(port, () => console.log(`Server Running At http://localhost:${port}/`));
