document.addEventListener('DOMContentLoaded', function() {
  // Получаем иконки для копирования
  const copyIcon = document.querySelector('.copy-icon');
  const copyIcon2 = document.querySelector('.copy-icon2');

  // Получаем элементы с текстом, который нужно копировать
  const accountNumber = document.querySelector('.account-number');
  const amountNumber = document.querySelector('.amount-number');

  // Функция для копирования текста в буфер обмена
  function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy'); // Пытаемся выполнить команду копирования
      console.log('Текст скопирован в буфер обмена');
    } catch (err) {
      console.error('Ошибка при копировании в буфер обмена: ', err);
    }
    document.body.removeChild(textArea); // Удаляем временный textarea
  }

  // Обработчик для копирования текста из account-number без пробелов
  copyIcon.addEventListener('click', function() {
    const text = accountNumber.textContent.trim().replace(/\s+/g, ''); // Удаляем все пробелы
    copyToClipboard(text);
  });

  // Обработчик для копирования только числа из amount-number, без символа "₽" и пробелов
  copyIcon2.addEventListener('click', function() {
    const amountText = amountNumber.textContent.trim().replace(/[^\d]/g, ''); // Убираем нецифровые символы
    copyToClipboard(amountText);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const confirmButton = document.querySelector('.confirm-button');
  confirmButton.addEventListener('click', () => {
    window.location.href = 'cheque.html';
  });
});

// Инициализация Telegram WebApp
if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
    // Расширяем приложение на полный экран
    Telegram.WebApp.expand();

    // Дополнительно корректируем высоту страницы
    function adjustHeight() {
        document.body.style.height = `${window.innerHeight}px`;
        document.documentElement.style.height = `${window.innerHeight}px`;
    }

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // Получаем имя файла и расширение
        const fileName = file.name;
        const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
        let nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));

        // Если длина имени файла больше 20 символов, обрезаем
        if (nameWithoutExtension.length > 13) {
            nameWithoutExtension = nameWithoutExtension.substring(0, 13) + '...';
        }

        // Обновляем название и размер файла
        const fullFileName = nameWithoutExtension + fileExtension;
        const fileSize = (file.size / 1024).toFixed(2) + ' KB';

        // Показываем информацию о файле
        document.getElementById('fileName').textContent = fullFileName;
        document.getElementById('fileSize').textContent = fileSize;

        // Показываем информацию и кнопку "Подтвердить"
        document.querySelector('.file-info-container').style.display = 'block';

        // Скрываем кнопку загрузки файла
        document.querySelector('.add-receipt-button').style.display = 'none';
    }
}

function sendFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Пожалуйста, загрузите файл!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const btn = document.querySelector('.file-button');
    btn.textContent = 'Идет отправка...';
    btn.disabled = true;

    $.ajax({
        url: 'ajax.php',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response === '1') {
                btn.textContent = 'Файл отправлен!';
                // Редирект через 2 секунды
                setTimeout(() => {
                    window.location.href = 'successfully.html';
                }, 2000);
            } else {
                btn.textContent = 'Ошибка!';
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = 'Подтвердить оплату';
                }, 2000);
            }
        },
        error: function() {
            btn.textContent = 'Ошибка!';
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Подтвердить оплату';
            }, 2000);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.success-button');

    if(button) {
        button.addEventListener('click', function() {
            // Открываем ссылку в текущей вкладке
            window.location.href = 'https://t.me/ZooTaxi_robot';
        });
    }
});

