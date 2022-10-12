<template>
    <div class="mirror-all">
        <common-banner
        :pc-src="'/img/download/mirror-banner.png'"
        :mobile-src="'/img/download/mirror-banner.png'"
        :inside-name="'DOWNLOAD'"
        :outside-name="i18n.download.MIRROR_ALL.TITLE"
        ></common-banner>
        <p>
            {{ i18n.download.MIRROR_ALL.CONTENT[0] }}
            <a href="mailto:admin@openeuler.io">{{ i18n.download.MIRROR_ALL.CONTENT[1] }}</a>.
        </p>
        <div class="mirror-list" v-if="tableData.length">
            <ul class="mobile-list" v-if="isShowH5">
                <li v-for="(item,index) in tableData" :key="index">
                    <ul>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.NAME }}</span>
                            <span>{{ item.name }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.LOCATION }}</span>
                            <span>{{ item.location }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.SPONSOR }}</span>
                            <span>{{ item.sponsor }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.HTTPS }}</span>
                            <a :href="item.http">{{ item.http }}</a>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.RSNC }}</span>
                            <span class="rsnc" @click="copyText(item.rsnc)"></span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.FTP }}</span>
                            <span>{{ item.ftp }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_ALL.Mbs }}</span>
                            <span>{{ item.netband }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <el-table
                :data="tableData"
                stripe
                class="pc-list"
                style="width: 100%"
                v-else>
                <el-table-column
                class-name="mirror-name"
                width="300"
                label="Mirror Name">
                    <template slot-scope="scope">
                        <a :href="scope.row.http" target="_blank">{{ scope.row.name }}</a>
                    </template>
                </el-table-column>
                <el-table-column
                prop="location"
                label="Location">
                </el-table-column>
                <el-table-column
                label="Sponsor">
                    <template slot-scope="scope">
                        <a :href="scope.row.sponsor" target="_blank"><img :src="scope.row.sponsorLogo" /></a>
                    </template>
                </el-table-column>
                <el-table-column
                label="RSYNC">
                    <template slot-scope="scope">
                       <span v-if="scope.row.rsnc === '-'">{{ scope.row.rsnc }}</span>
                       <span @click="copyText(scope.row.rsnc)" class="rsnc" v-else></span>
                    </template>
                </el-table-column>
                <el-table-column
                show-overflow-tooltip
                prop="ftp"
                label="FTP">
                </el-table-column>
                <el-table-column
                    width="260"
                    class-name="mirror-last-row"
                    prop="netband"
                    label="NetworkBandwidth(Mb/s)">
                </el-table-column>
            </el-table>
        </div>
        <div class="input-box">
            <!-- 用于复制RSNC的值 -->
            <input type="text" id="useCopy" />
        </div>
        <baiduMapCom v-if="!isShowH5 && mapData.length" :mapData="mapData">

        </baiduMapCom>
    </div>
</template>
<script>
import commonBanner from "./../common/banner.vue";
import baiduMapCom from "./map.vue";
import { getAllMirror,loadBMap } from '../../api/mirror';
export default {
    name: 'mirList',
    data() {
        return {
            tableData: [],
            mapData: [],
            rsncValue: '',
            inputDom: ''
        }
    },
    components: {
        commonBanner,
        baiduMapCom
    },
    mounted() {
        this.inputDom = document.getElementById("useCopy");
        loadBMap("E8fzNbGP929RhtOZQGNsSKYO")
	   	.then(() => {
            getAllMirror().then((res)=>{
                let mapData = res;
                if(mapData.length) {
                    this.mapData = res;
                    this.initTable();
                }
            }).catch((err)=>{
                console.log(err);
            });
	   		
		}).catch((err)=>{
            console.log(err);
        });
    },
    methods: {
        initTable() {
            this.mapData.forEach(item=>{
                let itemObj = {
                    name: '',
                    location: '',
                    sponsor: '',
                    sponsorLogo: '',
                    http: '',
                    rsnc: '',
                    ftp: ''
                };
                itemObj.name = item.Name;
                itemObj.location = item.Country?item.Country:'-';
                itemObj.sponsor = item.SponsorURL?item.SponsorURL:'-';
                itemObj.sponsorLogo = item.SponsorLogoURL?item.SponsorLogoURL:'-';
                itemObj.http = item.HttpURL?item.HttpURL:'-';
                itemObj.rsnc = item.RsyncURL?item.RsyncURL:'-';
                itemObj.ftp = item.FtpURL?item.FtpURL:'-';
                itemObj.netband = item.NetworkBandwidth?item.NetworkBandwidth:'-';
                this.tableData.push(itemObj);
            });
        },
        copyText(value) {
            this.inputDom.value = value;
            this.inputDom.select();
            document.execCommand("copy");
            let text = this.i18n.download.COPY_SUCCESSFULLY;
            this.$message({
                message: text,
                type: 'success'
            });
        }
    }
}
</script>
<style lang="less" scoped>
.mirror-all {
    width: 1120px;
    margin: 0 auto;
    padding-bottom: 200px;
    p {
        font-size: 18px;
        font-weight: 400;
        color: #000000;
        line-height: 34px;
        margin: 60px 0 30px 0;
        a {
            text-decoration: none;
            color: #002FA7;
        }
    }
    .mirror-list {
        margin-top: 50px;
    }
    /deep/ .mirror-list .el-table__header tr,
    /deep/ .mirror-list .el-table__header th {
        background: rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: rgba(0, 0, 0, 0.03);
    }
    /deep/ .mirror-list .el-table tr>.mirror-name {
        padding-left: 30px;
    }
  /deep/ .mirror-list .el-table tr > .mirror-last-row {
    padding-right: 30px;
  }
    /deep/ .mirror-list .el-table__header-wrapper tr th>div {
        font-size: 16px;
        color: #000000;
        line-height: 16px;
        padding: 9px 10px;
        font-weight: 600;
    }
    /deep/ .el-table--enable-row-hover .el-table__body tr:nth-of-type(2n+1)>td {
        background: #fff;
    }
    /deep/ .mirror-list .el-table__body tr td>div {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 16px;
    }
    /deep/ .mirror-list .el-table__body .cell img {
        width: 21px;
        height: 21px;
        
    }
    /deep/ .el-table::before {
        background-color: #fff;
    }
    /deep/ .mirror-list .el-table__body .cell>a {
        font-size: 14px;
        color: #002FA7;
        line-height: 16px;
        text-decoration: none;
    }
    /deep/ .mirror-list .el-table__body .cell>.rsnc,
    .mirror-list .mobile-list .rsnc {
        cursor: pointer;
        display: block;
        width: 18px;
        height: 18px;
        background-image: url('/img/download/icon-copy.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    /deep/ .mirror-list .el-table__body tbody>tr>td,
    /deep/ .mirror-list .el-table__header thead>tr>th {
        border-bottom: 0;
    }
    .mirror-list .input-box {
        position: relative;
    }
    .input-box #useCopy {
        position: absolute;
        opacity: 0;
    }
}
@media screen and (max-width: 1000px) {
    .mirror-all {
        width: 100%;
        margin: 0;
        padding: 40px 27px 80px 27px;
        p {
            font-size: 16px;
            line-height: 26px;
        }
        .mirror-list {
            .mobile-list {
                &>li {
                    width: 315px;
                    padding: 20px;
                    background: rgba(0, 0, 0, 0.05);
                    margin: 0 auto;
                    &:nth-of-type(2n) {
                        background: #fff;
                    }
                    ul li {
                        font-size: 12px;
                        line-height: 16px;
                        margin-bottom: 12px;
                        img {
                            display: inline-block;
                            width: 8px;
                            height: 11px;
                        }
                        span {
                            font-weight: 300;
                            color: rgba(0, 0, 0, 0.5);
                            word-wrap: break-word;
                            &:first-of-type {
                                font-weight: 400;
                                color: #000000;
                            }
                        }
                        a {
                            text-decoration: none;
                            color: #002FA7;
                        }
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                }
                .rsnc {
                    display: inline-block !important;
                }
            }
        }
    }
}
@media screen and (min-width: 1000px) and (max-width: 1120px) {
    .mirror-all {
        width: 100%;
    }
}
</style>