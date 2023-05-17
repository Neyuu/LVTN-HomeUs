const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const Invoice = require("./models/Invoice.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const querystring = require("qs");
const crypto = require("crypto");   

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

function formatDate(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}


app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password, isBooker, img, avatar } = req.body;

  try {
    if (isBooker) {
      const userDoc = await User.create({
        name,
        email,
        isBooker,
        avatar,
        img,
        acceptBooker: false,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } else {
      const userDoc = await User.create({
        name,
        email,
        avatar,
        isBooker: false,
        acceptBooker: false,
        password: bcrypt.hashSync(password, bcryptSalt),
        balanceCoin : 0
      });
      res.json(userDoc);
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(400).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id, avatar,address,phone,cmnd,issuedBy,dateEx, balanceCoin } = await User.findById(userData.id);
      res.json({ name, email, _id, avatar,address,phone,cmnd,issuedBy,dateEx , balanceCoin});
    });
  } else {
    res.json(null);
  }
});

app.get("/detail-profile/:id", async(req, res) => {
  const { name } = await User.findById(req.params.id);
      res.json({ name});
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    package,
    personBooker,
    status,
    areas,
    numberBed
  } = req.body;

  const packageLong = {
    longPackageDate: package[0].longPackageDate,
    price: package[0].price,
  };

  const packageShort = {
    shortPackageDateStart: package[1].shortPackageDateStart,
    shortPackageDateEnd: package[1].shortPackageDateEnd,
    price: package[1].price,
  };

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      packageLong,
      packageShort,
      personBooker,
      status,
      memberStatus: false,
      isExpired: false,
      isVip:false,
      areas,
      numberBed
    });
    res.json(placeDoc);
  });
});

