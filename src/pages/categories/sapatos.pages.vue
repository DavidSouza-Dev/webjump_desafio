<template>
  <div class="wj-home">
      <div class="wj-home__breadcrumb"> 
            <p>Página Inicial</p> 
                > 
            <p >{{page}}</p>
      </div>
      
      <div class="wj-home__body">
          <div class="wj-home__filter">
              <h1 class="wj-home__filter--title">Filtre Por</h1>
              <p class="wj-home__filter--clear" @click="getProducts(3), buttonFilter=!buttonFilter" v-show="buttonFilter">Limpar Filtro</p>
              <!-- <h3 class="wj-home__filter--subtitle">Categorias</h3>
               -->
              <!-- <p class="wj-home__filter--category" @click="getProducts(2,'unset','unset'),buttonFilter=!buttonFilter" >Roupas</p> -->

              <h3 class="wj-home__filter--subtitle">Cores</h3>
              <div>
                <div class="wj-home__filter--color" @click="getProducts(null,'Vermelha','cor'),buttonFilter=!buttonFilter">vermelho</div>
                <div class="wj-home__filter--color" @click="getProducts(null,'Laranja','cor'),buttonFilter=!buttonFilter">Laranja</div>
                <div class="wj-home__filter--color" @click="getProducts(null,'Azul','cor'),buttonFilter=!buttonFilter">Verde</div>
              </div>
             

              <h3 class="wj-home__filter--subtitle">Tipo</h3>
              <p class="wj-home__filter--type" @click="getProducts(null,'Corrida','tipo'),buttonFilter=!buttonFilter">Corrida</p>
              <p class="wj-home__filter--type" @click="getProducts(null,'Corrida','tipo'),buttonFilter=!buttonFilter">Caminhada</p>
              <p class="wj-home__filter--type" @click="getProducts(null,'Casual','tipo'),buttonFilter=!buttonFilter">Casual</p>
              <p class="wj-home__filter--type" @click="getProducts(null,'Social','tipo')">Social</p>

          </div>
          <!-- Render Products -->
          <div class="wj-home__content">
              <h1 class="wj-home__title">{{relatedName}}</h1>
              <div class="wj-home__orderBy">
                  <form action="">
                        <label for="order">ORDERNAR POR</label>
                        <select name="order" id="order">
                            <option value="volvo">Selecione</option>
                            <option value="saab">Preço</option>
                        </select>
                    </form>
              </div>
              <div class="wj-home__products" v-for="(product,index) in products" :key="index">
                  <img :src="require(`../../public/${product.image}`)" alt="" class="wj-home__products--img">
                  <p class="wj-home__products--title">{{product.name}}</p>
                  <div class="wj-home__products--prices">
                    <p class="wj-home__products--price" v-bind:style="{ display: product.specialPrice == undefined ? 'none': 'block'}">
                        {{product.specialPrice == undefined ? '': 'R$'+product.price}}
                    </p>
                    <p class="wj-home__products--Specialprice" > 
                        {{product.price > product.specialPrice ? 'R$'+product.specialPrice: 'R$'+product.price}}
                    </p>
                  </div>
                  <!-- <p class="wj-home__products--price" >R$ {{product.price}}</p> -->
                  <button class="wj-home__products--buy">{{textBuy}}</button>
              </div>
          </div>
     </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'camisetas',
    data(){
        return{
            textBuy:'comprar',
            url :'http://localhost:8888/api/V1/categories/',
            products: [],
            /* Filter */
            filterRoupas:'2', //value 2
            filterSapatos:'3', //value 3
            filterCores:'1', //value 1
            filterType:'3', //value 3
            noFilter:3,
            buttonFilter:false,
            relatedName:'Sapatos',
            page:'Sapatos'

        }
    },
    created(){
        this.getProducts(this.noFilter,'unset','unset');
    },
    methods:{
        getProducts(value, filterValue, typeFilter){
            
            //build the initial page
            if(value == 3){
               for(var i = 1; i<=3;i++){
                
                    axios.get(this.url+i.toString())
                    .then( (res) => { 
                        this.products.push(...res.data.items)
                    })
                } 
            }

            //Build Items at Categories

            if(value == 1 && filterValue == 'camisa' && typeFilter == 'unset'){
               
                //build the initial page
                axios.get(`${ this.url+noFilter }`)
                .then( (res) => { 
                    this.products.push( ...res.data.items )
                })
               
            }
            
            /* ****************************************************************** */
                                    /* Applying Filters */
            /* ****************************************************************** */

            

            //validate args for Cloths
            if(value == 2 && filterValue == 'unset' && typeFilter == 'unset'){
               this.relatedName = 'Roupas'
               for(var i = 1; i<=value;i++){
                    axios.get(this.url+i.toString())
                    .then( (res) => { 
                    var categoryRelated = res.config.url.slice(-1);
                    if(categoryRelated == 1){
                      this.products= []
                    }
                    this.products.push(...res.data.items)//insert items each response
                    console.log(...res.data.items)
                    console.log('roupas')
                    })
                } 
            }

            //validate args for Shoes
            if(value == 3  && filterValue == 'unset' && typeFilter == 'unset'){
                this.relatedName = 'Sapatos'
                for(var i = 1; i<=value;i++){

                    axios.get(this.url+i.toString())
                    .then( (res) => { 
                        this.products= []
                        this.products.push(...res.data.items)
                    })
                } 

            }

            //validate args for Color
            if(typeFilter == 'cor'){
                this.relatedName = 'Cores'
                for(var i = 1; i<=3;i++){
                    if(i != 2){ // This selector is 
                        axios.get(this.url+i) 
                            .then( (res) => { 

                            var arrayProducts = [],
                                categoryRelated = res.config.url.slice(-1);

                            arrayProducts.push(...res.data.items); //insert items each response

                            if(categoryRelated == 1){
                                this.products = [];
                            }
                            var newArrayCondition = []
                            
                            newArrayCondition =  arrayProducts
                                .filter(
                                    a => a.filter[0].color == filterValue
                                )

                            //Test if has products
                            if(newArrayCondition.length){
                                this.products.push(
                                    arrayProducts
                                    .filter(
                                        a => a.filter[0].color == filterValue
                                    )[0]
                                )
                            }
                        })
                    }
                }
            }
            //validate args for Shoes Type
            if(typeFilter == 'tipo'){
                this.relatedName = 'Tipo'
                axios.get(`${this.url}3`)
                    .then( (res) => { 
                    var arrayProducts = [],
                        newArrayCondition = [];

                    this.products = [];
                    arrayProducts.push(...res.data.items);//insert items each response
                    
                    newArrayCondition = arrayProducts.filter(a=> a.name.match(filterValue)) 
                    //Test if has products
                    if(newArrayCondition.length){
                        //Build object for Shoes
                       for(var i = 0; i<10;i++){
                            if(arrayProducts[i].name.toLowerCase().includes(filterValue.toLowerCase().trim())){
                                this.products.push(
                                    {
                                        'id': arrayProducts[i].id,
                                        'image':arrayProducts[i].image,
                                        'name':arrayProducts[i].name, 
                                        'path':arrayProducts[i].path,
                                        'price':arrayProducts[i].price
                                    }
                                )
                            }
                        }
                    }
                    
                })
            }
            /* ****************************************************************** */
        },
    }
}
</script>

