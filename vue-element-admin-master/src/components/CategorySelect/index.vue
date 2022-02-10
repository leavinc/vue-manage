<template>
  <!-- 三级联动 -->
  <div>
      <!-- 
          :inline   行内表单，一行可以放多个表单原色
          :model    表单数据收集到cForm中
       -->
      <el-form :inline="true" class="demo-form-inline" :model="cForm">
        
        <el-form-item label="一级分类">
            <!-- v-model收集下拉选项我们选中的id存储，并呈现相应的label -->
            <el-select placeholder="请选择" v-model="cForm.category1Id" @change="getCategory2List" :disabled="show">
                <el-option :label="category1.name" :value="category1.id" v-for="(category1) in list1" :key="category1.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
            <el-select placeholder="请选择" v-model="cForm.category2Id" @change="getCategory3List" :disabled="show">
                <el-option :label="category2.name" :value="category2.id" v-for="(category2) in list2" :key="category2.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="三级分类">
            <el-select placeholder="请选择" v-model="cForm.category3Id" @change="getTradeInfo" :disabled="show">
                <el-option :label="category3.name" :value="category3.id" v-for="(category3) in list3" :key="category3.id"></el-option>
            </el-select>
        </el-form-item>
        
    </el-form>
  </div>
</template>

<script>
export default {
    name:'CategorySelect',
    data() {
        return {
            list1:[],
            list2:[],
            list3:[],
            // 获取id
            cForm:{
                category1Id:'',
                category2Id:'',
                category3Id:'',
            }
        }
    },
    props:['show'],
    mounted() {
        this.getCategory1List()
    },
    methods: {
        // 一级分类
        async getCategory1List(){
            let result = await this.$store.dispatch('attr/getCategory1List')
            if(result.code === 200){   
                this.list1 = result.data
            }
        },
        // 二级分类
        async getCategory2List(){
            this.list2 = []
            this.list3 = []
            this.cForm.category2Id = ''
            this.cForm.category3Id = ''
            let result = await this.$store.dispatch('attr/getCategory2List',this.cForm.category1Id)
            if(result.code === 200){
                this.list2 = result.data
            }
        },
        // 三级分类
        async getCategory3List(){
            this.list3 = []
            this.cForm.category3Id = ''
            let result = await this.$store.dispatch('attr/getCategory3List',this.cForm.category2Id)
            if(result.code === 200){
                this.list3 = result.data
            }
        },
        // 三级分类选择完毕展示商品属性
        getTradeInfo(){
            
            this.$emit('getCategoryId',this.cForm)
        }
    },
}
</script>

<style>

</style>