app.post("/add-comment/:id", async(req, res) => {
  try {
    const data = req.body;
    Place.findOne({ _id: req.params.id })
      .then(user => 
      {
        console.log(user.reviews);
        if (user.reviews.length > 0) {
          const review = {
            idUser: data.idUser,
            comment: data.comment
          };
          const old = [
            ...user.reviews
          ]
          Place.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $push: {
                reviews: {
                  $each: [review],
                  $position: 0, 
                  $slice: -10, 
                  $sort: { createdAt: -1 } 
                }
              }
            },
             { new: true }  
           ).then(s => {
             if(s)
             res.json({ message: 'thành công'});        
           })
        } else {
          const review = {
            idUser: data.idUser,
            comment: data.comment
          };
          Place.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $push: {
                reviews: {
               $each : [review]
             } } },
             { new: true }  
           ).then(s => {
             if(s)
             res.json({ message: 'thành công'});        
           })
       }
    }
    )
    
    

    // checkPlace.set({ 
    //   reviews: [review]
    // })
    // await checkPlace.save();
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  })

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id)
    .populate("personBooker")
    .populate({
      path: "reviews",
      populate: {
        path: "idUser",
        model: "User",
      },
    })
  );
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    package,
    personBooker,
    price,
    status,
    areas,
    numberBed
  } = req.body;

  const packageLong = {
    longPackageDate: package[0].longPackageDate,
    price: package[0].price,
  };

  const packageShort = {
    shortPackageDateStart: package[1].shortPackageDateStart,
    shortPackageDateEnd: package[1].shortPackageDateEnd,
    price: package[1].price,
  };

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        packageLong,
        packageShort,
        personBooker,
        price,
        status,
        areas,
    numberBed
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.delete("/remove-room/:id", async (req, res) => {
  try {
    const deletePlacePromise = Place.findOneAndDelete({ _id: req.params.id });
    const deleteBookingsPromise = Booking.deleteMany({ place: req.params.id });

    await Promise.all([deletePlacePromise, deleteBookingsPromise]);

    res.status(200).json('ok');
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put("/change-status/:id", async (req, res) => {
  const id = req.params.id;
  const placeDoc = await Place.findById(id);
  placeDoc.set({
    status: req.body.status,
  });
  await placeDoc.save();
  res.json("ok");
});

app.get("/places-all/:id", async (req, res) => {
  const idd = req.params.id;
  if (idd == 'null') {
    const listAll = await Place.find({ status: true, memberStatus: false, isVip: false });
    
    for (const item of listAll) {
      const today = new Date(item.dateCurrent);
      const timeExpired = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
      if (today < timeExpired) {
        console.log('hi');
      } else {
        console.log('man');
        await Place.findByIdAndUpdate(item._id, { isVip: true ,isExpired: true });
      }
    }
    
    const updatedList = await Place.find({ status: true, memberStatus: false, isVip: false  });
    res.json(updatedList);
  } else {
    const listAll = await Place.find({ status: true, memberStatus: false, isVip: false});
    
      for (const item of listAll) {
        const today = new Date(item.dateCurrent);
        const timeExpired = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
        if (today < timeExpired) {
          console.log('hi');
        } else {
          console.log('man');
          await Place.findByIdAndUpdate(item._id, { isVip: true ,isExpired: true });
        }
      }
      
      const updatedList = await Place.find({ status: true, memberStatus: false, isVip: false , owner: { $ne: idd }  });
      res.json(updatedList);
  }
});

app.get("/place-not-vip/:id", async (req, res) => {
  if (req.params.id == 'null') {
    const listAll = await Place.find({ status: true, memberStatus: false, isVip: true, isExpired: false });
    
      for (const item of listAll) {
        const today = new Date(item.dateCurrent);
        const timeExpired = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
        if (today < timeExpired) {
          console.log('hi');
        } else {
          console.log('man');
          await Place.findByIdAndUpdate(item._id, { isVip: true, isExpired: true });
        }
      }
      
      const updatedList = await Place.find({ status: true, memberStatus: false, isVip: true, isExpired: false  });
      res.json(updatedList);
  } else {
    const listAll = await Place.find({ status: true, memberStatus: false, isVip: true, isExpired: false});
    
    for (const item of listAll) {
      const today = new Date(item.dateCurrent);
      const timeExpired = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
      if (today < timeExpired) {
        console.log('hi');
      } else {
        console.log('man');
        await Place.findByIdAndUpdate(item._id, { isVip: true, isExpired: true });
      }
    }
    
    const updatedList = await Place.find({ status: true, memberStatus: false, isVip: true, isExpired: false , owner: { $ne: req.params.id }  });
    res.json(updatedList);
  }
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    place,
    checkIn,
    checkOut,
    user,
    booker,
    userMain,
    typeOption,
    numberOfNights,
    price,
  } = req.body;
  // const placeDoc = await Place.findById(place);

  // console.log(placeDoc);
  //   await placeDoc.set({
  //     memberStatus: true
  //   });
  await Place.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(place) },
    { memberStatus: true }
  );
  await Booking.create({
    place,
    checkIn,
    checkOut,
    booker,
    numberOfNights,
    typeOption,
    userMain,
    price,
    status: "booking",
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id })
    .populate("place")
    .populate({
      path: "reviews",
      populate: {
        path: "idUser",
        model: "User",
      },
    })
  );
});

app.get("/bookings/receipt", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ userMain: userData.id })
    .populate("place")
    .populate({
      path: "reviews",
      populate: {
        path: "idUser",
        model: "User",
      },
    })
  );
});

app.get("/get-all-rooms", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await await Place.find().populate("owner"));
});

app.get("/get-all-user", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const data = await User.find();

  const modify = data.filter((el) => el._id !== userData._id);

  if (modify) {
    res.json({ data: modify });
  }
});

app.get("/get-all-user-booker", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const data = await User.find({ isBooker: true });
  if (data) {
    res.json({ data: data });
  }
});

app.get("/get-all-user-booker-active", async (req, res) => {
  // const userData = await getUserDataFromReq(req);
  const data = await User.find({ isBooker: true, acceptBooker: true });
  if (data) {
    res.json({ data: data });
  }
});



