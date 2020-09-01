// Подключение к хабу MTSHub
// var hubConnection;

let Inputs = [];
let Siloses = [];
let Materials = [];
let Layers = [];
// let Material = {};

function init() {
    // Создание подключения по SignalR
    createHub();

    // Создание объектов для АРМ №1
    createElements();
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

    // Обработка статусов, переданных от сервера
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
    //        hubConnection.invoke("SendARM1", message).catch(err => alert(err));
    //    }, 1000);
    //}

    // Запуск цикла обработки событий
    hubConnection.start();
}

// Получение сигнала о смене статуса агрегата
function setStatuses(statuses) {
    for (let i = 0; i < statuses.length; i++) {
        let unit = statuses[i].id;
        switch (unit) {
        }
    }
}

// Запуск JS-кода при полной загрузке контента страницы
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Отслеживание и обработка щелчков мыши по странице
// document.addEventListener('mousedown',  (e) => {
//     showChemicals(e);
// });

function createElements() {
    // Создание загрузочных бункеров
    let Input1 = new ArmElement('input', 1, 'Загрузочный бункер 1');
    Input1.setImage("img/arm1/InputGrey.png");
    Input1.setStatusImage('on', '/img/arm1/led/SquareGreen.png');
    Input1.setStatusImage('off', '/img/arm1/led/SquareGrey.png');
    Input1.setStatusImage('error', '/img/arm1/led/SquareRed.png');
    Input1.setStatusPosition(99, 23);
    Input1.setNumberPosition(140, 41);
    Input1.setStatus('off');
    Input1.show();
    Input1.move(245, 30);
    Input1.setColor('number', 'darkblue');
    Input1.setFont('number', 'arial');
    Input1.setFontWeight('number', 'bold');
    Input1.setFontSize('number', 12);
    Input1.setMaterialLength(6);
    Input1.setMaterialAlign('center');
    Input1.setMaterialPosition(12, 10);
    Input1.setColor('material', 'darkred');
    Input1.setFont('material', 'Courier New');
    Input1.setFontWeight('material', 'bold');
    Input1.setFontSize('material', 14);
    Input1.setColor('weight', 'darkcyan');
    Input1.setFont('weight', 'sans-serif');
    Input1.setFontSize('weight', 14);
    Input1.setFontWeight('weight', 'bold');
    Input1.setWeightPosition(50, 15);
    Inputs.push(Input1);

    let Input2 = new ArmElement('input', 2, 'Загрузочный бункер 1');
    Input2.setImage("img/arm1/InputGrey.png");
    Input2.setStatusImage('on', '/img/arm1/led/SquareGreen.png');
    Input2.setStatusImage('off', '/img/arm1/led/SquareGrey.png');
    Input2.setStatusImage('error', '/img/arm1/led/SquareRed.png');
    Input2.setStatusPosition(99, 23);
    Input2.setNumberPosition(140, 41);
    Input2.setStatus('off');
    Input2.show();
    Input2.move(245, 180);
    Input2.setColor('number', 'darkblue');
    Input2.setFont('number', 'arial');
    Input2.setFontWeight('number', 'bold');
    Input2.setFontSize('number', 12);
    Input2.setMaterialLength(6);
    Input2.setMaterialAlign('center');
    Input2.setMaterialPosition(12, 10);
    Input2.setColor('material', 'darkred');
    Input2.setFont('material', 'Courier New');
    Input2.setFontWeight('material', 'bold');
    Input2.setFontSize('material', 14);
    Input2.setColor('weight', 'darkcyan');
    Input2.setFont('weight', 'sans-serif');
    Input2.setFontSize('weight', 14);
    Input2.setFontWeight('weight', 'bold');
    Input2.setWeightPosition(50, 15);
    Inputs.push(Input2);

    // Создание силосов
    let Silos1 = new ArmElement('silos', 1, 'Силос 1');
    Silos1.setImage("img/arm1/SilosLeft.png");
    Silos1.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos1.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos1.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos1.setStatusPosition(7, 72);
    Silos1.setNumberPosition(67, 37);
    Silos1.setStatus('off');
    Silos1.show();
    Silos1.move(150, 350);
    Silos1.setColor('number', 'darkblue');
    Silos1.setFont('number', 'arial');
    Silos1.setFontWeight('number', 'bold');
    Silos1.setFontSize('number', 16);
    Silos1.setMaterialLength(8);
    Silos1.setMaterialAlign('left');
    Silos1.setMaterialPosition(32, 10);
    Silos1.setColor('material', 'darkred');
    Silos1.setFont('material', 'Courier New');
    Silos1.setFontWeight('material', 'bold');
    Silos1.setFontSize('material', 14);
    Silos1.setColor('weight', 'darkcyan');
    Silos1.setFont('weight', 'sans-serif');
    Silos1.setFontSize('weight', 14);
    Silos1.setFontWeight('weight', 'bold');
    Silos1.setWeightPosition(3, 10);
    Siloses.push(Silos1);

    let Silos2 = new ArmElement('silos', 2, 'Силос 2');
    Silos2.setImage("img/arm1/SilosLeft.png");
    Silos2.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos2.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos2.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos2.setStatusPosition(7, 72);
    Silos2.setNumberPosition(67, 37);
    Silos2.setStatus('off');
    Silos2.show();
    Silos2.move(150, 450);
    Silos2.setColor('number', 'darkblue');
    Silos2.setFont('number', 'arial');
    Silos2.setFontWeight('number', 'bold');
    Silos2.setFontSize('number', 16);
    Silos2.setMaterialLength(8);
    Silos2.setMaterialAlign('left');
    Silos2.setMaterialPosition(32, 10);
    Silos2.setColor('material', 'darkred');
    Silos2.setFont('material', 'Courier New');
    Silos2.setFontWeight('material', 'bold');
    Silos2.setFontSize('material', 14);
    Silos2.setColor('weight', 'darkcyan');
    Silos2.setFont('weight', 'sans-serif');
    Silos2.setFontSize('weight', 14);
    Silos2.setFontWeight('weight', 'bold');
    Silos2.setWeightPosition(3, 10);
    Siloses.push(Silos2);

    let Silos3 = new ArmElement('silos', 3, 'Силос 3');
    Silos3.setImage("img/arm1/SilosLeft.png");
    Silos3.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos3.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos3.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos3.setStatusPosition(7, 72);
    Silos3.setNumberPosition(67, 37);
    Silos3.setStatus('off');
    Silos3.show();
    Silos3.move(150, 550);
    Silos3.setColor('number', 'darkblue');
    Silos3.setFont('number', 'arial');
    Silos3.setFontWeight('number', 'bold');
    Silos3.setFontSize('number', 16);
    Silos3.setMaterialLength(8);
    Silos3.setMaterialAlign('left');
    Silos3.setMaterialPosition(32, 10);
    Silos3.setColor('material', 'darkred');
    Silos3.setFont('material', 'Courier New');
    Silos3.setFontWeight('material', 'bold');
    Silos3.setFontSize('material', 14);
    Silos3.setColor('weight', 'darkcyan');
    Silos3.setFont('weight', 'sans-serif');
    Silos3.setFontSize('weight', 14);
    Silos3.setFontWeight('weight', 'bold');
    Silos3.setWeightPosition(3, 10);
    Siloses.push(Silos3);

    let Silos4 = new ArmElement('silos', 4, 'Силос 4');
    Silos4.setImage("img/arm1/SilosLeft.png");
    Silos4.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos4.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos4.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos4.setStatusPosition(7, 72);
    Silos4.setNumberPosition(67, 37);
    Silos4.setStatus('off');
    Silos4.show();
    Silos4.move(150, 650);
    Silos4.setColor('number', 'darkblue');
    Silos4.setFont('number', 'arial');
    Silos4.setFontWeight('number', 'bold');
    Silos4.setFontSize('number', 16);
    Silos4.setMaterialLength(8);
    Silos4.setMaterialAlign('left');
    Silos4.setMaterialPosition(32, 10);
    Silos4.setColor('material', 'darkred');
    Silos4.setFont('material', 'Courier New');
    Silos4.setFontWeight('material', 'bold');
    Silos4.setFontSize('material', 14);
    Silos4.setColor('weight', 'darkcyan');
    Silos4.setFont('weight', 'sans-serif');
    Silos4.setFontSize('weight', 14);
    Silos4.setFontWeight('weight', 'bold');
    Silos4.setWeightPosition(3, 10);
    Siloses.push(Silos4);

    let Silos5 = new ArmElement('silos', 5, 'Силос 5');
    Silos5.setImage("img/arm1/SilosLeft.png");
    Silos5.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos5.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos5.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos5.setStatusPosition(7, 72);
    Silos5.setNumberPosition(67, 37);
    Silos5.setStatus('off');
    Silos5.show();
    Silos5.move(150, 750);
    Silos5.setColor('number', 'darkblue');
    Silos5.setFont('number', 'arial');
    Silos5.setFontWeight('number', 'bold');
    Silos5.setFontSize('number', 16);
    Silos5.setMaterialLength(8);
    Silos5.setMaterialAlign('left');
    Silos5.setMaterialPosition(32, 10);
    Silos5.setColor('material', 'darkred');
    Silos5.setFont('material', 'Courier New');
    Silos5.setFontWeight('material', 'bold');
    Silos5.setFontSize('material', 14);
    Silos5.setColor('weight', 'darkcyan');
    Silos5.setFont('weight', 'sans-serif');
    Silos5.setFontSize('weight', 14);
    Silos5.setFontWeight('weight', 'bold');
    Silos5.setWeightPosition(3, 10);
    Siloses.push(Silos5);

    let Silos6 = new ArmElement('silos', 6, 'Силос 6');
    Silos6.setImage("img/arm1/SilosLeft.png");
    Silos6.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos6.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos6.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos6.setStatusPosition(7, 72);
    Silos6.setNumberPosition(67, 37);
    Silos6.setStatus('off');
    Silos6.show();
    Silos6.move(150, 850);
    Silos6.setColor('number', 'darkblue');
    Silos6.setFont('number', 'arial');
    Silos6.setFontWeight('number', 'bold');
    Silos6.setFontSize('number', 16);
    Silos6.setMaterialLength(8);
    Silos6.setMaterialAlign('left');
    Silos6.setMaterialPosition(32, 10);
    Silos6.setColor('material', 'darkred');
    Silos6.setFont('material', 'Courier New');
    Silos6.setFontWeight('material', 'bold');
    Silos6.setFontSize('material', 14);
    Silos6.setColor('weight', 'darkcyan');
    Silos6.setFont('weight', 'sans-serif');
    Silos6.setFontSize('weight', 14);
    Silos6.setFontWeight('weight', 'bold');
    Silos6.setWeightPosition(3, 10);
    Siloses.push(Silos6);

    let Silos7 = new ArmElement('silos', 7, 'Силос 7');
    Silos7.setImage("img/arm1/SilosLeft.png");
    Silos7.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos7.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos7.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos7.setStatusPosition(7, 72);
    Silos7.setNumberPosition(67, 37);
    Silos7.setStatus('off');
    Silos7.show();
    Silos7.move(150, 950);
    Silos7.setColor('number', 'darkblue');
    Silos7.setFont('number', 'arial');
    Silos7.setFontWeight('number', 'bold');
    Silos7.setFontSize('number', 16);
    Silos7.setMaterialLength(8);
    Silos7.setMaterialAlign('left');
    Silos7.setMaterialPosition(32, 10);
    Silos7.setColor('material', 'darkred');
    Silos7.setFont('material', 'Courier New');
    Silos7.setFontWeight('material', 'bold');
    Silos7.setFontSize('material', 14);
    Silos7.setColor('weight', 'darkcyan');
    Silos7.setFont('weight', 'sans-serif');
    Silos7.setFontSize('weight', 14);
    Silos7.setFontWeight('weight', 'bold');
    Silos7.setWeightPosition(3, 10);
    Siloses.push(Silos7);

    let Silos8 = new ArmElement('silos', 8, 'Силос 8');
    Silos8.setImage("img/arm1/SilosLeft.png");
    Silos8.setStatusImage('on', '/img/arm1/led/SmallGreen.png');
    Silos8.setStatusImage('off', '/img/arm1/led/SmallGrey.png');
    Silos8.setStatusImage('error', '/img/arm1/led/SmallRed.png');
    Silos8.setStatusPosition(7, 72);
    Silos8.setNumberPosition(67, 37);
    Silos8.setStatus('off');
    Silos8.show();
    Silos8.move(150, 1050);
    Silos8.setColor('number', 'darkblue');
    Silos8.setFont('number', 'arial');
    Silos8.setFontWeight('number', 'bold');
    Silos8.setFontSize('number', 16);
    Silos8.setMaterialLength(8);
    Silos8.setMaterialAlign('left');
    Silos8.setMaterialPosition(32, 10);
    Silos8.setColor('material', 'darkred');
    Silos8.setFont('material', 'Courier New');
    Silos8.setFontWeight('material', 'bold');
    Silos8.setFontSize('material', 14);
    Silos8.setColor('weight', 'darkcyan');
    Silos8.setFont('weight', 'sans-serif');
    Silos8.setFontSize('weight', 14);
    Silos8.setFontWeight('weight', 'bold');
    Silos8.setWeightPosition(3, 10);
    Siloses.push(Silos8);

    // FeSi
    let mat = new Material(1,'FeSi');
    mat.addElement('Si', 87);
    mat.addElement('C', 0.1);
    mat.addElement('S', 0.02);
    mat.addElement('P', 0.03);
    mat.addElement('Al', 3.5);
    mat.addElement('Mn', 0.3);
    mat.addElement('Cr', 0.2);
    Materials.push(mat);

    // FeSiMn
    mat = new Material(2,'FeSiMn');
    mat.addElement('Si', 15);
    mat.addElement('Mn', 65);
    mat.addElement('C', 3.5);
    mat.addElement('P', 0.1);
    mat.addElement('S', 0.02);
    Materials.push(mat);

    // SiC
    mat = new Material(3,'SiC');
    mat.addElement('Si', 85);
    mat.addElement('C', 15);
    Materials.push(mat);

    // FeB
    mat = new Material(4,'FeB');
    mat.addElement('B', 20);
    mat.addElement('Si', 2.2);
    mat.addElement('Al', 3.4);
    mat.addElement('C', 0.03);
    mat.addElement('S', 0.005);
    mat.addElement('P', 0.01);
    mat.addElement('Cu', 0.03);
    Materials.push(mat);

    // FeCr
    mat = new Material(5,'FeCr');
    mat.addElement('Cr', 55);
    mat.addElement('C', 5);
    mat.addElement('Si', 1.1);
    mat.addElement('P', 0.025);
    mat.addElement('S', 0.027);
    Materials.push(mat);

    // FeNb
    mat = new Material(6,'FeNb');
    mat.addElement('Nb', 60);
    mat.addElement('Si', 12);
    mat.addElement('Al', 5);
    mat.addElement('Ti', 4);
    mat.addElement('Fe', 19);
    Materials.push(mat);

    // Заполнение списка загрузочных бункеров на форме
    for (let i=0; i<Inputs.length; i++) {
        document.inputs.tanker.options[i] = new Option('Бункер ' + Inputs[i].getNumber(), Inputs[i].getId(), false, false);
        document.silos.from_tanker.options[i] = new Option('Бункер ' + Inputs[i].getNumber(), Inputs[i].getId(), false, false);
    }

    // Заполнение списка силососв
    for (let i=0; i<Siloses.length; i++) {
        document.silos.to_silos.options[i] = new Option('Силос ' + Siloses[i].getNumber(), Siloses[i].getId(), false, false);
    }

    // Заполнение списка материалов
    for (let i=0; i<Materials.length; i++) {
        document.materials.material_name.options[i] = new Option(Materials[i].Name, Materials[i].Name, false, false);
    }
}
// Загрузить материал в загрузочный бункер
function setMaterial() {
    let tanker = document.inputs.tanker.options[document.inputs.tanker.selectedIndex].value;

    let materialId = Number(document.inputs.material.options[document.inputs.material.selectedIndex].value);
    let material = getMaterialByNumber(materialId);
    // let materialName = Materials[materialId-1].Name;
    for (let i = 0; i < Inputs.length; i++) {
        let tanker_id = Inputs[i].getId();
        if (tanker_id === tanker) {
            Inputs[i].setMaterial(material);
        }
    }
}

