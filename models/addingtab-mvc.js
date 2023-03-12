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

    // async fetchTeacherData() {

    //     if(!this.id) {
    //         return;
    //     }

    //     const teacherDoc = await database.getDbFunc().collection('storedata').findOne({_id: this.id});
    //     this.completeName = `${teacherDoc.name.firstName} ${teacherDoc.name.middleName } ${teacherDoc.name.lastName}`
    // }


    async saveSubject() {
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

module.exports = AddingTab;