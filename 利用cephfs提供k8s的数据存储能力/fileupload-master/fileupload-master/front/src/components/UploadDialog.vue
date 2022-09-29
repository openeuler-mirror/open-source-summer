<template>
<!-- 上传文件弹窗组件 -->
    <el-dialog title="文件上传弹窗" :visible.sync="visible" width="800px" @close="close">
        <div class="upload-dialog-main">
            <!-- 拖拽框部分，内部是一个el-upload组件 -->
            <div class="upload-block">
                <el-upload
                    class="fileUploadBtn"
                    drag
                    action=""
                    :on-change="handleChange"
                    :auto-upload='false'
                    :show-file-list="false"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
            <!-- 这个是右侧的上传文件列表 -->
            <div class="upload-filelist">
                <!-- v-for 表示循环，因为有多个文件，一次循环表示一个右侧的文件元素块 -->
                <div v-for="(item, index) in filelist" :key="item.uid" class="filelist-item">
                    <!-- 文件信息，如文件名，图标等 -->
                    <div class="filelist-item-right">
                        <div class="filelist-item-info">
                            <!-- {{}} 是vue模板语法，表示这部分内容由动态渲染生成，如这里表示filelist每次循环的item对象中的name属性 -->
                            <span class="filelist-item-name">{{item.name}}</span>
                            <div class="filelist-item-status">
                                <el-tooltip class="item" effect="dark" :content="item.errorMsg" placement="top-end">
                                    <!-- :class 表示这个属性它也是动态的，这里根据文件上传状态，设置class为 el-icon-s-promotion 或 el-icon-loading 等 -->
                                    <i :class="'el-icon-' + ['s-promotion', 'loading', 'success', 'error'][item.processStatus]"></i>
                                </el-tooltip>
                            </div>
                        </div>
                        <!-- 进度条组件 -->
                        <div class="process">
                            <el-progress
                                :stroke-width="4"
                                :percentage="item.processStatus === 0 ? 0 : item.processStatus === 1 ? 50 : 100"
                                :color="item.processStatus === 3 ? 'rgb(251 28 10)' : '#1E6FFF'"
                                :show-text="false">
                            </el-progress>
                        </div>
                    </div>
                    <div class="filelist-item-left" @click="deleteFile(item, index)">
                        <i class="el-icon-delete-solid"></i>
                    </div>
                </div>
                <!-- v-if 用以判断这个元素块内容是不是需要生成，这里根据filelist长度判断是不是需要显示"暂无待上传文件列表" -->
                <div v-if="filelist.length === 0" class="non-file">
                    暂无待上传文件列表
                </div>
            </div>
        </div>
        <!-- 弹窗底部，连个按钮，都是el-button组件 -->
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="filelist = []">清空所有</el-button>
            <el-button type="primary" @click="submit">开始上传</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            // 弹窗是否可见
            visible: false,
            // 文件列表
            filelist: []
        }
    },
    methods: {
        // 显示弹窗
        show () {
            this.reset()
            this.visible = true
        },
        // 文件上传，拖拽框触发该函数，将传入文件信息存入filelist数组
        handleChange(file) {
            // 因为覆盖了原上传函数，导致file.status变为fail也会触发，导致触发两次，因此需要这一行拦截
            if (file.status !== 'ready') return;
            console.log(file)
            this.filelist.push({
                ...file,
                processStatus: 0,
                errorMsg: '等待上传'
            })
        },
        // 上传函数
        submit () {
            console.log(this.filelist)
            // 遍历filelist每个对象-fileItem
            const promiselist = this.filelist.map(fileItem => {
                // 生成FormData对象
                let formData = new FormData()
                // 从fileItem中解构赋值
                const { uid, raw, name, size } = fileItem
                // 存入formData对象
                formData.append('uid', uid)
                formData.append('file', raw)
                formData.append('name', name)
                formData.append('size', size)
                // 找到filelist中的对应的文件,修改其上传状态
                let currentFile = this.filelist.find(item => item.uid === uid)
                currentFile.processStatus = 1
                currentFile.errorMsg = '正在上传'
                console.log('uid', formData.get('uid'))
                // 返回一个promise承诺,这个承诺表示接口请求,uploadFile对应api文件夹中uploadfile.js中的内容
                // .then表示承诺成功完成, .catch表示承诺失败完成
                // 这是一个异步操作,他会一直等待直到完成
                return this.$api.uploadFile(formData).then(res => {
                    fileItem.processStatus = 2
                    fileItem.errorMsg = res.error_msg || '上传成功'
                }).catch(err => {
                    fileItem.processStatus = 3
                    fileItem.errorMsg = (err.error_msg) || '上传失败'
                })
            })
            // .map()函数意思为遍历数组的每个元素,通过计算生成一个新元素,类似于离散的函数映射关系
            // 如 [1,2,3].map(number => number += 1) == [2,3,4]

            // 将promiselist传入,当数组中所有承诺promise完成后触发.then或.catch
            Promise.all(promiselist).then(() => {
                this.$message.success('所有文件已上传成功')
            }).catch(() => {
                this.$message.success('存在文件上传失败')
            })
        },
        // 从文件列表中删除
        deleteFile (file, index) {
            if (file.processStatus !== 0) {
                this.$message.error('当前文件正在上传或以处理完毕，无法删除')
                return
            } else {
                // 数组删除(裁剪)
                this.filelist.splice(index, 1)
            }
        },
        // 清空文件列表
        reset () {
            this.filelist = []
        },
        // 这个弹窗是一个组件,当触发close函数时,向外冒泡一个事件close,用于父级组件函数触发
        // 如如组件中 UploadDialog的某个属性设置为 @close="dialogClose", 则这个函数触发时,会触发父组件的dialogClose
        close () {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" src="@/scss/fileUploadDialog.scss">

</style>