function getMaterialByNumber(number) {
    if (number > 0) {
        for (let i = 0; i < Layers.length; i++) {
            if (Layers[i].ID === number) {
                return Layers[i];
            }
        }
    }
}

// Загрузка материала в силос из загрузочного бункера
function loadSilos() {
    let fromTanker =  document.silos.from_tanker.options[document.silos.from_tanker.selectedIndex].value;
    let toSilos = document.silos.to_silos.options[document.silos.to_silos.selectedIndex].value;

    let input;
    let silos;
    let silosNumber;

    // Находим загрузочный бункер, из которого забирать материал
    for (let i=0; i<Inputs.length; i++) {
        if (Inputs[i].getId() === fromTanker) {
            input = Inputs[i];
            break;
        }
    }

    // Находим силос, в который загружать материал
    for (let i=0; i<Siloses.length; i++) {
        if (Siloses[i].getId() === toSilos) {
            silos = Siloses[i];
            break;
        }
    }
    silosNumber = silos.getNumber();

    let materialInput = input.getMaterial();
    let materialSilos  = silos.getMaterial();

    if (materialInput !== "" && (materialInput === materialSilos || materialSilos === "") ) {
        setLed(silosNumber, 'on');
        input.setStatus('on');

        silos.setStatus('on');
        //TODO: Добавить проверку успешного добавления материала в силос, если ошибка, то ставить соотвествующий статус
        silos.setMaterial(input.getLayer(1));
        // sendToServer('Test message to server!');
        updateSilos(silosNumber);
    } else {
        if (materialSilos !== materialInput) {
            silos.setStatus('error');
        } else {
            input.setStatus('error');
        }
    }

    // Удаляем материал из загрузочного бункера
    setTimeout(finishLoadSilos, 20000, input, silos);
}

