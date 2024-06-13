const express=require("express")
const {getChat,saveChat,updateChat,deleteChat}=require("../Controller/chatController")
const router=express()
// router.get('/',(req,res)=>{
//     res.json("Hello")
// })

router.get('/get',getChat)
router.post('/save',saveChat)
router.put("/update/:id", updateChat);
router.delete("/delete/:id", deleteChat);

module.exports=router;