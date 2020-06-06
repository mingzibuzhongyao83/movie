export const mutations = {

  //修改数据
  changeData(state, data) {
    state[data.key] = data.value;
  },

  //置空
  emptyData(state) {
    state.movieData= [];
    state.mdata = [];
    state.width = '';
    state.isHotData = [];
  },

}
