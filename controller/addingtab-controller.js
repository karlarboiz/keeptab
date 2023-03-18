const AddingTab = require('../models/addingtab-mvc')

const addingtab = async (req,res)=>{
    const customers = await AddingTab.fetchCustomers();
    const products = await AddingTab.fetchProducts();
    const logtab = await AddingTab.fetchLogTabs();

    res.render('addingtab',{
        customers:customers,
        products:products,
        logtab:logtab
    })
}

const addingtabData = async (req,res)=>{
    const products = await AddingTab.fetchProducts();
    const customers = await AddingTab.fetchCustomers();
    const logtab = await AddingTab.fetchLogTabs();
    res.json({products,customers,logtab})
}

const addingtabDataEntry = async(req,res,next)=>{
    const saveTab = new AddingTab(req.body.c_id,req.body.c_name,
        req.body.p_id, req.body.p_name,
        req.body.productTabNumber,
        req.body.total)
    
    try {
        await saveTab.saveTab();
    }
    catch(error){
        return next(error)
    }

    res.json({message: "Tab has been added!"})
}

const editLogtab = async (req,res)=>{

    const logtab = new AddingTab(null,null,null,
        null,null,null,req.params.id)
   
    try {
        await logtab.fetchSpecificLogtab()
    }
    catch(error){
        return next(error)
    }

    res.json({logtab})
  
}

const editLogtabUpdate = async (req,res)=>{

    const logtab = new AddingTab(req.body.c_id,req.body.c_name,
        req.body.p_id, req.body.p_name,
        req.body.productTabNumber,
        req.body.total,req.params.id)
    
    try {
        await logtab.saveTab()

    }
    catch(error){
        return next(error)
    }
    

    res.json({message: "Tab has been updated!"})
  
}

const deleteLogtab = async (req,res)=>{
    const logtab = new AddingTab(null,null,null,
        null,null,null,req.params.id)

    try {
        await logtab.deleteTab();

    }
    catch(error){
        return next(error)
    }

    res.json({message: 'Tab has been deleted!'})

}


module.exports = {
    addingtab:addingtab,
    addingtabData:addingtabData,
    addingtabDataEntry:addingtabDataEntry,
    editLogtab:editLogtab,
    deleteLogtab:deleteLogtab,
    editLogtabUpdate:editLogtabUpdate
}