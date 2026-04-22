import {createSlice} from "@reduxjs/toolkit";


export type PopupState = {
    isOpen: boolean
}
const INITIAL_STATE: PopupState = {
    isOpen: false
}

const popupSlice = createSlice({
    name: 'popupSlice',
    initialState: INITIAL_STATE,
    reducers: {
        openPopup: (state) => {
            state.isOpen = true
        },
        closePopup: (state) => {
            state.isOpen = false
        }
    },
})

export const {openPopup, closePopup} = popupSlice.actions
export default popupSlice.reducer