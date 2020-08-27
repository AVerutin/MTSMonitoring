// Подключение к хабу MTSHub
// var hubConnection;

async function init() {
    await createHub();

    siloses = [];
    weights = [];
    way_target = 0;

    // Создаем 8 загрузочных силосов
    for (let i=1; i<9; i++) {
        let silos = new Silos(i);    
        siloses.push(silos);
    }

    // Создаем 3 весовых бункера
    for (let i=1; i<4; i++) {
        let weight = new Weight(i);
        weights.push(weight);
    }
}

// Создание ресивера для подключения к хабу сервера
async function createHub() {
    // Подключение к хабу MTSHub
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/ARM2")
        .build();

    // Обработка сообщения от сервера (callback-функция)
    hubConnection.on("receive", function (data) {
        // Разбираем строку ответа от сервера
        if (data) {
            let sensors = JSON.parse(data).Sensors;
            parseSensors(sensors);
        }
    });

    hubConnection.on("statuses", function (data) {
        if (data) {
            let statuses = JSON.parse(data).Statuses;
            setStatuses(statuses);
        }
    });

    // Отправка сообщений на сервер
    //message = "getMeData";
    //if (this._timer) clearInterval(this._timer);
    //if (!this._timer) {
    //    this._timer = setInterval(() => {
    //        hubConnection.invoke("SendARM2", message).catch(err => alert(err));
    //    }, 1000);
    //}

    // Запуск цикла обработки событий
    await hubConnection.start();
}

/// <summary>
/// Отправка данных на сервер в виде JSON-строки
/// </summary>
/// <param name="message">Данные для сервера в виде JSON-строки</param>
//async function sendToServer(message) {
//    if (hubConnection != null && message !== "") {
//        await hubConnection.invoke("GetMessage", message);
//    }
//}

// Получение сигнала о смене статуса агрегата
function setStatuses(statuses) {
    for (let i = 0; i < statuses.length; i++) {
        let unit = statuses[i].id;
        let status = statuses[i].status
        // alert(unit + " получил статус " + status);
        switch (unit) {

        }
    }
}

