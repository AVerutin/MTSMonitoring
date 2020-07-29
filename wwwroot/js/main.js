function init() {
    createHub();
}

// Создание ресивера для подключения к хабу сервера
function createHub() {
        // Подключение к хабу MTSHub
        const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/MTSHub")
        .build();

    // Обработка сообщения от сервера (callback-функция)
    hubConnection.on("receive", function (data) {
        // Разбираем строку ответа от сервера
        if (data) {
            let sensors = JSON.parse(data).Sensors;
            for (let sensor of sensors) {
                setSensorValue(sensor.id, sensor.value);
                // drawCanvas(sensor.id, sensor.value);
                drawRollgangs(sensor.id, sensor.value);
            }
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

// Вывод рольганга по его имени
function drawRollgangs(name, value) {
    worked = 'img/w_rollgang.png';
    stopped = 'img/s_rollgang.png';
    // value = parseFloat(val);

    switch (name) {
        case 4000: {
            if (value > 5) {
                document.getElementById('rollgang1').src = worked;
            } else {
                document.getElementById('rollgang1').src = stopped;
            }
            break;
        }
        case 4001: {
            if (value > 5) {
                document.getElementById('rollgang2').src = worked;
            } else {
                document.getElementById('rollgang2').src = stopped;
            }
            break;
        }
        case 4002: {
            if (value > 5) {
                document.getElementById('rollgang3').src = worked;
            } else {
                document.getElementById('rollgang3').src = stopped;
            }
            break;
        }
    }
}


// Функция добавления строки в таблицу для каждого сенсора
function setSensorValue(name, value) {
    // Ищем строку для сенсора по ID
    let sensor = document.getElementById(name);
    if (!sensor) {
        // Такого сенсора нет, создаем для него строку в таблице
        var tbody = document.getElementById('sensorslist').getElementsByTagName("TBODY")[0];
        var row = document.createElement("TR");
        row.id = name;
        var td1 = document.createElement("TD");
        td1.appendChild(document.createTextNode(name));
        var td2 = document.createElement("TD");
        td2.appendChild(document.createTextNode(value));
        row.appendChild(td1);
        row.appendChild(td2);
        tbody.appendChild(row);
    }
    else {
        // Строка для этого сенсора найдена, обновляем значения
        sensor.getElementsByTagName("td")[1].innerHTML = value;
    }
}

function drawCanvas(name, value) {
    // Получаем холст и устанавливаем его размеры
    const canvas = document.getElementById('canvas');
    canvas.setAttribute('width', 800);
    canvas.setAttribute('height', 500);

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        caption = name + " =";
        caption_len = ctx.measureText(caption).width;

        ctx.font = "18px sansserif";
        ctx.fillStyle = 'cyan';
        switch (name) {
            case 4000: {
                ctx.clearRect(90, 80, 180, 30);
                ctx.fillText(caption, 100, 100);
                ctx.fillText(value, 100 + caption_len + 5, 100);
                break;
            }
            case 4001: {
                ctx.clearRect(90, 130, 180, 30);
                ctx.fillText(caption, 100, 150);
                ctx.fillText(value, 100 + caption_len + 5, 150);
                break;
            }
            case 4002: {
                ctx.clearRect(90, 180, 180, 30);
                ctx.fillText(caption, 100, 200);
                ctx.fillText(value, 100 + caption_len + 5, 200);
                break;
            }
            case 4003: {
                ctx.clearRect(90, 230, 180, 30);
                ctx.fillText(caption, 100, 250);
                ctx.fillText(value, 100 + caption_len + 5, 250);
                break;
            }
            case 4004: {
                ctx.clearRect(90, 280, 180, 30);
                ctx.fillText(caption, 100, 300);
                ctx.fillText(value, 100 + caption_len + 5, 300);
                break;
            }
            case 4005: {
                ctx.clearRect(90, 330, 180, 30);
                ctx.fillText(caption, 100, 350);
                ctx.fillText(value, 100 + caption_len + 5, 350);
                break;
            }
        }
        
    } else {
        document.write("<h3>Холст не поддерживается</h3>");
    }
}


// Запуск JS-кода при полной загрузке контента страницы
document.addEventListener('DOMContentLoaded', () => {
	init();
});