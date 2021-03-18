function State() {
    if (!State.instance) {
        this.obj = {};
        this.observers = [];
        State.instance = this;
    }

    this.set = function(property, value) {
        const mutableState = {...this.obj};
        mutableState[property] = value;
        this.obj = {...mutableState};
        this._notify(this.obj);
    }

    this.get = function(property) {
        if (this.obj.hasOwnProperty(property)) {
            return this.obj[property];
        }
    }

    this._notify = function(data){
        this.observers.forEach(observer => observer(data));
    }


    this.subscribe = function(f) {
        this.observers.push(f);
    }

    this.unsubscribe = function(f) {
        this.observers = this.observers.filter(observer => f !== observer);
    }


    return State.instance;
}

export default State;