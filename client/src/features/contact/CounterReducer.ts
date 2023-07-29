export interface CounterState {
    data: number,
    title: string
}


const initialState: CounterState = {
    data: 50,
    title: "ABCD"
}

export default function counterReducer(state = initialState, action: any) {
    return state;
}