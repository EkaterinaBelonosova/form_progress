<?php


// если в ассоциативном массиве $_POST существует ключ name
if (isset($_POST['name'])) {
  // присвоим переменной $name значение из ассоциативного массива POST соответсвующее ключу name
  $name = $_POST['name'];
  // выведем строку (ответ сервера)
  echo "Привет, ".$name."!";
}     

/*if (isset($_POST["name"]) && isset($_POST["phonenumber"]) ) { 

	// Формируем массив для JSON ответа
    $result = array(
    	'name' => $_POST["name"],
    	'phonenumber' => $_POST["phonenumber"]
    ); 

    // Переводим массив в JSON
    echo json_encode($result); 
}*/

?>