/*=========================================================\
 *   This is a page element related to the control process
\*========================================================*/

function Button_press_effect(src, dst, a, b, c) {
    $('#' + src).mouseover(function() {
        //this.style.opacity = b;
        $('#' + dst).css({'opacity' : b});
    }).mouseout(function(){
        //this.style.opacity = a;
        $('#' + dst).css({'opacity' : a});
    }).mousedown(function() {
        //this.style.opacity = c;
        $('#' + dst).css({'opacity' : c});
    }).mouseup(function(){
        //this.style.opacity = b;
        $('#' + dst).css({'opacity' : b});
    });
}

$(document).ready(function(){
    // 图标子项的事件
    //Button_press_effect("item_subkey", "item_subkey", 1, 0.8, 0.5);

    // 左侧功能选项的事件
    Button_press_effect("dashboard_button", "dashboard_rectangle_bg", 1, 0.7, 0.3);
    Button_press_effect("make_button"      , "make_rectangle_bg"      , 1, 0.7, 0.3);
    Button_press_effect("setting_button"   , "setting_rectangle"      , 1, 0.7, 0.3);
    Button_press_effect("about_button"     ,  "about_rectangle"        , 1, 0.7, 0.3);

    // 关闭按键
    Button_press_effect("close_button", "close_rectangle", 1, 0.8, 0.4);

    // 最小化按键
    $("#min_button").mouseover(function() {
        $("#min_rectangle").css("visibility", "visible");
    }).mouseout(function(){
        $("#min_rectangle").css("visibility", "hidden");
    }).mousedown(function() {
        $("#min_rectangle").css({'opacity' : 0.2});
    }).mouseup(function(){
        $("#min_rectangle").css({'opacity' : 1});
    });

    // 浏览按钮
    Button_press_effect("browse_button", "browse_button", 1, 0.8, 0.4);

    // 动态面板
    var mySwiper = new Swiper ('.swiper-container', {
        loop : true,
        simulateTouch: false,  //鼠标无效
        onlyExternal : true    //值为true时，slide无法拖动
    });
    $('#dashboard_button').click(function(){
        mySwiper.slideTo(1, 1000, false);
        $("#main_lable p span").text("Dashboard");
    });
    $('#make_button').click(function(){
        mySwiper.slideTo(2, 1000, false);
        $("#main_lable p span").text("Make");
    });
    $('#setting_button').click(function(){
        mySwiper.slideTo(3, 1000, false);
        $("#main_lable p span").text("Setting");
    });
    $('#about_button').click(function(){
        mySwiper.slideTo(4, 1000, false);
        $("#main_lable p span").text("About");
    });

    ////////////////////////////////////////////////////////////////////////////////////////
    // 音量滑动条
    /*
     滚动条的大小: 30 * 410
     滑块的大小：  30 * 30

     滑块移动的范围[left属性]: 0 - 380
     X 的范围 -->> ([scroll.left + 30 / 2] - [scroll.left + 410 - 30 / 2]), (55, 435)

     移动到X点位置:
     X = scroll.left + hk.left + hk.width / 2

     滑块的位置:
     hk.left = X - scroll.left - hk.width / 2

     百分比计算:
     % = hk.left / (scroll.width - hk.width) * 100

     初始化位置计算(单位%):
     hk.left = (% / 100) * (scroll.width - hk.width)
    */

    var volume_value = 0;
    var scroll_left  = 0;
    var scroll_width = 0;
    var hk_left  = 0;
    var hk_width = 0;
    var gl_pageX = 0;
    var mouse_event_state = 0;

    function modify_soroll_vlaue(init_volume_vale) {
        if (init_volume_vale < 0) {
            init_volume_vale = 0;
        }
        if (init_volume_vale > 100) {
            init_volume_vale = 100;
        }
        scroll_width = $('#scroll_bar').width();
        hk_width     = $('#scroll_drag_button').width();
        volume_value = (init_volume_vale / 100) * (scroll_width - hk_width);

        $("#scroll_drag_button").css("left", volume_value);
        $("#scroll_foreground_div").css("width", volume_value + hk_width / 2);
        $("#volume_value p span").text(init_volume_vale);
    }

    // 初始化滑动条的位置
    var init_volume_vale = 0;
    modify_soroll_vlaue(init_volume_vale);
    try {
        require('electron').ipcRenderer.on('volume_vale', function(event, message){
            init_volume_vale = Number(message);
            modify_soroll_vlaue(init_volume_vale);
        });
        require('electron').ipcRenderer.on('obj_test', function(event, message){
            alert(message.a1 + ' ' + message.b1);
        });
    } catch(err) {
        txt="There was an error on this page.\n\n";
        txt+="Error description: " + err.message + "\n\n";
        console.log(txt);
    }

    $('#scroll_bar').mousedown(function (e) {
        scroll_left  = $('#scroll_bar').offset().left;
        scroll_width = $('#scroll_bar').width();
        hk_left      = $('#scroll_drag_button').offset().left;
        hk_width     = $('#scroll_drag_button').width();
        gl_pageX     = e.pageX;

        if(gl_pageX <= hk_width / 2 + scroll_left) {
            gl_pageX = hk_width / 2 + scroll_left;
        } else if(gl_pageX >= scroll_width - hk_width / 2 + scroll_left) {
            gl_pageX = scroll_width - hk_width / 2 + scroll_left;
            console.log(gl_pageX + " " + e.pageX);
        }
        hk_left = gl_pageX - scroll_left - hk_width / 2;

        volume_value = Math.round((hk_left / (scroll_width - hk_width)) * 100);

        $("#scroll_drag_button").css("left", hk_left);
        $("#scroll_foreground_div").css("width", gl_pageX - scroll_left);
        $("#volume_value p span").text(volume_value);
    });
    $('#scroll_drag_button').mousedown(function (e) {
        scroll_left = $('#scroll_bar').offset().left;
        mouse_event_state = 1;
    });
    $(document).mouseup(function () {
        mouse_event_state = 0;
    });
    $(document).mousemove(function (e) {
        if (mouse_event_state == 1) {
            scroll_left  = $('#scroll_bar').offset().left;
            scroll_width = $('#scroll_bar').width();
            hk_left      = $('#scroll_drag_button').offset().left;
            hk_width     = $('#scroll_drag_button').width();
            gl_pageX     = e.pageX;

            if(gl_pageX <= hk_width / 2 + scroll_left) {
                gl_pageX = hk_width / 2 + scroll_left;
            } else if(gl_pageX >= scroll_width - hk_width / 2 + scroll_left) {
                gl_pageX = scroll_width - hk_width / 2 + scroll_left;
                console.log(gl_pageX + " " + e.pageX);
            }
            hk_left = gl_pageX - scroll_left - hk_width / 2;

            volume_value = Math.round((hk_left / (scroll_width - hk_width)) * 100);

            $("#scroll_drag_button").css("left", hk_left);
            $("#scroll_foreground_div").css("width", gl_pageX - scroll_left);
            $("#volume_value p span").text(volume_value);
        }
    });
});

//$("#u44").clone(true).insertAfter("#u44");
