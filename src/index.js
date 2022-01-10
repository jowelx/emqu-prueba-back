const express = require('express')
const app = express();
const DB = require('../db/database');
const cors = require('cors');



app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '500mb' }));
app.use(cors(/*options*/));



app.get('/',(req, res) => {

    DB.query('SELECT * FROM encuesta', (err, rows, fields) => {
      if (!err) {
        let promfb =0
        let promig =0
        let promtk=0
        let promws=0
        let promtw=0
        let redesRating= [ fb=0,ig=0,ws=0,tk=0,tw=0]
        let redes=["facebook","instagram","whatsapp","tiktok","twiter"]
        let face=[],inst=[],was=[],tik=[],twi=[]
        let df=""
        let di=""
        let dw=""
        let dtik=""
        let dtw=""
       
          rows.map(item =>{
                promfb +=Number(item.hrsfb)
                promig +=Number(item.hrsig)
                promws +=Number(item.hrsws)
                promtk +=Number(item.hrstk)
                promtw +=Number(item.hrstw)
            if(item.fav=="facebook"){
                redesRating[0]++
            }
            if(item.fav=="instagram"){
                redesRating[1]++
            }
            if(item.fav=="whatsapp"){
                redesRating[2]++
            }
            if(item.fav=="tiktok"){
                redesRating[3]++
            } 
            if(item.fav=="twiter"){
                redesRating[4]++
            }
            
           // redes.map((itemR,index)=>{
               
                if(item.fav =="facebook"){
                    face.push(item.edad)
                }
                if(item.fav =="instagram"){
                    inst.push(item.edad)
                }
                if(item.fav =="whatsapp"){
                    was.push(item.edad)
                }
                if(item.fav =="tiktok"){
                    tik.push(item.edad)
                }
                if(item.fav =="twiter"){
                    twi.push(item.edad)
                }
               
            //})
          })
         let valueMax=Math.max(redesRating[0],redesRating[1],redesRating[2],redesRating[3],redesRating[4])          
         let valueMin=Math.min(redesRating[0],redesRating[1],redesRating[2],redesRating[3],redesRating[4])  
         let od =""   
         let fav=""   
         redesRating.map((reds,index)=>{
            if(reds ==   valueMin &&index==0){
                od+=" facebook"
            }
            else if(reds ==   valueMax &&index==0){
                fav+=" facebook"
            }

            if(reds ==   valueMin &&index==1){
                od+=" instagram"
            }
            else if(reds ==   valueMax &&index==1){
                fav+=" instagram"
            }

            if(reds ==   valueMin &&index==2){
                od+=" whatsapp"
            }  
            else if(reds ==   valueMax &&index==2){
                fav+=" whatsapp"
            }

            if(reds ==   valueMin &&index==3){
                od+=" tiktok"
            }
            else if(reds ==   valueMax &&index==3){
                fav+=" tiktok"
            }

            if(reds ==   valueMin &&index==4){
                od+=" twiter"
            }
            else if(reds ==   valueMax &&index==4){
                fav+=" twiter"

            }
            
         })  
         let fa=0,fbv=0,fc=0,fd=0
         let ia=0,ib=0,ic=0,id=0
         let wa=0,wb=0,wc=0,wd=0
         let tka=0,tkb=0,tkc=0,tkd=0
         let twa=0,twb=0,twc=0,twd=0
            face.map((fb,index)=>{
              
                if(fb=="18-25"){
                    fa++
                }
                if(fb=="26-33"){
                    fbv++
                }
                if(fb=="34-40"){
                    fc++
                }if(fb=="+40"){
                    fd++
                }
                if(index ==face.length-1){
                   let dr=Math.max(fa,fbv,fc,fd)
                   df=fa==dr?"18-25":
                   fbv==dr?"26-33":
                   fc==dr?"34-40":
                   fd==dr?"+40":null

                }
            })
            inst.map((fb,index)=>{
              
                if(fb=="18-25"){
                    ia++
                }
                if(fb=="26-33"){
                    ib++
                }
                if(fb=="34-40"){
                    ic++
                }if(fb=="+40"){
                    id++
                }
                if(index ==inst.length-1){
                   let dr=Math.max(ia,ib,ic,id)
                   di=ia==dr?"18-25":
                      ib==dr?"26-33":
                      ic==dr?"34-40":
                      id==dr?"+40":null

                }
            }) 
            was.map((fb,index)=>{
               
                if(fb=="18-25"){
                    wa++
                }
                if(fb=="26-33"){
                   wb++
                }
                if(fb=="34-40"){
                    wc++
                }if(fb=="+40"){
                    wd++
                }
                if(index ==was.length-1){
                   let dr=Math.max(wa,wb,wc,wd)
                   dw=wa==dr?"18-25":
                      wb==dr?"26-33":
                      wc==dr?"34-40":
                      wd==dr?"+40":null

                }
            }) 
            tik.map((fb,index)=>{
          
                if(fb=="18-25"){
                    tka++
                }
                if(fb=="26-33"){
                    tkb++
                }
                if(fb=="34-40"){
                    tkc++
                }if(fb=="+40"){
                    tkd++
                }
                if(index ==tik.length-1){
                   let dr=Math.max(tka,tkb,tkc,tkd)
                   dtik=tka==dr?"18-25":
                      tkb==dr?"26-33":
                      tkc==dr?"34-40":
                      tkd==dr?"+40":null

                }
            }) 
            twi.map((fb,index)=>{
               
                if(fb=="18-24"){
                    twa++
                }
                if(fb=="26-33"){
                    twb++
                }
                if(fb=="34-40"){
                    twc++
                }if(fb=="+40"){
                    twd++
                }
                if(index ==twi.length-1){
                   let dr=Math.max(twa,twb,twc,twd)
                   dtw=twa==dr?"18-25":
                      twb==dr?"26-33":
                      twc==dr?"34-40":
                      twd==dr?"+40":null

                }
            })  
        res.json({
            encuestas:rows.length,
            promfb:promfb /rows.length,
            promig:promig /rows.length,
            promws:promws /rows.length,
            promtk:promtk /rows.length,
            promtw:promtw /rows.length,
            fav: fav,
            od:od,
            facebook:df,
            instagram:di,
            whatsapp:dw,
            tiktok:dtik,
            twiter:dtw

        });
      } else {
        console.log(err)
      }
    })
  })
app.post("/form",(req,res)=>{
    console.log(req.body)
    const values={
        correo: req.body.mail,
        edad: req.body.age,
        sexo: req.body.gender,
        fav: req.body.fav,
        hrsfb: req.body.hrsFB,
        hrsig: req.body.hrsIG,
        hrsws: req.body.hrsWS,
        hrstk: req.body.hrsTK,
        hrstw: req.body.hrsTW
    }
   

    DB.query('INSERT INTO encuesta SET ?',[values],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("ok")
        }

    })
   
})
app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
})