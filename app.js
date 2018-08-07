let Block = require('./Block')
let Blockchain = require('./Blockchain')
let BlockchainNode = require('./BlockchainNode')
let Transaction = require('./Transaction')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let port = 5002

process.argv.forEach(function(val,index,array){
	port= array[2]
})

if(port==undefined){
	port = 5002
}

let transactions =[]
let nodes= []

let genesisBlock= new Block()
let blockchain = new Blockchain(genesisBlock)

app.use(bodyParser.json())

app.post('/nodes/register',function(req,res){
	let nodesLists = req.body.urls
	nodesLists.forEach(function(nodeDictionary){
    let node = new BlockchainNode(nodeDictionary["url"])
    nodes.push(node)
	})
	res.json(nodes)
})

app.get('/nodes',function(req,res){
	res.json(nodes)
})


app.get('/',function(req,res){
	res.send("hello world")
} )


app.get('/mine',function(req,res){
	let block =blockchain.getNextBlock(transactions)
	blockchain.addBlock(block)
	transactions=[]
	res.json(block)

})

app.post('/transactions',function(req,res){
	let to = req.body.to
	let from = req.body.from
	let amount =req.body.amount 

	let transaction = new Transaction(from,to,amount)
	transactions.push(transaction)
	res.json(transaction)
})


app.get('/blockchain',function(req,res){
	res.json(blockchain)
})

app.listen(port,function(){
	console.log('server has started')
})
