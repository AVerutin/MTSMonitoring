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
        setMaterial(this.#number, material);
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

        setSilosStatus(this.#number, this.#status);
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
    switch (status.toLowerCase()) {
        case 'on': stat += 'on.png'; break;
        case 'off': stat += 'off.png'; break;
        case 'error': stat += 'error.png'; break;
    }

    document.getElementById(number).src = stat;
}