// Завершение загрузки силоса
function finishLoadSilos (input, silos) {
    input.reset();
    silos.setStatus('off');
    setLed(silos.getNumber(), 'off');
}

// Установка индикатора загрузки и положения тележки
function setLed(silos, status) {
    // Создание и отображение индикатора загрузки
    let ledId = 'Led' + silos;
    let led = document.getElementById(ledId);
    // Подсветка конвейеров в процессе загрузки
    let c1 = document.getElementById('Conveyor1'); // Первый горизонтальный конвейер
    let c2 = document.getElementById('Conveyor2'); // Вертикальный конвейер
    let c3 = document.getElementById('Conveyor3'); // Второй горизонтальный конвейер

    let telega = document.getElementById('Conveyor4');

    // Если статус 'off', то выключаем индикаор
    if (status === 'off') {
        led.src = 'img/arm1/led/LedGrey.png';
        telega.src = 'img/arm1/TelegaGrey.png';
        c1.src = 'img/arm1/Elevator2Grey.png';
        c2.src = 'img/arm1/Elevator3Grey.png';
        c3.src = 'img/arm1/Elevator2Grey.png';
        return;
    } else {
        led.src = 'img/arm1/led/LedGreen.png';
    }

    let telegaLeft;
    switch (silos) {
        case 1: {
            telegaLeft = '380px';
            break;
        }
        case 2: {
            telegaLeft = '480px';
            break;
        }
        case 3: {
            telegaLeft = '580px';
            break;
        }
        case 4: {
            telegaLeft = '350px';
            break;
        }
        case 5: {
            telegaLeft = '450px';
            break;
        }
        case 6: {
            telegaLeft = '550px';
            break;
        }
        case 7: {
            telegaLeft = '650px';
            break;
        }
        case 8: {
            telegaLeft = '750px';
            break;
        }
    }

    telega.style.left = telegaLeft;

    telega.src = 'img/arm1/TelegaGreen.png';
    c1.src = 'img/arm1/Elevator2Green.png';
    c2.src = 'img/arm1/Elevator3Green.png';
    c3.src = 'img/arm1/Elevator2Green.png';
}

