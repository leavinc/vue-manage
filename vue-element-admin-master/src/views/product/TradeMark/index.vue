<template>
  <div>
      <el-button type="primary" icon='el-icon-plus' style="margin:10px 0px" @click="showDialog">添加</el-button>
        <!-- 表单 -->
      <el-table
          border
          style="width: 100%"
          :data='tradeInfo.records'>
          <el-table-column
              prop="prop"
              label="序号"
              align='center'
              width="100px"
              type='index'>
          </el-table-column>

          <el-table-column
              prop="tmName"
              label="品牌"
              align='center'
              width="width">
          </el-table-column>

          <el-table-column
              prop="prop"
              label="LOGO"
              align='center'
              width="width">
              <template slot-scope="{row}">
                  <img :src="row.logoUrl" style="width:50px;height:50px">
              </template>
          </el-table-column>

          <el-table-column
              prop="prop"
              label="操作"
              align='center'
              width="width">
              <template slot-scope="{row}">
                <el-button type="warning" icon='el-icon-edit' size='mini' @click="updateTradeMark(row)">修改</el-button>
                <el-button type="danger" icon='el-icon-delete' size='mini' @click="deleteTrade(row.id)">删除</el-button>
                  
              </template>
          </el-table-column>

      </el-table>

      <!-- 分页器 -->
      <!-- 
          layout指定分页器需要的组件，->可以让组件直接呈现在最右边
       -->
          <el-pagination
               style="margin-top:20px;text-align:center" 
              :current-page="page"
              :page-sizes="[3, 5, 10]"
              :page-size="limit"
              layout=" prev, pager, next, jumper,->,total, sizes"
              :total="tradeInfo.total"
              @current-change='currentChange'
              @size-change='sizeChange'>
          </el-pagination>

        <!-- 添加对话框 
            visible.sync    会话框是否显示
        -->
        <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
            <!-- :model  收集表单的数据 
                 :rules 表单验证规则
                 ref    获取节点
            -->
            <el-form :model="tradeForm" :rules="rules" ref="ruleForm">
                <el-form-item label="品牌名称" label-width="100px" prop='tmName'>
                <el-input  autocomplete="off" v-model="tradeForm.tmName"></el-input>
                </el-form-item>

                <el-form-item label="品牌LOGO" label-width="100px" prop='logoUrl'>
                    <!-- action  设置图片上传的地址 -->
                <el-upload
                    class="avatar-uploader"
                    action="dev-api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">

                    <img v-if="tradeForm.logoUrl" :src="tradeForm.logoUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
                </el-upload>    
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTrade">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name:'TradeMark',
        data() {
            // 自定义校验规则函数
            return {
                page:1,
                limit:3,
                // 对话框显示与隐藏
                dialogFormVisible:false,
                // 表单数据
                tradeForm:{
                    tmName:'',
                    logoUrl:''
                },
                // Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
                rules:{
                    tmName: [
                        { required: true, message: '请输入品牌名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
                    ],
                    logoUrl: [
                        { required: true, message: '请选择LOGO',trigger:'blur'}
                    ],
                }
            }
        },
        mounted() {
            this.getTradeMark()
            
            
        },
        computed:{
            ...mapState({
                tradeInfo: (state) => {
                    console.log(state.trademark.tradeInfo)
                  return state.trademark.tradeInfo
                }
                
                
            })
        },
        methods: {
            // 获取品牌列表
            async getTradeMark(){
                const {page,limit} = this
                try {
                    let result = await this.$store.dispatch('trademark/getTradeMark',{page,limit})
                    // 如果删除之后当前页没有数据，则获取上一页数据呈现
                    if(result.records.length === 0 && this.page>1){
                        let page = this.page-1
                        await this.$store.dispatch('trademark/getTradeMark',{page,limit})
                    }
                } catch (error) {
                    alert(error.message)
                }

            },
            // 修改当前页
            currentChange(pager){
                this.page= pager
                this,this.getTradeMark()
            },
            // 修改每页容量
            sizeChange(limit){
                this.limit = limit
                this.getTradeMark()
            },
            // 添加会话框
            showDialog(){
                this.dialogFormVisible = true
                this.tradeForm = {tmName:'',logoUrl:''}
            },
            // 修改会话框
            updateTradeMark(row){
                console.log(row)
                this.dialogFormVisible = true
                // 拷贝
                this.tradeForm = {...row}
            },
            // 添加或修改品牌
            addOrUpdateTrade(){
                
                // 表单验证
                this.$refs.ruleForm.validate(async (valid) => {
                    if (valid) {
                        this.dialogFormVisible = false
                        let result =  await this.$store.dispatch('trademark/saveTradeMark',this.tradeForm)
                        if(result.code === 200){
                            this.$message(this.tradeForm.id?{
                                message: '修改品牌成功',
                                type: 'success'
                            }:{
                                message:'添加品牌成功',
                                type:'success'
                            })
                            this.getTradeMark()
                        }
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            
            },
            // 删除品牌
            deleteTrade(id){

                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    
                    let result = await this.$store.dispatch('trademark/deleteTrade',id)
                    if(result.code === 200){
                        this.getTradeMark()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });

                
            },
            // 上传图片成功
             handleAvatarSuccess(res, file) {
                //  res是上传成功后服务器返回的在服务器上的图片地址
                // 收集品牌图片
                this.tradeForm.logoUrl = res.data
            },
            // 判断上传图片格式
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
            

        },
        
    }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>