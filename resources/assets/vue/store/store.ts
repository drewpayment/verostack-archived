import * as Vuex from 'vuex'
import { session } from './session/session'
import { State } from './state'


export const createStore = () => new Vuex.Store<State>({
    modules: {
        session
    }
})