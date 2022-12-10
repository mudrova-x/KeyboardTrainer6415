import {makeAutoObservable} from "mobx";

export default class exerlevelStore{
    constructor() {
        this._level = []
        this._exercise = []
        makeAutoObservable(this)
    }

    setLevel(level){
        this._level = level
    }

    setExercise(exercise){
        this._exercise = exercise
    }

    get level(){
        return this._level
    }

    get exercise(){
        return this._exercise
    }

}