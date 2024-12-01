import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  isLoading: false,
  isAdmin:false
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("action.payload",action.payload)
      const { name ='', email='',avatar = '',phone='', address='', _id='',isAdmin} = action.payload;
      const { access_token } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.id = _id
      state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.name = '' ;
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = '';
    },
  },
});

export const { updateUser ,resetUser} = userSlice.actions

export default userSlice.reducer
 