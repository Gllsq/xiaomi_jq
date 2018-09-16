//压面加载
$(function(){
    //购物车
    $(".gw").mouseenter(function(){
        $(".sa").clearQueue().slideDown();
    })
    $(".gw").mouseleave(function(){
        $(".sa").clearQueue().slideUp();
    })


    //选项卡
    let menu=$(".banner .list");
    let son=$(".banner .list .son");
    console.log(menu, son);
    menu.mouseenter(function(){
        son.css("display","none");
        $(this).children(".son").css("display","block");
    })
    menu.mouseleave(function(){
        $(this).children(".son").css("display","none");
    })


    //轮播图
    let pic=$(".banner .pic img");
    let point=$(".banner .point ld");
    let now=0;
    console.log(pic, point);
    //初始化
    pic.first().css("z-index",10);
    point.eq(0).addClass(".active");
    setInterval(move,4000);
    function move(){
        now++;
        if(now==point.length){
            now=0;
        }
        pic.css("z-index",5).eq(now).css("z-index",10);
        point.removeClass(".active").eq(now).addClass(".active");

    }


    //家电
    let household=$(".household .top lf if");
    let bdd=$(".household .bdd ");
    console.log(household, bdd);
    household.mouseenter(function(){
        let i=$(this).index();
        bdd.css("display","none");
        bdd.eq(i).css("display","block");
    })
    household.triggerHandler("mouseenter");


    //小米闪购
    let pit=$(".mi .tobt .milist");
    let left=$(".first .bottn_1 .lz_f");
    let right=$(".first .bottn_1 .ry_g");
    let times=0;
    let w=pit.width()/2;
    console.log(left, right, pic,w);
    right.click(function () {
        times++;
        if(times==2){
            times=1;
        }
        pit.animate({left:-w*times},"slow");
    })
    left.click(function () {
        times--;
        if(times<0){
            times=0;
        }
        pit.animate({left: -w * times}, "slow");
    })



    //为你推荐
    let lzs=$(".groom .bottn .lz");
    let rys=$(".groom .bottn .ry");
    let tj=$(".hz .you");
    let time1=0;
    let w1=tj.width()/3;
    console.log(lzs,rys,tj,w1);
    rys.click(function(){
        time1++;
        if(time1==3){
            time1=2;
        }
        tj.animate({left:-w1*time1},"slow");
    })
    lzs.click(function(){
        time1--;
        if(time1<0){
            time1=0;
        }
        tj.animate({left:-w1*time1},"slow");
    })

    // 倒计时
    
     let h=$(".mi .coun .h");
    let m=$(".mi .coun .m");
    let s=$(".mi .coun .s");
    console.log(s);
    // console.log(h,f,s);
    setDate();
    setInterval(setDate,1000);
    function setDate() {
        let now=new Date();
        let future=new Date(2018,9,17,18);
        let time=Math.floor((future.getTime()-now.getTime())/1000);
        let hour = Math.floor(time % (30 * 24 * 60 * 60) % (24 * 60 * 60) / (60 * 60));
        let m1 = Math.floor(time % (30 * 24 * 60 * 60) % (24 * 60 * 60) % (60 * 60) / (60));
        let s1 = Math.floor(time % (30 * 24 * 60 * 60) % (24 * 60 * 60) % (60 * 60) % (60));
        h.html(hour);
         m.html(m1);
         s.html(s1);
         
     }

})



//点击轮播图
function banner_dj(imgs,dots,banner,leftBtn,rightBtn,widths,activeClass="active"){
    imgs[0].style.left=0;
    dots[0].classList.add(activeClass);
    let now=0;
    let next=0;
    //开关：控制快速点击时图片会快速轮播的现象
    //默认开关是打开的，flag=true 可以点击左右箭头
    let flag=true;
    // let t=setInterval(move, 2000);
    function move() {
        next++;
        if (next==imgs.length) {
            next=0;
        }
        imgs[next].style.left=widths+"px";
        animate(imgs[now],{left:-widths});
        animate(imgs[next],{left:0},function(){
            flag=true;
        });
        dots[now].classList.remove(activeClass);
        dots[next].classList.add(activeClass);
        now=next;
    }
    function moveL(){
        next--;
        if (next<0) {
            next=imgs.length-1;
        }
        imgs[next].style.left=-widths+"px";
        animate(imgs[now], {left:widths});
        animate(imgs[next], {left:0},function(){
            flag=true;
        });
        dots[now].classList.remove(activeClass);
        dots[next].classList.add(activeClass);
        now=next;
    }
    rightBtn.onclick=function(){
        //判断开关是否开启
        //开关开启，则！flag=false，不执行retur，执行flag=false和move
        //move执行完flag=true      
        //开关关闭，不能点击
        if (!flag) {
            return;
        }
         if (next==0) {
            return;
        }
        flag=false;
        moveL();
    }
    leftBtn.onclick=function(){
        
        //开关关闭，不能点击
        if (!flag) {
            return;
        }
        if (next==imgs.length-1) {
            return;
        }
        flag=false;
        move();
    }
    //鼠标移入轮播点
    for(let i=0;i<dots.length;i++){
        dots[i].onclick=function(){
        if(now==i){
            return;
        }else if (now<i) {
            imgs[i].style.left=`${widths}px`;
            animate(imgs[now],{left:-widths});
            animate(imgs[i],{left:0});
            dots[now].classList.remove(activeClass);
            dots[i].classList.add(activeClass);
            now=next=i;
        }else if (now>i) {
            imgs[i].style.left=`${-widths}px`;
            animate(imgs[now],{left:widths});
            animate(imgs[i],{left:0});
            dots[now].classList.remove(activeClass);
            dots[i].classList.add(activeClass);
            now=next=i;
        }
    }
}
}