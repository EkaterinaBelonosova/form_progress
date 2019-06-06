/* Article FructCode.com */
$( document ).ready(function() {
	let resp = '[{"required":true,"fields":{"NAME":false}},{"required":false,"fields":{"LAST_NAME":true}},{"required":true,"fields":{"EMAIL":false,"PHONE":false}},{"required":false,"fields":{"TYPE":false}},{"required":false,"fields":{"TEXT":false}}]';
	let js = JSON.parse(resp);
	let js_lenght = js.length;
	console.log(js[0]);
	console.log(js[0].fields);
	



		
		
			for(var key in js){
				for(let i=0; i<js.length; i++){				
					if(i==key){
						var count = 0;
						var clas = '';
						for (var k in js[i].fields) {							
							if(js[i].fields.hasOwnProperty(k)) count++;
								if(js[i].required == true){
									var required='required';
								}
								if(count>1){
									$('<div class="formError" id="'+k+'"></div><input type="text" name="'+k+'" placeholder="'+k+'"'+required+'>').appendTo('.'+clas+'');
								}else{
									$('<div class="'+k+'"></div><br>').appendTo('#ajax_form');
									$('<div class="formError" id="'+k+'"></div><input type="text" name="'+k+'" placeholder="'+k+'"'+required+'><p id="'+k+'"></p>').appendTo('.'+k+'');
								}
								required = '';
								clas = k;
						}
					}	
				}
				
			}
			$('<input type="button" id="btn" value="Отправить" />', {
			}).appendTo('#ajax_form');
	
			console.log(js.length);
			
    $("#btn").click(	
		function(){
			sendAjaxForm('result_form', 'ajax_form', 'https://workspace.ru/ajax/test/test.php');
			return false; 
		}
		
	);
	var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]\.)?[a-z]{2,6}$/i;
	var mail = $('input[name="EMAIL"]');
	var div_Email = $('div[id="EMAIL"]');
		mail[0].oninput = function(){
			if(mail[0].value.search(pattern) == 0){
				$('#EMAIL').text('Подходит');
				mail.removeClass('error').addClass('ok');
				div_Email[0].style.display = 'none';
			}else{
				$('#EMAIL').text('Не подходит');
				mail.removeClass('ok').addClass('error');
				div_Email[0].style.display = 'block';
			}	
		};
	var name_input = $('input[name="NAME"]');
	var lastname_input = $('input[name="LAST_NAME"]');
	var div_NAME = $('div[id="NAME"]');
	var div_LAST_NAME = $('div[id="LAST_NAME"]');
	var input = $('input');
	var length_input = input.length;
	for(let i=0; i<length_input; i++){
		input[i].oninput = function(){
			var name_input = input[i].name;
			if(name_input=="NAME" || name_input=="LAST_NAME"){
				$(input[i]).prop({ maxLength : 50 });
				if((input[i].value == input[i].value.replace(/[^а-яА-Я\s]/g, ''))==false){
					input[i].value = input[i].value.replace(/[^а-яА-Я\s]/g, '');
					$('#'+name_input).text('Используйте только русские буквы и пробелы');
					$('input[name="'+name_input+'"]').removeClass('ok').addClass('error');
					$('div[id="'+name_input+'"]')[0].style.display = 'block';
				}else{
					$('#'+name_input).text('ок');
					$('input[name="'+name_input+'"]').removeClass('error').addClass('ok');
					$('div[id="'+name_input+'"]')[0].style.display = 'none';
				}
				if(input[i].value.length==50){
					$('#'+name_input).text('Количество разрешенных знаков равно 50');
					$('div[id="'+name_input+'"]')[0].style.display = 'block';
					

				}
				
				console.log(input[i].value.length);
			}if(name_input=="TEXT"){
				$(input[i]).prop({ maxLength : 500 },{ minLength : 3});
			}

			$('input[name="PHONE"]').mask("89999999999");
		
		};
	}
	

});

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
