let sha = require('js-sha256')
let Block = require('./block')
let transactions = require('./transaction')
class Blockchain{
	constructor(genesisBlock){
		this.blocks=[]
		this.addBlock(genesisBlock)
	}

addBlock(block){
	if(this.blocks.length == 0){
		block.previousHash="000000000000000"
		block.hash=this.generateHash(block)
	}
	this.blocks.push(block)

}

getNextBlock(transactions){
	let block = new Block()
   transactions.forEach(function(transaction){
   	block.addTransaction(transaction)

   })
   let previousBlock= this.getPreviousBlock()
   block.index=this.blocks.length
   block.previousHash=getPreviousBlock.hash
   block.hash=this.generateHash(block)
   return block 

}

getPreviousBlock(block){
	return this.blocks[this.blocks.length-1]
}

getNextBlock(transactions){
	let block = new Block()
	transactions.forEach(function(transaction){
		block.addTransaction(transaction)
	})


 let previousBlock = this.getPreviousBlock()

    block.index=this.blocks.length
    block.previousHash=previousBlock.hash
    block.hash=this.generateHash(block)
    return block
}
generateHash(block){
	let hash = sha(block.key)

	while(!hash.startsWith('00')){
		block.nonce += 1
		hash=sha(block.key)
		console.log(hash)

	}
	return hash
}
}
module.exports=Blockchain