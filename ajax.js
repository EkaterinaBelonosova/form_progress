/* Article FructCode.com */
$( document ).ready(function() {
    $("#btn").click(	
		function(){
			let resp = '[{"required":true,"fields":{"NAME":false}},{"required":false,"fields":{"LAST_NAME":true}},{"required":true,"fields":{"EMAIL":false,"PHONE":false}},{"required":false,"fields":{"TYPE":false}},{"required":false,"fields":{"TEXT":false}}]';
			let js = JSON.parse(resp);
			console.log(js.length);
			console.log(js[0].fields.NAME);
			console.log(js);
			let $data={};
			$('#ajax_form').find ('input').each(function() {
					  // добавим новое свойство к объекту $data
					  // имя свойства – значение атрибута name элемента
					  // значение свойства – значение свойство value элемента
					  $data[this.name] = $(this).val();
					});
			console.log($data);	
			for (var key in $data) {
				  console.log(key);
				}
			for(let i=0; i<js.length; i++){
				for(var key in $data){
					if(js[i].fields==key){
						if(js[i].required==true)
					}	
				}
				
			}
			sendAjaxForm('result_form', 'ajax_form', 'https://workspace.ru/ajax/test/test.php');
			return false; 
		}
		
	);
});

function sendAjaxForm(result_form, ajax_form, url) {

console.log($("#"+ajax_form).serialize());

	var form_data = $("#"+ajax_form).serialize();	
	var request = new XMLHttpRequest();
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
		data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
        	$('#result_form').html('Имя: '+result.name+'<br>Телефон: '+result.phonenumber+result.last_name+result.email);
			console.log(result);
			
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
			alert(form_data);
    	}
		
 	});
}

 
/*[{
	"required":true,
	"fields":{
		"NAME":false
		}
	},
{"required":false,"fields":{"LAST_NAME":true}},
{"required":true,"fields":{"EMAIL":false,"PHONE":false}},
{"required":false,"fields":{"TYPE":false}},
{"required":false,"fields":{"TEXT":false}}]*/