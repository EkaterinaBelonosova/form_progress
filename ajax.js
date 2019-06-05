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
						for(var k in key){
						console.log(js[i].fields);
						console.log(k);
							$('<div></div><br>', {
								style: js[i].fields.data 
							}).appendTo('#form');
							$('<div style="display:inline-block"></div><br>', {
							}).appendTo('div');
								if(js[i].required==true){
									
								}
						}
					}	
				}
				
			}
	
			console.log(js.length);
			
    $("#btn").click(	
		function(){
			let $data={};
			$('#ajax_form').find ('input').each(function() {
					  // добавим новое свойство к объекту $data
					  // имя свойства – значение атрибута name элемента
					  // значение свойства – значение свойство value элемента
					  $data[this.name] = $(this).val();
					});
			/*console.log($data);*/	
			for (var key in $data) {
				  /*console.log(key);*/
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
			$("p").empty();
			for (var key in result.data) {
				if(key == "message"){
					$('#result_form').html('Ответ '+result.data[key]);
				}else{
					$("#"+key).html('Ответ '+result.data[key]);
				}
			}
			
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
			alert(form_data);
    	}
		
 	});
}
