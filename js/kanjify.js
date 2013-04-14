$(document).ready(function() {
	var rand = Math.floor(Math.random()*allkanji.kanjilist.length);
	var newkanji = $('#newkanji');
	newkanji.append("覚");
	newkanji.css({'border': '4px solid red', 'font-size':'90px'});

	$('#radio').buttonset();

	var numChoices = 4;

	$('#lessonsubmit').click(function() {
		$('div').removeClass('right-answer');
		$('div').removeClass('wrong-answer');

		var inputlessonnumber = $('#lessonnumberinput').val();
		if (!is_int(inputlessonnumber) || (inputlessonnumber < 1 || inputlessonnumber > 30)) {
			inputlessonnumber = 30;
		}
		var filteredkanji = allkanji.kanjilist.filter(function (element) {
			return element.lessonnumber <= inputlessonnumber;
		});

		var choices = getUniqueRandoms(filteredkanji, numChoices).map( function(index) { return filteredkanji[index]; });
		var shuffledchoices = shuffle(choices);

		if ( $('input[id="texttokanji"]:checked').val() ) {
			newkanji.html(shuffledchoices[Math.floor(Math.random()*numChoices)].meaning);
			newkanji.css({'border': '4px solid green', 'font-size':'60px'});
		}
		else {
			newkanji.html(shuffledchoices[Math.floor(Math.random()*numChoices)].kanji);
			newkanji.css({'border': '4px solid green', 'font-size':'100px'});
		}
		var shuffledmeaning = [];
		var shuffledkanji = [];

		for (var i = 0; i < shuffledchoices.length; i++) {
			shuffledmeaning.push("#meaning" + (i + 1).toString());
			shuffledkanji.push("#kanji" + (i + 1).toString());
		}
		for (var i = 0; i < shuffledchoices.length; i++) {
			if ( $('input[id="texttokanji"]:checked').val() ) {
				$(shuffledmeaning[i]).html( shuffledchoices[i].kanji ).css( {'font-size':'70px', 'font-weight':'lighter', 'font-family':'Helvetica'});
				$(shuffledkanji[i]).html( shuffledchoices[i].meaning ).css( {'font-size':'30px', 'font-weight':'lighter', 'font-family':'Helvetica'});
			}
			else {
				$(shuffledmeaning[i]).html( shuffledchoices[i].meaning ).css( {'font-size': '20px', 'font-weight':'lighter', 'font-family':'Helvetica'});
				$(shuffledkanji[i]).html( shuffledchoices[i].kanji ).css( {'font-size':'80px', 'font-weight':'lighter', 'font-family':'Helvetica'});
			}
		}
		$('td').css( {'text-align':'center', 'border': '1px solid grey', 'min-width':'80px'} );
		$('#kanji1, #kanji2, #kanji3, #kanji4').hide();
	});

	$('td').on('click', function() {
		var answers = $('.answers');
		if (!answers.hasClass('right-answer') && !answers.hasClass('wrong-answer') ) {
			var rightanswer;
			var clicked = $(this);
			$.each(answers, function(i, obj) {
				if ( ($(obj).find("div").text() === $('#newkanji').text() ) ) {
					rightanswer = $(obj);
					rightanswer.addClass('right-answer');
				}
			});
			if (rightanswer.find("p").text() != clicked.find("p").text() && !clicked.find("div").hasClass('right-answer')) {
				clicked.find("div").addClass("wrong-answer");
			}

			$('#kanji1, #kanji2, #kanji3, #kanji4').css( {'text-align':'center'} ).fadeIn(500);
//			$('#test').html("clicked: " + clicked.find("p").text() + " with class " + clicked.find("div").attr('class') + "<br>correct: " + rightanswer.find("p").text() + " with class " + rightanswer.attr('class') );
		}
	});

	$(document).keydown(function(e) {
		if (e.keyCode == 39) { // right-arrow button
			$('#lessonsubmit').trigger('click');
			return false;
		}
	});

	function getUniqueRandoms(array, numrands) {
		var randomresult = [];
		var rand;
		while (randomresult.length <= numrands) {
			rand = Math.floor(Math.random()*(array.length));
			if (randomresult.indexOf(rand) == -1) {
				randomresult.push(rand);
			}
		}
		return randomresult;
	}

	function shuffle(array) {
		var m = array.length, t, i;
		// While there remain elements to shuffle…
		while (m) {
		// Pick a remaining element…
			i = Math.floor(Math.random() * m--);
			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}
	function is_int(value){ 
		if((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
		        return true;
		} else { 
			return false;
		} 
	}
});
