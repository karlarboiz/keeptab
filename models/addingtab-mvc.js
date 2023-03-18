const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
const database = require('../database/database');


class AddingTab {
    constructor(cid,cname,pid,pname,pnumber,total,id) {
        this.cid = cid,
        this.cname = cname,
        this.pid = pid,
        this.pname = pname,
        this.pnumber = pnumber,
        this.total = total

        if(id) {
            this.id = new ObjectId(id)
        }
    }

    static async fetchCustomers(){
       const customers = await database.getDbFunc().collection('customers').find().toArray();
        return customers;
    }

    static async fetchProducts(){
        const products = await database.getDbFunc().collection('products').find().toArray();
        return products;
    }

    static async fetchLogTabs(){
        const logtab = await database.getDbFunc().collection('logtab').find().toArray();
        return logtab;
    }

    async fetchSpecificLogtab() {

        if(!this.id) {
            return;
        }

        const logtabDoc = await database.getDbFunc().collection('logtab').findOne({_id: this.id});
        this.cid = logtabDoc.cid;
        this.pid = logtabDoc.pid;
        this.pnumber = logtabDoc.pnumber;
        this.total = logtabDoc.total;
    }


    async saveTab() {

        if(this.id) {
            await database.getDbFunc().collection('logtab').updateOne({
                _id: this.id
            },{
                $set:{
                    cid:this.cid,
                    cname: this.cname,
                    pid:this.pid,
                    pname: this.pname,
                    pnumber: this.pnumber,
                    total: this.total,
                    date: new Date()
                }
            });
        
        }else {
            await database.getDbFunc().collection('logtab').insertOne({
                cid:this.cid,
                cname: this.cname,
                pid:this.pid,
                pname: this.pname,
                pnumber: this.pnumber,
                total: this.total,
                date: new Date()
            });
        
        }
           
    }

    async deleteTab() {
        
        if(!this.id) {
            return;
        }

        await database.getDbFunc().collection('logtab').deleteOne({_id: this.id});
    }

}

module.exports = AddingTab;