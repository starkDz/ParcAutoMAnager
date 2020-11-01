const initialState = {
  Marque: [],
  Categorie: [],
  Couleur: [],
  Carburant: [],
  Chauffeur: [],
  Models: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, items } = action;
  switch (type) {
    case 'setAllMarque':
      return {
        ...state,
        Marque: action.items,
      };

    case 'addTomarque':
      let newMarque = state.Marque.concat(action.items);
      return {
        ...state,
        Marque: newMarque,
      };
    case 'setAllModel':
      return {
        ...state,
        Models: action.items,
      };

    case 'addTomodel':
      let newModel = state.Models.concat(action.items);
      return {
        ...state,
        Models: newModel,
      };
    case 'setAllCategorie':
      return {
        ...state,
        Categorie: action.items,
      };

    case 'addTocategorie':
      let newCategorie = state.Categorie.concat(action.items);
      return {
        ...state,
        Categorie: newCategorie,
      };
    case 'setAllCouleur':
      return {
        ...state,
        Couleur: action.items,
      };
    case 'addTocouleur':
      let newCouleur = state.Couleur.concat(action.items);
      return {
        ...state,
        Couleur: newCouleur,
      };
    case 'setAllCarburant':
      return {
        ...state,
        Carburant: action.items,
      };
    case 'addTocarburant':
      let newCarburant = state.Carburant.concat(action.items);
      return {
        ...state,
        Carburant: newCarburant,
      };
    case 'setAllChauffeur':
      return {
        ...state,
        Chauffeur: action.items,
      };
    case 'addTochauffeur':
      let newChauffeur = state.Chauffeur.concat(action.items);
      return {
        ...state,
        Chauffeur: newChauffeur,
      };
    default:
      return state;
  }

  return state;
};

export default rootReducer;
