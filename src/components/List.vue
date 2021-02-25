<template>
    <ul class="todo__list">
        <li
                :class="[{active: index === SELECTED_TASK}, 'active--'+item.color]"
                v-for="(item,index) in LISTS"
                @click="setActiveTask(index)"
                :key="item.id"
        >
            <i>
                <div v-if="!item.img" class="badge" :class="['badge--'+item.color]"></div>
                <img v-if="item.img" src="@/assets/img/list.svg" alt="">
            </i>
            <span class="todo__list--name">
                {{item.name}}
                <span v-if="item.tasks && !item.img">{{`(${Object.values(item.tasks).length})`}}</span>
            </span>
            <svg @click="deleteList(index)" v-if="!item.img" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="black"/>
            </svg>
        </li>
    </ul>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "List",
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'LISTS', 'SELECTED_TASK'
            ])
        },
        methods:{
            setActiveTask(index){
                this.SET_ACTIVE_TASK(index)
            },
            ...mapActions([
                'GET_LISTS_FROM_API', 'DELETE_LIST_FROM_LISTS', 'SET_ACTIVE_TASK'
            ]),
            deleteList(id){
                if (window.confirm('Вы действительно хотите удалить список?')){
                    this.DELETE_LIST_FROM_LISTS(id);
                    setTimeout(this.GET_LISTS_FROM_API, 100)
                }
            }
        },
        mounted() {
            this.GET_LISTS_FROM_API()
                .then((res)=>{
                    if(res.data){
                        console.log('Data arrived')
                    }
                });
        }
    }
</script>

<style lang="scss">
    .todo__list{
        position: relative;

        &--name{
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 160px;
            white-space: nowrap;
        }

        li{
            display: flex;
            padding: 10px 12px;
            align-items: center;
            cursor: pointer;
            position: relative;

            &:first-of-type{
                margin-bottom: 30px;
            }

            &:hover{
                background: #fff;
                svg{
                    display: inline-block;
                }
            }

            i{
                display: inline-flex;
                margin-right: 10px;

                img{
                    opacity: 0.6;
                }
            }

            svg{
                position: absolute;
                display: none;
                opacity: 0.3;
                right: 0px;
                top: 0px;

                &:hover{
                    opacity: 0.7;
                }
            }

            .badge{
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 30px;
                margin-left: 5px;
            }
        }
    }
</style>