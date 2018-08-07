class Block{
  constructor(){
  	this.index=0
  	this.previousHash=""
  	this.hash=""
  	this.nonce=0
  	this.transaction=[]
  }
  get key(){
  	return JSON.stringify(this.transaction)+this.index+this.previousHash+this.hash+this.nonce
  }
  addTransaction(transaction){
  	this.transaction.push(transaction)
  }
}
module.exports=Block