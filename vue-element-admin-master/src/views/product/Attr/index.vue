<template>
  <div>
      <el-card style="margin:10px 0px">
          <CategorySelect @getCategoryId = 'getCategoryId' :show='!isShowTable'></CategorySelect>
      </el-card>

      <el-card>
          <!-- 商品属性展示 -->
          <div v-show="isShowTable">
            <el-button type="primary" icon='el-icon-plus' :disabled="!cid.category3Id"  @click="addAttr">添加属性</el-button>

            <el-table
                border
                :data="Info"
                style="width: 100%;margin:10px 0px">
                <el-table-column
                    prop="prop"
                    label="序号"
                    align='center'
                    type='index'
                    width="80px">
                </el-table-column>

                <el-table-column
                    prop="attrName"
                    label="属性"
                    align='center'
                    width="150px">
                </el-table-column>

                <el-table-column
                    prop="prop"
                    label="属性值"
                    align='center'
                    width="width">
                    <template slot-scope="{row}">
                        <el-tag type="success" v-for="(attr) in row.attrValueList" :key="attr.id" style="margin:0px 20px">{{attr.valueName}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="prop"
                    label="操作"
                    align='center'
                    width="150px">
                    <template slot-scope="{row,$index}">
                        <el-button type="warning" icon='el-icon-edit' size='mini' @click="changeAttr(row,$index)"></el-button>
                        <el-button type="danger" icon='el-icon-delete' size='mini'></el-button>
                    </template>
                </el-table-column>
            </el-table>
          </div>

          <!-- 添加属性 -->
          <div v-show="!isShowTable">
              
            <el-form :inline="true" ref="form" :model="attrInfo" label-width="80px">
                <el-form-item label="属性名">
                    <el-input placeholder="请输入属性名" v-model="attrInfo.attrName" ></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" icon='el-icon-plus' :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
            <el-button @click="isShowTable=true" >取消</el-button>

            <el-table
                border
                :data='attrInfo.attrValueList'
                style="width: 100%;margin:20px 0px">
                <el-table-column
                    prop="prop"
                    label="序号"
                    type='index'
                    align='center'
                    width="80px">
                </el-table-column>

                <el-table-column
                    prop="prop"
                    label="属性值名称"
                    align='center'
                    width="width">
                    <template slot-scope="{row,$index}">
                        <el-input v-model="row.valueName" placeholder="请输入属性值" size='mini' v-if="row.flag" @blur="toLook(row,$index)" :ref="$index"></el-input>
                        <span v-else @click="toEdit(row,$index)">{{row.valueName}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="prop"
                    label="操作"
                    align='center'
                    width="width">
                    <template slot-scope="{row,$index}">

                        <el-popconfirm
                            @onConfirm="deleteAttrValue($index)"
                            :title="`确定删除${row.valueName}吗?`">
                            <el-button type="danger" icon='el-icon-delete' slot="reference"></el-button>
                        </el-popconfirm>
                        
                    </template>
                </el-table-column>
            </el-table>

            <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
              
          </div>
      </el-card>
  </div>
</template>

<script>
    // 引入lodash深拷贝
    import cloneDeep from 'lodash/cloneDeep'
    export default {
        name:'Attr',
        data() {
            return {
                cid:{},
                // 商品属性
                Info:[],
                isShowTable:true,
                // 收集或修改新增属性
                // 对象存储属性是无序的，不能在一个对象内从一个属性获取另一个属性值
                attrInfo:{
                    attrName:'',
                    attrValueList:[
                        
                    ],
                    categoryId:'',
                    categoryLevel:3,

                }
            }
        },
        mounted() {
            
        },
        methods: {
            // 获取子组件三级分类id
            getCategoryId(c){
                this.cid = {...this.cid,...c}
                this.getInfo()
            },
            // 获取平台属性
            async getInfo(){
                let result = await this.$store.dispatch('attr/getTradeInfo',this.cid)
                console.log(result)
                if(result.code === 200){
                    this.Info = result.data
                }
            },
            // 添加属性
            addAttr(){
                this.isShowTable = false,
                this.attrInfo={
                    attrName:'',
                    attrValueList:[
                        
                    ],
                    categoryId:this.cid.category3Id,
                    categoryLevel:3,
                }
            },
            // 添加属性值
            addAttrValue(){
                this.attrInfo.attrValueList.push({
                    attrId:this.attrInfo.id,
                    valueName:'',
                    flag:true
                })
                this.$nextTick(()=>{
                    this.$refs[this.attrInfo.attrValueList.length-1].focus()
                })
            },
            // 修改属性
            changeAttr(row,index){
                this.isShowTable = false
                // row中的数据是从Info中获取的，这里的赋值是对象的引用，不是单纯数据的赋值，attrInfo中的数据是引用的Info中的数据，当我们修改attrInfo中的个数据，Info中的数据也会改变
                // 平常的引用数据赋值，采用的是浅拷贝，引用数据类型，数据存放在堆内存中，栈内存存放指针指向堆内存中的数据，浅拷贝只复制指针，所以数据如果修改，会根据指针到堆内存中将数据也修改
                // 深拷贝则会将堆内存中的数据也拷贝一份，这样与原数据是分开的，是不同的数据，只是内容一样，此时修改则不会影响原数据
                // 我们可以引入lodash中的深拷贝函数，这样修改属性的页面数据的修改就不会影响到原数据  
                this.attrInfo = cloneDeep(row)
                this.attrInfo.attrValueList.forEach(element => {
                    // 为对象添加属性，直接添加不是响应式的，使用$set添加响应式属性
                    this.$set(element,'flag',false)
                })
            },
            // 删除属性值
            // 最新版本气泡弹窗回调事件是 @confirm
            deleteAttrValue(index){
                // 从index项开始删除数组中的一个元素
                this.attrInfo.attrValueList.splice(index,1)
            },
            // 查看属性值
            toLook(row,index){
                // 判断输入是否为空
                if(row.valueName !== ''){
                    // 判断输入是否重复
                    let isRep = this.attrInfo.attrValueList.some(item=>{
                        // 将自身与其他属性值对比，重复了返回true
                        if(row!=item){
                            return row.valueName === item.valueName
                        }
                    })
                    if(!isRep){
                        row.flag = false
                    }else{
                        this.$message({
                        type: 'warning',
                        message: '输入重复！'
                    })
                    }
                }else{
                    // 输入为空，则直接消除输入框
                    this.attrInfo.attrValueList.splice(index,1)
                    this.$message({
                        type: 'warning',
                        message: '未输入属性值！'
                    })
                }
            },
            // 编辑属性值
            toEdit(row,index){
                row.flag = true
                // 使用v-if，我们从查看状态切换至编辑状态，DOM节点需要时间去渲染，我们无法第一时间获取到DOM节点
                // $nextTick，当节点渲染完毕，再执行
                this.$nextTick(()=>{
                    this.$refs[index].focus()
                })
            },
            // 添加或者修改商品属性
            async addOrUpdateAttr(){
                // 整理数据
                this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
                    delete item.flag
                    return true
                })
                try {
                    await this.$store.dispatch('attr/addOrUpdateInfo',this.attrInfo)
                    this.$message({
                        type: 'success',
                        message: '保存成功！'
                    })
                    this.isShowTable = true
                    this.getInfo()
                } catch (error) {
                    this.$message.error('保存失败');
                }
                
                
            }

        },
    }
</script>

<style>

</style>