app.delete(`/remove-user/:id`, async (req, res) => {
  const id = req.params;

  if (id) {
    const vId = mongoose.Types.ObjectId(id);
    await User.findOne({ _id: vId }).remove().exec();
    res.json({ data: "delete success" });
  }
  
});

app.put("/approval-booker-status/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const user = await User.findById(id);
  user.set({
    acceptBooker: status,
  });
  await user.save();
  res.json("ok");
});

app.get("/detail-booker/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("listProject");
  if (user) {
    res.json({ data: user });
  }
});

app.get("/get-list-booking-all", async (req, res) => {
  const booking = await Booking.find({})
    .populate("place")
    .populate({
      path: "place",
      populate: {
        path: "owner",
        model: "User",
      },
    })
    .populate("user");
  if (booking) {
    res.json({ data: booking });
  }
});

app.get("/get-list-booking-booker/:id", async (req, res) => {
  const booking = await Booking.find({ booker: req.params.id })
    .populate("place")
    .populate({
      path: "place",
      populate: {
        path: "owner",
        model: "User",
      },
    })
    .populate("user");
  if (booking) {
    res.json({ data: booking });
  }
});

app.get("/get-list-detail-booker/:id", async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id })
    .populate("place")
    .populate({
      path: "place",
      populate: {
        path: "owner",
        model: "User",
      },
    })
    .populate("user");
  if (booking) {
    res.json({ data: booking });
  }
});

app.put("/update-status/:id", async (req, res) => {
  const a = await Booking.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { status: req.body.status },
  );
  if (a) {
    const item = await Booking.findOne({_id: req.params.id});
    if (req.body.status == 'cancel') {
      await Place.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(item.place) },
      { memberStatus: false },
      )
      console.log('====================================');
      console.log('update code');
      console.log('====================================');
    }
    res.json("success");
    }
});

app.put("/update-service/:id", async (req, res) => {
  const response = await Booking.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
      { service: req.body.service },
  )

  if (response) {
    await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(response.user)},
      {
        balanceCoin: req.body.balanceCoin
      }
      )
      return res.status(200).json('success');
  }
})

app.post("/add-service-comment/:id", async(req, res) => {
  try {
    const data = req.body;
    Booking.findOne({ _id: req.params.id })
      .then(user => 
      {
        console.log(user.reviews);
        if (user.reviews.length > 0) {
          const review = {
            idUser: data.idUser,
            comment: data.comment
          };
          const old = [
            ...user.reviews
          ]
          Booking.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $push: {
                reviews: {
                  $each: [review],
                  $position: 0, 
                  $slice: -10, 
                  $sort: { createdAt: -1 } 
                }
              }
            },
             { new: true }  
           ).then(s => {
             if(s)
             res.json({ message: 'thành công'});        
           })
        } else {
          const review = {
            idUser: data.idUser,
            comment: data.comment
          };
          Booking.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
              $push: {
                reviews: {
               $each : [review]
             } } },
             { new: true }  
           ).then(s => {
             if(s)
             res.json({ message: 'thành công'});        
           })
       }
    }
    )
    
    

    // checkPlace.set({ 
    //   reviews: [review]
    // })
    // await checkPlace.save();
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  })

app.put("/update-profile/:id", async (req, res) => {
  const input = req.body;
  await User.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
    ...input
  },
  )
  res.json("success");
})

app.get("/profile-show", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const data = await User.findById(userData.id);
      res.json(data);
    });
  } else {
    res.json(null);
  }
});

app.get("/filter-by-name/:name", async (req, res) => {
  const name = req.params.name;
  const data = await Place.find({ title: {$regex: name, $options: 'i'} ,status: true, memberStatus: false, isExpired: false});
  if (data) {
    res.json({ data: data });
  }
});


