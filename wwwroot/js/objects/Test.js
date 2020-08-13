// Отладочный класс для силоса

class Test { // СИЛОС

    // Свойства класса
    #_id;               // Уникальный идентификатор экземпяла класса (для элемента img)
    #_number;           // Номер силоса
    #_status;           // Текущий статус силоса
    #_showed;           // Признак отображения на странице
    #_material;         // Наименование материала в силосе
    #_width;            // Ширина изображения (для масштабирования изображения) в px
    #_size;             // Размер изображения (для масштабирования изображения) в %

    #_layers = [];      // Слои материала, загруженные в силос (отличаются номерами партий и весом)
    #_imgs = {};        // Изображения для отображения статусов силоса (on, off, error)
    #_elements = {};    // Список элементов отображения (значок статуса, номер силоса, материал, номера партий)
    #_position = {};    // Координаты изображения силоса на странице

    // Конструктор класса
    constructor(number) {
        if (number > 0) {
            this.#_id = 'silos_' + number;
            this.#_number = number;
            this.#_status = "off";
            // this.#_part_no = 0;
            this.#_showed = false;
            this.#_material = "";
            this.#_width = 0;
            this.#_size = 0;

            // Заполнение массива изображений для вывода статуса силоса
            var status_img = {};
            status_img['On'] = "";
            status_img['Off'] = "";
            status_img['Error'] = "";
            this.#_imgs['Statuses'] = status_img;

            // Добавление изображения силоса
            var class_img = {};
            class_img['Image'] = "";
            this.#_imgs['Image'] = class_img;

            // Добавление элементов для отображения
            var elements = {};

            // Номер партии
            var parts = [];
            // var partno = {};
            // partno['Div'] = "";
            // partno['Top'] = 0;
            // partno['Left'] = 0;
            // parts.push(partno);
            elements['PartNo'] = parts;
            
            // Номер силоса
            var num = {};
            num['Div'] = "";
            num['Top'] = 0;
            num['Left'] = 0;
            elements['Number'] = num;

            // Индикатор статуса силоса
            var stat = {};
            stat['Div'] = "";
            stat['Top'] = 0;
            stat['Left'] = 0;
            elements['Status'] = stat;

            // Обозначение материала в силосе
            var mat = {};
            mat['Div'] = "";
            mat['Top'] = 0;
            mat['Left'] = 0;
            mat['Length'] = 6;
            mat['Align'] = 'center';
            elements['Material'] = mat;

            this.#_elements = elements;

            // Позиция силоса на странице
            var pos = {};
            pos['Position'] = 'absolute';
            pos['Top'] = 0;
            pos['Left'] = 0;
            this.#_position = pos;
        }
    }

    // Добавление нового слоя материала
    addLayer(layer) {
        var _layer = {};
        _layer['Material'] = this.#_material;
        _layer['PartNo'] = layer.PartNo;
        _layer['Weight'] = layer.Weight;

        this.#_layers.push(_layer);
    }

    // Получить количество слоев материала в силосе
    getLayersCount() {
        return this.#_layers.length;
    }

    // Получить слой по его номеру
    getLayer(number) {
        if (number < this.getLayersCount() && number >= 0) {
            return this.#_layers[number];
        }
    }

    // Получить изображение силоса
    getImage() {
        var img = this.#_imgs.Image.Image;
        if (img == "") {
            img = "img/noimage.png";
            this.setImage(img);
        }
        return img;
    }

    // Получить изображение статуса силоса по наименованию статуса
    getStatusImage(status) {
        switch (status.toLowerCase()) {
            case 'on'   :  return this.#_imgs.Statuses.On;
            case 'off'  :  return this.#_imgs.Statuses.Off;
            case 'error':  return this.#_imgs.Statuses.Error;
        }
    }

    // Установить изображение силоса
    setImage(image) {
        if (image != "") {
            this.#_imgs.Image.Image = image;

            var silos = document.getElementById(this.getId());
            if (silos !== null) {
                silos.src = image;
            }
        }
    }

