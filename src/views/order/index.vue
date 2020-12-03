<template>

  <div class="orderlist">

   <div class="search">
     <nut-searchbar
       v-model="searchdata.name"
       placeText="请输入搜索昵称"
     ></nut-searchbar>
     <nut-cell
       :show-icon="true"
       title="请选择状态"
       :desc="searchdata.state"
       @click.native="openSwitch('isVisible3')">
     </nut-cell>
     <nut-picker
       :is-visible="isVisiblesearch1"
       :list-data="config.status"
       title="请选择状态"
       @close="closeSwitch('isVisiblesearch1')"
       @confirm="confirm1"
     ></nut-picker>

   </div>

  </div>

</template>

<script>
  import * as config from "@/parse/jsons"
    export default {
      name: "orderlist",
      data(){
        return {
          // 搜索请求参数
          searchdata:{
            name:'',
            state:''
          },
          isVisiblesearch1: false,
          // basejson
          config:{
            status:config.agent.status
          },

        }
      },
      mounted() {
        this.defaultValueData = [this.config.status[0][3]];
      },
      methods:{
        // 搜索
        confirm1(chooseData) {
          this.searchdata.state = `${chooseData[0].value}`;
        }

      },
    }
</script>

<style scoped>

</style>
