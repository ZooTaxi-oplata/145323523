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

// Инициализация Telegram WebApp
if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
    // Расширяем приложение на полный экран
    Telegram.WebApp.expand();

    // Отключаем прокрутку через CSS
    document.body.style.overflow = "hidden";

    // Дополнительно корректируем высоту страницы
    function adjustHeight() {
        document.body.style.height = `${window.innerHeight}px`;
        document.documentElement.style.height = `${window.innerHeight}px`;
    }

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
}
