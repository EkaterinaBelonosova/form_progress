/* Article FructCode.com */

$( document ).ready(function() {
	var resp = '[{"required":true,"fields":{"NAME":false}},{"required":false,"fields":{"LAST_NAME":true}},{"required":true,"fields":{"EMAIL":false,"PHONE":false}},{"required":false,"fields":{"TYPE":false}},{"required":false,"fields":{"TEXT":false}}]';
	var jsonArray = JSON.parse(resp);
	for (var i in jsonArray) {
		var jsonObj = jsonArray[i];
		var fieldSet = $('<fieldset></fieldset>');
		if (jsonObj.required == true) {
			fieldSet.attr("required","required")					
		}
		var fields = jsonObj.fields;
		for (var key in fields) {
			var required = fields[key] == true;
			var rootInput = $('<div></div>');
			var divError = $('<div class="formError" id="'+ key +'"></div>');
			var inputField = $('<input type="text" name="'+ key + '" placeholder="' + key + '">');
			if (required == true) {
				inputField.attr("required","required");
			}
			var pError =$('<p id="' + key + '"></p>');
			divError.appendTo(rootInput);
			inputField.appendTo(rootInput);
			pError.appendTo(rootInput);
			rootInput.appendTo(fieldSet);
		}
		fieldSet.appendTo('#ajax_form');

	}
	$('<button type="button" id="btn" value="Отправить">Отправить</button>').appendTo('#ajax_form');
	$('input[name="EMAIL"]').on('input', validateEmail);
	$('input[name="NAME"]').on('input', validateName);
	$('input[name="LAST_NAME"]').on('input', validateName);
	$('input[name="PHONE"]').on('input', validatePhone);
	$('input[name="TEXT"]').on('input', validateText);

			
    $("#btn").click(	 
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'https://workspace.ru/ajax/test/test.php');
			return false; 
		}
		
	);
});

function validateText(e) {
	var inputText = $(e.currentTarget);
	var rootDiv = inputText.parent();
	var divError = rootDiv.children('.formError');
	inputText.attr("maxLength","500");
	inputText.attr("minLength","3");
	var InputTextVal = $(inputText).val();
	var InputTextLenght = InputTextVal.length;
	console.log(InputTextLenght);
		if (InputTextLenght > 500 || InputTextLenght < 3){
			divError.text('Количество знаков должно быть в переделе от 3 до 500');
			inputText.removeClass('ok').addClass('error');
			divError.css('display','block');
		} else {
			inputText.removeClass('error').addClass('ok');
			divError.css('display','none');
		}
}  
function validatePhone(e) {
	var inputPhone = $(e.currentTarget);
	var rootDiv = inputPhone.parent();
	var divError = rootDiv.children('.formError');
	inputPhone.attr("maxLength","14");
	inputPhone.attr("minLength","10");
	var InputPhoneVal = $(inputPhone).val();
	var InputPhoneLenght = InputPhoneVal.length;
	console.log(InputPhoneLenght);
		if (InputPhoneVal.match(/[^0-9]/g, '')) {
			inputPhone[0].value = InputPhoneVal.replace(/[^0-9]/g, '');
			console.log('4'+InputPhoneVal);
			divError.text('Используйте только цифровые знаки');
			inputPhone.removeClass('ok').addClass('error');
			divError.css('display','block');
		} else {
			inputPhone.removeClass('error').addClass('ok');
			divError.css('display','none');
			
		}
		if (InputPhoneLenght > 14 || InputPhoneLenght < 9){
			divError.text('Количество знаков должно быть в переделе от 10 до 14');
			inputPhone.removeClass('ok').addClass('error');
			divError.css('display','block');
		}
    
}  
function validateName(e) {
	var progress = $("#progress").attr("value");
	console.log(progress);
	var inputName = $(e.currentTarget);
	var rootDiv = inputName.parent();
	var divError = rootDiv.children('.formError');
	var InputNameVal = $(inputName).val();
	inputName.attr("maxLength","50");
		if (InputNameVal.match(/[^а-яА-Я\s]/g, '')) {
			inputName[0].value = InputNameVal.replace(/[^а-яА-Я\s]/g, '');
			divError.text('Используйте только русские буквы и пробелы');
			inputName.removeClass('ok').addClass('error');
			divError.css('display','block');
		} else {
			inputName.removeClass('error').addClass('ok');
			divError.css('display','none');
		}
		if (inputName.val().length == 50) {
			divError.text('Количество разрешенных знаков равно 50');
			divError.css('display','block');
			function closeDiv (){
				divError.css('display','none');
			}
			setTimeout(closeDiv, 3000);
		}
		if (InputNameVal.length > 0) {
			var progressPercent = 17.4;
			console.log('progressPercent' + progressPercent);
			$("#progress").attr("value",progressPercent) 
		}
	/*if(nameInput=="TEXT"){
				$(input[i]).prop({ maxLength : 500 },{ minLength : 3});
			}

			$('input[name="PHONE"]').mask("89999999999");
		
		};
		
	}*/

} 

function validateEmail(e) {
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]\.)?[a-z]{2,6}$/i;
	var inputEmail = $(e.currentTarget);
	var rootDiv = inputEmail.parent();
	var divError = rootDiv.children('.formError');
	console.log(inputEmail);
	if (inputEmail.val().search(pattern) == 0) {
		inputEmail.removeClass('error').addClass('ok');
		divError.css('display','none');
	} else {
		inputEmail.removeClass('ok').addClass('error');
		divError.text('Не подходит');
		divError.css('display','block');
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
					$('p[id="'+key+'"]').html('Ответ '+result.data[key]);
				}
			}
			
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
			alert(form_data);
    	}
		
 	});
}