// Добавить новый материал
function addMaterial() {
    let material = {};
    let selected = document.materials.material_name.selectedIndex;

    // Генерируем УИД для слоя материала
    let id;
    if (Layers.length === 0) {
        id = 1;
    } else {
        id = Layers.length + 1;
    }
    // Создаем копию материала
    material['ID'] = id;
    material['Number'] = Materials[selected].Number;
    material['Name'] = Materials[selected].Name;
    // material['PartNo'] = Materials[selected].PartNo;
    // material['Weight'] = Materials[selected].Weight;
    // material['Volume'] = Materials[selected].Volume;
    material['Chemicals'] = Materials[selected].Chemicals;

    material.PartNo = Number(document.materials.material_no.value);
    material.Weight = Number(document.materials.material_weight.value);
    material.Volume = Number(document.materials.material_volume.value);
    Layers.push(material);

    // Добавляем новый материал в список материалов
    let pos = 0;
    for (let i = 0; i < Layers.length; i++) {
        if (Layers[i].PartNo !== 0) {
            document.inputs.material.options[pos++] = new Option(Layers[i].Name + '_' + Layers[i].PartNo, Layers[i].ID, false, false);
        }
    }
}

// Обновить таблицы материалов силосов
function updateSilos(number) {
    if (number <= Siloses.length && number > 0) {
        let table_name = 'silos' + number;

        // Прежде чем добавлять новые строки в таблицу требуется сначала очистить
        clearTable(table_name);

        // Добавление строк с материалами в таблицу силоса
        let silos = Siloses[number - 1];
        let matCnt = silos.getLayersCount();
        
        for (let i = 0; i < matCnt; i++) {
            let layer = silos.getLayer(i + 1);
            addRow(table_name, layer);
        }
    }
}

