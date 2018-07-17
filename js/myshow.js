         //数据
         var datas = [
            [[{
                "div":"resize-item1",
                "color":"#fff",
                "font_size":"22px",
                "top":"10%",
                "left":"40%",
                "text":"地 球"
             },{
                "div":"resize-item2",
                "color":"rgb(30, 186, 242)",
                "top":"35%",
                "left":"8%",
                "font_size":"14px",
                "text":"我们的家园"  
             }],
             {
                  "background_image":"url('images/1.jpg')"
             }],
             [[{
                   "div":"resize-item1",
                   "color":"#fff",
                   "font_size":"24px",
                   "top":"15%",
                   "left":"30%",
                   "text":"太空漫步"
                }],
                {
                   "background_image":"url('images/3.jpg')"
                }
             ],[[{
                   "div":"resize-item1",
                   "color":"#fff",
                   "font_size":"24px",
                   "top":"2%",
                   "left":"60%",
                   "text":"我就是我"
                }],
                {
                   "background_image":"url('images/7.jpg')"
                }
             ]
         ]
         ajaxFun();
         function ajaxFun(){
            //根据数据生成
            if(datas.length>0){
                for(var i=0;i<datas.length;i++){
                     $(".mydiv").eq(i).html(chuli(datas[i][0]));
                     $(".mydiv").eq(i).css("background-image",datas[i][1].background_image);
                }
               
            }

         }

         //加载数据
         function chuli(data){
             var obj=[];
             for(var i=0;i<data.length;i++){
                 obj.push("<div class='"+data[i].div+" item1 div1' style='top:"+data[i].top+";left:"+data[i].left+"'><p contenteditable='true' style='color:"+data[i].color+";font-size:"+data[i].font_size+"'>"+data[i].text+"</p></div>")
             }
             return obj.join("");
         }



