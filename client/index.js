$("#15").click(function(){
    url = " http://localhost:8081/menu/name/"
    +$("#11").val()+
    "/price/"
    +$("#12").val()+
    "/score/"
    +$("#13").val()+
    "/mode/keep"
    +""
    console.log(url)
    $.post(url);
})

$("#16").click(function(){
    url = " http://localhost:8081/menu/name/"
    +$("#11").val()+
    "/price/"
    +$("#12").val()+
    "/score/"
    +$("#13").val()+
    "/mode/delete"
    +""
    $.post(url);
})

$("#155").click(function(){
    url = " http://localhost:8081/menu/name/"
    +$("#111").val()+
    "/quantity/"
    +$("#122").val()+
    "/address/"
    +$("#133").val()+
    "/mode/keep"
    +""
    $.post(url);

    alert("order created successfully")
})

$("#166").click(function(){
    url = " http://localhost:8081/menu/name/"
    +$("#111").val()+
    "/quantity/"
    +$("#122").val()+
    "/address/"
    +$("#133").val()+
    "/mode/delete"
    +""
    $.post(url);

    alert("order deleted successfully")
})

