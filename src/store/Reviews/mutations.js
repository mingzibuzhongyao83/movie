export const mutations = {
  //修改数据
  changeData(state, data) {
    state[data.key] = data.value;
  },

  //置空
  emptyData(state) {
    state.allReviewsData = [];
    state.ReviewsData = [];
    state.finished = false;
    state.count = 10;
    state.start = 0
  },
  loadreviewstData(state) {
    //每次获取10条数据
    state.ReviewsData.push(...state.allReviewsData.slice(state.start, state.count + state.start));

    state.start = state.count+state.start;
  },
}
