<template>
    <header>
        <div class="wj-account">
            <a class="wj-account__access">Acesse sua Conta</a>
            ou 
            <a class="wj-account__create">Cadastre-se</a>
        </div>

        <div class="wj-header-body" v-show="!mobile">
            <div class="wj-header-body__logo">
                <img src="../public/media/logo.jpg" >
            </div>
            <form class="wj-header-body__search">
                <input class="wj-header-body__input" >
                <button class="wj-header-body__newsletter-submit">Buscar</button>
            </form>
            
        </div>

        <div class="wj-header-body" v-show="mobile">
            <div class="wj-header-body__hamburguer" @click="menuMobile=!menuMobile">
                <svg viewBox="0 0 100 80" width="40" height="40">
                    <rect width="100" height="15"></rect>
                    <rect y="30" width="100" height="15"></rect>
                    <rect y="60" width="100" height="15"></rect>
                </svg>
            </div>
            <div class="wj-header-body__logo">
                <img src="../public/media/logo.jpg" >
            </div>
            <img src="../public/media/search-icon.jpg"  class="wj-header-body__search"/>
        </div>

        <!-- MENU DESKTOP -->
        <div class="wj-header-menu" v-show="!mobile"> 
            <!-- TRANSFORMAR EM UL -->
            <a class="wj-header-menu__item" @click="home()">Página inicial</a>
            <a class="wj-header-menu__item" :class="item.name" v-for="(item,index) in items[0]" :key="index">
                {{item.name}}

            </a>
            <a class="wj-header-menu__item">Contato</a>
            <!--  -->

        </div>

        <!-- MENU MOBILE -->
        <div class="wj-header-menu" v-show="mobile"
         v-bind:style="
                [{ 
                    transform: menuMobile == false ?  'translateY(-10%)':'translateY(0)'
                    
                },
                {
                    opacity: menuMobile == false ?  '0':'1'
                },
                {
                    height: menuMobile == false ?  '0':'auto'
                },
                {
                    visibility: menuMobile == false ?  'hidden':'visible'
                }]" 
            > 
                
            <!-- TRANSFORMAR EM UL -->
            <a class="wj-header-menu__item" @click="home(), menuMobile=!menuMobile">Página inicial</a>
            <a class="wj-header-menu__item" @click='handleClick(item.path)' :class="item.name" v-for="(item,index) in items[0]" :key="index">
                {{item.name}}


            </a>
            <a class="wj-header-menu__item">Contato</a>
            <!--  -->
        </div>
    </header>
  
</template>

<script>
import axios from 'axios'

export default {
    name: 'cabecalho',
    data(){
        return{
            url :'http://localhost:8888/api/V1/categories/list',

            mobile: window.innerWidth < 768,
            menuMobile: false,
            items:[],
            item:{
                id:'',
                name:'',
                path:''

            }
        }
    },
    //RENDER MENU   
    created(){
        this.getMenu()
    },
    methods:{
        getMenu(){
            axios.get(this.url)
            .then( (res) => { 
                this.items.push(res.data.items)
                //console.log(res.data.items,'teste')
            })
        },
        handleClick(path){
           this.$router.replace(`/${path}`)
        }
    }


}

</script>

<style lang="scss">

    /* criar variáveis  */
    .wj-account{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background:black;
        font-size:12px;
        color:white;
        box-shadow: 300px 0 0 #000, 600px 0 0 #000, -300px 0 0 #000, -600px 0 0 #000;
        @media (max-width:1024px){
            padding: 0 1rem;
            z-index: 9999;
        }
        @media (max-width:320px){
            justify-content: center
        }
        &__access, &__create{
            text-decoration:underline;
            color:white;
            text-transform: capitalize;
            font-weight: bold;
            margin: 5px 5px;
        }
        &__create{
            margin-right: 0;
        }
    }
    .wj-header-body{
        min-height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width:1024px){
                padding: 0 1rem;
                z-index: 9999;
        }
        &__hamburguer{
            transform: scale(.7);
        }
        &__search{
            display: flex;
            justify-content: center;
            align-items: center;
            input{
                outline: none;
                border: 1px solid;
                border-right: 1px solid transparent;
                height: 30px;
                width: 300px;
            }
            button{
                outline: none;
                background: #cc0d1f;
                border: 1px solid #cc0d1f;
                text-transform: uppercase;
                font-weight: bolder;
                color:white;
                height: 34px;
                width:95px
            }
        }
        
    }
    .wj-header-menu{
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background:#cc0d1f;
        box-shadow: 300px 0 0 #cc0d1f, 600px 0 0 #cc0d1f, -300px 0 0 #cc0d1f, -600px 0 0 #cc0d1f;
        //font-family: "Open Sans - Extrabold"!important;
        text-transform: uppercase;
        @media (max-width:1024px){
                padding: 0 1rem;
        }
         @media (max-width:320px){
            position: fixed;
            width: 100vw;
            flex-direction: column;
            align-items: flex-start;
            transition: transform .5s ease-in-out, opacity .0s ease-in-out, visibility .1s ease-in-out;
        }
        &__item{
            margin: 1rem 2.5rem;
            font-weight: bold;
            @media (max-width:320px){
                margin-left: 5px;
                display: list-item;
                list-style-type: disc;
                list-style-position: inside;
            }
            &:first-child{
                margin-left: 0;
                white-space: nowrap;
                @media (max-width:768px){
                    margin-left: 1rem;
                }
                @media (max-width:320px){
                    margin-left: 5px;
                }
            }
        }
    }
</style>