<style lang="scss">
    .wj-home{
        @media (max-width:1024px){
                padding: 0 1rem;
        }
        &__breadcrumb{
            display:flex;
            justify-content: flex-start;
            align-items: center;
            text-align: left;
            margin-bottom:10px;
            p{
              font-weight: bold;
              margin:5px;
              &:last-child{
                 color:#cc0d1f;
              }
            }
        }
        &__body{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            @media (max-width:320px) {
                flex-direction: column;
            }
        }
        &__filter{
            border: 1px solid lightgray;
            flex-basis: 20%;
            text-align: left;
            padding: 0 15px 15px 15px;
            margin-right: 15px;
            @media (max-width:320px){
                width: 256px;
            }
            &--title{
                color:#cc0d1f;
                text-transform:uppercase;
                font-weight: bold;
                font-size: 22px;
            }
            &--subtitle{
                text-transform:uppercase;
                font-weight: bold;
                color:#80bdb8;
                font-size: 16px;
                //font-size: 22px;
                ~div{/* related to colors */
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
            }
            &--clear{
                    width: 70px;
                background: lightgray;
                border-radius: 9px;
                padding: 5px;
                font-size:10px;
                font-weight: bold;
                &::after {
                    content:'\00d7'; 
                    font-size: 10px;
                    margin-left: 3px;
                }
            }
            &--category{
                display: list-item;
                list-style-type: disc;
                list-style-position: inside;
                font-size: 14px;
            }
            &--color{
                cursor: pointer;
                color:transparent;
                height:25px;
                &:nth-child(1){
                    background: #cc0d1f;
                    width: 25%;
                    border-right: 2px solid whitesmoke;
                }
                &:nth-child(2){
                    background: orange;
                    width: 25%;
                }
                &:nth-child(3){
                    background:#80bdb8;
                    width: 25%;
                    border-left: 2px solid whitesmoke;
                }
            }
            &--type{
                display: list-item;
                list-style-type: disc;
                list-style-position: inside;
            }
        }
        /**************************/
        &__content{
            flex-basis: 80%;
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            @media (max-width:320px){
                justify-content: center;
                margin-top: 2rem;
            }
        }
        &__title{
            color:#cc0d1f;
            flex-basis: 100%;
            text-align: left;
            padding-left: 7px;
            margin-top: 0;
            @media (max-width:320px){
                font-size: 1.5rem;
            }
            
        }
        &__orderBy{
            flex-basis: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 1.5rem 10px;
            border-top: 1px solid lightgray;
            border-bottom: 1px solid lightgray;
            min-height: 50px;
            text-align: right;
            @media (max-width:1024px){
                border:none;
            }
            label{
                font-weight: bolder;
                color: slategray;
                font-size: 11px;
                margin-right: 10px;
            }
            select{
                border: 1px solid lightgray;
                height: 35px;
                border-radius: 8px;
                width: 230px;
                outline:none;
                padding-left: .5rem;
                @media (max-width:1024px){
                   width:160px;
                }
            }
        }
        /**************************/
        &__products{
            text-transform: uppercase;
            height: 340px;
            width: 210px;
            margin-bottom: 3.5rem;
            
            @media (max-width:1024px){
                height: 340px;
                width: 180px;
            }
            @media (max-width:768px){
                height: 270px;
                width: 170px;
                margin-bottom: 4.5rem;
            }
            @media (max-width:320px){
                height: 235px;
                width: 135px;
                margin-bottom: 2.5rem;
            }
            //margin: 1rem;
            &--img{
                cursor: pointer;
                height: 225px;
                width: 190px;
                border:1px solid lightgray;
                @media (max-width:1024px){
                    height: 225px;
                    width: 160px;
                }  
                @media (max-width:768px){
                    height: 175px;
                    width: 150px;
                }
                @media (max-width:320px){
                    height: 140px;
                    width: 120px;
                }
            }
            &--title{
                cursor: pointer;
                font-size:14px;
                min-height: 32px;
                margin-bottom: 0;
            }
            &--prices{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 90%;
                margin: auto;
                @media (max-width:768px){
                    justify-content: flex-end;
                    flex-direction: column;
                    height: 68px;
                }
            }
            &--price{
                margin: 0px;
                text-decoration: line-through;
                color: gray;
                @media (max-width:768px){
                    margin-top: 16px;
                }
                //color:#cc0d1f;
                //font-weight:bolder;
            }
            &--Specialprice{
                //margin-left: 20px 0;
                color:#cc0d1f;
                font-weight:bolder;
                font-size: 20px;
                @media (max-width:768px){
                    margin: 8px;
                }
                
            
            }
            &--buy{
                cursor: pointer;
                border: none;
                width: 192px;
                height: 35px;
                border-radius: 5px;
                background:#80bdb8;
                border-radius: 5px;
                color: white;
                text-transform: uppercase;
                font-weight: bolder;
                @media (max-width:1024px){
                    width: 160px;
                }
                @media (max-width:768px){
                    width: 152px;
                }
                @media (max-width:320px){
                    display:none;
                    width: 122px;
                }
            }

        }
    }
        
    

    

</style>