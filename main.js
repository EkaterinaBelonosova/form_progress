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
	$('<button type="button" id="btn" value="Отправить" />').appendTo('#ajax_form');
	$('input[name="EMAIL"]').on('input', validateEmail);
			
    $("#btn").click(	 
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'https://workspace.ru/ajax/test/test.php');
			return false; 
		}
		
	);

	
	var input = $('input');
	var lengthInput = input.length;
	for(let i=0; i<lengthInput; i++){
		input[i].oninput = function(){
			var nameInput = input[i].name;
			if(nameInput=="NAME" || nameInput=="LAST_NAME"){
				$(input[i]).prop({ maxLength : 50 });
				if((input[i].value == input[i].value.replace(/[^а-яА-Я\s]/g, ''))==false){
					input[i].value = input[i].value.replace(/[^а-яА-Я\s]/g, '');
					$('#'+nameInput).text('Используйте только русские буквы и пробелы');
					$('input[name="'+nameInput+'"]').removeClass('ok').addClass('error');
					$('div[id="'+nameInput+'"]')[0].style.display = 'block';
				}else{
					$('#'+nameInput).text('ок');
					$('input[name="'+nameInput+'"]').removeClass('error').addClass('ok');
					$('div[id="'+nameInput+'"]')[0].style.display = 'none';
				}
				if(input[i].value.length==50){
					$('#'+nameInput).text('Количество разрешенных знаков равно 50');
					$('div[id="'+nameInput+'"]')[0].style.display = 'block';
					

				}
				
				console.log(input[i].value.length);
			}if(nameInput=="TEXT"){
				$(input[i]).prop({ maxLength : 500 },{ minLength : 3});
			}

			$('input[name="PHONE"]').mask("89999999999");
		
		};
	}
	

});

function validateEmail(e) {
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]\.)?[a-z]{2,6}$/i;
	var inputEmail = $(e.currentTarget);
	var rootDiv = inputEmail.parent();
	var divError = rootDiv.children('.formError');
	console.log(rootDiv.children('.formError'));
	if (inputEmail.val().search(pattern) == 0) {
		inputEmail.removeClass('error').addClass('ok');
		divError.css('display:none');
	} else {
		inputEmail.removeClass('ok').addClass('error');
		divError.text('Не подходит');
		divError.css('display:block');
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
