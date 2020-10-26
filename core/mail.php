<?php
// читати JSON файл
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

// письмо
$message = '';
$message .= '<h1>Your order</h1>';
$message .= '<p>Name: '.$_POST['name'].'</p>';
$message .= '<p>Surname: '.$_POST['surname'].'</p>';
$message .= '<p>fathername: '.$_POST['fathername'].'</p>';
$message .= '<p>phone: '.$_POST['phone'].'</p>';
$message .= '<p>mail: '.$_POST['mail'].'</p>';
$message .= '<p>location: '.$_POST['location'].'</p>';
$message .= '<p>index: '.$_POST['index'].'</p>';
$message .= '<p>way: '.$_POST['way'].'</p>';
$message .= '<p>number: '.$_POST['number'].'</p>';
$message .= '<p>textarea: '.$_POST['textarea'].'</p>';

$cart =  $_POST['cart'];
$sum = 0;



// я просто добавив перевірку на масив чи обєкт - суто обгортка if
if (is_array($cart) || is_object($cart))
{
  foreach( $cart as $id => $count){
    $message .=$json[$id]['name'].' --- ';
    $message .=$count.' --- ';
    $message .=$count*$json[$id]['cost'];
    $message .='<br>';
    $sum = $sum +$count*$json[$id]['cost'];
  }
}

$message .='In general - '.$sum;
// print_r($message);

$to = 'worktarasyuk@gmail.com'.',';
$to .=$_POST['email'];//письмо буде відпр і на email, який користувач ввів у формі
$spectext = '<!DOCTYPE html><html><head><title>Order</title></head><body>';

// хз що
$headers = 'MIME-Version: 1.0' ."\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' ."\r\n";


$m = mail($to, 'Order in store', $spectext.$message.'</body><html>', $headers);

if ($m) { echo 1;}
else{echo 0;}
