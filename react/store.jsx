import { createContext, useContext, useEffect, useState } from "react";

class CustomStore {
    constructor(reducer, initalState = {}) {
        this.state = initalState;
        this.reducer = reducer;
        this.listeners = new Set();
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
       this.state = this.reducer(this.state, action)
       this.listeners.forEach((listener) => listener());
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

let EeduxContext = createContext();

export const Provider = ({store, children}) => {
    <EeduxContext.Provider value={store}>{children}</EeduxContext.Provider>
}

// dispatch({type: 'increment})
// const reducer = (state, action) => {
//  type: 'increment':
 //   return { counter: state.counter+1 }
// }

const shallow = (old, new) => old === new;

export default CustomStore;



export const useSelector = (selector, compareFn = shallow) => {
    const store = useContext(ReduxContext);
    const [selectedState, setSelectedState] = useState(selector(store.getState()));
    const previousStateRef = useRef(selectedState);

    useEffect(() =>{
        const unscribe = store.subscribe(() => {
            const newState =  selector(store.getState());
            if (!compareFn(previousStateRef.current, newState)) {
                previousStateRef.current = newState;
                setSelectedState(newState);
            }
        });

        return () => unscribe();
    }, [selector])

    return selectedState;
}

export const hook = React.createContext({})