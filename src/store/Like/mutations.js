export const mutations = {
    changeData(state,data){
        state[data.key] = data.value
    },
    loadreviewstData(state) {
        //每次获取10条数据
        state.likeData.push(...state.alllikeData.slice(state.start, state.count + state.start));
    
        state.start = state.count + state.start;
      },
}