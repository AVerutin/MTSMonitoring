class ArmElement { // Техузел

    // Свойства класса
    #_id;               // Уникальный идентификатор экземпяла класса (для элемента img)
    #_name;             // Наименование техузла
    #_alt;              // Альтернативный текст
    #_number;           // Номер техузла
    #_status;           // Текущий статус техузла
    #_showed;           // Признак отображения на странице
    #_materials;         // Наименование материала в техузле
    #_width;            // Ширина изображения (для масштабирования изображения) в px
    #_size;             // Размер изображения (для масштабирования изображения) в %

    #_layers = [];      // Слои материала, загруженные в техузел (отличаются номерами партий и весом)
    #_images = {};        // Изображения для отображения статусов техузла (on, off, error)
    #_elements = {};    // Список элементов отображения (значок статуса, номер техузла, материал, номера партий)
    #_position = {};    // Координаты изображения техузла на странице

    // Конструктор класса
    constructor(name, number, alttext) {
        if (number > 0) {
            this.#_id = name + '_' + number;
            this.#_number = number;
            this.#_status = "off";
            this.#_name = name;
            this.#_showed = false;
            this.#_materials = [];
            this.#_width = 0;
            this.#_size = 0;
            this.#_alt = alttext;

            // Заполнение массива изображений для вывода статуса силоса
            let status_img = {};
            status_img['On'] = "";
            status_img['Off'] = "";
            status_img['Error'] = "";
            this.#_images['Statuses'] = status_img;

            // Добавление изображения силоса
            let class_img = {};
            class_img['Image'] = "";
            this.#_images['Image'] = class_img;

            // Добавление элементов для отображения
            let elements = {};

            // Номер силоса
            let num = {};
            num['Div'] = "";
            num['Top'] = 0;
            num['Left'] = 0;
            elements['Number'] = num;

            // Индикатор статуса силоса
            let stat = {};
            stat['Div'] = "";
            stat['Top'] = 0;
            stat['Left'] = 0;
            elements['Status'] = stat;

            // Обозначение материала в силосе
            let mat = {};
            mat['Div'] = "";
            mat['Top'] = 0;
            mat['Left'] = 0;
            mat['Length'] = 6;
            mat['Align'] = 'center';
            elements['Material'] = mat;

            this.#_elements = elements;

            // Позиция силоса на странице
            let pos = {};
            pos['Position'] = 'absolute';
            pos['Top'] = 0;
            pos['Left'] = 0;
            this.#_position = pos;
        }
    }

    // Добавление нового слоя материала
    addLayer(layer) {
        let _layer = {};
        _layer['Material'] = this.#_materials;
        _layer['PartNo'] = layer.PartNo;
        _layer['Weight'] = layer.Weight;

        this.#_layers.push(_layer);
    }

    // Получить количество слоев материала в силосе
    getLayersCount() {
        return this.#_materials.length;
    }

    // Получить слой по его номеру
    getLayer(number) {
        if (number <= this.getLayersCount() && number >= 0) {
            return this.#_materials[number-1];
        }
    }

    // Получить изображение силоса
    getImage() {
        let img = this.#_images.Image;
        if (img === "") {
            img = "img/noimage.png";
            this.setImage(img);
        }
        return img;
    }

    // Получить изображение статуса силоса по наименованию статуса
    getStatusImage(status) {
        switch (status.toLowerCase()) {
            case 'on'   :  return this.#_images.Statuses.On;
            case 'off'  :  return this.#_images.Statuses.Off;
            case 'error':  return this.#_images.Statuses.Error;
        }
    }

    // Установить изображение силоса
    setImage(image) {
        if (image !== "") {
            this.#_images.Image = image;

            let silos = document.getElementById(this.getId());
            if (silos !== null) {
                silos.src = image;
            }
        }
    }

    // Установить изображение статуса силоса
    setStatusImage(status, img) {
        if (img !== "" && status !== "") {
            switch(status.toLowerCase()) {
                case 'on' : this.#_images.Statuses.On = img; break;
                case 'off' : this.#_images.Statuses.Off = img; break;
                case 'error' : this.#_images.Statuses.Error = img; break;
            }
        }
    }

    // Получить ID экземпляра силоса
    getId() {
        return this.#_id;
    }

    // Получить номер партии
    getPartNo(layer) {
        if (layer < this.getLayersCount() && layer > 0)
        return this.#_materials[layer-1].PartNo;
    }

    // Отобразить номер партии материала
    showPartNo() {

    }

    // Спрятать номер партии материала
    hidePartNo() {

    }

    // Установить позицию индикатора номера партии материала
    setPartNoPosition(top, left) {

    }


    // Получить позицию силоса на странице (координаты Top и Left)
     getPosition() {
         return this.#_position;
     }

    // Получить элементы отображения силоса (номер, статус, материал)
    getElements() {
        return this.#_elements;
    }

    // Получить номер силоса
    getNumber() {
        return this.#_number;
    }

    // Отобразить номер силоса
    showNumber() {
        let num = this.#_elements.Number.Div;
        let number; 

        if (num === "") {
            num = this.getId() + "_number";
            this.#_elements.Number.Div = num;
            number = document.createElement('div');
            document.body.append(number);
            number.id = num;
        } else {
            number = document.getElementById(num);
        }

        // Позиционирование относительно позиции родительского объекта (силоса)
        let pos_top = this.#_position.Top + this.getElements().Number.Top;
        let pos_left = this.#_position.Left + this.getElements().Number.Left;
        number.style.position = 'absolute';
        number.style.top = pos_top + 'px';
        number.style.left = pos_left + 'px';
        number.innerHTML = this.#_number;

        if (this.#_showed) {
            number.style.display = 'inherit';
        } else {
            number.style.display = 'none';
        }
    }

    // Спрятать номер силоса
    hideNumber() {
        let el = this.#_elements.Number.Div;
        if (el !== "") {
            let stat = document.getElementById(el);
            stat.style.display = 'none';
        }
    }

    // Установить позицию номера силоса
    setNumberPosition(top, left) {
        this.#_elements.Number.Top = top;
        this.#_elements.Number.Left = left;
        this.showNumber();
    }

    // Установить материал силоса
    setMaterial(material) {
        let curr_material = this.getMaterial();
        if (material.Name !== "" && (material.Name === curr_material || curr_material === "")) {
            this.#_materials.push(material);
            this.showMaterial();
        }
    }

    // Установить длину текстового поля для отображения наименования материала
    setMaterialLength(len) {
        if (len > 0) {
            this.#_elements.Material.Length = len;
            this.showMaterial();
        }
    }

    // Установить тип выравния текста в поле наименования материала
    setMaterialAlign(align) {
        if (align === 'left' || align === 'center' || align === 'right') {
            this.#_elements.Material.Align = align;
            this.showMaterial();
        }
    }

    // Получить материал в силосе
    getMaterial() {
        let material = "";
        if (this.getLayersCount() > 0) {
            material = this.#_materials[0].Name;
        } else {
            material = ""
        }
        return material;
    }

    // Отобразить материал силоса
    showMaterial() {
        let mat = this.getElements().Material.Div;
        let stat;

        if (mat === "") {
            // Элемент отображения статуса не создан
            mat = this.getId() + '_material';
            stat = document.createElement('div');
            stat.id = mat;
            document.body.append(stat);
            this.#_elements.Material.Div = mat;
        } else {
            stat = document.getElementById(mat);
        }

        // Позиционирование относительно позиции родительского объекта (силоса)
        let pos_top = this.#_position.Top + this.getElements().Material.Top;
        let pos_left = this.#_position.Left + this.getElements().Material.Left;
        let st = this.getMaterial();

        // Устанавливаем выравнивание для поля отображения материала в силосе
        let text = "";
        if (st.length > this.#_elements.Material.Length) {
            text = st;
        } else {
            switch (this.#_elements.Material.Align.toLowerCase()) {
                case 'left' : {
                    text = st;
                    break;
                }
                case 'center' : {
                    let spaces = Number((this.#_elements.Material.Length - st.length) / 2);
                    for (let i=0; i<spaces; i++) text += "&nbsp;";
                    text += st;
                    break;
                }
                case 'right' : {
                    let spaces = this.#_elements.Material.Length - st.length;
                    for (let i=0; i<spaces; i++) text += "&nbsp;";
                    text += st;
                    break;
                }
            }
        }

        stat.innerHTML = text;
        stat.style.position = 'absolute';
        stat.style.top = pos_top + 'px';
        stat.style.left = pos_left + 'px';

        if (this.#_showed) {
            stat.style.display = 'inherit';
        } else {
            stat.style.display = 'none';
        }
    }

    // Спрятать материал силоса
    hideMaterial() {
        let el = this.#_elements.Material.Div;
        if (el !== "") {
            let stat = document.getElementById(el);
            stat.style.display = 'none';
        }
    }

    // Установить позицию индикатора материала
    setMaterialPosition(top, left) {
        let pos_top = this.#_position.Top + top;
        let pos_left = this.#_position.Left + left;
        let el = this.#_elements.Material.Div;
        if (el !== "") {
            let stat = document.getElementById(el);
            stat.style.top = pos_top;
            stat.style.left = pos_left;
            this.#_elements.Material.Top = top;
            this.#_elements.Material.Left = left;
        }
    this.showMaterial();
    }

    // Установка цвета для текстовых элементов
    setColor(element, color) {
        let el;

        switch (element.toLowerCase()) {
            case 'material': {
                el = this.#_elements.Material.Div;
                break;
            }
            case 'number': {
                el = this.#_elements.Number.Div;
                break;
            }
            case 'partno': {
                el = this.#_elements.PartNo.Div;
                break;
            }
        }

        if (el !== "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.color = color;
        }
    }

    // Установка типа шрифта для текстовой метки
    setFont(element, font) {
        let el;

        switch (element.toLowerCase()) {
            case 'material': {
                el = this.#_elements.Material.Div;
                break;
            }
            case 'number': {
                el = this.#_elements.Number.Div;
                break;
            }
            case 'partno': {
                el = this.#_elements.PartNo.Div;
                break;
            }
        }

        if (el !== "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.fontFamily = font;
        }
    }

    // Установка размера шрифта для текстовой метки
    setFontSize(element, size) {
        let el;

        switch (element.toLowerCase()) {
            case 'material': {
                el = this.#_elements.Material.Div;
                break;
            }
            case 'number': {
                el = this.#_elements.Number.Div;
                break;
            }
            case 'partno': {
                el = this.#_elements.PartNo.Div;
                break;
            }
        }

        if (el !== "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.fontSize = size + 'pt';
        }
    }

    // Установка толщины шрифта для текстовой метки
    setFontWeight(element, weight) {
        let el;

        switch (element.toLowerCase()) {
            case 'material': {
                el = this.#_elements.Material.Div;
                break;
            }
            case 'number': {
                el = this.#_elements.Number.Div;
                break;
            }
            case 'partno': {
                el = this.#_elements.PartNo.Div;
                break;
            }
        }

        if (el !== "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.fontWeight = weight;
        }
    }

    // Установить статус силоса
    setStatus(status) {
        switch (status.toLowerCase()) {
            case 'on' : this.#_status = 'on'; break;
            case 'off' : this.#_status = 'off'; break;
            case 'error' : this.#_status = 'error'; break;
        }
        this.showStatus();
    }

    // Отобразить индикатор статуса силоса
    showStatus() {
        let el = this.getElements().Status.Div;
        let stat;

        if (el === "") {
            // Элемент отображения статуса не создан
            el = this.getId() + '_status';
            stat = document.createElement('img');
            stat.id = el;
            document.body.append(stat);
            this.#_elements.Status.Div = el;
        } else {
            stat = document.getElementById(el);
        }

        // Позиционирование относительно позиции родительского объекта (силоса)
        let pos_top = this.#_position.Top + this.getElements().Status.Top;
        let pos_left = this.#_position.Left + this.getElements().Status.Left;
        let st = this.getStatusImage(this.#_status);

        stat.src = st;
        stat.style.position = 'absolute';
        stat.style.top = pos_top + 'px';
        stat.style.left = pos_left + 'px';

        if (this.#_showed) {
            stat.style.display = 'inherit';
        } else {
            stat.style.display = 'none';
        }
    }
    
    // Спрятать индикатор статуса силоса
    hideStatus() {
        let el = this.getElements().Status.Div;
        if (el !== "") {
            let stat = document.getElementById(el);
            stat.style.display = 'none';
        }
    }

    // Устанавливаем позицию индикатора статуса
    setStatusPosition(top, left) {
        let pos_top = this.#_position.Top + top;
        let pos_left = this.#_position.Left + left;
        this.#_elements.Status.Top = top;
        this.#_elements.Status.Left = left;

        let _stat  = this.getElements().Status.Div;
        if (_stat !== "") {
            let stat = document.getElementById(_stat);
            stat.style.top = pos_top + 'px';
            stat.style.left = pos_left + 'px';
            stat.style.position = 'absolute';
        }
    }

    // Получение статуса силоса
    getStatus() {
        return this.#_status;
    }

    // Отображение силоса на странице
    show() {
        let silos = document.getElementById(this.getId());
        if (silos === null) {
            silos = document.createElement('img');
            silos.src = this.getImage();
            silos.alt = this.#_alt;
            silos.style.position = this.getPosition().Position;
            silos.style.left = this.getPosition().Left;
            silos.style.top = this.getPosition().Top;
            silos.id = this.getId();
            document.body.appendChild(silos);
            silos.style.display = 'inherit';
            this.#_showed = true;
        }
        if (!this.#_showed) {
            silos.style.display = 'inherit';
            this.#_showed = true;
            this.showMaterial();
            this.showStatus();
            this.showNumber();
            this.showPartNo();
        }

        // Устанавливаем масштабирование изображения силоса, если заданы размеры
        if (this.#_width !== 0) {
            silos.style.width = this.#_width + "px";
        } else if (this.#_size !== 0) {
            silos.style.width = this.#_size + "%";
        }

        // Устанавливаем позицию силоса в окне, если заданы координаты
        if (this.#_position.Top !== 0) {
            silos.style.top = this.#_position.Top;
        }
        if (this.#_position.Left !== 0) {
            silos.style.left = this.#_position.Left;
        }

        // Опускаем изображение силоса на нижний z-уровень, чтобы не закрывал остальные элементы
        silos.style.zIndex = '-1';
    }

    // Спрятать силос на странице
    hide() {
        if (this.#_showed) {
            let silos = document.getElementById(this.getId());
            silos.style.display = 'none';
            this.#_showed = false;
            this.hideMaterial();
            this.hideStatus();
            this.hideNumber();
            this.hidePartNo();
        }
    }

    // Переместить изображение силоса в заданную позицию на странице
    move(top, left) {
        this.#_position.Top = top;
        this.#_position.Left = left;

        if (this.#_showed) {
            let silos = document.getElementById(this.getId());
            silos.style.position = this.#_position.Position;
            silos.style.top = top + 'px';
            silos.style.left = left + 'px';
            this.showMaterial();
            this.showNumber();
            this.showStatus();
            this.showPartNo();
        }
    }

    // Установить масштабирование для изображения силоса
    scale(size) {
        if (size > 0) {
            let silos = document.getElementById(this.getId());
            this.#_size = size;
            this.#_width = 0;

            if (silos !== null) {
                silos.style.width = size + '%';
            }
        }
    }

    // Установить ширину для изображения силоса
    width(width) {
        if (width > 0) {
            let silos = document.getElementById(this.getId());
            this.#_width = width;
            this.#_size = 0;

            if (silos !== null) {
                silos.style.width = width + 'px';
            }
        }
    }
}
