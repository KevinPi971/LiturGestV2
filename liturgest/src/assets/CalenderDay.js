export default class CalenderDay{
    events = [];
    constructor(id, date, isActive, events){
        this.id = id;
        this.date = date;
        this.isActive = isActive;
        this.events = events;
    }
}