// Добавить строку в таблицу
function addRow(table, material) {
    let tbl = document.getElementById (table); // Получаем таблицу
    let nextId = tbl.rows.length;              // Получаем номер следующей строки таблицы
    let ro = tbl.insertRow (nextId);           // Вставляем новую строку снизу

    // Номер строки
    let cell1 = ro.insertCell(0);       // Добавляем ячейку в начало строки
    cell1.innerHTML = nextId;                 // Устанавливаем текст в ячейку
    cell1.style.textAlign = 'center';         // Устанавливаем выравнивание в ячейке
    let cell2 = ro.insertCell(1);       // Добавляем ячейку в конец строки
    cell2.innerHTML = material.Name;          // Устанавливаем текст в ячейку
    cell2.style.textAlign = 'left';           // Устанавливаем выравнивание в ячейке
    let cell3 = ro.insertCell(2);       // Добавляем ячейку в начало строки
    cell3.innerHTML = material.PartNo;        // Устанавливаем текст в ячейку
    cell3.style.textAlign = 'center';         // Устанавливаем выравнивание в ячейке
    let cell4 = ro.insertCell(3);       // Добавляем ячейку в начало строки
    cell4.innerHTML = material.Weight;        // Устанавливаем текст в ячейку
    cell4.style.textAlign = 'left';           // Устанавливаем выравнивание в ячейке
}

