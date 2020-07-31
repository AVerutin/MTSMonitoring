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
                // setSensorValue(sensor.id, sensor.value);
                // drawCanvas(sensor.id, sensor.value);
                // drawRollgangs(sensor.id, sensor.value);
                parseSensors(data);
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

// Обработка полученных значений сенсоров
function parseSensors (data) {


}

function setActive (id) {
    var element = document.getElementById(id);
    element.style.border = '3px solid red';
}

function setInActive (id) {
    var element = document.getElementById(id);
    element.style.border = '3px none red';
}

function diviatorTurn(id, direction) {
    var elememt = document.getElementById(id);
    switch (direction.toLowerCase()) {
        case 'left': {
            elememt.src = 'img/diviator_left.png';
            break;
        }
        case 'right': {
            elememt.src = 'img/diviator_right.png';
            break;
        }
        case 'down': {
            elememt.src = 'img/deviator_down.png';
            break;
        }
    }
}

function setMaterial(silos, material) {
    number = '';
    switch(silos) {
        case 1: number = 's1_mat'; break;
        case 2: number = 's2_mat'; break;
        case 3: number = 's3_mat'; break;
        case 4: number = 's4_mat'; break;
        case 5: number = 's5_mat'; break;
        case 6: number = 's6_mat'; break;
        case 7: number = 's7_mat'; break;
        case 8: number = 's8_mat'; break;
    }
    var element = document.getElementById(number);
    var spaces = 6 - material.length;
    var sp = '';
    for (i=0; i < spaces; i++) {
        sp += '&nbsp;';
    }
    element.innerHTML = sp + material;
}

function setWeight(bunker, weight) {
    var number;
    switch(bunker) {
        case 1: number = 'weight1_label'; break;
        case 2: number = 'weight2_label'; break;
        case 3: number = 'weight3_label'; break;
    }
    var bunk = document.getElementById(number);
    bunk.innerHTML = weight;
}

function setTemperature(temperature) {
    var dsp = document.getElementById('dsp_label');
    dsp.innerHTML = temperature;
}

function setSilosStatus(silos, status) {
    var number;
    var stat = 'img/';
    switch(silos) {
        case 1: number = 'silos1_status'; break;
        case 2: number = 'silos2_status'; break;
        case 3: number = 'silos3_status'; break;
        case 4: number = 'silos4_status'; break;
        case 5: number = 'silos5_status'; break;
        case 6: number = 'silos6_status'; break;
        case 7: number = 'silos7_status'; break;
        case 8: number = 'silos8_status'; break;
    }
    switch(status.toLowerCase()) {
        case 'on': stat += 'on.png'; break;
        case 'off': stat += 'off.png'; break;
        case 'error': stat += 'error.png'; break;
    }

    document.getElementById(number).src = stat;
}

function setWeightStatus(weigth, status) {
    var number;
    var stat = 'img/';
    switch(weigth) {
        case 1: number = 'weight1_status'; break;
        case 2: number = 'weight2_status'; break;
        case 3: number = 'weight3_status'; break;
    }
    switch(status.toLowerCase()) {
        case 'on': stat += 'on.png'; break;
        case 'off': stat += 'off.png'; break;
        case 'error': stat += 'error.png'; break;
    }

    document.getElementById(number).src = stat;
}

// Запуск JS-кода при полной загрузке контента страницы
document.addEventListener('DOMContentLoaded', () => {
	init();
});