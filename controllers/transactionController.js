const express = require("express");
const allTransactions = require("../models/transactions");
const transactions = express.Router();

transactions.get("/", (req, res) => {
    res.json(allTransactions);
});

transactions.get("/:id", (req, res) => {
    const { id } = req.params;

    if(allTransactions[id]){
        res.json(allTransactions[id]);
    } else {
        res.status(404).json({error: "Transaction not found"});
    }
});

transactions.post("/", (req, res) => {
    allTransactions.push(req.body);
    res.json(allTransactions[allTransactions.length-1]);
});

transactions.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    if(allTransactions[id]){
        let deletedTransaction = allTransactions.splice(id, 1);
        res.json(deletedTransaction)
    } else {
        res.status(404).json({error: "Transaction not found"})
    }
});

transactions.put("/:id", (req, res) => {
    const { id } = req.params;

    if(!allTransactions[id]){
        res.status(422).json({
            error: "Transaction not found"
        });
        return;
    }

    let { name, amount, date, from } = req.body;
    if(name && (Number.isFinite(Number(amount))) && date && from){
        allTransactions[id] = {
            name, amount, date, from
        };
        res.json(allTransactions[id]);
    } else {
        res.status(422).json({
            error: "Please provide all fields"
        });
    }
});

module.exports = transactions;