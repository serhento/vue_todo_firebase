import Vue from 'vue';
import Vuex from 'vuex';
import {listsRef, colorsRef} from "../main";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        lists: [],
        colors: [],
        selectedTask: 0
    },
    actions: {
        GET_LISTS_FROM_API({commit}){
            return listsRef.get().then(function(lists) {
                commit('SET_LISTS_TO_STATE', lists.val());
                //console.log(lists.val());
                return lists.val()
            })
                .catch((error)=>{
                    console.log(error);
                    return error
                })
        },
        ADD_TASK_TO_LIST({commit}, task){
            listsRef.push(task)
                .then(()=>{
                    commit('ADD_TASK_TO_STATE',task);
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
        },
        DELETE_LIST_FROM_LISTS({commit}, index){
            listsRef.child(index).remove()
                .then(()=>{
                    commit('DELETE_LIST_FROM_STATE',index);
                })
                .catch((error)=>{
                    console.log(error);
                    return error
                })
        },
        GET_COLORS_FROM_API({commit}){
            return colorsRef.get().then(function(colors) {
                commit('SET_COLORS_TO_STATE', colors.val());
                //console.log(colors.val());
                return colors.val()
            })
                .catch((error)=>{
                    console.log(error);
                    return error
                })
        },
        SET_ACTIVE_TASK({commit}, id){
            commit('SET_SELECTED_TASK', id)
        },
        EDIT_TASK_TITLE({commit}, data){
            listsRef.child(data.dataIndex).update({"name":data.dataTitle})
                .then(()=>{
                    commit('CHANGE_TASK_TITLE',data);
                })
                .catch(()=>{
                    alert('Не удалось обновить название списка')
                })
        },
        EDIT_TASK_NAME({commit}, data){
            listsRef.child(data.listsIndex).child('tasks').child(data.tasksIndex).update({"text":data.text})
                .then(()=>{
                    commit('CHANGE_TASK_NAME',data);
                })
                .catch(()=>{
                    alert('Не удалось обновить название списка')
                })
        },
        DELETE_TASK_FROM_TASKS({commit}, data){
            listsRef.child(data.listsIndex).child('tasks').child(data.tasksIndex).remove()
                .then(()=>{
                    commit('DELETE_TASK_FROM_STATE',data);
                })
                .catch((error)=>{
                    console.log(error);
                    return error
                })
        },
        ON_TASK_COMPLETED({commit}, data){
            listsRef.child(data.listsIndex).child('tasks').child(data.tasksIndex).update({"completed": !data.completed})
                .then(()=>{
                    commit('SET_TASK_COMPLETED',data);
                })
                .catch(()=>{
                    alert('Не удалось обновить название списка')
                })
        },
        ADD_TASK_TO_TASKS({commit}, task){
            listsRef.child(task.listsIndex).child('tasks').push({"completed": false, "text": task.text, "id": task.taskId})
                .then(()=>{
                    commit('ADD_TASK_TO_TASKS_STATE',task);
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
        }
    },
    mutations: {
        SET_LISTS_TO_STATE:(state, lists)=>{
            state.lists = lists;
        },
        ADD_TASK_TO_STATE:(state, task)=>{
            state.lists.push(task)
        },
        DELETE_LIST_FROM_STATE:(state, index)=>{
            delete state.lists[index]
        },
        SET_COLORS_TO_STATE:(state, colors)=>{
            state.colors = colors;
        },
        SET_SELECTED_TASK:(state, id)=>{
            state.selectedTask = id
        },
        CHANGE_TASK_TITLE:(state, data)=>{
            state.lists[data.dataIndex].name = data.dataTitle
        },
        CHANGE_TASK_NAME:(state, data)=>{
            state.lists[data.listsIndex].tasks[data.tasksIndex].text = data.text
        },
        DELETE_TASK_FROM_STATE:(state, data)=>{
            delete state.lists[data.listsIndex].tasks[data.tasksIndex];
        },
        SET_TASK_COMPLETED:(state, data)=>{
            state.lists[data.listsIndex].tasks[data.tasksIndex].completed = !data.completed
        },
        ADD_TASK_TO_TASKS_STATE:(state, task)=>{
            state.lists[task.listsIndex].tasks.push({"completed": false, "text": task.text, "id": task.taskId})
        }
    },
    getters: {
        LISTS(state){
            return state.lists
        },
        COLORS(state){
            return state.colors
        },
        SELECTED_TASK(state){
            return state.selectedTask
        }
    }
});

export default store;