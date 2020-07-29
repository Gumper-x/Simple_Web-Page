// JQuery

$(function() {
	console.log( "Ready!" );
	// Header [START]
		let header = $('header'),scrollPrev = 0, ScrollContrlUp = 100, ScrollContrlDown = 100;
		let slide_menu = $('.slide-menu');
		let searchBlock = $('.search-block');
		let tempScrollTop = 0;
		// Сustomization ul
		let interMenuAccount = document.createElement('ul');
		interMenuAccount.className = 'interactive-list out';

		function modeSlideMenu(){
			if (slide_menu.hasClass('here')) {
				return 1;
			}
			else{
				return 0;
			}
		}
		$(window).scroll(function() {

			let scrolled = $(window).scrollTop();
			console.log(scrolled);
			
			function UpOrDown(s){
				if (s < scrollPrev) {
					return 1;// UP
				}
				else{
					return 0;// DOWN
				}
			}
			if (UpOrDown(scrolled) == 0 && ScrollContrlDown <= scrolled && modeSlideMenu() != 1) {	
				header.addClass('out');
				searchBlock.addClass('out');
				interMenuAccount.fadeOut(300);
				ScrollContrl = scrolled - 100;
			}
			else if (UpOrDown(scrolled) == 1 && ScrollContrl >= scrolled) {
				header.removeClass('out');
				ScrollContrlDown = scrolled + 100;
			}
			scrollPrev = scrolled;
		});
	// Header [END]

	//SearchBlock [START]
		$('.search-activator').click(search_toggle);
		function search_toggle(){
			searchBlock.toggleClass('out');
		}

		$('.cleaner-but').click(function(){
			let input = document.querySelector('.search-inp');
			if (input.value != '') {
				input.value = '';
			}
			else{
				search_toggle()
			}
		});
	//SearchBlock [END]

	//Select [START]
	let selecter = $('.selecter');
	let selectMenu = $('.select-menu');
	let elemSelect = $('.select-menu li');
	let selected = $('.selecter-span');
	elemSelect.click(function(){
		$(this).addClass('selected');
		elemSelect.each(function(index) {
			if (selected.text() == $(this).text()	) {
				$(this).removeClass('selected')
			}
		});
		selected.text($(this).text());
	});
	selecter.click(function(){
		selectMenu.slideToggle(100);
		selecter.toggleClass('active');
	});
	$(document).mouseup(function (e){
		if (!selectMenu.is(e.target) && selectMenu.has(e.target).length === 0) {
			if (e.target.className != 'selecter active' && e.target.className != 'selecter-span') {
				selecter.removeClass('active');
				selectMenu.slideUp(100);
			}
		}
	});
	//Select [END]

	//Filter buttons [START]
		let moreFilter = $('.more-filter'),
		rangeCheck = false,
		submitFilter = $('.submit'),
		moreFilterDiv = $('#more-filter-div');
		moreFilter.click(function(){
			switch (moreFilter.text()) {
			  case 'Больше фильтров +':
			    moreFilter.text('Несколько фильтров -');
			    break;
			  case 'Несколько фильтров -':
			    moreFilter.text('Больше фильтров +');
			    break;
			  default:
			    moreFilter.text('Больше фильтров +');
			}
			moreFilterDiv.slideToggle(250);
			if (rangeCheck == false) {
				let slider = new rSlider({
					target: '#slider',
					values: {min: 1, max: 100},
					step: 1,
					range: true,
					set: [1, 100],
					scale: false,
					labels: false,
					onChange: function (vals) {
						console.log(eventRangeChange(vals))
					}
				});
				rangeCheck = true;
			}
		});
	//Filter buttons [END]

	// Range [START]
	let rangeText = $('#rangeText');
	function eventRangeChange(value){
		value = value.split(',');
		rangeText.text(value[0] +'-'+ value[1]);
		return value[0] +'-'+ value[1];
	}
	function ragneShow(argument) {
		// let span = $('.');
	}
	// Range [END]

	//Category picker [START]
		let cetegoryItem = $('.cat-elm');
		cetegoryItem.click(function(){
			let count = 1;
			cetegoryItem.each(function(index) {
				if ($(this).hasClass('unready')) {
					count++
				}
			});
			console.log(count)
			if ($(this).hasClass('ready') && count <= 2) {
				$(this).removeClass('ready');
				$(this).addClass('unready');
			}else if ($(this).hasClass('unready')) {
				$(this).removeClass('unready');
				$(this).addClass('ready');
			}else if ($(this).hasClass('ready') && count >= 3) {
				alertShow('Достигнут лимит комбинаций');
			}		
		});
	//Category picker [END]

	//Footer [START]
	let footList = $('.foot-list');
		footList.click(function (){
			$(this).toggleClass('active');
			$(this).children().slideToggle(150);
		});
	//Footer [END]

	// Interactive Menu
	let accountBut = $('#account-but-id');
	accountBut.click(toggleMenu);
	if (!accountBut.hasClass('login')) {
		createIntrMenu(0);
	}
	else{
		createIntrMenu(1);
	}
	function createIntrMenu(mode){
		if (mode == 0) {
			let li = document.createElement('li');
			let li2 = document.createElement('li');

			let a = document.createElement('a');
			let a2 = document.createElement('a');
			// Сustomization a
			a.setAttribute('href','#');
			a2.setAttribute('href','#');
			a.innerHTML = 'Войти';
			a2.innerHTML = 'Регистрация';
			// Insert a in li
			li.prepend(a);
			li2.prepend(a2);
			// Insert li in ul
			interMenuAccount.prepend(li2);
			interMenuAccount.prepend(li);
		}
		else{
			interMenuAccount.setAttribute("style", "left: -46%");
			let li = document.createElement('li');
			let li2 = document.createElement('li');

			let a = document.createElement('a');
			let a2 = document.createElement('a');
			// Сustomization a
			a.setAttribute('href','#');
			a2.setAttribute('href','#');
			a.innerHTML = 'Мой профиль';
			a2.innerHTML = 'Премиум: <span class="prem-deactive">OFF</span>';
			// Insert a in li
			li.prepend(a);
			li2.prepend(a2);
			// Insert li in ul
			interMenuAccount.prepend(li2);
			interMenuAccount.prepend(li);
		}
		accountBut.after(interMenuAccount);
		interMenuAccount = $('.interactive-list');
	};

	function toggleMenu(){
		interMenuAccount.fadeToggle(200);
	};
	$(document).mouseup(function (e){
		if (!interMenuAccount.is(e.target) && interMenuAccount.has(e.target).length === 0) {
			if (e.target.id != 'account-but-id') {
				interMenuAccount.fadeOut(200);
			}
		}
	});
	// Sidebar [START]
	let night = $('.night-block');

	let menu_button = $('.menu-but').click(mover_menu);
	function mover_menu(){
		slide_menu.toggleClass('here');
		header.toggleClass('shadow');
		header.removeClass('down');
		night.fadeToggle(200);
	}
	$(document).mouseup(function (e){
		if (!slide_menu.is(e.target) && slide_menu.has(e.target).length === 0) {
			if (e.target.className != 'icon-menu' && e.target.className != 'menu-but here') {
				slide_menu.removeClass('here');
				night.fadeOut(200);
			}
		}
	});
	// Sidebar [END]

	// Alert [START]
	let alert = $('#alert-mes');
	let alertSpan = $('#alert-mes span');
	let closeAlert = $('#close-alert');
	closeAlert.click(function (){
		alert.addClass('out');
	});
	function alertShow(text){
		alertSpan.text(text);
		alert.removeClass('out');
		setTimeout(function(){ alert.addClass('out'); }, 2500);
	}
	// Alert [END]
})
// Pure JS
"use strict";
function go(url){
	window.location.href='' + url;
}
// Setting url [START]
let settingBut = document.querySelector('.setting-but');
settingBut.onclick = function() {go('/')};
// Setting url [END]