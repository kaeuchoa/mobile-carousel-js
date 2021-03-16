import { Constants } from "./misc.js";
import State from "./State.js";

class StatefulController {
    constructor() {
        this.state = new State();
    }

    _stateContainsRightData(data) {
        return data.hasOwnProperty(Constants.STATE_PAGE_LIST) && data.hasOwnProperty(Constants.STATE_PAGE_INDEX);
    }

    _getCurrentPageList() {
        return this.state.get(Constants.STATE_PAGE_LIST);
    }

    _getCurrentPageIndex() {
        return this.state.get(Constants.STATE_PAGE_INDEX);
    }
}

export default StatefulController;