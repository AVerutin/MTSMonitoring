let Inputs = [];
let Siloses = [];
let Materials = [];
let Material = {};

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
    // Input1.setMaterial('FeSiMn');
    Input1.setMaterialLength(6);
    Input1.setMaterialAlign('center');
    Input1.setMaterialPosition(15, 10);
    Input1.setColor('material', 'darkred');
    Input1.setFont('material', 'Courier New');
    Input1.setFontWeight('material', 'bold');
    Input1.setFontSize('material', 14);
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
    // Input2.setMaterial('FeSi');
    Input2.setMaterialLength(6);
    Input2.setMaterialAlign('center');
    Input2.setMaterialPosition(15, 10);
    Input2.setColor('material', 'darkred');
    Input2.setFont('material', 'Courier New');
    Input2.setFontWeight('material', 'bold');
    Input2.setFontSize('material', 14);
    Inputs.push(Input2);

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
    // Silos1.setMaterial('FeSiMn');
    Silos1.setMaterialLength(6);
    Silos1.setMaterialAlign('center');
    Silos1.setMaterialPosition(4, 5);
    Silos1.setColor('material', 'darkred');
    Silos1.setFont('material', 'Courier New');
    Silos1.setFontWeight('material', 'bold');
    Silos1.setFontSize('material', 12);
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
    // Silos2.setMaterial('FeSiMn');
    Silos2.setMaterialLength(6);
    Silos2.setMaterialAlign('center');
    Silos2.setMaterialPosition(4, 5);
    Silos2.setColor('material', 'darkred');
    Silos2.setFont('material', 'Courier New');
    Silos2.setFontWeight('material', 'bold');
    Silos2.setFontSize('material', 12);
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
    // Silos3.setMaterial('FeSiMn');
    Silos3.setMaterialLength(6);
    Silos3.setMaterialAlign('center');
    Silos3.setMaterialPosition(4, 5);
    Silos3.setColor('material', 'darkred');
    Silos3.setFont('material', 'Courier New');
    Silos3.setFontWeight('material', 'bold');
    Silos3.setFontSize('material', 12);
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
    // Silos4.setMaterial('FeSiMn');
    Silos4.setMaterialLength(6);
    Silos4.setMaterialAlign('center');
    Silos4.setMaterialPosition(4, 5);
    Silos4.setColor('material', 'darkred');
    Silos4.setFont('material', 'Courier New');
    Silos4.setFontWeight('material', 'bold');
    Silos4.setFontSize('material', 12);
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
    // Silos5.setMaterial('FeSiMn');
    Silos5.setMaterialLength(6);
    Silos5.setMaterialAlign('center');
    Silos5.setMaterialPosition(4, 5);
    Silos5.setColor('material', 'darkred');
    Silos5.setFont('material', 'Courier New');
    Silos5.setFontWeight('material', 'bold');
    Silos5.setFontSize('material', 12);
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
    // Silos6.setMaterial('FeSiMn');
    Silos6.setMaterialLength(6);
    Silos6.setMaterialAlign('center');
    Silos6.setMaterialPosition(4, 5);
    Silos6.setColor('material', 'darkred');
    Silos6.setFont('material', 'Courier New');
    Silos6.setFontWeight('material', 'bold');
    Silos6.setFontSize('material', 12);
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
    // Silos7.setMaterial('FeSiMn');
    Silos7.setMaterialLength(6);
    Silos7.setMaterialAlign('center');
    Silos7.setMaterialPosition(4, 5);
    Silos7.setColor('material', 'darkred');
    Silos7.setFont('material', 'Courier New');
    Silos7.setFontWeight('material', 'bold');
    Silos7.setFontSize('material', 12);
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
    // Silos8.setMaterial('FeSiMn');
    Silos8.setMaterialLength(6);
    Silos8.setMaterialAlign('center');
    Silos8.setMaterialPosition(4, 5);
    Silos8.setColor('material', 'darkred');
    Silos8.setFont('material', 'Courier New');
    Silos8.setFontWeight('material', 'bold');
    Silos8.setFontSize('material', 12);
    Siloses.push(Silos8);

    // Заполнение списка загрузочных бункеров на форме
    for (let i=0; i<Inputs.length; i++) {
        document.inputs.tanker.options[i] = new Option('Бункер ' + Inputs[i].getNumber(), Inputs[i].getId(), false, false);
        document.silos.from_tanker.options[i] = new Option('Бункер ' + Inputs[i].getNumber(), Inputs[i].getId(), false, false);
    }

    // Заполнение списка силососв
    for (let i=0; i<Siloses.length; i++) {
        document.silos.to_silos.options[i] = new Option('Силос ' + Siloses[i].getNumber(), Siloses[i].getId(), false, false);
    }
}

