<template>
  <div id="fileUpload">
    <div class="fileUpload-header">
      <!-- 搜索条件 -->
      <div class="search">
        <span class="label">文件名</span>
        <el-input v-model="fileName" class="filename" placeholder="请输入内容" size="small"></el-input>
        <span class="label">上传时间</span>
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          size="small"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </div>
      <!-- 上传按钮 -->
      <div class="upload">
        <el-button type="primary" @click="upload">上传文件</el-button>
      </div>
    </div>
    <!-- 数据展示部分 -->
    <div class="table-info">
      <span>文件列表</span>
      <div class="changePagenation">
        <el-switch
          v-model="isShowPagination"
          active-text="分页展示"
          inactive-text="不分页展示">
        </el-switch>
      </div>
    </div>
    <div class="fileUpload-table" :class="isShowPagination ? 'with-pagination' : ''">
      <!-- 表格组件 -->
      <el-table
        size="mini"
        :data="isShowPagination ? currentTableData : filterTableData"
        stripe
        height="100%"
        style="width: 100%;"
      >        
        <el-table-column
          prop="name"
          width="500"
          label="文件名">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="filetype"
          label="文件类型">
        </el-table-column>
        <el-table-column
          prop="size"
          label="文件大小">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope"> 
              <div class="operation">
                <el-button
                  @click.native.prevent="download(scope.row)"
                  type="text"
                  size="small">
                  下载
                </el-button>
                <el-button
                  @click.native.prevent="deleteFile(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="isShowPagination" class="pagination">
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 文件上传弹窗组件 -->
    <UploadDialog ref="uploadDialog" @close="dialogClose" />
  </div>
</template>

<script>
// 引入文件上传弹窗组件
import UploadDialog from '../components/UploadDialog.vue';
export default {
  name: 'FileUpload',
  // 注册该组件
  components: {
    UploadDialog
  },
  data () {
    return {
      // 文件名搜索内容
      fileName: '',
      // 时间范围搜索内容
      timeRange: [],
      // 配置时间选择组件的一些内容,可以无视
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // 表格数据数组
      tableData: [
      ],
      // 分页大小
      pageSize: 10,
      // 当前页
      currentPage: 1,
      // 是否显示分页
      isShowPagination: true
    }
  },
  // 计算属性
  computed: {
    // 根据搜索内容过滤后的数据
    filterTableData () {
      // filter过滤函数,内部箭头函数计算所得为true的留下
      return this.tableData.filter(row => {
        // 遍历每一行(每个文件),其上传时间转化为时间戳
        const fileUploadTimeStr = new Date(row.create_time).getTime()
        // 文件名过滤
        return (!this.fileName || row.name.indexOf(this.fileName) > -1)
        // 时间过滤,根据时间戳大小比较
          && (this.timeRange.length === 0 || (this.timeRange[0].getTime() < fileUploadTimeStr && fileUploadTimeStr < this.timeRange[1].getTime()))
      })
    },
    // 过滤后的数据总量
    total () {
      return this.filterTableData.length
    },
    // 过滤后数据的当前页内容,绑定在表格组件中
    currentTableData () {
      console.log(this.pageSize * this.currentPage)
      return this.pageSize * this.currentPage > (this.total + 1)
        ? this.filterTableData.slice(this.pageSize * (this.currentPage - 1))
        : this.filterTableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
    }
  },
  methods: {
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 显示弹窗组件
    upload () {
      this.$refs.uploadDialog.show()
    },
    // 搜索文件列表
    searchFileList () {
      // 发一个搜索请求
      this.$api.searchFileList().then(res => {
        // 成功后将返回内容,赋值到tableData中
        this.tableData = res.data.filelist
      })
    },
    // 下载
    download (row) {
      // 创造一个a标签,设置其url值,触发点击下载,移除该a标签
      let a = document.createElement("a")
      a.style.display="none"
      a.href= row.url
      a.setAttribute("download",row.name)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    // 发一个删除请求
    deleteFile (row) {
      const id = row.id
      this.$api.deleteFile({ id }).then(res => {
        if (res.error_code === 0) {
          this.$message.success('删除成功')
          this.searchFileList()
        }
      })
    },
    dialogClose () {
      // 弹窗关闭后向后端进行查询一次文件列表
      this.searchFileList()
    }
  },
  // 生命周期中的一个阶段,可以理解为页面刚生成时触发了一个这个文件查询函数
  mounted () {
    this.searchFileList()
  }
}
</script>

<style lang="scss" scoped src="@/scss/fileUpload.scss"></style>
