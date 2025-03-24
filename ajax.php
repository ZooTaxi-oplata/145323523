<?php
// ajax.php
$BOT_TOKEN = "7853697399:AAECtRTONF7QYMiAo4qZRAlz8-k5YKnQ50Y";  // Замените на ваш токен
$CHAT_ID = "2131258150";  // Замените на ваш chat_id

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_FILES['file'])) {
    $file = $_FILES['file'];
    $tmp_path = $file['tmp_name'];
    $file_name = $file['name'];

    // Отправка файла через Telegram API
    $url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendDocument";
    $postData = [
        'chat_id' => $CHAT_ID,
        'document' => new CURLFile($tmp_path, mime_content_type($tmp_path), $file_name)
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    if ($result) {
        echo '1';  // Ответ успешной отправки
    } else {
        http_response_code(500);
        echo 'Ошибка отправки файла в Telegram';
    }
} else {
    http_response_code(400);
    echo 'Ошибка: файл не выбран';
}
?>
