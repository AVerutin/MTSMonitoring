// Отладочный класс для силоса

class Test { // СИЛОС

    // Свойства класса
    #_id;
    #_number;
    #_material;
    #_status;
    #_part_no;

    #_drawed;

    #_imgs = {};
    #_elements = {};
    #_position = {};

    constructor(number) {
        if (number > 0) {
            this.#_id = 'silos_' + number;
            this.#_number = number;
            this.#_material = "";
            this.#_status = "off";
            this.#_part_no = 0;
            this.#_drawed = false;

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
            elements['Material'] = mat;

            this.#_elements = elements;

            // Позиция силоса на странице
            var pos = {};
            pos['Position'] = 'absolute';
            pos['Tot'] = 0;
            pos['Left'] = 0;
            this.#_position = pos;
        }
    }

    // Получить изображение силоса
    getImage() {
        return this.#_imgs.Image.Image;
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
    setPartNo(partno) {
        if (partno > 0) {
            this.#_part_no = partno;
        }
    }

    // Получить номер партии
    getPartNo() {
        return this.#_part_no;
    }

    // Получить позицию силоса на странице (координаты Top и Left)
    getPosition() {
        return this.#_position;
    }

    // Получить элементы отображения силоса (номер, статус, материал)
    getElements() {
        return this.#_elements;
    }

    // Установить материал силоса
    setMaterial(material) {
        if (material != "") {
            this.#_material = material;
        }
    }

    // Получить материал в силосе
    getMaterial() {
        return this.#_material;
    }

    // Отобразить номер силоса
    showNumber() {

    }

    // Спрятать номер силоса
    hideNumber() {

    }

    // Установить позицию номера силоса
    setNumberPosition(top, left) {

    }

    // Отобразить материал силоса
    showMaterial() {

    }

    // Спрятать материал силоса
    hideMaterial() {

    }

    // Установить позицию индикатора материала
    setMaterialPosition(top, left) {

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

    // Получить номер силоса
    getNumber() {
        return this.#_number;
    }

    // Установить статус силоса
    setStatus(status) {
        switch (status.toLowerCase()) {
            case 'on' : this.#_status = 'on'; break;
            case 'off' : this.#_status = 'off'; break;
            case 'error' : this.#_status = 'error'; break;
        }

        // Отображение статуса на странице

        var el = this.getElements().Status.Div;
        if (el == "") {
            // Элемент отображения сттуса не создан
            var s = document.createElement('img');
            s.id = this.#_id + '_status';
            s.style.position = 'absolute';
            s.style.top = this.getElements().Status.Top;
            s.style.left = this.getElements().Status.Left;
            document.body.append(s);

            this.#_elements.Status.Div = s.id;
            el = s.id;
        }

        var stat = document.getElementById(el);
        var st = this.getStatusImage(this.#_status);
        stat.src = st;
    }

    // Устанавливаем позицию индикатора статуса
    setStatusPosition(top, left) {
        var _stat  = this.getElements().Status.Div;
        if (_stat != "") {
            var stat = document.getElementById(_stat);
            stat.style.top = top;
            stat.style.left = left;
            stat.style.position = 'absolute';
            this.#_elements.Status.Top = top;
            this.#_elements.Status.Left = left;
        }
    }

    // Установить положение на странице
    setPosition(position, top, left) {
        if (position != "") {
            this.#_position.Position = position;
            if (!isNaN(top)) this.#_position.Top = top;
            if (!isNaN(left)) this.#_position.Left = left;
        }
    }

    // Получение статуса силоса
    getStatus() {
        return this.#_status;
    }

    // Отображение силоса на странице
    draw() {
        if (!this.#_drawed) {
            var silos = document.createElement('img');
            silos.src = this.getImage();
            silos.style.position = this.getPosition().Position;
            silos.style.left = this.getPosition().Left;
            silos.style.top = this.getPosition().Top;
            silos.id = this.#_id;

            document.body.append(silos);
            this.#_drawed = true;
        }
    }

    move(top, left) {
        if (this.#_drawed) {
            var silos = document.getElementById(this.getId());
            silos.style.top = top;
            silos.style.left = left;
        }
    }

    scale(size) {
        if (size > 0) {
            var silos = document.getElementById(this.getId());
            silos.style.width = size + '%';
        }
    }

    width(width) {
        if (width > 0) {
            var silos = document.getElementById(this.getId());
            silos.style.width = width + 'px';
        }
    }
    
}