app.get("/filter-by-price/:name/:type", async (req, res) => {
  const name = req.params.name;
  const type = req.params.type;

  const renderPrice = (type) => {
    let pr1 = 0;
    let pr2 = 0;
  
    if (type === 'small') {
      pr1 = 2000000;
      pr2 = 5000000;
    } else if (type === 'medium') {
      pr1 = 5000000;
      pr2 = 10000000;
    } else {
      pr1 = 10000000;
      pr2 = 100000000;
    }
    return {
      pr1,
      pr2
    }
  }

  const renderP = renderPrice(name);

  if (type === 'packageShort') {
    Place.find({ 'packageShort.price': { $gt: renderP.pr1 , $lt: renderP.pr2 }, status: true, memberStatus: false, isExpired: false , isVip: true}, (err,data) => {
    if (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    } else {
      res.json({ data: data });
    }
  });
  } else {
    console.log('====================================');
    console.log('long');
    console.log('====================================');
    Place.find({ 'packageLong.price': { $gt: renderP.pr1 , $lt: renderP.pr2 } , status: true, memberStatus: false, isExpired: false}, (err,data) => {
      if (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      } else {
        res.json({ data: data });
      }
    });
  }
});


app.get("/filter-by-type/:name", async (req, res) => {
  const name = req.params.name;
  Place.find({ '[name]price': {$lte: 5000000}}, (err,data) => {
    if (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    } else {
      res.json({ data: data });
    }
  });
});

app.put("/update-coin/:id", async (req, res) => {
  const input = req.body;
  await User.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
    ...input
  },
  )
  res.json("success");
})

app.put("/add-to-time-expried/:id", async (req, res) => {

  await Place.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      isExpired: req.body.isExpired,
      dateCurrent: req.body.dateCurrent
    }
  );
  
  await User.findByIdAndUpdate(req.body.idUser, { balanceCoin: Number(req.body.balance) - 100 });

  return res.status(200).json('success')
})

app.put("/add-to-time-expried-vip/:id", async (req, res) => {

  await Place.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      isVip: req.body.isVip,
      isExpired: false,
      dateCurrent: req.body.dateCurrent
    }
  );
  
  await User.findByIdAndUpdate(req.body.idUser, { balanceCoin: Number(req.body.balance) - 300 });

  return res.status(200).json('success')
})

const tmnCode = '7EH8TCJO';
const secretKey = 'JAXJBTTFSSTFNGHLOFOCHYOLWPULIKHP';
const url = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const returnUrl ='http://127.0.0.1:5173/orderSuccess?';

app.post("/vnp-payment-confirmation", async (req, res) => {

  const {
    amount
  } = req.body;

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  
    let vnpUrl = url;
    const date = new Date();
  
    const createDate = formatDate(date);
  const orderId = 'ssssss';
  
  var locale = "vn";
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Amount"] = amount*100;
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_BankCode"] = "NCB";
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_OrderInfo"] = "Nap tien cho thue bao 0123456789";
  vnp_Params["vnp_OrderType"] = "billpayment";
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_TxnRef"] = 'ooo';
  vnp_Params["vnp_Version"] = "2.0";


  vnp_Params = sortObject(vnp_Params);

  var signData =  querystring.stringify(vnp_Params, { encode: false });

  // var secureHash = sha256(signData);
  var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 

  // vnp_Params["vnp_SecureHashType"] = "SHA256";
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

  res.status(200).json({ code: "00", data: vnpUrl })
})

function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

app.get("/api/config/paypal", (req, res) => {
  res.send('AaiOR0UuKrkTaDWKtlae81PRr3enX2RBcxrcpX39uHH2VJy1ntxfIu3LuU8wOgey8oHm4SzH3cwqM5N5');
});

app.get("/list-invoice", async (req, res) => {
  const data = await Invoice.find().sort({ _id: -1 });

  if (data) {
    return res.json(data);
  }
})

app.post("/invoice", async (req, res) => {
  
  const {name,
    idUser,
    coin,
    note,
    status,
    type} = req.body
  await Invoice.create({
    name,
idUser,
coin,
note,
status,
type
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});


app.listen(4000);
