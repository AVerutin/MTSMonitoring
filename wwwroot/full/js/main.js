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
            parseSensors(sensors);
            // for (let sensor of sensors) {
                // setSensorValue(sensor.id, sensor.value);
                // drawCanvas(sensor.id, sensor.value);
                // drawRollgangs(sensor.id, sensor.value);
            // }
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
    var sensors = data;
    const materials = ['', 'Al Met', 'Al2O3', 'CaC2', 'CaF2', 'CaMg', 'CaO', 'Carbon', 'FeB', 'FeCr', 'FeMn', 'FeNb', 'FeSi', 'FeSiMn', 'FeV', 'FOMi', 'Met Mn', 'MgO', 'Mn', 'SiC', 'USM'];
    for (var i = 0; i < sensors.length; ++i) {
        switch (sensors[i].id) {
            case 4000: {
                // 1

                break;
            }
            case 4001: {
                // 2

                break;
            }
            case 4002: {
                // 3

                break;
            }
            case 4003: {
                // 4

                break;
            }
            case 4004: {
                // 5

                break;
            }
            case 4005: {
                // 6

                break;
            }
            case 4006: {
                // Материал 1
                setMaterial(1, materials[sensors[i].value]);
                break;
            }
            case 4007: {
                // Материал 2
                setMaterial(2, materials[sensors[i].value]);
                break;
            }
            case 4008: {
                // Материал 3
                setMaterial(3, materials[sensors[i].value]);
                break;
            }
            case 4009: {
                // Материал 4
                setMaterial(4, materials[sensors[i].value]);
                break;
            }
            case 4010: {
                // Материал 5
                setMaterial(5, materials[sensors[i].value]);
                break;
            }
            case 4011: {
                // Материал 6
                setMaterial(6, materials[sensors[i].value]);
                break;
            }
            case 4012: {
                // Материал 7
                setMaterial(7, materials[sensors[i].value]);
                break;
            }
            case 4013: {
                // Материал 8
                setMaterial(8, materials[sensors[i].value]);
                break;
            }
            case 4014: {
                // Силос 1
                if (sensors[i].value == 1) {
                    setSilosStatus(1, 'on');
                }
                else {
                    setSilosStatus(1, 'off');
                }
                break;
            }
            case 4015: {
                // Силос 2
                if (sensors[i].value == 1) {
                    setSilosStatus(2, 'on');
                } else {
                    setSilosStatus(2, 'off');
                }
                break;
            }
            case 4016: {
                // Силос 3
                if (sensors[i].value == 1) {
                    setSilosStatus(3, 'on');
                } else {
                    setSilosStatus(3, 'off');
                }
                break;
            }
            case 4017: {
                // Силос 4
                if (sensors[i].value == 1) {
                    setSilosStatus(4, 'on');
                } else {
                    setSilosStatus(4, 'off');
                }
                break;
            }
            case 4018: {
                // Силос 5
                if (sensors[i].value == 1) {
                    setSilosStatus(5, 'on');
                } else {
                    setSilosStatus(5, 'off');
                }
                break;
            }
            case 4019: {
                // Силос 6
                if (sensors[i].value == 1) {
                    setSilosStatus(6, 'on');
                } else {
                    setSilosStatus(6, 'off');
                }
                break;
            }
            case 4020: {
                // Силос 7
                if (sensors[i].value == 1) {
                    setSilosStatus(7, 'on');
                } else {
                    setSilosStatus(7, 'off');
                }
                break;
            }
            case 4021: {
                // Силос 8
                if (sensors[i].value == 1) {
                    setSilosStatus(8, 'on');
                } else {
                    setSilosStatus(8, 'off');
                }
                break;
            }
            case 4022: {
                // Бункер 1
                if (sensors[i].value == 1) {
                    setWeightStatus(1, 'on');
                } else {
                    setWeightStatus(1, 'off');
                }
                break;
            }
            case 4023: {
                // Бункер 2
                if (sensors[i].value == 1) {
                    setWeightStatus(2, 'on');
                } else {
                    setWeightStatus(2, 'off');
                }
                break;
            }
            case 4024: {
                // Бункер 3
                if (sensors[i].value == 1) {
                    setWeightStatus(3, 'on');
                } else {
                    setWeightStatus(3, 'off');
                }
                break;
            }
            case 4025: {
                // Вес 1
                let val = sensors[i].value;
                setWeight(1, val.toFixed(1));
                break;
            }
            case 4026: {
                // Вес 2
                let val = sensors[i].value;
                setWeight(2, val.toFixed(1));
                break;
            }
            case 4027: {
                // Вес 3
                let val = sensors[i].value;
                setWeight(3, val.toFixed(1));
                break;
            }
            case 4028: {
                // Цель
                setTarget(sensors[i].value);
                break;
            }
            case 4029: {
                setTemperature(sensors[i].value);
                break;
            }
        }
    }
}

