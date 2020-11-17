const initialState = {
  chauffeurNumber: 0, //used Chauffeurs
  chauffeurFreeNumber: 0,
  chauffeurMissionNumber: 0,
  vehiculeNumber: 0, //used at vehicule
  vehiculeFreeNumber: 0,
  vehiculePanneNumber: 0,
  missionNumber: 0,
  missionTodayNumber: 0,
};

const statistics = (state = initialState, action) => {
  const { type, items } = action;
  switch (type) {
    case 'setCount':
      return {
        ...state,
        chauffeurNumber: action.items.chauffeurNumber,
        chauffeurMissionNumber: action.items.chauffeurMissionNumber,
        vehiculeNumber: action.items.vehiculeNumber,
        vehiculePanneNumber: action.items.vehiculePanneNumber,
        missionNumber: action.items.missionNumber,
        missionTodayNumber: action.items.missionTodayNumber,
      };
    case 'setChauffeurNumber':
      return {
        ...state,
        chauffeurNumber: action.items,
      };
    case 'addChauffeurNumber':
      let newChauffeur = state.chauffeurNumber + action.items;
      return {
        ...state,
        chauffeurNumber: newChauffeur,
      };
    case 'setChauffeurFreeNumber':
      return {
        ...state,
        chauffeurFreeNumber: action.items,
      };
    case 'setChauffeurMissionNumber':
      return {
        ...state,
        chauffeurMissionNumber: action.items,
      };
    case 'setVehiculeNumber':
      return {
        ...state,
        vehiculeNumber: action.items,
      };
    case 'addVehiculeNumber':
      let newVehicule = state.vehiculeNumber + action.items;
      return {
        ...state,
        vehiculeNumber: newVehicule,
      };
    case 'setVehiculeFreeNumber':
      return {
        ...state,
        vehiculeFreeNumber: action.items,
      };
    case 'setVehiculePanneNumber':
      return {
        ...state,
        vehiculePanneNumber: action.items,
      };
    case 'setMissionNumber':
      return {
        ...state,
        missionNumber: action.items,
      };
    case 'setMissionTodayNumber':
      return {
        ...state,
        missionTodayNumber: action.items,
      };
    default:
      return state;
  }

  return state;
};

export default statistics;