// Обработка полученных значений сенсоров
function parseSensors (data) {
    let sensors = data;
    const materials = ['', 'Al Met', 'Al2O3', 'CaC2', 'CaF2', 'CaMg', 'CaO', 'Carbon', 'FeB', 'FeCr', 'FeMn', 'FeNb', 'FeSi', 'FeSiMn', 'FeV', 'FOMi', 'Met Mn', 'MgO', 'Mn', 'SiC', 'USM'];
    for (let i = 0; i < sensors.length; ++i) {
        switch (sensors[i].id) {
            case 4006: {
                // Материал 1
                // setMaterial(1, materials[sensors[i].value]);
                siloses[0].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4007: {
                // Материал 2
                // setMaterial(2, materials[sensors[i].value]);
                siloses[1].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4008: {
                // Материал 3
                // setMaterial(3, materials[sensors[i].value]);
                siloses[2].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4009: {
                // Материал 4
                // setMaterial(4, materials[sensors[i].value]);
                siloses[3].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4010: {
                // Материал 5
                // setMaterial(5, materials[sensors[i].value]);
                siloses[4].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4011: {
                // Материал 6
                // setMaterial(6, materials[sensors[i].value]);
                siloses[5].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4012: {
                // Материал 7
                // setMaterial(7, materials[sensors[i].value]);
                siloses[6].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4013: {
                // Материал 8
                // setMaterial(8, materials[sensors[i].value]);
                siloses[7].setMaterial(materials[sensors[i].value]);
                break;
            }
            case 4014: {
                // Силос 1
                if (sensors[i].value === 1) {
                    // setSilosStatus(1, 'on');
                    siloses[0].setStatus('on');
                }
                else {
                    // setSilosStatus(1, 'off');
                    siloses[0].setStatus('off');
                }
                break;
            }
            case 4015: {
                // Силос 2
                if (sensors[i].value === 1) {
                    // setSilosStatus(2, 'on');
                    siloses[1].setStatus('on');
                } else {
                    // setSilosStatus(2, 'off');
                    siloses[1].setStatus('off');
                }
                break;
            }
            case 4016: {
                // Силос 3
                if (sensors[i].value === 1) {
                    // setSilosStatus(3, 'on');
                    siloses[2].setStatus('on');
                } else {
                    // setSilosStatus(3, 'off');
                    siloses[2].setStatus('off');
                }
                break;
            }
            case 4017: {
                // Силос 4
                if (sensors[i].value === 1) {
                    // setSilosStatus(4, 'on');
                    siloses[3].setStatus('on');
                } else {
                    // setSilosStatus(4, 'off');
                    siloses[3].setStatus('off');
                }
                break;
            }
            case 4018: {
                // Силос 5
                if (sensors[i].value === 1) {
                    // setSilosStatus(5, 'on');
                    siloses[4].setStatus('on');
                } else {
                    // setSilosStatus(5, 'off');
                    siloses[4].setStatus('off');
                }
                break;
            }
            case 4019: {
                // Силос 6
                if (sensors[i].value === 1) {
                    // setSilosStatus(6, 'on');
                    siloses[5].setStatus('on');
                } else {
                    // setSilosStatus(6, 'off');
                    siloses[5].setStatus('off');
                }
                break;
            }
            case 4020: {
                // Силос 7
                if (sensors[i].value === 1) {
                    // setSilosStatus(7, 'on');
                    siloses[6].setStatus('on');
                } else {
                    // setSilosStatus(7, 'off');
                    siloses[6].setStatus('off');
                }
                break;
            }
            case 4021: {
                // Силос 8
                if (sensors[i].value === 1) {
                    // setSilosStatus(8, 'on');
                    siloses[7].setStatus('on');
                } else {
                    // setSilosStatus(8, 'off');
                    siloses[7].setStatus('off');
                }
                break;
            }
            case 4022: {
                // Бункер 1
                // Сигнал на высыпание материала из бункера
                if (sensors[i].value === 1) {
                    // setWeightStatus(1, 'on');
                    weights[0].setStatus('on');

                    // Удаляем все слои в весовом бункере
                    weights[0].empty();
                    clearTable(1);
                    selectTarget();
                } else {
                    // setWeightStatus(1, 'off');
                    weights[0].setStatus('off');
                }

                break;
            }
            case 4023: {
                // Бункер 2
                // Сигнал на высыпание материала из бункера
                if (sensors[i].value === 1) {
                    // setWeightStatus(2, 'on');
                    weights[1].setStatus('on');

                    // Удаляем все слои в весовом бункере
                    weights[1].empty();
                    clearTable(2);
                    selectTarget();
                } else {
                    // setWeightStatus(2, 'off');
                    weights[1].setStatus('off');
                }

                break;
            }
            case 4024: {
                // Бункер 3
                // Сигнал на высыпание материала из бункера
                if (sensors[i].value === 1) {
                    // setWeightStatus(3, 'on');
                    weights[2].setStatus('on');

                    // Удаляем все слои в весовом бункере
                    weights[2].empty();
                    clearTable(3);
                    selectTarget();
                } else {
                    // setWeightStatus(3, 'off');
                    weights[2].setStatus('off');
                }

                break;
            }
            case 4025: {
                // Вес 1
                // Сигнал на добавление материала в бункер (изменение веса)

                // Получаем материал выбранного силоса
                //  (загрузка весового бункера может производиться из одного силоса единоразово)
                let material;

                // Номер партии для материала
                let partNo;

                if (siloses[0].getStatus() === 'on') {
                    material = siloses[0].getMaterial();
                    partNo = siloses[0].getPartNo();
                } else {
                    if (siloses[1].getStatus() === 'on') {
                        material = siloses[1].getMaterial();
                        partNo = siloses[1].getPartNo();
                    } else {
                        if (siloses[2].getStatus() === 'on') {
                            material = siloses[2].getMaterial();
                            partNo = siloses[2].getPartNo();
                        }
                    }
                }

                // Если нет выбранного бункера или номера партии, то ставим ошибку на весовой бункер
                if (material === undefined || partNo === undefined) {
                    weights[0].setStatus('error');
                    break;
                }

                // Получаем новый вес весового бункера
                let newWeight = sensors[i].value;
                weights[0].setWeight(newWeight.toFixed(1));

                // Получаем вес предыдущих слоев материала, уже загруженного в весовой бункер
                // let prevWeight = weights[0].getLastWeight();

                // Расчет вес нового слоя материала
                // let layerWeight = newWeight - prevWeight;

                // Добавление нового слоя в весовой бункер
                // let layer = weights[0].addLayer(material, partNo, layerWeight);

                // Отображение нового слоя в таблице соотвествующей данному весовому бункеру
                // addLayer(1, layer);

                break;
            }
            case 4026: {
                // Вес 2
                // Сигнал на добавление материала в бункер (изменение веса)

                // Получаем материал выбранного силоса
                //  (загрузка весового бункера может производиться из одного силоса единоразово)
                let material;

                // Номер партии для материала
                let partNo;

                if (siloses[3].getStatus() === 'on') {
                    material = siloses[3].getMaterial();
                    partNo = siloses[3].getPartNo();
                } else {
                    if (siloses[4].getStatus() === 'on') {
                        material = siloses[4].getMaterial();
                        partNo = siloses[4].getPartNo();
                    } else {
                        if (siloses[5].getStatus() === 'on') {
                            material = siloses[5].getMaterial();
                            partNo = siloses[5].getPartNo();
                        }
                    }
                }

                // Если нет выбранного бункера или номера партии, то ставим ошибку на весовой бункер
                if (material === undefined || partNo === undefined) {
                    weights[1].setStatus('error');
                    break;
                }
                
                let newWeight = sensors[i].value;
                weights[1].setWeight(newWeight.toFixed(1));

                // Получаем вес предыдущих слоев материала, уже загруженного в весовой бункер
                // let prevWeight = weights[1].getLastWeight();

                // Расчет вес нового слоя материала
                // let layerWeight = newWeight - prevWeight;

                // Добавление нового слоя в весовой бункер
                // let layer = weights[1].addLayer(material, partNo, layerWeight);

                // Отображение нового слоя в таблице соотвествующей данному весовому бункеру
                // addLayer(2, layer);

                break;
            }
            case 4027: {
                // Вес 3
                // Сигнал на добавление материала в бункер (изменение веса)

                // Получаем материал выбранного силоса
                //  (загрузка весового бункера может производиться из одного силоса единоразово)
                let material;

                // Номер партии для материала
                let partNo;

                if (siloses[6].getStatus() === 'on') {
                    material = siloses[6].getMaterial();
                    partNo = siloses[6].getPartNo();
                } else {
                    if (siloses[7].getStatus() === 'on') {
                        material = siloses[7].getMaterial();
                        partNo = siloses[7].getPartNo();
                    } 
                }

                // Если нет выбранного бункера или номера партии, то ставим ошибку на весовой бункер
                if (material === undefined || partNo === undefined) {
                    weights[2].setStatus('error');
                    break;
                }

                let newWeight = sensors[i].value;
                weights[2].setWeight(newWeight.toFixed(1));

                // Получаем вес предыдущих слоев материала, уже загруженного в весовой бункер
                // let prevWeight = weights[2].getLastWeight();

                // Расчет вес нового слоя материала
                // let layerWeight = newWeight - prevWeight;

                // Добавление нового слоя в весовой бункер
                // let layer = weights[2].addLayer(material, partNo, layerWeight);

                // Отображение нового слоя в таблице соотвествующей данному весовому бункеру
                // addLayer(3, layer);

                break;
            }
            case 4028: {
                // Цель
                setTarget(sensors[i].value);
                break;
            }
            case 4029: {
                // Температура плавки
                setTemperature(sensors[i].value);
                break;
            }
            case 4030: {
                // Номер партии материала в силосе 1
                siloses[0].setPartNo(sensors[i].value);
                break;
            }
            case 4031: {
                // Номер партии материала в силосе 1
                siloses[1].setPartNo(sensors[i].value);
                break;
            }
            case 4032: {
                // Номер партии материала в силосе 1
                siloses[2].setPartNo(sensors[i].value);
                break;
            }
            case 4033: {
                // Номер партии материала в силосе 1
                siloses[3].setPartNo(sensors[i].value);
                break;
            }
            case 4034: {
                // Номер партии материала в силосе 1
                siloses[4].setPartNo(sensors[i].value);
                break;
            }
            case 4035: {
                // Номер партии материала в силосе 1
                siloses[5].setPartNo(sensors[i].value);
                break;
            }
            case 4036: {
                // Номер партии материала в силосе 1
                siloses[6].setPartNo(sensors[i].value);
                break;
            }
            case 4037: {
                // Номер партии материала в силосе 1
                siloses[7].setPartNo(sensors[i].value);
                break;
            }
        }
    }
}

function selectTarget () {
    switch (way_target) {
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
    let element = document.getElementById(id);
    element.style.border = '3px solid red';
}

function setInActive (id) {
    let element = document.getElementById(id);
    element.style.border = '3px solid white';
}

function diviatorTurn(id, direction) {
    let name;
    switch(id) {
        case 1: name = 'diviator1'; break;
        case 2: name = 'diviator2'; break;
        case 3: name = 'diviator3'; break;
        case 4: name = 'diviator4'; break;
    }
    let elememt = document.getElementById(name);
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
    let position;
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
    let element = document.getElementById(number);
    let spaces = 6 - material.length;
    let sp = '';
    for (i=0; i < spaces; i++) {
        sp += '&nbsp;';
    }
    element.innerHTML = sp + material;
}

function setWeightLabel(bunker, weight) {
    let number;
    switch (bunker) {
        case 1: number = 'weight1_label'; break;
        case 2: number = 'weight2_label'; break;
        case 3: number = 'weight3_label'; break;
    }
    let bunk = document.getElementById(number);
    bunk.innerHTML = weight;
}

function setTemperature(temperature) {
    let dsp = document.getElementById('dsp_label');
    dsp.innerHTML = temperature;
}

function setTarget(target) {
    // selectTarget(target);

    way_target = target;
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

// Отображение нового слоя материала в таблице
function addLayer(bunker, layer) {
    switch (bunker) {
        case 1 : tableId = 'table1'; break;
        case 2 : tableId = 'table2'; break;
        case 3 : tableId = 'table3'; break;
    }

    let table = document.getElementById(tableId);
    let nextId = getNextRowId(table);
    addRow(table, nextId, layer);
}

// Получение номера следующей строки в таблице
function getNextRowId (table) {
    let rowId = 0;

    for (row of table.rows) {
        if (row.cells[0].innerHTML > rowId) rowId = row.cells[0].innerHTML;
    }

    return ++rowId;
}

// Добавление новой строки в таблицу
function addRow (table, nextId, record) {
    let newrow = table.insertRow(-1);
    newrow.insertCell(-1).innerHTML = nextId;
    newrow.insertCell(-1).innerHTML = record.Material;
    newrow.insertCell(-1).innerHTML = record.PartNo;
    newrow.insertCell(-1).innerHTML = record.Weight.toFixed(2);
}

// Удаление всех строк в таблице
function clearTable(tab) {
    let tabId;
    let table;

    switch (tab) {
        case 1: tabId = 'table1'; break;
        case 2: tabId = 'table2'; break;
        case 3: tabId = 'table3'; break;
    }

    table = document.getElementById(tabId);
    let row_count = table.rows.length;
    for (let i=1; i<row_count; i++) {
        table.deleteRow(1);
    }
}


// Запуск JS-кода при полной загрузке контента страницы
document.addEventListener('DOMContentLoaded', () => {
	init();
});

