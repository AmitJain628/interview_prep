let hookIdTracker = 0;
let states = []
function useState(initalValue) {
  const localHookId = hookIdTracker;

  if (states[localHookId] === undefined) {
    states[localHookId] = initalValue;
  }

  const currentState = states[localHookId];

  const [, rerender] = useReducer(() => {}, {});

  const forceUpdate = () => {
    hookIdTracker = 0
    rerender();
  }

  function setState(value) {
    let isValueChanged = Object.is(currentState, value);
    if (isValueChanged) {
        states[localHookId] = value;
        forceUpdate();
    }
  }

  hookIdTracker++;

  return [currentState, setState]
}