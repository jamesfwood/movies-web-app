
const videoDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VIDEO_DETAILS':
      return [
        ...state,
        ...action.videoDetails
      ];
    default:
      return state;
  }
};

export default videoDetailsReducer
