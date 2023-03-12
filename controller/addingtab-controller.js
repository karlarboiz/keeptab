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
    res.json({products,customers})
}

const addingtabDataEntry = async(req,res)=>{
    const saveTab = new AddingTab(req.body.c_id,req.body.c_name,
        req.body.p_id, req.body.p_name,
        req.body.productTabNumber,
        req.body.total)
    await saveTab.saveSubject();

    res.json({})
}


module.exports = {
    addingtab:addingtab,
    addingtabData:addingtabData,
    addingtabDataEntry:addingtabDataEntry
}