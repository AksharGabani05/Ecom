const Admin = require("../model/admin")
const nodemailer = require("nodemailer") ;
const path = require("path");
const fs = require('fs');
const { log } = require("console");
//login
module.exports.login = async(req,res)=>{
    if(req.user){
        console.log(req.user)
        return res.redirect("/admin/dashbored")
    }
    else{
  
        return res.render('login')
    }
}
//logout

module.exports.dashbored = async(req,res)=>{
    if(req.user){
        return res.render("dashbored")
    }
}
module.exports.add_admin = async(req,res)=>{
    if(req.user == undefined){
        return res.redirect("/admin/dashbored")
    }
    var adminrecord = req.user
    return res.render("add_admin",{
        record : adminrecord,
    })
}
//insert admin 
module.exports.insertadminrecord = async(req,res)=>{
    
    try {
            let imgpath = '';
            req.body.name = req.body.fname+" "+req.body.lname;
            if(req.file){
                imgpath = await Admin.Adminimagepath + "/"+req.file.filename;
                
            }
            req.body.Admineimage = imgpath;
            req.body.IsActive = true;
            req.body.Create_Date = new Date().toLocaleString();
            req.body.Upadate_Date = new Date().toLocaleString();
            req.body.role = 'admin';
            let AdminData = await Admin.create(req.body); 
          
    
            if(AdminData){
                    // console.log("admin recored inserted");
                    req.flash("success","admin record add ssuccessfully")
                    return res.redirect('back');
              
            }
        
            else{
                console.log("admin recored is not found")
            }  
         
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.view_admin = async(req,res)=>{
    let search = '';
    if(req.query.search){
        search= req.query.search
    }
    // console.log(req.query.search);
    if(req.query.page){
        page = req.query.page;
    }
    else{
        page = 0
    }
    var perpage =4;

    let adminrecord = await Admin.find({IsActive:true,
        $or :[
            {"name":{$regex:".*"+search+".*", $options:"i"}},
            {"email":{$regex:".*"+search+".*" , $options:"i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);

    let AdminePage = await Admin.find({IsActive:true,
        $or :[
            {"name":{$regex:".*"+search+".*", $options:"i"}},
            {"email":{$regex:".*"+search+".*" , $options:"i"}}
        ]
    }).countDocuments();
    console.log(adminrecord);
    if(adminrecord){
        var adminre = req.user;
        return res.render("view_admin",{
            admines : adminrecord,
            record : adminre,
            search: search,
            totalDocument : Math.ceil(AdminePage/perpage),
            curentpage :page
        })
    }
    else{
        console.log('somthing went worng');
        return res.render("view_admin")
    }
}
module.exports.view_deactive_admin = async(req,res)=>{
    let search = '';
    if(req.query.search){
        search= req.query.search
    }
    // console.log(req.query.search);
    if(req.query.page){
        page = req.query.page;
    }
    else{
        page = 0
    }
    var perpage = 2;

    let admindeactive = await Admin.find({IsActive:false,
        $or :[
            {"name":{$regex:".*"+search+".*", $options:"i"}},
            {"email":{$regex:".*"+search+".*" , $options:"i"}}
        ]
    })
    .limit(perpage)
    .skip(perpage*page);
    let AdminePage = await Admin.find({IsActive:false,
        $or :[
            {"name":{$regex:".*"+search+".*", $options:"i"}},
            {"email":{$regex:".*"+search+".*" , $options:"i"}}
        ]
    }).countDocuments();
    if(admindeactive){
        return res.render("view_deactive_admin",{
            admines : admindeactive,
            search: search,
            totalDocument : Math.ceil(AdminePage/perpage),
            curentpage :page
        })
    }
    else{
        console.log('somthing went worng');
        return res.render("view_admin")
    }
}
module.exports.isactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await Admin.findByIdAndUpdate(req.params.id,{IsActive:false})
            if(active){
                console.log("data is deactive Successfully");
                return res.redirect('back');
            }
            else{
                console.log("record is not deactivate");
                return res.redirect('back');
            }
        }
        else{
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.isdeactive = async(req,res)=>{
    try{
        if(req.params.id){
            let active = await Admin.findByIdAndUpdate(req.params.id,{IsActive:true})
            if(active){
                console.log("data is active Successfully");
                return res.redirect('back');
            }
            else{
                console.log("record is not activate");
                return res.redirect('back');
            }
        }
        else{
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.profile = async(req,res)=>{
    let adminprofile = await Admin.find({});
  
    if(adminprofile){
        let adminrecrd =req.user
        return res.render("profile",{
            adminprofile : adminprofile,
            record:adminrecrd
        })
    }
    else{
        console.log("profile is not found")
        return res.redirect('back')
    }
}
module.exports.editprofile = async(req,res)=>{
    try{
        if(req.user == undefined)
        {
            return res.redirect("/admin")
        }
        return res.render("editprofile",{
            record : req.user
        })
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.updateprofile = async(req,res)=>{
    try{
        if(req.file){
            let oldData = await Admin.findById(req.body.EditId);
            // console.log(oldData)
            req.body.name = req.body.fname+" "+req.body.lname;
            if(oldData){
                // console.log(oldData);
                if(oldData.Admineimage){
                    let FullPath = path.join(__dirname,"..",oldData.Admineimage);
                    await fs.unlinkSync(FullPath);
                }
                var adminimgpath =  Admin.Adminimagepath+"/"+req.file.filename;
                req.body.Admineimage = adminimgpath;
          
                let ad  = await Admin.findByIdAndUpdate(req.body.EditId,req.body);
                if(ad){
                    console.log("Record & Image Update Succesfully")
                    return res.redirect('/admin/profile');
                }
                else{
                    console.log("Record Not Updated");
                    return res.redirect('/admin/profile');
                }
            }
            else{
                console.log("Record Not Updated");
                return res.redirect('/admin/profile');
            } 
        }
        else{
            let oldData = await Admin.findById(req.body.EditId);
            if(oldData){
               
                
                req.body.Admineimage = oldData.Admineimage;
                
                req.body.name = req.body.fname+" "+req.body.lname;
                let ad  = await Admin.findByIdAndUpdate(req.body.EditId,req.body);
                if(ad){
                    console.log("Record Update Succesfully")
                    return res.redirect('/admin/profile');
                }
                else{
                    console.log("Record Not Updated");
                    return res.redirect('/admin/profile');
                }
            }
            else{
                console.log("Record Not Updated");
                return res.redirect('/admin/profile');
            }
        }
    }
    catch(err){
        console.log("page is not defind..")
        return res.render('error')
    }
}
module.exports.updaterecord = async(req,res)=>{
    try{
        // console.log(req.user)
        // console.log(req.params.id)
        let adminRecord = await Admin.findById(req.params.id);
        if(adminRecord){
            var adminrecord = req.user;
            return res.render('update_admin',{
                admindata: adminRecord,
                record:adminrecord
            })
        }
        else{
            console.log('Record Not Found');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("page is not defind..")
        return res.render('error')
    }
}
module.exports.editeadmindata = async(req,res)=>{
    try{
        if(req.file){
            let oldData = await Admin.findById(req.body.EditId);
            // console.log(oldData)
            req.body.name = req.body.fname+" "+req.body.lname;
            if(oldData){
                // console.log(oldData);
                if(oldData.Admineimage){
                    let FullPath = path.join(__dirname,"..",oldData.Admineimage);
                    await fs.unlinkSync(FullPath);
                }
                var adminimgpath =  Admin.Adminimagepath+"/"+req.file.filename;
                req.body.Admineimage = adminimgpath;
          
                let ad  = await Admin.findByIdAndUpdate(req.body.EditId,req.body);
                if(ad){
                    console.log("Record & Image Update Succesfully")
                    return res.redirect('/admin/view_admin');
                }
                else{
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else{
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            } 
        }
        else{
            let oldData = await Admin.findById(req.body.EditId);
            if(oldData){
               
                
                req.body.Admineimage = oldData.Admineimage;
                
                req.body.name = req.body.fname+" "+req.body.lname;
                let ad  = await Admin.findByIdAndUpdate(req.body.EditId,req.body);
                if(ad){
                    console.log("Record Update Succesfully")
                    return res.redirect('/admin/view_admin');
                }
                else{
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else{
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
    }
    catch(err){
        console.log("page is not defind..")
        return res.render('error')
    }


}
module.exports.delterecrod = async(req,res)=>{
    try{
        let oldData = await Admin.findById(req.params.id);
        if(oldData){
            var oldImage = oldData.Admineimage;
            if(oldImage){
                let FullPath = path.join(__dirname,"..",oldData.Admineimage);
                await fs.unlinkSync(FullPath);
                let DeleteRecord =await Admin.findByIdAndDelete(req.params.id);
                if(DeleteRecord){
                    console.log("Record and Image Delete Succesfully");
                    res.redirect('back');
                }
                else{
                    console.log("Record Delete Succesfully");
                    res.redirect('back');
                }
            }
            else{
                let DeleteRecord =await Admin.findByIdAndDelete(req.params.id);
                if(deletPostData){
                    console.log("Admin Data Delet");
                    res.redirect('back');
                }
                else{
                    console.log("Admin Data Delet");
                    res.redirect('back');
                }
            }
        }
        else{
            console.log("Record Not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("somthing wrong..")
        return res.render('error')
    }
}
module.exports.chacklogin = async(req,res)=>{
    try{
        req.flash("success","login ssuccessfully")
        return res.redirect("/admin/dashbored")
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
//changepassword
module.exports.updatepassword = async(req,res)=>{
    try{
        return res.render("updatepassword",{
            record:req.user
        })
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.changepassword = async(req,res)=>{
    try{
        var adminrecord = req.user;
        if(adminrecord.password == req.body.cpassword){
            if(req.body.cpassword != req.body.npassword){
                if(req.body.npassword == req.body.copassword){
                    let alladmin = await Admin.findById(adminrecord._id);
                    if(alladmin){
                        let editpass = await Admin.findByIdAndUpdate(alladmin.id,{'password':req.body.npassword});
                        if(editpass){
                            return res.redirect("/admin/logout");
                        }
                        else{
                            console.log("password is not Updated");
                        }
                    }
                    else{
                        console.log("record is not found")
                    }
                }
                else{
                    console.log("new password and Conform password is not match")
                }
    
            }
            else{
                console.log("curent password and new password is same please enter difrent password")
            }
        }
        else{
            console.log("curent password and old password is not match")
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
// forget password
module.exports.chackemail = async(req,res)=>{
    try{
        let chackemailData = await Admin.findOne({email:req.body.email})
        if(chackemailData){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "kanabarakshar08@gmail.com",
                    pass: "gqknxppjugdonurf",
                },
            });

            const otp = Math.floor(Math.random()*5000)+4999;
            res.cookie('otp',otp);
            res.cookie('email',chackemailData.email);
            // send mail with defined transport object
            const info = await transporter.sendMail({
            from: 'kanabarakshar08@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "otp", // Subject line
            text: "otp is hear", // plain text body
            html: `<b>your otp is ${otp}</b>`, // html body
        });
        if(info){
            return res.redirect('/admin/otppage')
        }
        else{
            console.log("somthing went wrongs");
            return res.redirect('back')
        }
        // console.log("email is valid");

        }
        else{
            console.log("email is not match pleace enter valid email id");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.chakotp = async(req,res)=>{
    try{
        // console.log(req.body) //this otp use for user in email
        // console.log(req.cookies) // this otp use for devlopers in cookies or browser
        let  fotp =  req.body.otp;
        if( fotp == req.cookies.otp){
            return res.redirect('/admin/creatpass')
        }
        else{
            console.log("can't match otp");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}
module.exports.verfypass =  async(req,res)=>{
    try{
        if(req.body.npassword == req.body.copassword){
            // res.cookie('email',email);
            let email = req.cookies.email;
            let chackemailrecord = await Admin.findOne({email:email});
            if(chackemailrecord){
                let resetpass = await Admin.findByIdAndUpdate(chackemailrecord.id,{'password':req.body.npassword});
                if(resetpass){
                    res.clearCookie('otp');
                    res.clearCookie('email');
                    return res.redirect('/admin/')
                }
                else{
                    console.log("password is not change!!");
                    return res.redirect('back')
                }
            }
            else{
                console.log("email recrd is not found!!");
                return  res.redirect('back')
            }
        }
        else{
            console.log("new password and conform password is not match");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.render('error')
    }
}