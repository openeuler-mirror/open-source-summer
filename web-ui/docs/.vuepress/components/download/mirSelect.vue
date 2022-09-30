<template>
    <div class="mirror-select">
        <common-banner
        :pc-src="'/img/download/mirror-banner.png'"
        :mobile-src="'/img/download/mirror-banner.png'"
        :inside-name="'DOWNLOAD'"
        :outside-name="i18n.download.MIRROR_SELECT.TITLE"
        ></common-banner>
        <p>
            {{ i18n.download.MIRROR_SELECT.CONTENT[0] }}<span class="ip">{{ ipAndAsn.length?ipAndAsn[0]:'' }}</span>{{ i18n.download.MIRROR_SELECT.CONTENT[1] }}
            <span class="asn">{{ ipAndAsn.length?ipAndAsn[1]:'' }}</span>{{ i18n.download.MIRROR_SELECT.CONTENT[2] }}<span class="area">{{ area }}</span>{{ i18n.download.MIRROR_SELECT.CONTENT[3] }}
        </p>
        <div class="mirror-list">
            <ul class="mobile-list" v-if="tableData.length && isShowH5">
                <li v-for="(item,index) in tableData" :key="index">
                    <ul>
                        <li>
                            <span>{{ i18n.download.MIRROR_SELECT.RANK }}</span>
                            <span>{{ index+1 }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_SELECT.NAME }}</span>
                            <img :src="item.icon" alt="" />
                            <span>{{ item.name }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_SELECT.URL }}</span>
                            <a :href="item.url">{{ item.url }}</a>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_SELECT.COUNTRY }}</span>
                            <span>{{ item.country }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_SELECT.CONTINENT }}</span>
                            <span>{{ item.continent }}</span>
                        </li>
                        <li>
                            <span>{{ i18n.download.MIRROR_SELECT.DISTANCE }}</span>
                            <span>{{ item.distance }}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <el-table
                :data="tableData"
                class="pc-list"
                stripe
                style="width: 100%"
                v-else>
                <el-table-column
                label="Rank"
                width="70"
                type="index">
                </el-table-column>
                <el-table-column
                width="300"
                label="Mirror Name">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" alt="" />
                        <span style="margin-left: 34px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                show-overflow-tooltip
                width="400"
                label="URL">
                <template slot-scope="scope">
                    <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
                </template>
                </el-table-column>
                <el-table-column
                width="80"
                prop="country"
                label="Area">
                </el-table-column>
                <el-table-column
                prop="continent"
                label="Continent">
                </el-table-column>
                <el-table-column
                width="160"
                prop="distance"
                label="Distance(KM)">
                </el-table-column>
            </el-table>
        </div>
        <baiduMapCom v-if="!isShowH5 && mapData['data'].length" :mapData="mapData['data']" :versionPath="versionPath" :centerPoint="mapData['center']">

        </baiduMapCom>
    </div>
</template>
<script>
import commonBanner from "./../common/banner.vue";
import { loadBMap,selectMirror } from '../../api/mirror';
import baiduMapCom from "./map.vue";

