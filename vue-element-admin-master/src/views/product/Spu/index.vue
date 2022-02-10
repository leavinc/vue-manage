<template>
  <div>
      <el-card style="margin:10px 0px">
          <CategorySelect @getCategoryId = 'getCategoryId' :show='!isShowTable'></CategorySelect>
      </el-card>
      <el-card>
          <div>
              <!-- spu列表 -->
              <el-button type="primary" icon='el-icon-plus'>添加SPU</el-button>

              <el-table
                  border
                  style="width: 100%">
                  <el-table-column
                      prop="prop"
                      label="序号"
                      width="80px">
                  </el-table-column>

                  <el-table-column
                      prop="prop"
                      label="spu"
                      width="width">
                  </el-table-column>

                  <el-table-column
                      prop="prop"
                      label="spu描述"
                      width="width">
                  </el-table-column>

                  <el-table-column
                      prop="prop"
                      label="操作"
                      width="width">
                      <template slot-scope="{row}">
                          <el-button type="success" size='mini' icon='el-icon-plus'></el-button>
                          <el-button type="warning" size='mini' icon='el-icon-edit'></el-button>
                          <el-button type="info" size='mini' icon='el-icon-warning'></el-button>
                          <el-button type="danger" size='mini' icon='el-icon-delete'></el-button>
                      </template>
                  </el-table-column>
              </el-table>

              <el-pagination
                style="margin-top:20px;text-align:center" 
                :current-page="1"
                :page-sizes="[3, 5, 10]"
                :page-size="3"
                layout=" prev, pager, next, jumper,->,sizes,total"
                :total="30">
              </el-pagination>
          </div>
      </el-card>
  </div>
</template>

<script>
    export default {
        name:'Spu',
        data() {
            return {
                cid:{},
                isShowTable:true,
                page:1,
                limit:3,
                // spu列表数据
                records:[]

            }
        },
        mounted() {
            
        },
        methods: {
            // 获取子组件三级分类id
            getCategoryId(c){
                this.cid = {...this.cid,...c}
                this.getSpuList()
                
            },
            // 获取spu列表
            getSpuList(){
                const {page,limit} = this
                const id = this.cid.category3Id
                this.$store.dispatch('spu/getSpuList',{page,limit,id})
            }
        },
    }
</script>

<style>

</style>