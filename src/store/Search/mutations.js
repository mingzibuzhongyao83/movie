export const mutations = {
    changeData(state,data){
        state[data.key] = data.value
    },
    loadreviewstData(state) {
        //每次获取10条数据
        state.Data.push(...state.movieData.slice(state.start, state.count + state.start));
    
        state.start = state.count+state.start;
      },
}