         //数据
        // var datas=[];
         var datas = [
            [
             [{
                "div":"resize-item1",
                "color":"#fff",
                "font_size":"24px",
                "top":"50px",
                "left":"2px",
                "text":"标题一",
                "id":"one"
             },{
                "div":"resize-item2",
                "color":"rgb(30, 186, 242)",
                "top":"180px",
                "left":"2px",
                "font_size":"14px",
                "text":"小标题",
                "id":"one"  
             }],
            {
                 "background_image":"url('images/1.jpg')"
            }],
            [[{
                "div":"resize-item1",
                "color":"#fff",
                "font_size":"24px",
                "top":"50px",
                "left":"2px",
                "text":"标题一",
                "id":"two"
            },{
                "div":"resize-item2",
                "color":"rgb(30, 186, 242)",
                "top":"180px",
                "left":"2px",
                "font_size":"14px",
                "text":"小标题",
                "id":"two"  
            }],
            {
                "background_image":"url('images/5.jpg')"
            }]
         ]
          ajaxFun();
          if(datas.length>0){
                for(var w=0;w<datas.length;w++){
                    $(".page ul").append("<li id='"+datas[w][0][0].id+"'>第"+(w+1)+"页</li>")
                }
          }

         function ajaxFun(){
            //根据数据生成
            if(datas.length>0){
                $("#mydiv").html(chuli(datas[0][0]));
                $("#mydiv").css("background-image",datas[0][1].background_image);
            }else{
                 $("#mydiv").html("");
                 $("#mydiv").css("background-image","initial");
            }
            new ZResize({  
                stage: "#content,#header", //舞台  
                item: '.div1', //可缩放的类名  
            }); 
            $(".div1").on("click",d_click);
         }

         //加载数据
         function chuli(data){
             var obj=[];
             for(var i=0;i<data.length;i++){
                 obj.push("<div class='"+data[i].div+" item1 div1' style='top:"+data[i].top+";left:"+data[i].left+"'><p contenteditable='true' style='color:"+data[i].color+";font-size:"+data[i].font_size+"'>"+data[i].text+"</p></div>")
             }
             return obj.join("");
         }
        //点击新增页
        $("#new").click(function(){
            var index_li = $(".page li").length;
            $(".page ul").append("<li onclick='new_li()'>第"+index_li+"页</li>");
        })
        //新的一页默认无数据加载
        function new_li(){
              datas = [];
              ajaxFun(); 
        }
        //显示当前所在页码
        $(document).on("click",".page li:not('#new')",function(){
             $(this).addClass("page_active").siblings().removeClass("page_active");
        })


        //第一页
        $("#one").on("click",function(){
            datas = [[
                [{
                    "div":"resize-item1",
                    "color":"#fff",
                    "font_size":"24px",
                    "top":"50px",
                    "left":"2px",
                    "text":"标题一"
                },{
                    "div":"resize-item2",
                    "color":"rgb(30, 186, 242)",
                    "top":"180px",
                    "left":"2px",
                    "font_size":"14px",
                    "text":"小标题"  
                }],
                {
                    "background_image":"url('images/1.jpg')"
                }
            ]];
            ajaxFun(); 
        })
        //第二页
        $("#two").click(function(){
            datas = [[
                [{
                    "div":"resize-item1",
                    "color":"#222",
                    "font_size":"24px",
                    "top":"50px",
                    "left":"2px",
                    "text":"大标题一"
                },{
                    "div":"resize-item2",
                    "color":"rgb(30, 186, 242)",
                    "top":"180px",
                    "left":"2px",
                    "font_size":"16px",
                    "text":"小标题1"  
                }],
                {
                    "background_image":"url('images/4.jpg')"
                }
            ]];
            ajaxFun(); 
        })

        //添加文本
        $("#Add_text").click(function(){
            var g = $(".div1").length+1;
            $("#mydiv").append("<div class='resize-item"+g+" item1 div1' style='top:200px;left:10px;'><p contenteditable='true'>可编辑的文字</p></div>");
            $(".resize-panel").remove();
            new ZResize({  
                stage: "#content,#header", //舞台  
                item: '.div1', //可缩放的类名  
            }); 
            $(".div1").on("click",d_click);
        })
        //添加背景
        $("#Add_background").click(function(){
            //页面层
            layer.open({
                type: 1,
                title: '背景选择',
                skin: 'layui-layer-rim', //加上边框
                area: ['1200px', '500px'], //宽高
                content: $("#pic").show(),
                end:function(){
                    $("#pic").hide();
                }
            });
        })
        //选择背景事件
        $(".pic_zs img").click(function(){
             var bg_src = $(this).attr("src");
             $("#mydiv").css("background-image","url("+bg_src+")")
             $(".layer-anim .layui-layer-close").click();
        })

        //处理拖动和编辑的逻辑判读
        var flag_drag = true;
        var index;  //选中的第几个div1

        $(document).on('dblclick','.div1',function(){  
            if(!flag_drag){ 
                $(this).find("p").css("z-index","10");  //可以拖动
                $(this).css("cursor","auto");
                flag_drag = true; 
            }
        })

        $(".div1").on("click",d_click);
        //点击div的click事件
        function d_click(){
            var s = 0;
            if(index!=$(this).index()){  //换了另一个div
                flag_drag = true;
            }

            if(flag_drag){ 
                $(this).find("p").css("z-index","0");  //可以拖动
                $(this).css("cursor","move");
                flag_drag = false; 
            }
            //加载右侧编辑框
            layer.open({
                type: 1,   
                title: '样式编辑',
                shadeClose: true,
                area: ['300px', '500px'],
                shade: 0,
                resize:true,
                skin: 'demo-class',
                content:$("#compareCon").show(),
                offset:'r',
                closeBtn :'1',
                maxmin:false, //开启最大化最小化按钮
                end:function(){
                    $("#compareCon").hide()
                }
            });
            index = $(this).index(); 
            df();
        }
         //点击样式编辑前获取样式
         function df(){
              var dom = $(".div1:eq("+index+") p"); //获取当前的选择要编辑的内容
              $("#fontSize").val(dom.css('font-size'));
              $("#Color").val(dom.css('color'));
              $(".trigger").attr("value",dom.css('color'));
              $('.trigger').colorPicker()
         }

         //动态改变编辑区文字的样式
         $("#compareCon .form-group input").change(function(){
             edit();
         })
         function edit(){   
             $(".div1:eq("+index+") p").css({ //编辑时改变当前div的样式
                // "color":$("#Color").val(),
                 "font-size":$("#fontSize").val()
             })
         }
         //点击了空白处
        $("#content").click(function(){
             $(".layer-anim .layui-layer-close").click();
        })
        $(document).on('click',".cp-xy-slider,.cp-z-slider",function(){
             var font_color = $(".trigger div div").css("background-color");
             $(".div1:eq("+index+") p").css("color",font_color);
             $(document).on('mousemove',".cp-xy-slider,.cp-z-slider",function(){
                var font_color2 = $(".trigger div div").css("background-color");
                $(".div1:eq("+index+") p").css("color",font_color2);
            })
        })
