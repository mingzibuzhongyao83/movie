export const mutations = {
    changeData(state,data){
        state[data.key] = data.value;
    },
    //置空
  emptyData(state) {
    state.listmovieData = [];
    state.movieData = [];
    state.finished = false;
    state.count = 10;
    state.start = 0;
    state.sum = 0
  },
    loadreviewstData(state) {
        //每次获取10条数据
        state.listmovieData.push(...state.movieData.slice(state.start, state.count + state.start));
    
        state.start = state.count + state.start;
      },
}