import { createSlice } from '@reduxjs/toolkit'

const placesSlice = createSlice({
  name: 'places',
  initialState: {
    pending: [],
    visited: [],
  },
  reducers: {
    addplace: (state, action) => {
      state.pending.push({
        id: Date.now(),
        status: 'Pending',
        ...action.payload,
      })
    },
    moveToVisited: (state, action) => {
      const place = state.pending.find((p) => p.id === action.payload)
      if (place) {
        state.pending = state.pending.filter((p) => p.id !== action.payload)
        place.status = 'Visited'
        state.visited.push(place)
      }
    },
    deleteplace: (state, action) => {
      state.pending = state.pending.filter((p) => p.id !== action.payload)
      state.visited = state.visited.filter((p) => p.id !== action.payload)
    },
  },
})

export const { addplace, moveToVisited, deleteplace } = placesSlice.actions
export default placesSlice.reducer

// --------------------------------------------------------------------------------------------------------------------
// import { createSlice } from "@reduxjs/toolkit";

// const placesSlice = createSlice({
//   name: "places",
//   initialState: {
//     pending: [],
//     visited: [],
//   },
//   reducers: {
//     addplace: (state, action) => {
//       state.pending.push({
//         id: Date.now(),
//         status: "Pending",
//         ...action.payload,
//       });
//     },

//     moveToVisited: (state, action) => {
//       // Find place in pending list
//       const place = state.pending.find((p) => p.id === action.payload);
//       if (place) {
//         // Remove it from pending
//         state.pending = state.pending.filter((p) => p.id !== action.payload);
//         // Change its status
//         place.status = "Visited";
//         // Add to visited list
//         state.visited.push(place);
//       }
//     },

//     deleteplace: (state, action) => {
//       state.pending = state.pending.filter((p) => p.id !== action.payload);
//       state.visited = state.visited.filter((p) => p.id !== action.payload);
//     },
//   },
// });

// export const { addplace, moveToVisited, deleteplace } = placesSlice.actions;
// export default placesSlice.reducer;
  
