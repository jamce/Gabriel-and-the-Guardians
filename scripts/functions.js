// JS FUNCTIONS

SCORMinitialize();

//////////////////////////////////////////////////////////////
//// ANIMATION SCRIPTING /////////////////////////////////////
//////////////////////////////////////////////////////////////

var screenHeight = $(window).height();
var coursecompleted = false;

function onScreen(el,m){
	var offset = $(el).offset().top;
	var dist = $(window).height() + $(window).scrollTop();
	
	return ( ( dist - offset ) > ( screenHeight * m ) );
}

$(document).scroll( function(e){
	
	if ( onScreen('#secComplete', .5) && !coursecompleted ){
		coursecompleted = true;
		SCORMsetValue("cmi.core.lesson_status", "completed");
	}
	
	$('.animFadeIn').each( function(i,el){
		if ( onScreen(el, .25) ){
			$(el).removeClass('animFadeIn').addClass('animFadeInComplete');
		}
	});
	
	$('.animFromLeft').each( function(i,el){
		if ( onScreen(el, .25) ){
			$(el).removeClass('animFromLeft').addClass('animFromLeftComplete');
		}
	});
	
	$('.animFromRight').each( function(i,el){
		if ( onScreen(el, .25) ){
			$(el).removeClass('animFromRight').addClass('animFromRightComplete');
		}
	});
	
	var slideupcalc = -10;
	var slideupamt = ( $('.slideUp').offset().top - ( $(window).height() + $(window).scrollTop() ) ) / screenHeight;
	slideupamt < -.75 ? slideupamt = -0.75 : null;
	slideupcalc += 200 * slideupamt;
	$('.slideUp').css('top', slideupcalc);
	
	var slideup2calc = 10;
	var slideup2amt = ( $('.slideUp2').offset().top - ( $(window).height() + $(window).scrollTop() ) ) / screenHeight;
	slideup2amt < -1 ? slideup2amt = -1 : null;
	slideup2calc += 20 * slideup2amt;
	$('.slideUp2').css('top', slideup2calc);
	
	var driftcalc = 70;
	var driftamt = ( $('.slideDrift').offset().top - ( $(window).height() + $(window).scrollTop() ) ) / screenHeight;
	driftamt < -1 ? driftamt = -1 : null;
	driftcalc += 40 * driftamt;
	$('.slideDrift').css('top', driftcalc + "%");
	$('.slideDrift').css('left', driftcalc + "%");

});



//////////////////////////////////////////////////////////////
//// ACTIVITY SCRIPTING //////////////////////////////////////
//////////////////////////////////////////////////////////////

var  act7 = function(){
	$(".specialSec7A .invisible").removeClass("invisible");
	
	$(".specialSec7A .click").removeClass("click");
}

var act11 = function(term){
	$(".specialSec11B .person").addClass("hidden");

	$("#person" + term).removeClass("hidden");
	
	var h,p;
	
	switch (term) {
		case "Enthusiast":
			h = "Enthusiasts";
			p = "Displays behaviors that show excitement and are motivated by personal eustress. Eager about the change.";
			break;
			
		case "Follower":
			h = "Followers";
			p = "Displays behaviors that are compliant with the change. Does not engage in dialogue about change. ";
			break;
			
		case "Attacker":
			h = "Attackers";
			p = "Displays resistance to change. Often disrupts meetings to voice negative opinion toward the change. Continues to follow old protocol. And can be argumentative."
			break;
			
		case "Goader":
			h = "Goaders";
			p = "Displays behaviors of resistance with covert tactics. Often the grassroots leader to engage others to resist change.";
			break;
	}
	
	$("#act11block h4").html(h);
	$("#act11block p").html(p);
}

var PERSONALITIES = [
						["Hey did you hear the news? We are getting a new operating system. It will make our processes easier.", 0, false],
						["I am going to go step out for a quick bite to eat. Hope I make it back in time for the meeting. If not, you will fill me in, right?", 2, false],
						["Yes, there is a meeting later today. All they have to do is let me know how they want me to process these items and I will get it done.", 1, false],
						["I can't wait for this meeting! They implemented this about a year ago and it was an epic fail. All it did was confuse us, management, and clients.  What are they thinking?", 3, false]
];

var pindex = 0

var act12arrow = function(n){
	$(".specialSec12A .person").removeClass("correct");
	$(".specialSec12A .person").removeClass("incorrect");
	
	pindex += n;
	pindex < 0 ? pindex = 3 : pindex > 3 ? pindex = 0 : null;
	
	$("#act12quote").html('"' + PERSONALITIES[pindex][0] + '"');
	
	if (PERSONALITIES[pindex][2]){
		$(".specialSec12A .person").eq(PERSONALITIES[pindex][1]).addClass("correct");
	}
}

var act12select = function(n, targ){
	if (n === PERSONALITIES[pindex][1]){
		if (!$(targ).hasClass('correct')){
			$(targ).addClass("correct");
			
			PERSONALITIES[pindex][0] += "<span class='orange'><em> Correct! Click the arrow to continue.</em></span>";
			$("#act12quote").html('"' + PERSONALITIES[pindex][0] + '"');
			
			PERSONALITIES[pindex][2] = true;
		}
	} else {
		$(targ).addClass("incorrect");
	}
	
	var allcorrect = true;
	
	for (var i = 0; i < 4; i++){
		if (!PERSONALITIES[i][2]){
			allcorrect = false;
		}
	}
	
	if (allcorrect){
		$("#act12rem").removeClass("hidden");
	}
}

var act14continue = function(i){
	$(".quizquestion").eq(i).addClass('hidden');
	$(".quizquestion").eq(i+1).removeClass('hidden');
}

var act14select = function(i,rem) { 
	$(".quizquestion").eq(i).find('.hidden').removeClass('hidden');
	
	$(".quizrem").html(rem);
	
	var j = i > 2 ? i - 3 : i;
	
	$(".quizquestion").eq(i).find('.diamonds img').eq(j).addClass('completed');
	$(".quizquestion").eq(i).find('.diamonds img').eq(j + 1).removeClass('fade').addClass('active');
}