    // Установить изображение статуса силоса
    setStatusImage(status, img) {
        if (img != "" && status != "") {
            switch(status.toLowerCase()) {
                case 'on' : this.#_imgs.Statuses.On = img;
                case 'off' : this.#_imgs.Statuses.Off = img;
                case 'error' : this.#_imgs.Statuses.Error = img;
            }
        }
    }

    // Получить ID экземпляра силоса
    getId() {
        return this.#_id;
    }

    // Установить номер партии материала
    // setPartNo(partno) {
    //     if (partno > 0) {
    //         this.#_part_no = partno;
    //     }
    // }

    // Получить номер партии
    // getPartNo() {
    //     return this.#_part_no;
    // }

    // Отобразить номер партии материала
    // showPartNo() {

    // }

    // Спрятать номер партии материала
    // hidePartNo() {
    //     var el = this.#_elements.PartNo.Div;
    //     if (el != "") {
    //         var stat = document.getElementById(el);
    //         stat.style.display = 'none';
    //     }
    // }

    // Установить позицию индикатора номера партии материала
    // setPartNoPosition(top, left) {

    // }


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
        var num = this.#_elements.Number.Div;
        var number; 

        if (num == "") {
            num = this.getId() + "_number";
            this.#_elements.Number.Div = num;
            number = document.createElement('div');
            document.body.append(number);
            number.id = num;
        } else {
            number = document.getElementById(num);
        }

        // Позиционирование относительно позиции родительского объекта (силоса)
        var pos_top = this.#_position.Top + this.getElements().Number.Top;
        var pos_left = this.#_position.Left + this.getElements().Number.Left;
        number.style.position = 'absolute';
        number.style.top = pos_top;
        number.style.left = pos_left;
        number.innerHTML = this.#_number;

