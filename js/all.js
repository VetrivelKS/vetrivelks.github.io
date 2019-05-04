$(document).ready(function() {
    showSlides();
    $(".navEle").click(
        function()
        {
        var toDisplay = $(this).attr("navTo");
        if(toDisplay == "developer")
        {
            alert("I developed this site.\nThis site is the evidence I've got :D ");
            return;
        }
        var currentDisp = $("body").attr("currentDisp");
        $("body").attr("currentDisp",toDisplay);
        if(toDisplay != currentDisp)
        {
            $(this).siblings().removeClass("highlight");
            $('*').removeClass("highlight");
            if($(this).hasClass("navIcon"))
            {
                $(this,".navIcon ").addClass("highlight");
            }
            else
            {
                $(".navPortfolio").addClass("highlight");
            }
            if(currentDisp)
            {
                $("body").removeClass(currentDisp).addClass(toDisplay);
                $("."+currentDisp).removeClass("show").addClass("hide");
            }
            else
            {
                $("body").addClass(toDisplay);
            }
            $("."+toDisplay).removeClass("hide").addClass("show");
            var hash = window.location.hash.substring(1); 
            if(hash != toDisplay)
            {
                window.location.hash = toDisplay;
            }
        }
    });
    
    navigate(true);
    /*for(var item = design66.length-1; item >0; item-- )
    {
        design66[item].img = "\img\\\\design\\\\"+design66[item].img;
    }
    for(var item = design66.length-1; item >0; item-- )
    {
        ele = '<div class="item hide '+design66[item].dispName+'"><div class="itemContent"><div class="itemImgCont"><img class="itemImg" name="'+design66[item].dispName+'" src="" width="200px" height="200px" onLoad="LoadImage(\''+design66[item].dispName+'\',\''+design66[item-1].dispName+'\',\''+design66[item-1].img+'\')"></img></div><div class="itemDescCont"><div class="itemDesc">'+design66[item].desc+'</div></div></div></div>';
        $('.designItems').append(ele);
    }
    LoadImage(design66[design66.length-1].dispName,design66[design66.length-1].dispName,design66[design66.length-1].img);*/
    var portfolioJsonNames = { "designItems" : designItems ,"photographItems" : photographItems};
    initImages(portfolioJsonNames);
    registerEvents(portfolioJsonNames);
});
function registerEvents(portfolioJsonNames)
{
    $('.itemContent').unbind("mouseenter").bind("mouseenter",function(event)
            {
                $(event.target).closest('.itemContent').addClass("highlight");
                $('.itemContent').not(event.target).addClass("dull");
            });
    $('.itemContent').unbind("mouseleave").bind("mouseleave",function(event)
            {
                $(event.target).closest('.itemContent').removeClass("highlight");
                $('.itemContent').not(event.target).removeClass("dull");
            });
    $('.showMore').unbind("click").bind("click",function(event)
            {
                loadMore(portfolioJsonNames,event.target);
            });
    $('.backToPortCat').unbind("click").bind("click",function(event)
            {
        $(".navPortfolio ").trigger("click");
    });
    $('.itemContent').unbind("click").bind("click",function(event)
            {
                //$(".imgFull").attr("src","img/loading.gif");
                $(".enlarged").removeClass("enlarged");
                $(".imgFullCont").show();
                $(event.target).closest(".item").addClass("enlarged");
                var srcEle = $(event.target).closest(".item").find(".itemImg");
                var src = $(srcEle).attr("src");
                //src= src.slice(0,-4);
                var srcImg = src.replace("_thumb.JPG",".jpg");
                srcImg.replace("//","/");
                $(".imgFullDummy").attr("src",srcImg);
                $(".imgFullCont").css("top",$(window).scrollTop()+"px");
                
                
                
                var prevEle = $(".enlarged").closest(".item").prev(".item").find(".itemContent");
                var nextEle= $(".enlarged").closest(".item").next(".item").find(".itemContent");
                var moreItemAvail = false;
                var a = $(".pages.show .showMoreCont");

                if(prevEle.length)
                {
                    $(".prevArrow").unbind("click").bind("click",function(event)
                    {
                        $(prevEle).trigger("click");
                    });
                    $(".prevArrow").removeClass("dim");
                }
                else
                {
                    $(".prevArrow").addClass("dim");
                }
                var i;
                for (i=0;i<a.length;i++)
                {
                    if($(a[i]).css("display")!= "none")
                    {
                        moreItemAvail = true;
                        break;
                    }
                } 

                if(nextEle.length || moreItemAvail)
                {
                    $(".nextArrow").removeClass("dim");
                    $(".nextArrow").unbind("click").bind("click",function(event)
                    {
                        if( !nextEle.length  && moreItemAvail)
                        {
                            $(a[i]).find(".showMore").trigger("click");
                            nextEle= $(".enlarged").closest(".item").next(".item").find(".itemContent");
                        }
                        $(nextEle).trigger("click");
                    });
                }
                if( !nextEle.length  && !moreItemAvail)
                {
                    $(".nextArrow").addClass("dim");
                }
            });
    $('.crossicon,.imgFullCont').unbind("click").bind("click",function(event)
            {
                var arrow = $(event.target).hasClass("sliderArrow");
                if(!arrow)
                {
                    $("body").removeClass("imgDisplaying");
                    $(".enlarged").removeClass("enlarged");
                    $(".imgFullCont").fadeOut(500);
                    $(".imgFullDummy").attr("src","");
                    $(".imgFull").attr("src","").hide();
                }
            });
    }
