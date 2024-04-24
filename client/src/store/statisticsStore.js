import {makeAutoObservable} from "mobx";

export default class StatisticsStore{

    constructor() {
        this._statistics2 = []
        makeAutoObservable(this)
    }

    setStatistics2(statistics2){
        this._statistics2 = statistics2
    }

    get statistics2(){
        return this._statistics2
    }
}