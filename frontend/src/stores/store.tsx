// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import reducer from "./reducers";

// export default configureStore({
//   reducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });


// middleware 현재 사용 x
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

export default configureStore({
  reducer,
});