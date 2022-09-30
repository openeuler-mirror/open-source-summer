<template>
    <div class="hardware-box" v-loading.fullscreen="loading">
        <div class="banner">
            <div class="breadcrumb" @click="to">{{i18n.compatibility.COMPATIBILITY}} \</div>
            <div class="banner-title">
                {{detailList.hardwareModel}}
            </div>
        </div>
        <div class="hardware-content">
            <div class="hardware-content-top">
                <div class="title">{{i18n.compatibility.HARDWARE_DETAIL.TITLE_1}}</div>
                <div class="link">
                    <a :href="detailList.productInformation" target="_blank">{{detailList.productInformation}}</a>
                </div>
            </div>
            <div class="hardware-content-middle">
                <div class="title">{{i18n.compatibility.HARDWARE_DETAIL.TITLE_2}}</div>
                <div class="content">
                    <div class="content-box">
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.OS}}</span>
                            <span class="content-item">{{detailList.osVersion}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.VENDOR}}</span>
                            <span class="content-item">{{detailList.hardwareFactory}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.TEST_TIME}}</span>
                            <span class="content-item">{{detailList.date}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.COMMIT_ID}}</span>
                            <span class="content-item">{{detailList.commitID}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.ARCHITECTURE}}</span>
                            <span class="content-item">{{detailList.architecture}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.MOTHER_BOARD_REVISION}}</span>
                            <span class="content-item">{{detailList.motherBoardRevision}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.BIOS_UEFI}}</span>
                            <span class="content-item">{{detailList.biosUefi}}</span>
                        </p>
                    </div>
                    <div class="content-box">
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.CPU}}</span>
                            <span class="content-item">{{detailList.cpu}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.RAM}}</span>
                            <span class="content-item">{{detailList.ram}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.PORTS_AND_BUS_TYPES}}</span>
                            <span class="content-item">{{detailList.portsBusTypes}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.VIDEO_ADAPTER}}</span>
                            <span class="content-item">{{detailList.videoAdapter}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.HOST_BUS_ADAPTER}}</span>
                            <span class="content-item">{{detailList.hostBusAdapter}}</span>
                        </p>
                        <p>
                            <span class="label">{{i18n.compatibility.HARDWARE_DETAIL.LABELS.HARD_DISK_DRIVE}}</span>
                            <span class="content-item">{{detailList.hardDiskDrive}}</span>
                        </p>
                    </div>
                </div>
                <div class="download">
                    {{i18n.compatibility.HARDWARE_DETAIL.TIP_LABEL}}
                    <a href="/openEuler-compatibility.pdf" download="openEuler兼容性策略介绍.pdf" :class="$lang === 'en' ? 'download-link-en' : ''">
                        {{i18n.compatibility.HARDWARE_DETAIL.TIP_LINK}}
                    </a>
                </div>
            </div>
            <div class="hardware-content-bottom">
                <div class="title">{{i18n.compatibility.HARDWARE_DETAIL.TITLE_3}}</div>
                <div class="table-pc">
                     <el-table
                        v-loading.fullscreen="tableLoading"
                        class="drive-table"
                        :data="tableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="driverName" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_NAME" width="160"></el-table-column>
                        <el-table-column prop="version" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.VERSION"  width="160"></el-table-column>
                        <el-table-column prop="type" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.TYPE" width="160" ></el-table-column>
                        <el-table-column prop="driverDate" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_DATE" width="160"></el-table-column>
                        <el-table-column prop="chipVendor" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_CHIP_VENDOR" width="160"></el-table-column>
                        <el-table-column prop="boardModel" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_BOARD_MODEL" width="160"></el-table-column>
                        <el-table-column prop="chipModel" :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_CHIP_MODEL" width="160"></el-table-column>
                    </el-table>
                </div>
                <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                    <li class="item" v-for="(item, index) in tableData" :key="index">
                    <ul>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_NAME}}:</span>
                            {{item.driverName}}
                        </li>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.VERSION}}:</span>
                            {{item.version}}
                        </li>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.TYPE}}:</span>
                            {{item.type}}
                        </li>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_DATE}}:</span>
                            {{item.driverDate}}
                        </li>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_CHIP_VENDOR}}:</span>
                            {{item.chipVendor}}
                        </li>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_BOARD_MODEL}}:</span>
                            {{item.boardModel}}
                        </li>
                        <li>
                            <span>{{i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_BOARD_MODEL}}:</span>
                            {{item.chipModel}}
                        </li>
                    </ul>
                    </li>
                </ul>
                <div class="download">
                    {{i18n.compatibility.HARDWARE_DETAIL.TIP_LABEL}}
                    <a href="/openEuler-compatibility.pdf" download="openEuler兼容性策略介绍.pdf" :class="$lang === 'en' ? 'download-link-en' : ''">
                        {{i18n.compatibility.HARDWARE_DETAIL.TIP_LINK}}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { detailList,  detailAapterList} from "../../api/compatibility"

