export default class Event {
    lieu
    creator = null;
    responsible = null;
    participants = [];
    parts = []; // liste d'activités
    isReccurent = false;
    
    constructor(id, typeEvt, titleTypeEvt, color, ddeb, dfin){
        this.id = id;
        this.typeEvt = typeEvt;
        this.ddeb = ddeb;
        this.dfin = dfin;
        this.titleTypeEvt = titleTypeEvt;
        this.color = color;
    }
}