function setMaterial() {
    let tanker = document.inputs.tanker.options[document.inputs.tanker.selectedIndex].value;
    let materialId = document.inputs.material.options[document.inputs.material.selectedIndex].value;
    let material = Materials[document.inputs.material.selectedIndex];
    let materialName = Materials[materialId-1].Name;
    for (let i = 0; i < Inputs.length; i++) {
        let tanker_id = Inputs[i].getId();
        if (tanker_id === tanker) {
            Inputs[i].setMaterial(material);
        }
    }
}

function loadSilos() {
    let fromTanker =  document.silos.from_tanker.options[document.silos.from_tanker.selectedIndex].value;
    let toSilos = document.silos.to_silos.options[document.silos.to_silos.selectedIndex].value;

    let input;
    let silos;

    // Находим загрузочный бункер, из которого забирать материал
    for (let i=0; i<Inputs.length; i++) {
        if (Inputs[i].getId() === fromTanker) {
            input = Inputs[i];
            break;
        }
    }
    input.setStatus('on');

    // Находим силос, в который загружать материал
    for (let i=0; i<Siloses.length; i++) {
        if (Siloses[i].getId() === toSilos) {
            silos = Siloses[i];
            break;
        }
    }
    silos.setStatus('on');
    //TODO: Добавить проверку успешного добавления материала в силос, если ошибка, то ставить соотвествующий статус
    silos.setMaterial(input.getLayer(1));

    updateSilos(toSilos);
}

function addMaterial() {
    let materialId = 0;
    let materialName =  document.materials.material_name.value;
    let materialNumber =  document.materials.material_no.value;
    let materialWeight =  document.materials.material_weight.value;

    if (Materials.length === 0) {
        materialId = 1
    } else {
        for (let i=0; i<Materials.length; i++) {
            if (Materials[i].ID > materialId) {
                materialId = Materials[i].ID;
            }
        }
        materialId++;
    }

    Material = {};
    Material['ID'] = materialId;
    Material['Name'] = materialName;
    Material['PartNo'] = materialNumber;
    Material['Weight'] = materialWeight;
    Materials.push(Material);

    // Добавляем новый материал в список материалов
    for (let i = 0; i < Materials.length; i++) {
        document.inputs.material.options[i] = new Option(Materials[i].Name + '_' + Materials[i].PartNo, Materials[i].ID, false, false);
    }
    
}

// Обновить таблицы материалов силосов
function updateSilos(silos) {
    //FIXME: Прежде чем добавлять новые строки в таблицу требуется сначала очистить
    for (let i=0; i<Siloses.length; i++) {
        let silos = Siloses[i];
        let detail = 'silos' + silos.getNumber();
        for (let l=1; l<=silos.getLayersCount(); l++) {
            let layer = silos.getLayer(l);
            addRow(detail, layer);
        }
    }
}

// Добавить строку в таблицу
function addRow(table, material) {
    let tbl = document.getElementById (table); // Получаем таблицу
    let nextId = tbl.rows.length;              // Получаем номер следующей строки таблицы
    let ro = tbl.insertRow (nextId);         // Вставляем новую строку снизу

    // Номер строки
    let cell1 = ro.insertCell(0);             // Добавляем ячейку в начало строки
    cell1.innerHTML = nextId;                       // Устанавливаем текст в ячейку
    cell1.style.textAlign = 'center';               // Устанавливаем выравнивание в ячейке
    let cell2 = ro.insertCell(1);             // Добавляем ячейку в конец строки
    cell2.innerHTML = material.Name;                // Устанавливаем текст в ячейку
    cell2.style.textAlign = 'left';                 // Устанавливаем выравнивание в ячейке
    let cell3 = ro.insertCell(2);            // Добавляем ячейку в начало строки
    cell3.innerHTML = material.PartNo;              // Устанавливаем текст в ячейку
    cell3.style.textAlign = 'center';               // Устанавливаем выравнивание в ячейке
    let cell4 = ro.insertCell(3);            // Добавляем ячейку в начало строки
    cell4.innerHTML = material.Weight;             // Устанавливаем текст в ячейку
    cell4.style.textAlign = 'left';                // Устанавливаем выравнивание в ячейке

}

// Удалить строку из таблицы
function removeRow(table, rowNumber) {
    let tbl = document.getElementById (table);
    if (rowNumber > 0 && rowNumber <= tbl.rows.length) {
        tbl.deleteRow(rowNumber);
    }
}