let that = null;
const locationMethods = {
    getDetail (id) {
        that.tableLoading = true;
         // 详情
        detailList({id: id})
        .then(response => {
            if(response) {
                that.tableLoading = false;
                if(response) {
                    that.detailList = response;
                }
            }
        })
        .catch(err => {
            that.tableLoading = false;
        });

        // 详情-表格
        detailAapterList({id: id})
        .then(response => {
            if(response) {
                that.tableLoading = false;
                if(response) {
                    that.tableData = response;
                }
            }
        })
        .catch(err => {
            that.tableLoading = false;
        });
    }
}

export default {
    data() {
        that = this;
        return {
            loading: false,
            tableLoading: false,
            detailList: [],
            tableData: []
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        let id = this.$route.query.id;
        locationMethods.getDetail(id);
    },
    methods: {
        to () {
            this.$router.push({
                path: this.resolvePath('/compatibility/')
            })
        },
    },
};
</script>

<style lang="less" scoped>
.hardware-box {
    .banner {
        width: 1120px;
        margin: 0 auto;
        .breadcrumb {
            margin-top: 34px;
            margin-bottom: 16px;
            font-size: 20px;
            color: #002fa7;
            line-height: 30px;
            cursor: pointer;
        }
        .banner-title {
            font-size: 36px;
            line-height: 46px;
            margin-bottom: 104px;
            color: #000;
        }
    }
    .hardware-content {
        width: 1120px;
        margin: 0 auto 200px;
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        line-height: 26px;
        a{
            text-decoration: none;
            color: #002fa7;
        }
        .hardware-content-top {
            .title{
                font-size: 24px;
                color:#000;
                margin-bottom: 20px;
                line-height: 34px;
            }
        }
        .hardware-content-middle {
            margin: 40px 0 ;
            .title{
                font-size: 24px;
                color:#000;
                margin-bottom: 20px;
                line-height: 34px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            }
            .content{
                display: flex;
                justify-content: space-between;
                .content-box {
                    width: 46%;
                    p {
                        display: flex;
                        align-items:flex-start;
                        justify-content: left;
                        padding-bottom: 20px;
                        color: rgba(0, 0, 0, 0.85);
                        .label {
                            width: 40%;
                            color: rgba(0, 0, 0, 0.5);
                        }
                        .content-item {
                            width: 60%;
                        }
                    }
                }
            }
            .download{
                line-height: 26px;
                .download-link-en {
                    font-style: italic;
                }
            }
        }
        .hardware-content-bottom {
            .title{
                font-size: 24px;
                color:#000;
                margin-bottom: 20px;
                line-height: 34px;
            }
            .download{
                margin-top: 20px;
                line-height: 26px;
                .download-link-en {
                    font-style: italic;
                }
            }
            .table-mobile {
                line-height: 16px;
                display: none;
                width: 100%;
                font-size: 12px;
                .item {
                    padding: 20px;
                    &:nth-child(odd) {
                        background-color: rgba(0, 0, 0, 0.05);
                    }
                    li {
                        margin-bottom: 12px;
                        color: rgba(0, 0, 0, 0.5);
                        word-break: break-all;
                        span {
                            color: #000;
                            margin-right: 4px;
                        }
                    }
                    li:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    /deep/ .el-table {
        color: rgba(0, 0, 0, 0.85);
    }
    /deep/ .el-table thead {
        color: #000;
        font-size: 16px;
    }
    /deep/ .el-table th {
        background-color: rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background-color: rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-table td,
    /deep/ .el-table th {
        padding: 31px 0;
    }
}

@media (max-width: 1000px) {
.hardware-box {
    .banner {
        width: 100%;
        padding-left:30px;
        padding-right: 30px;
        .breadcrumb {
            display: none;
        }
        .banner-title {
            width: 100%;
            font-size: 24px;
            margin: 40px 0 30px 0;
        }
    }
    .hardware-content {
        width: 100%;
        padding-left: 30px;
        padding-right: 30px;
        margin-bottom: 80px;
        font-size: 14px;
        line-height: 24px;
        .hardware-content-top {
            .title {
                font-size: 14px;
                line-height: 24px;
                font-weight: 400;
            }
        }
        .hardware-content-middle {
            .title {
                font-size: 14px;
                line-height: 24px;
                font-weight: 400;
            }
            .content{
                display: block;
                .content-box {
                    width: 100%;
                }
            }
        }
        .hardware-content-bottom {
            .title {
                font-size: 14px;
                line-height: 24px;
                font-weight: 400;
            }
            .table-pc {
                display: none;
            }
            .table-mobile {
                display: block;
            }
        }
    }
}
}

</style>
