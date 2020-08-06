// Описание класса весового бункера

class Weight {
    #layers = [];       // Слои материала в весовом бункере (до 8 слоев, могут отличаться только номером партии)
    #layers_cnt;    // Текущее количество слоёв материала в весовом бункере
    #number;        // Номер весового бункера
    #weight;      // Совокупный вес материала, загруженного в весовой бункер
    #status = ""
    #selected = "img/on.png";
    #deselected = "img/off.png";
    #errored = "img/error.png";

    // Конструктор
    constructor(number) {
        this.#number = number;
        this.#layers_cnt = 0;
        this.#number = 0;
        this.#weight = 0.0;
        this.#status = 'off';
    }

    // Задать вес загруженного материала
    setWeight (weight) {
        this.#weight = weight;
    }

    // Установить статус весового бункера
    // on - весовой бункер выбран для разгрузки
    // off - весовой бункер не выбран
    // error - ошибка весового бункера
    setStatus (status) {
        this.#status = status;
    }

    // Добавить новый слой материала и вернуть его
    addLayer(material, partno, weight) {
        var layer = {};
        layer['Number'] = 0;
        layer['Material'] = material;
        layer['PartNo'] = partno;
        layer['Weight'] = weight;

        for (var l of this.#layers) {
            if (l.Number > layer.Number) layer.Number = l.Number;
        }
        layer.Number++;
        this.#layers.push(layer);
        this.#layers_cnt++;
        
        return layer;
    }

    getLayerData(number) {
        var layer = {};
        var num = --number;

        if (num <= this.#layers.length && this.#layers.length > 0) {
            layer['Number'] = this.#layers[num].Number;
            layer['Material'] = this.#layers[num].Material;
            layer['PartNo'] = this.#layers[num].PartNo;
            layer['Weight'] = this.#layers[num].Weight;
        }

        return layer;
    }

    getLayerCount() {
        return this.#layers.length;
    }

    getLastWeight() {
        var weight = 0;

        for (var l of this.#layers) {
            weight += Number(l.Weight);
        }

        return weight;
    }

    // Разгрузить весовой бункер
    empty() {
        this.#layers.splice(0, this.#layers_cnt);
        this.#layers_cnt = 0;
        this.#weight = 0.0;
    }
}