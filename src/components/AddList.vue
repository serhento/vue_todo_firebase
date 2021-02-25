<template>
    <div class="todo__add-list">
        <div @click="showPopup" class="todo__add-list__front">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 8H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Добавить список</span>
        </div>
        <div v-if="isShow" class="todo__add-list__back">
            <svg @click="resetAddListForm" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="black"/>
            </svg>
            <input v-model="msg" class="field" type="text" placeholder="Название списка">
            <div class="todo__add-list__back--colors">
                <ul>
                    <li
                            v-for="color in COLORS"
                            :key="color.id"
                            @click="setActive(color.id)"
                            class="badge"
                            :class="['badge--'+color.name, {active: color.id === selectedColor}]"
                    >
                    </li>
                </ul>
            </div>
            <button @click="addTask" class="button">Добавить</button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "AddList",
        data(){
            return{
                isShow: false,
                selectedColor: 1,
                msg: '',
                colorName: ''
            }
        },
        methods:{
            ...mapActions([
                'GET_COLORS_FROM_API', 'ADD_TASK_TO_LIST', 'GET_LISTS_FROM_API'
            ]),
            showPopup(){
                this.isShow = true
            },
            setActive(id){
                this.selectedColor = id
            },
            resetAddListForm(){
                this.selectedColor = 1;
                this.msg = '';
                this.isShow = false;
            },
            addTask(){
                if (this.msg){
                    let randomId = Math.floor(Math.random()*1000);
                    this.COLORS.map(color=>{
                        if (this.selectedColor === color.id){
                            this.colorName = color.name
                        }
                    });
                    const task = {"name": this.msg, "colorId": this.selectedColor, "color": this.colorName, "id": randomId, "tasks": 0};
                    this.ADD_TASK_TO_LIST(task);
                    this.resetAddListForm();
                    setTimeout(this.GET_LISTS_FROM_API, 100)
                }
            }
        },
        computed:{
            ...mapGetters([
                'COLORS'
            ])
        },
        mounted() {
            this.GET_COLORS_FROM_API()
                .then((res)=>{
                    if(res.data){
                        console.log('Data arrived')
                    }
                })
        }
    }
</script>

<style lang="scss">
    .todo__add-list{
        &__front{
            margin-top: 30px;
            display: flex;
            padding: 10px 12px;
            align-items: center;
            cursor: pointer;

            &:hover{
                span{
                    opacity: 0.8;
                }

                svg{
                    opacity: 0.8;
                }
            }

            span{
                opacity: 0.4;
            }

            svg{
                opacity: 0.4;
                margin-left: 4px;
                margin-right: 10px;
            }

        }

        &__back{
            position: absolute;
            width: 240px;
            height: 148px;
            background-color: #fff;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.05);
            border-radius: 10px;
            padding: 18px;

            svg{
                position: absolute;
                top: -5px;
                right: -5px;
                cursor: pointer;
                opacity: 0.4;

                &:hover{
                    opacity: 0.8;
                }
            }

            .button{
                width: 100%;
                margin-top: 15px;
            }

            &--colors{
                margin-top: 12px;

                ul{
                    display: flex;
                    justify-content: space-between;

                    .badge{
                        cursor: pointer;
                        width: 20px;
                        height: 20px;
                        border-radius: 30px;
                        border: 2px solid transparent;

                        &.active{
                            border: 2px solid #525252;
                        }
                    }
                }
            }
        }
    }
</style>