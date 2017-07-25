const express = require('express') 
const router =  express.Router() 
const fs = require('fs') 

router.use('/api/:pro/:api',(req, res)=>{
  var read = new Promise(function(resolve,reject){
    resolve(fs.readFileSync('./app/public/jsonlist/'+req.params.pro+'/'+req.params.api+'.json'))
  });
  read.then((data)=>{
    res.json({success:true,data:JSON.parse(data)})
  })
})

router.post('/changeApi',(req, res)=>{
  if(req.body.oldName!=req.body.newName){
    //Todo:判断接口是否存在
    //新接口名字不存在
    fs.renameSync('./app/public/jsonlist/'+req.body.proName+'/'+req.body.oldName+'.json',
      './app/public/jsonlist/'+req.body.proName+'/'+req.body.newName+'.json')
    fs.writeFileSync('./app/public/jsonlist/'+req.body.proName+'/'+req.body.newName+'.json',
      JSON.stringify({
        name:req.body.newName,
        apiInfo:req.body.apiInfo,
        data:JSON.parse(req.body.data)
      })
    )
    res.json({success:true})
  }else{
    //接口名未修改
    fs.writeFileSync('./app/public/jsonlist/'+req.body.proName+'/'+req.body.oldName+'.json',
      JSON.stringify({
        name:req.body.newName,
        apiInfo:req.body.apiInfo,
        data:JSON.parse(req.body.data)
      })
    )
    res.json({success:true})
  }
})

router.post('/getProApis',(req, res)=>{
  var result = []
  fs.readdir('./app/public/jsonlist/'+req.body.proName,(err, files)=>{
    files.forEach((item,index)=>{
      var data = JSON.parse(fs.readFileSync('./app/public/jsonlist/'+req.body.proName+'/'+item))
      result.push({key:index,name:data.name,apiInfo:data.apiInfo,url:req.body.proName+'/'+data.name})
    })
    res.json({success:true,data:result})
  })
})

router.post('/delPro',(req, res)=>{
  fs.readdir('./app/public/jsonlist/'+req.body.proName,(err, files)=>{
    if(files)
      files.forEach((item)=>{
        fs.unlinkSync('./app/public/jsonlist/'+req.body.proName+'/'+item)
      })
    fs.rmdirSync('./app/public/jsonlist/'+req.body.proName)
  })
  var data = JSON.parse(fs.readFileSync('./app/public/projects.json'))
  delete data[req.body.proName]
  fs.writeFileSync('./app/public/projects.json',JSON.stringify(data))
  res.json({success:true})
})

router.post('/newApi',(req, res)=>{
  //Todo:判断接口是否存在
  //接口不存在
  var data = JSON.parse(fs.readFileSync('./app/public/projects.json'))
  data[req.body.proName].push(req.body.apiName)
  fs.writeFileSync('./app/public/projects.json',JSON.stringify(data))
  fs.writeFileSync('./app/public/jsonlist/'+req.body.proName+'/'+req.body.apiName+'.json',
    JSON.stringify({
      name:req.body.apiName,
      apiInfo:req.body.apiInfo,
      data:req.body.apiData
    })
  )
  res.json({success:true})
})

router.post('/delApi',(req, res)=>{
  fs.unlinkSync('./app/public/jsonlist/'+req.body.apiPath+'.json')
  var data = JSON.parse(fs.readFileSync('./app/public/projects.json'))
  var proName,apiName;
  [proName, apiName] = req.body.apiPath.split('/')
  data[proName].splice(data[proName].indexOf(apiName),1)
  fs.writeFileSync('./app/public/projects.json',JSON.stringify(data))
  res.json({success:true})
})


router.post('/createPro',(req, res)=>{
  var read = new Promise(function(resolve,reject){
    resolve(fs.readFileSync('./app/public/projects.json'))
  });
  read.then((data)=>{
    var data = JSON.parse(data)
    data[req.body.proName] = []
    var white = new Promise(function(resolve,reject){
      resolve(fs.writeFileSync('./app/public/projects.json',JSON.stringify(data)))
    });
    white.then(()=>{
      fs.mkdir('./app/public/jsonlist/'+req.body.proName,(err,response)=>{
        if(!err) res.json({success:true})
      })
    })
  })
})

/**
 * 页面的渲染
**/
router.get('/',(req, res)=>{
  res.render('home')
})

module.exports = router