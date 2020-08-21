function init() {
    createHub();
    // Создание объектов для АРМ №1

}

function createHub() {
    // Подключение к хабу MTSHub
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/ARM1")
        .build();

    // Обработка сообщения от сервера (callback-функция)
    hubConnection.on("receive", function (data) {
        // Разбираем строку ответа от сервера
        if (data) {
            let sensors = JSON.parse(data).Sensors;
            parseSensors(sensors);
        }
    });

    // Отправка сообщений на сервер
    //message = "getMeData";
    //if (this._timer) clearInterval(this._timer);
    //if (!this._timer) {
    //    this._timer = setInterval(() => {
    //        hubConnection.invoke("Send", message);
    //    }, 100);
    //}

    // Запуск цикла обработки событий
    hubConnection.start();
}

// Запуск JS-кода при полной загрузке контента страницы
document.addEventListener('DOMContentLoaded', () => {
    init();
});
