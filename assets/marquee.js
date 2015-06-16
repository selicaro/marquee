/**
 * Created by danielselicaro on 6/9/15.
 */



var marqueeVars = {
    screenSize : '',
    width : 0,
    mobileSize : 600,
    autoPlay : true,
    currentPanel : 1,
    totalPanels : 0,
    timePassed : 0,
    timeToChange : 60,
    duration : 1250,
    inTransition : false,
    panelContent : Array
};


var debugTimer = setInterval(setDebugger, 100);
function setDebugger(){
    $('.var1').html('screenSize = ' + marqueeVars.screenSize);
    $('.var2').html('width = ' + marqueeVars.width);
    $('.var3').html('mobileSize = ' + marqueeVars.mobileSize);
    $('.var4').html('autoPlay = ' + marqueeVars.autoPlay);
    $('.var5').html('currentPanel = ' + marqueeVars.currentPanel);
    $('.var6').html('totalPanels = ' + marqueeVars.totalPanels);
    $('.var7').html('timePassed = ' + marqueeVars.timePassed);
    $('.var8').html('timeToChange = ' + marqueeVars.timeToChange);
    $('.var9').html('inTransition = ' + marqueeVars.inTransition);

}

$(document).ready(function(){
    marqueeGatherData();

});


function marqueeGatherData(){
    //here we target the .marquee_panel class, and run a function on each one.
    // The index is counting the number of times we find a panel.
    $('.marquee_data .marquee_panel').each(function(index){




        //index starts at 0, so we add one.
        marqueeVars.totalPanels = index + 1;

        //use 'this' here because it's the object being searched for and acted upon: each instance of .marquee.panel
        var panel_image_l = $(this).attr('data-image')+'_l.jpg';
        var panel_image_s = $(this).attr('data-image')+'_s.jpg';
        var panel_caption = $(this).html();
        marqueeVars.panelContent[index] = '<div class="marquee_panel" data-image-s="'+panel_image_s+'" style="background-image:url('+panel_image_l+');"><div class="overlay"></div><div class="panel_caption">'+panel_caption+'</div></div>';


    });
//set timer to run marqueeAdvance() time passed bit. This is running the function ten times per second, or every .1 seconds
var marqueeTimer = setInterval(marqueeAdvance, 100);
}

function marqueeAdvance(){
    var marqueeWidth = $('.marquee').width();
    var currentSize = marqueeVars.screenSize;

    if ( marqueeWidth > marqueeVars.mobileSize ) {
        var newSize = 'large';
    } else {
        var newSize = 'small';
    }

    marqueeVars.screenSize = newSize;

    if ( currentSize != newSize ) {
        if ( marqueeVars.screenSize == 'large' ) {
            marqueeMultiPanel();

        }

    }

    if ( marqueeVars.timePassed == marqueeVars.timeToChange ){
        marqueeVars.timePassed = 0;

        if( marqueeVars.autoPlay == true ){
            if ( marqueeVars.currentPanel == marqueeVars.totalPanels ) {
                $('.marquee_nav div:nth-child(1)').trigger('click');
            } else {
                $('.marquee_nav div:nth-child('+(marqueeVars.currentPanel+1)+')').trigger('click');
            }
        }
    } else {
        marqueeVars.timePassed += 1;
    }

}

function marqueeMultiPanel(){
    marqueeVars.timePassed = 0;
    marqueeVars.autoPlay = true;
    var newHTML = '<div class="marquee_stage_large"><div class="marquee_container_1"></div><div class="marquee_nav"></div><div class="btn prev"></div><div class="btn next"></div></div>';

    $('.marquee').html('').append(newHTML);

    for(i=0; i<marqueeVars.totalPanels; i++){
        $('.marquee_nav').append("<div></div>");

    }

    $('.marquee').hover(function(){
        marqueeVars.autoPlay = false;

    }, function(){
        marqueeVars.autoPlay = true;
        marqueeVars.timePassed = Math.floor(marqueeVars.timeToChange / 2);
    });


    //cross fade the panels

    $('.marquee_nav div').on('click', function(){
        if ( !marqueeVars.inTransition ) {

            marqueeVars.inTransition = true;

        var navClicked = $(this).index();
        marqueeVars.currentPanel = navClicked + 1;

        $('.marquee_stage_large').append('<div class="marquee_container_2" style="opacity: 0;"</div>');
        $('.marquee_container_2').html(marqueeVars.panelContent[navClicked]).animate({opacity:1}, marqueeVars.duration, function(){
            $('.marquee_container_1').remove();
            $(this).addClass('marquee_container_1').removeClass('marquee_container_2');
            marqueeVars.inTransition = false;
        });
        }

    });

    $('.marquee_nav div:first').trigger('click');
}


