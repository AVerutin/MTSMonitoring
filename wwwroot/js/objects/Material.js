// Класс материала
class Material {
    Number;             // Номер материала
    Name;               // Наименование материала
    // PartNo;             // Номер партии
    // Weight;             // Вес
    // Volume;             // Объем
    #_chemicals;          // Химический состав

    constructor(number, name) {
        this.Number = number;
        this.Name = name;
        // this.PartNo = 0;
        // this.Weight = 0;
        // this.Volume = 0;
        this._chemicals = [];
    }

    addElement(element, volume) {
        let _element = {};
        _element['Element'] = element;
        _element['Volume'] = volume;
        this._chemicals.push(_element);
    }

    getChemicals() {
        return this._chemicals;
    }
}
