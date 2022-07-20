import { boardService } from "../../../services/board-service.js"

export default {
  state: {
    boards: [],
    currBoard: {},
  },
  getters: {
    getBoards({ boards }) {
      return boards
    },
    getCurrBoard({ currBoard }) {
      console.log(currBoard);
      return currBoard
    },
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards
    },
    setCurrBoard(state, { currBoard }) {
      state.currBoard = currBoard
    },
    removeBoard(state, { id }) {
      const idx = state.boards.findIndex((board) => board._id === id)
      state.boards.splice(idx, 1)
    },
    saveBoard(state, { board }) {
      const idx = state.boards.findIndex(
        (currBoard) => currBoard._id === board_.id
      )
      if (idx !== -1) state.boards.splice(idx, 1, board)
      else state.board.push(board)
    },
    // saveTask(state, { task }) {
    //   const idx = state.boards.findIndex(
    //     (currBoard) => currBoard._id === board_.id
    //   )
    //   if (idx !== -1) state.boards.splice(idx, 1, board)
    //   else state.board.push(task)
    // },
    // removeTask(state, { taskId }){

    // }
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query()
        commit({ type: "setBoards", boards })
      } catch (err) {
        console.log("Cannot load boards", err)
        throw err
      }
    },
    async removeBoard({ commit }, { id }) {
      try {
        await boardService.remove(id)
        commit({ type: "removeBoard", id })
      } catch (err) {
        console.log("Cannot remove board", err)
        throw err
      }
    },
    async saveBoard({ commit }, { board }) {
      try {
        const savedBoard = await boardService.save(board)
        commit({ type: "saveBoard", savedBoard })
      } catch (err) {
        console.log("Cannot save board", err)
        throw err
      }
    },
    async getBoardById({ commit }, { boardId }) {
      try {
        const currBoard = await boardService.getBoardById(boardId)
        commit({ type: 'setCurrBoard', currBoard })
        return currBoard
      } catch (err) {
        console.log('Cannot get currBoard', err);
        throw err
      }
    },
    async getTaskById({ commit }, { boardId, groupId, taskId }) {
      try{
        const task = await boardService.getTaskById(boardId, groupId, taskId)
        return task
      }
      catch (err) {
        console.error('cannot get task', err)
        throw err
      }
  },
  async saveTask({ commit }, { task, groupId, boardId }) {
    try {
      const savedTask = await boardService.saveTask(task, groupId, boardId)
      // commit({ type: "saveTask", savedTask })
    } catch (err) {
      console.log("Cannot save task", err)
      throw err
    }
  },
}
}