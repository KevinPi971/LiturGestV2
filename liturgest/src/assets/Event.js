class Event {
    #id = null;
    title = "";
    typeOfEvent = null;
    ddeb = null;
    dfin = null;
    #creator = null;
    responsible = null;
    participants = [];
    parts = []; // liste d'activités
    isReccurent = false;
    

    constructor(title, typeOfEvent, ddeb, dfin){
        this.title = title;
        this.typeOfEvent = typeOfEvent;
        this.ddeb = ddeb;
        this.dfin = dfin;
        init();
    }

    init(){
        this.#setId();
        this.#setCreator();
    }

    /**
     * Cherche un id disponible et le renseigne
     */
    #setId(){
        //this.id=this.getNewEventId;
    }

    get id(){
        return this.#id;
    }

    /**
     * Récupère le user courant et le désign en tant que créateur
     */
    #setCreator(){
        //this.creator=this.getCurrentUser();
    }

    get creator(){
        return this.#creator;
    }
}
