<template>
  <div id="app">
    <div class="todo">
      <div class="todo__sidebar">

        <List />

        <AddList />

      </div>
      <div class="todo__tasks">

        <Tasks/>

      </div>
    </div>
  </div>
</template>

<script>
import List from './components/List';
import AddList from './components/AddList';
import Tasks from './components/Tasks';

export default {
  name: 'App',
  components: {
    List, AddList, Tasks
  }
}
</script>

<style lang="scss">

  *{
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    outline: none;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .todo{
    position: absolute;
    display: flex;
    left: 50%;
    top: 50%;
    width: 750px;
    min-height: 530px;
    transform: translate(-50%, -50%);
    box-shadow: 1px 2px 20px #f3f3f3;
    border-radius: 10px;
    border: 1px solid #f4f6f8;
    font-size: 14px;

    &__sidebar{
      padding: 60px 20px;
      background-color: #f4f6f8;
      width: 230px;
      min-height: 530px;
      border-right: 1px solid #f1f1f1;
     }

    &__tasks{
      overflow: hidden;
      flex: 1;
      padding: 60px;
    }
  }

  .field{
    background-color: #ffffff;
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    width: 100%;

    &:focus{
      border-color: #dbdbdb;
    }
  }

  .button{
    background-color: #2c8498;
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;

    &:hover{
      background-color: darken(#2c8498, 5%);
    }

    &:active{
      background-color: darken(#2c8498, 10%);
    }

    &--grey{
      background-color: #f4f6f8;
      color: #444444;

      &:hover{
        background-color: darken(#f4f6f8, 3%);
      }

      &:active{
        background-color: darken(#f4f6f8, 5%);
      }
    }
  }

  .active{
    background: #fff;
    border: 1px solid;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    cursor: pointer;

    &--green{
      border-color: #42B883
    }


    &--black{
      border-color: #000000
    }


    &--grey{
      border-color: #C9D1D3
    }

    &--blue{
      border-color: #64C4ED
    }

    &--pink{
      border-color: #FFBBCC
    }

    &--lime{
      border-color: #B6E6BD
    }

    &--purple{
      border-color: #C355F5
    }

    &--red{
      border-color: #FF6464
    }
  }

  .badge{

    &__green{
      color:#42B883;
    }

    &--green{
      background-color: #42B883
    }

    &__black{
      color: #000000
    }

    &--black{
      background-color: #000000
    }

    &__grey{
      color: #C9D1D3
    }

    &--grey{
      background-color: #C9D1D3
    }

    &__blue{
      color: #64C4ED
    }

    &--blue{
      background-color: #64C4ED
    }

    &__pink{
      color: #FFBBCC
    }

    &--pink{
      background-color: #FFBBCC
    }

    &__lime{
      color: #B6E6BD
    }

    &--lime{
      background-color: #B6E6BD
    }

    &__purple{
      color: #C355F5
    }

    &--purple{
      background-color: #C355F5
    }

    &__red{
      color: #FF6464
    }

    &--red{
      background-color: #FF6464
    }
  }
</style>
