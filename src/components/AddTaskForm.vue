<template>
    <div class="tasks__items--form">
        <div @click="toggleForm" v-if="formToggle" class="tasks__items--form--new">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 8H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Новая задача</span>
        </div>
        <div v-if="!formToggle" class="tasks__items--form--block">
            <input
                    v-model="taskName"
                    class="field"
                    type="text"
                    placeholder="Название задачи"
                    @keydown.enter="setTaskToList"
            >
            <button @click="setTaskToList" class="button">Добавить задачу</button>
            <button @click="resetForm" class="button button--grey">Отмена</button>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "AddTaskForm",
        data(){
            return{
                formToggle: true,
                taskName: ''
            }
        },
        props:{
            listId: {},
            listIndex:{}
        },
        methods:{
            ...mapActions([
                'ADD_TASK_TO_TASKS', 'GET_LISTS_FROM_API', 'GET_TASKS_FROM_API'
            ]),
            toggleForm(){
                this.formToggle = !this.formToggle
            },
            resetForm(){
                this.taskName = '';
                this.toggleForm();
            },
            setTaskToList(){
                if (this.taskName){
                    let randomId = Math.floor(Math.random()*1000);
                    const newTask = {"listsIndex": this.listIndex, "text": this.taskName, "completed": false, "taskId": randomId};
                    this.ADD_TASK_TO_TASKS(newTask);
                    setTimeout(this.GET_LISTS_FROM_API, 100);
                    this.resetForm();
                }
            }
        }
    }
</script>

<style lang="scss">
    .tasks__items--form{
        margin-top: 20px;

        &--block{
            .button{
                margin-right: 10px;
                margin-top: 15px;
            }
        }

        &--new{
            display: flex;
            align-items: center;
            cursor: pointer;
            opacity: 0.4;

            &:hover{
                opacity: 0.8;
            }

            svg{
                margin-left: 3px;
            }

            span{
                margin-left: 19px;
            }
        }
    }
</style>