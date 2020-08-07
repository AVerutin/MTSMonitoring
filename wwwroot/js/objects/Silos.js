// Класс, описывающий рольганг

class Silos {

    #number;
    #weight;
    #material; 
    #status;
    #part_no;

    #selected = "img/on.png";
    #deselected = "img/off.png";
    #errored = "img/error.png";

    constructor(number) {
        this.#number = number;
        this.#weight = 0.0;
        this.#material = "";
        this.#status = "off";
        this.#part_no = 0;
    }

    // Номер партии
    setPartNo (partno) {
        if (partno > 0) {
            this.#part_no = partno;
        }
    }

    getPartNo () {
        return this.#part_no;
    }

    // Материал
    setMaterial(material) {
        this.#material = material;
    }

    getMaterial() {
        return this.#material;
    }

    // Статус
    setStatus(status)
    {
        switch (status) {
            case 'on' : this.#status = status; break;
            case 'off' : this.#status = status; break;
            case 'error' : this.#status = status; break;
        }
    }

    getStatus() {
        return this.#status;
    }

    // Вес
    getWeight() {
        return this.#weight;
    }

    setWeight(weight) {
        if(weight >= 0) {
            this.#weight = weight;
        }
    }
}
