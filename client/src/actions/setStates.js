export const loadCollections = (items, type) => (dispatch) => {
  //   console.log('hello Add' + items + type);
  dispatch({
    type: type,
    items: items,
  });
};