export default {
    name: 'mirSelect',
    data() {
        return {
            tableData: [],
            mapData: {
                center: [],
                data: []
            },
            versionPath: '',
            ipAndAsn: [],
            area: '',
            version: ''
        }
    },
    components: {
        commonBanner,
        baiduMapCom
    },
    created() {
        this.version = this.$route.query.version;
    },
    mounted() {
        loadBMap("E8fzNbGP929RhtOZQGNsSKYO")
	   	.then(() => {
            selectMirror({version:this.version}).then((res)=>{
            this.area = res.ClientInfo.Country;
            this.ipAndAsn.push(res.IP);
            if(res.ClientInfo.ASName) {
                let asn = res.ClientInfo.ASName + ' (ASN' + res.ClientInfo.ASNum + ')';
                this.ipAndAsn.push(asn);
            }else if(res.ClientInfo.ASNum){
                let asn = 'ASN' + res.ClientInfo.ASNum;
                this.ipAndAsn.push(asn);
            }else {
                return
            }
            let center = [];
            let data = [];
            center.push(res.ClientInfo.Longitude);
            center.push(res.ClientInfo.Latitude);
            data = this.compare(res.MirrorList);
            this.versionPath = res.FileInfo.Path.slice(1);
            if(data.length && center.length) {
                this.mapData['data'] = data;
                this.mapData['center'] = center;
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
            if(this.mapData['data'].length) {
                this.mapData['data'].forEach(item=>{
                    let itemObj = {
                        icon: '',
                        name: '',
                        url: '',
                        country: '',
                        continent: '',
                        distance: ''
                    };
                    itemObj.icon = item.SponsorLogoURL;
                    itemObj.name = item.Name;
                    itemObj.url = item.HttpURL + this.versionPath;
                    itemObj.country = item.Country?item.Country:'-';
                    itemObj.continent = item.ContinentCode;
                    itemObj.distance = item.Distance;
                    itemObj.lng = item.Longitude;
                    itemObj.lat = item.Latitude;
                    this.tableData.push(itemObj);
                });
            }else {
                return
            }
            
        },
        compare(temp) {
            temp.sort(function (a, b) {
                return a.Distance > b.Distance ? 1 : -1;
            });
            return temp;
        },
        resetPosition() {
            this.baiduMapObj.reset();
        }
    }
}
</script>
<style lang="less" scoped>
.mirror-select {
    width: 1120px;
    margin: 0 auto;
    padding-bottom: 200px;
    p {
        font-weight: 400;
        color: #000000;
        font-size: 18px;
        line-height: 34px;
        margin: 60px 0 30px 0;
    }
    #select-map {
        width: none;
        height: 786px;
        margin-top: 60px;
    }
    .map-box {
        position: relative;
    }
    .position-reset {
        position: absolute;
        top: 70px;
        right: 13px;
        width: 30px;
        height: 30px;
        padding: 10px;
        cursor: pointer;
        z-index: 100;
        background-color: #FFFFFF;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        img {
            width: 20px;
            height: 20px;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -10px 0 0 -10px;
        }
    }
    /deep/ .mirror-list .el-table::before {
        width: 0;
        height: 0;
    }
    /deep/ .mirror-list .el-table__header tr,
    /deep/ .mirror-list .el-table__header th {
        background: rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: rgba(0, 0, 0, 0.03);
    }
    /deep/ .el-table--enable-row-hover .el-table__body tr:nth-of-type(2n+1)>td {
        background: #fff;
    }
    /deep/ .mirror-list .el-table__header-wrapper tr th>div {
        font-size: 16px;
        color: #000000;
        line-height: 16px;
        padding: 9px 10px;
        font-weight: 600;
    }
    /deep/ .mirror-list .el-table__body tr td>div {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 16px;
    }
    /deep/ .mirror-list .el-table__body .cell {
        position: relative;
    }
    /deep/ .mirror-list .el-table__body .cell>span {
        line-height: 21px;
    }
    /deep/ .mirror-list .el-table__body .cell>img {
        width: 21px;
        height: 21px;
        position: absolute;
    }
    /deep/ .mirror-list .el-table__body .cell>a {
        font-size: 14px;
        color: #002FA7;
        line-height: 16px;
        text-decoration: none;
    }
    /deep/ .mirror-list .el-table__body tbody>tr>td,
    /deep/ .mirror-list .el-table__header thead>tr>th {
        border-bottom: 0;
    }

}
@media screen and (max-width: 1000px) {
    .mirror-select {
        width: 100%;
        margin: 0;
        padding: 40px 27px 80px 27px;
        p {
            font-size: 14px;
            line-height: 26px;
            margin: 40px 0 20px 0;
        }
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
        }
    }
}
</style>