// Удалить все строки таблицы, кроме заголовка
function clearTable(table) {
    let tbl = document.getElementById(table);
    let rows = tbl.rows.length;
    for (let i = 1; i < rows; i++) {
        tbl.deleteRow(1);
    }
}

// Удалить строку из таблицы
function removeRow(table, rowNumber) {
    let tbl = document.getElementById (table);
    if (rowNumber > 0 && rowNumber <= tbl.rows.length) {
        tbl.deleteRow(rowNumber);
    }
}

// Сброс состояния загрузочного бункера
function resetInput(number) {
    let tanker = Inputs[number-1];
    tanker.reset();
}

// Вывод химического состава во всплывающем окне при щелчке на элементе
function showChemicals(e, sender) {
    alert(sender);
}

function show_kha() {
    let selected = document.materials.material_name.selectedIndex;
    let material = Materials[selected].Name;

    let table = document.getElementById('mat_kha');
    let caption = document.getElementById('mat_name');
    caption.innerHTML = material;
    table.style.display = 'inherit';

    // Удалим имеющиеся строки
    let rowCnt = table.rows.length;
    for (let i = 1; i < rowCnt; i++) {
        table.deleteRow(1);
    }

    // Заполняем таблицу значениями элементов КХА
    let nextId = 1;
    let kha = Materials[selected].getChemicals();
    for (let i=0; i<kha.length; i++) {
        let row = table.insertRow (nextId++);
        let cell1 = row.insertCell(0);    // Добавляем ячейку в начало строки
        cell1.innerHTML = kha[i].Element;       // Устанавливаем текст в ячейку
        cell1.style.textAlign = 'left';         // Устанавливаем выравнивание в ячейке
        let cell2 = row.insertCell(1);    // Добавляем ячейку в конец строки
        cell2.innerHTML = kha[i].Volume;        // Устанавливаем текст в ячейку
        cell2.style.textAlign = 'center';       // Устанавливаем выравнивание в ячейке
    }
}