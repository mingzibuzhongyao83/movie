export const mutations = {
    changeData(state ,data){
        state[data.key] = data.value
    },
     //置空
  emptyData(state) {
    state.newMovieData = [],
    state.weeklyMovieData=[],
    state.americaMovieData=[],
    state.topMovieData=[]
  },
}