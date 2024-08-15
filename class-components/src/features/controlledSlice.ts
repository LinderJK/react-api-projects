export const controlledSlice = {
    name: 'controlled',
    initialState: {
        name: '',
        age: 0,
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        agree: false,
        image: null,
        country: '',
    },
    reducers: {
        setUncontrolledData: (state, action) => {
            state.name = action.payload;
        },
    },
};
