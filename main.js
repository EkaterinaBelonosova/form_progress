/* Article FructCode.com */

$( document ).ready(function() {
	$(".image-checkbox").each(function () {
		if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
		  $(this).addClass('image-checkbox-checked');
		}
		else {
		  $(this).removeClass('image-checkbox-checked');
		}
	  });
	  
	  // sync the state to the input
	  $(".image-checkbox").on("click", function (e) {
		$(this).toggleClass('image-checkbox-checked');
		var $checkbox = $(this).find('input[type="checkbox"]');
		$checkbox.prop("checked",!$checkbox.prop("checked"))
	  
		e.preventDefault();
	  });
	var resp = '[{"required":true,"fields":{"NAME":false}},{"required":false,"fields":{"LAST_NAME":true}},{"required":true,"fields":{"EMAIL":false,"PHONE":false}},{"required":false,"fields":{"TYPE":false}},{"required":false,"fields":{"TEXT":false}}]';
	var jsonArray = JSON.parse(resp);
	var rootForm = $('<div class="container-form"></div>');
	for (var i in jsonArray) {
		var jsonObj = jsonArray[i];
		var fieldSet = $('<fieldset></fieldset>');		
		if (jsonObj.required == true) {
			fieldSet.attr("required","required")					
		}
		var fields = jsonObj.fields;
		for (var key in fields) {
			var required = fields[key] == true;
			var rootInput = $('<div style="margin-top: 7px;margin-bottom: 25px;"></div>');
			var h7 = $('<h7 id="h7'+key+'"></h7>');
			var divError = $('<div class="formError" id="'+ key +'"></div>');
			var inputField = $('<input type="text" name="'+ key + '" placeholder="' + key + '" class="' + key + '">');
			if (required == true) {
				inputField.attr("required","required");
			}
			var pError =$('<p id="' + key + '"></p>');
			h7.appendTo(fieldSet);
			divError.appendTo(fieldSet);
			inputField.appendTo(rootInput);
			pError.appendTo(rootInput);
			rootInput.appendTo(fieldSet);
		}
		fieldSet.appendTo(rootForm);

	}
	
	setTimeout(function () {
		var divWidth = $("div.container-form").width();
		var inputName = $("input[name=NAME]");
		var inputLastName = $("input[name=LAST_NAME]");
		var widthInput = (divWidth-50)/2;
		inputName.css('width', widthInput+'px');
		inputLastName.css('width', widthInput+'px');
		console.log('длина'+widthInput);
		$("#h7NAME").text("Как вас зовут*");
		$("#h7EMAIL").text("Электронная почта");
		$("#h7PHONE").text("Телефон");
		$("#h7TYPE").text("Чем вы собираетесь заниматься на нашем сайте");
		$("#h7TEXT").text("О себе");

	},100);
	

	
	$('<hr><button type="button" id="btn" class="but" value="Отправить">Отправить</button>').appendTo(rootForm);
	rootForm.appendTo('#ajax_form');
	$('input[name="EMAIL"]').on('change keyup', validateEmail);
	$('input[name="NAME"]').on('change keyup', validateName);
	$('input[name="LAST_NAME"]').on('change keyup', validateName);
	$('input[name="PHONE"]').on('change keyup', validatePhone);
	$('input[name="TEXT"]').on('change keyup', validateText);

			
    $("#btn").click(	 
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'https://workspace.ru/ajax/test/test.php');
			return false; 
		}
		
	);

	$("#ajax_form").delegate("input", "change keyup", calcProgress);

});

function getWidth(){
	var divWidth = $("div.container-form").width();
	var inputName = $("input[name=NAME]");
	var widthInput = divWidth/2;
	inputName.css('width', widthInput+'px');
	console.log(widthInput);
}

function calcProgress() {
	var allInput = $("#ajax_form").find("input");
	var validInput = $("#ajax_form").find("input.ok");
	var progress = (validInput.length/allInput.length*100).toFixed(0);
	$("#progress").attr("value", progress);
	$("#value").html(progress + '%');
	
}

function validateText(e) {
	var inputText = $(e.currentTarget);
	var rootDiv = inputText.parent().parent();
	var divError = rootDiv.children('.formError');
	var InputTextVal = $(inputText).val();
	var InputTextLenght = InputTextVal.length;
		if (InputTextLenght > 500 || InputTextLenght < 3){
			divError.text('Количество знаков должно быть в переделе от 3 до 500');
			inputText.removeClass('ok').addClass('error');
			divError.css('display','inline-block');
		} else {
			inputText.removeClass('error').addClass('ok');
			divError.css('display','none');
		}
}  

function validatePhone(e) {
	var inputPhone = $(e.currentTarget);
	var rootDiv = inputPhone.parent().parent();
	var divError = rootDiv.children('#PHONE');
	var InputPhoneVal = $(inputPhone).val();
	var InputPhoneLenght = InputPhoneVal.length;
		if (InputPhoneVal.match(/[^0-9]/g, '')) {
			inputPhone.val(InputPhoneVal.replace(/[^0-9]/g, ''));
			divError.text('Используйте только цифровые знаки');
			inputPhone.removeClass('ok').addClass('error');
			divError.css('display','inline-block');
		} else {
			inputPhone.removeClass('error').addClass('ok');
			divError.css('display','none');
			
		}
		if (InputPhoneLenght > 14 || InputPhoneLenght < 9){
			divError.text('Количество знаков должно быть в переделе от 10 до 14');
			inputPhone.removeClass('ok').addClass('error');
			divError.css('display','inline-block');
		}
    
}  

function validateName(e) {
	var inputName = $(e.currentTarget);
	var rootDiv = inputName.parent().parent();
	var divError = rootDiv.children('.formError');
	var inputNameVal = $(inputName).val();
	inputName.attr("maxLength","50");
		if (inputNameVal.match(/[^а-яА-Я\s]/g, '') || inputNameVal.length == 0) {
			inputName.val(inputNameVal.replace(/[^а-яА-Я\s]/g, ''));
			divError.text('Используйте только русские буквы и пробелы');
			inputName.removeClass('ok').addClass('error');
			divError.css('display','inline-block');
		} else {
			inputName.removeClass('error').addClass('ok');
			divError.css('display','none');
		}
		if (inputName.val().length == 50) {
			divError.text('Количество разрешенных знаков равно 50');
			divError.css('display','inline-block');
			setTimeout(function() {
				divError.css('display','none');
			}, 3000);
		}
} 

function validateEmail(e) {
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]\.)?[a-z]{2,6}$/i;
	var inputEmail = $(e.currentTarget);
	var rootDiv = inputEmail.parent().parent();
	var divError = rootDiv.children('#EMAIL');
	if (inputEmail.val().search(pattern) == 0) {
		inputEmail.removeClass('error').addClass('ok');
		divError.css('display','none');
	} else {
		inputEmail.removeClass('ok').addClass('error');
		divError.text('example@example.ru');
		divError.css('display','inline-block');
	}	
}  

function sendAjaxForm(result_form, ajax_form, url) {
	var form_data = $("#"+ajax_form).serialize();	
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
		data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
			$("p").empty();
			for (var key in result.data) {
				console.log(result.data[key]);
				if(key == "message"){
					$('#result_form').html('Ответ '+result.data[key]);
				}else{
					$('div[id="'+key+'"]').html(result.data[key]);
				}
			}
			
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
			alert(form_data);
    	}
		
 	});
}
