import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  access_token: "",
  id: "",
  isAdmin: false,
  refresh_token: "",
  profile: {
    fullname: "",
    avatar: ""
  },
  favorites: {
    tracks: [{ }],
    playlists: [{ }],
    artists: [{ }]
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        username = "",
        email = "",
        access_token = "",
        _id = "",
        isAdmin = false,
        refresh_token = "",
        profile = {
          fullname: "",
          avatar: ""
        },
        favorites = {
          tracks: [{ }],
          playlists: [{ }],
          artists: [{ }]
        },
      } = action.payload;

      state.username = username ? username : state.username;
      state.email = email ? email : state.email;
      state.id = _id ? _id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.profile = profile ? profile : state.profile;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
      state.favorites = favorites ? favorites : state.city;
      state.refresh_token = refresh_token ? refresh_token : state.refreshToken;
    },
    resetUser: (state) => {
      state.username = "";
      state.email = "";
      state.id = "";
      state.favorites = {};
      state.access_token = "";
      state.isAdmin = false;
      state.city = "";
      state.refresh_token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