function selectTarget (target) {
    switch (target) {
        case 1: {
            // Цель - УПК
            setActive('elevator1');
            setTimeout(setInActive, 5000, 'elevator1');
            setTimeout(setActive, 5050, 'diviator1');
            setTimeout(setInActive, 6050, 'diviator1');
            setTimeout(setActive, 6100, 'diviator2');
            setTimeout(setInActive, 7100, 'diviator2');
            setTimeout(setActive, 7150, 'elevator2');
            setTimeout(setInActive, 12150, 'elevator2');
            setTimeout(setActive, 12200, 'diviator4');
            setTimeout(setInActive, 13200, 'diviator4');
            setTimeout(setActive, 13250, 'upk');
            setTimeout(setInActive, 18300, 'upk');
            break;
        }
        case 2: {
            // Цель - сторона УПК
            setActive('elevator1');
            setTimeout(setInActive, 5000, 'elevator1');
            setTimeout(setActive, 5050, 'diviator1');
            setTimeout(setInActive, 6050, 'diviator1');
            setTimeout(setActive, 6100, 'diviator2');
            setTimeout(setInActive, 7100, 'diviator2');
            setTimeout(setActive, 7150, 'diviator3');
            setTimeout(setInActive, 8150, 'diviator3');
            setTimeout(setActive, 8200, 'stalevoz');
            setTimeout(setInActive, 10200, 'stalevoz');
            break;
        }
        case 3: {
            // Цель - сторона ДСП
            setActive('elevator1');
            setTimeout(setInActive, 5000, 'elevator1');
            setTimeout(setActive, 5050, 'diviator1');
            setTimeout(setInActive, 6050, 'diviator1');
            setTimeout(setActive, 6100, 'diviator2');
            setTimeout(setInActive, 7100, 'diviator2');
            setTimeout(setActive, 7150, 'diviator3');
            setTimeout(setInActive, 8150, 'diviator3');
            setTimeout(setActive, 8200, 'stalevoz');
            setTimeout(setInActive, 10200, 'stalevoz');
            break;
        }
        case 4: {
            // Цель - ДСП
            setActive('elevator1');
            setTimeout(setInActive, 5000, 'elevator1');
            setTimeout(setActive, 5050, 'diviator1');
            setTimeout(setInActive, 6000, 'diviator1');
            setTimeout(setActive, 6050, 'dsp');
            setTimeout(setInActive, 8000, 'dsp');
            break;
        }
    }
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
    let name;
    switch(id) {
        case 1: name = 'diviator1'; break;
        case 2: name = 'diviator2'; break;
        case 3: name = 'diviator3'; break;
        case 4: name = 'diviator4'; break;
    }
    var elememt = document.getElementById(name);
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

function moveStalevoz(pos) {
    var position;
    switch (pos.toLowerCase()) {
        case 'upk': position = 0; break;
        case 'side-upk': position = 500; break;
        case 'side-dsp': position = 650; break;
        case 'dsp': position = 850; break;
    }

    way.style.marginLeft = position;
}

function setMaterial(silos, material) {
    number = '';
    switch (silos) {
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
    switch (bunker) {
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
    switch (silos) {
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
    switch (weigth) {
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

function setTarget(target) {
    selectTarget(target);
    switch (target) {
        case 1: {
            // Цель - УПК
            diviatorTurn(1, 'left');
            diviatorTurn(2, 'left');
            moveStalevoz('upk');
            
            break;
        }
        case 2: {
            // Цель - сторона УПК
            diviatorTurn(1, 'left');
            diviatorTurn(2, 'right');
            diviatorTurn(3, 'left');
            moveStalevoz('side-upk');
            break;
        }
        case 3: {
            // Цель - сторона ДСП
            diviatorTurn(1, 'left');
            diviatorTurn(2, 'right');
            diviatorTurn(3, 'right');
            moveStalevoz('side-dsp');
            
            break;
        }
        case 4: {
            // Цель - ДСП
            diviatorTurn(1, 'right');
            moveStalevoz('dsp');
            break;
        }
    }
}

// Запуск JS-кода при полной загрузке контента страницы
document.addEventListener('DOMContentLoaded', () => {
	init();
});