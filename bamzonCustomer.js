/**
 * Created by Emiliya Vuntsova on 4/27/17.
 */
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database:"Bamazon"
});

connection.connect(function(err) {
    console.log("WELCOME! THANK YOU FOR SHOPPING AT BAMAZON!");
    if (err) throw err;
    runQuestions();
});

var runQuestions = function () {
    connection.query("SELECT * FROM products", function (err,res) {
        var table = new Table({
            head: ['ID', 'Name','$ / €', 'Price']
            , colWidths: [10, 80,8, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name,res[i].currency, res[i].price]
            );
        }
        console.log(table.toString());

        inquirer.prompt({
            name: "number",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        }).then (function (answer) {
            for (var i  = 0;i<res.length; i++){
                if(res[i].item_id == answer.number){
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name:"units",
                        type:"input",
                        message:"How many do you want to buy?",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }).then (function (answer) {

                        if(chosenItem.stock_quantity > parseInt(answer.units)){
                            console.log(
                                "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" +
                                "\n===============================================================================" +
                                "\nYour TOTAL is:" +chosenItem.currency+answer.units*chosenItem.price +"  \nThank you for your business!\nPlease come back soon!" +
                                "\n===============================================================================\n" +
                                "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
                            
                            // runQuestions();

                        }else {
                            console.log(
                                "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" +
                                "\n===============================================================================" +
                                "\nWe are sorry but currently we have " +chosenItem.stock_quantity +" items available! \nPlease place a new order " +
                                "or choose a new item! \nThank you!" +
                                "\n===============================================================================\n" +
                                "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
                            runQuestions();

                        }

                    })
                }
            }

        })
    })
};