var slideIndex = 0;
function showSlides() {
    var i;
    var slides = $(".mySlides");
    var desc = $(".subDesc");
    for (i = 0; i < slides.length; i++) {
        $(slides[i]).removeClass("disp"); 
        $(desc[i]).removeClass("colorify");
    }
    slideIndex++;
    if (slideIndex> slides.length)
    {
        slideIndex = 1;
    } 
    $(slides[slideIndex-1]).addClass("disp");
    $(desc[slideIndex-1]).addClass("colorify");
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}
function navigate(isFromInit,toChange)
{
    if(isFromInit)
    {
        var hash = window.location.hash.substring(1);
        hash =  hash ? hash : "home";
        if(hash)
        {
            $('.navEle[navto="'+hash+'"]').trigger("click");
        }
    }
}
function initImages(portfolioJsonNames)
{
    $.each(portfolioJsonNames, function(i, item) {
        {
            
            length = portfolioJsonNames[i].images.length-1;
            end= length -12;
            end = end>0 ? end : 0;
            renderUI(portfolioJsonNames,portfolioJsonNames[i].classToAppend ,length,end);
        }
    });
};
function loadMore(portfolioJsonNames,ele)
{
    var fromCategory = $(ele).attr("cat");
    var alreadyLoaded = $("."+fromCategory+" .item").length;
    var totalImages = portfolioJsonNames[fromCategory].images.length-1;
    var start = totalImages - alreadyLoaded;
    var end = start - 12;
    end = (end > 0)? end : 0;
    if(start!= end)
    {
        renderUI(portfolioJsonNames,fromCategory,start,end);
        if(!($("body").hasClass("imgDisplaying")))
        {
            $('html,body').animate({
                scrollTop: $(window).scrollTop() + ($(window).height() - 50)
            },1000);
        }
    }
};
function renderUI(portfolioJsonNames,fromCategory,start,end)
{
    curPortfolio = portfolioJsonNames[fromCategory].images;
    classToAppend = portfolioJsonNames[fromCategory].classToAppend;
    for(var item = start; item >end; item-- )
    {
        curPortfolio[item].img = "\img\\\\"+classToAppend+"\\\\"+curPortfolio[item].img;
    }
    for(var item = start; item >end; item-- )
    {
        ele = '<div class="item hide '+curPortfolio[item].dispName+'"><div class="itemContent"><div class="itemImgCont"><img class="itemImg" name="'+curPortfolio[item].dispName+'" src="" onLoad="LoadImage(\''+curPortfolio[item].dispName+'\',\''+curPortfolio[item-1].dispName+'\',\''+curPortfolio[item-1].img+'\')"></img></div><div class="itemDescCont"><div class="itemDesc">'+curPortfolio[item].desc+'</div></div></div></div>';
        $("."+classToAppend).append(ele);
    }
    LoadImage(curPortfolio[start].dispName,curPortfolio[start].dispName,curPortfolio[start].img);
    
    if(end == 0)
    {
        $("."+classToAppend).parents().eq(0).siblings().hide();//to hide load more
    }
    else if(start > 12)
    {
        $("."+classToAppend).parents().eq(0).siblings().show();
    }
    registerEvents(portfolioJsonNames);
};
var loadingImage = false;
function LoadImage(ele,imageName,imageFile)
{
    if(imageName && imageFile)
    {
        if ((!document.images) || loadingImage)
        {
            return;
        }
        loadingImage = true;
        
        if ((!document.images[imageName]) || document.images[imageName].src.indexOf(imageFile)<0)
        {
            if(document.images[imageName])
            {
                document.images[imageName].src = imageFile;
            }
        }
        loadingImage = false;
    }
    var className = ".item."+ele;
        //$(className).eq(0).css("display","block");
    dispShow($(className).eq(0));
}
function dispShow(ele)
{
    $(ele).removeClass("hide").addClass("show");
}
function imgLoaded()
{
    //$(".prevArrow").css("left",$(".imgFull").offset().left-20+"px");
    //$(".nextArrow").css("right",$(".imgFull").width()+20+"px");
    $(".imgFull").attr("src",($(".imgFullDummy").attr("src")));
    $(".imgFull").fadeIn(3000);
    $("body").addClass("imgDisplaying");

}