        if (this.#_showed) {
            number.style.display = 'inherit';
        } else {
            number.style.display = 'none';
        }
    }

    // Спрятать номер силоса
    hideNumber() {
        var el = this.#_elements.Number.Div;
        if (el != "") {
            var stat = document.getElementById(el);
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
        if (material != "") {
            this.#_material = material;
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
        if (align == 'left' || align == 'center' || align == 'right') {
            this.#_elements.Material.Align = align;
            this.showMaterial();
        }
    }

    // Получить материал в силосе
    getMaterial() {
        return this.#_material;
    }

    // Отобразить материал силоса
    showMaterial() {
        var mat = this.getElements().Material.Div;
        var stat;

        if (mat == "") {
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
        var pos_top = this.#_position.Top + this.getElements().Material.Top;
        var pos_left = this.#_position.Left + this.getElements().Material.Left;
        var st = this.getMaterial();

        // Устанавливаем выравнивание для поля отображения материала в силосе
        var text = "";
        if (st.length > this.#_elements.Material.Length) {
            text = st;
        } else {
            switch (this.#_elements.Material.Align.toLowerCase()) {
                case 'left' : {
                    text = st;
                    break;
                }
                case 'center' : {
                    var spaces = Number((this.#_elements.Material.Length - st.length) / 2);
                    for (var i=0; i<spaces; i++) text += "&nbsp;";
                    text += st;
                    break;
                }
                case 'right' : {
                    var spaces = this.#_elements.Material.Length - st.length;
                    for (var i=0; i<spaces; i++) text += "&nbsp;";
                    text += st;
                    break;
                }
            }
        }

        stat.innerHTML = text;
        stat.style.position = 'absolute';
        stat.style.top = pos_top;
        stat.style.left = pos_left;

        if (this.#_showed) {
            stat.style.display = 'inherit';
        } else {
            stat.style.display = 'none';
        }
    }

    // Спрятать материал силоса
    hideMaterial() {
        var el = this.#_elements.Material.Div;
        if (el != "") {
            var stat = document.getElementById(el);
            stat.style.display = 'none';
        }
    }

    // Установить позицию индикатора материала
    setMaterialPosition(top, left) {
        var pos_top = this.#_position.Top + top;
        var pos_left = this.#_position.Left + left;
        var el = this.#_elements.Material.Div;
        if (el != "") {
            var stat = document.getElementById(el);
            stat.style.top = pos_top;
            stat.style.left = pos_left;
            this.#_elements.Material.Top = top;
            this.#_elements.Material.Left = left;
        }
    this.showMaterial();
    }

    // Установка цвета для текстовых элементов
    setColor(element, color) {
        var el;

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

        if (el != "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.color = color;
        }
    }

    // Установка типа шрифта для текстовой метки
    setFont(element, font) {
        var el;

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

        if (el != "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.fontFamily = font;
        }
    }

    // Установка размера шрифта для текстовой метки
    setFontSize(element, size) {
        var el;

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

        if (el != "") {
            // Устанавливаем цвет для текстовой метки на экране
            document.getElementById(el).style.fontSize = size;
        }
    }

    // Установка толщины шрифта для текстовой метки
    setFontWeight(element, weight) {
        var el;

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

        if (el != "") {
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
        var el = this.getElements().Status.Div;
        var stat;

        if (el == "") {
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
        var pos_top = this.#_position.Top + this.getElements().Status.Top;
        var pos_left = this.#_position.Left + this.getElements().Status.Left;
        var st = this.getStatusImage(this.#_status);

        stat.src = st;
        stat.style.position = 'absolute';
        stat.style.top = pos_top;
        stat.style.left = pos_left;

        if (this.#_showed) {
            stat.style.display = 'inherit';
        } else {
            stat.style.display = 'none';
        }
    }
    
    // Спрятать индикатор статуса силоса
    hideStatus() {
        var el = this.getElements().Status.Div;
        if (el != "") {
            var stat = document.getElementById(el);
            stat.style.display = 'none';
        }
    }

    // Устанавливаем позицию индикатора статуса
    setStatusPosition(top, left) {
        var pos_top = this.#_position.Top + top;
        var pos_left = this.#_position.Left + left;
        this.#_elements.Status.Top = top;
        this.#_elements.Status.Left = left;

        var _stat  = this.getElements().Status.Div;
        if (_stat != "") {
            var stat = document.getElementById(_stat);
            stat.style.top = pos_top;
            stat.style.left = pos_left;
            stat.style.position = 'absolute';
        }
    }

    // Получение статуса силоса
    getStatus() {
        return this.#_status;
    }

    // Отображение силоса на странице
    show() {
        var silos = document.getElementById(this.getId());
        if (silos === null) {
            silos = document.createElement('img');
            silos.src = this.getImage();
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
        if (this.#_width != 0) {
            silos.style.width = this.#_width + "px";
        } else if (this.#_size != 0) {
            silos.style.width = this.#_size + "%";
        }

        // Устанавливаем позицию силоса в окне, если заданы координаты
        if (this.#_position.Top != 0) {
            silos.style.top = this.#_position.Top;
        }
        if (this.#_position.Left != 0) {
            silos.style.left = this.#_position.Left;
        }

        // Опускаем изображение силоса на нижний z-уровень, чтобы не закрывал остальные элементы
        silos.style.zIndex = -1;
    }

    // Спрятать силос на странице
    hide() {
        if (this.#_showed) {
            var silos = document.getElementById(this.getId());
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
            var silos = document.getElementById(this.getId());
            silos.style.top = top;
            silos.style.left = left;
            this.showMaterial();
            this.showNumber();
            this.showStatus();
            this.showPartNo();
        }
    }

    // Установить масштабирование для изображения силоса
    scale(size) {
        if (size > 0) {
            var silos = document.getElementById(this.getId());
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
            var silos = document.getElementById(this.getId());
            this.#_width = width;
            this.#_size = 0;

            if (silos !== null) {
                silos.style.width = width + 'px';
            }
        }
    }
    
}
