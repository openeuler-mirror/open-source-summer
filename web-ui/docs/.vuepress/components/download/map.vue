<template>
    <div class="map-box">
        <div class="position-reset" @click="resetPosition">
            <img src="/img/download/reset.png" alt="" />
        </div>
        <div id="baidu-map">

        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap.js';
export default {
    name: 'MapCom',
    data() {
        return {
            baiduMapObj: {}
        }
    },
    mounted() {
        this.initChart();
    },
    props: ['mapData','versionPath','centerPoint'],
    methods: {
        initChart() {
            let chartDom = document.getElementById('baidu-map');
            let myChart = echarts.init(chartDom);
            let option;
            let that = this;
            let data = [];
            this.mapData.forEach(item=>{
                data.push({
                    name: item.Name,
                    country: item.Country,
                    link: this.versionPath?item.HttpURL + this.versionPath:item.HttpURL
                });
            });
            option = {
                tooltip : {
                    trigger: 'item',
                    formatter: p => {
                        let aDom = "";
                        let messageBox = "";
                        if(p.data.dataList.length && p.data.dataList.length > 1) {
                            p.data.dataList.forEach((item=>{
                                aDom = aDom + `<li style="margin-bottom:6px;"><a href="${item.link}" target="_blank" style="text-decoration: none;color: #002FA7;">${item.name}</a></li>`
                            }));
                            messageBox = "<div style='text-align:left;padding:10px 20px'><ul style='list-style-type:disc;'>" + aDom + "</ul><span>" + p.data.country + "</span></div>";
                        }else if(p.data.dataList.length && p.data.dataList.length === 1) {
                            messageBox = `<div style="text-align:left;padding:10px">
                                            <a href="${p.data.dataList[0].link}" target="_blank" style="text-decoration: none;color: #002FA7;">${p.data.dataList[0].name}</a><br>
                                            <span>${p.data.country}</span>
                                        </div>`;
                        }
                        return messageBox;
                    },
                    enterable: true,
                    hideDelay: 500,
                },
                bmap: {
                    zoom: 1,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                            {
                                "featureType": "water",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#aad8f4"
                                }
                            },
                            {
                                "featureType": "land",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#f1ebdd"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#d8cab9"
                                }
                            },
                            {
                                "featureType": "railway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#afbcc2"
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#afbcc2",
                                    "lightness": 1
                                }
                            },
                            {
                                "featureType": "highway",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry",
                                "stylers": {
                                    "color": "#afbcc2"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#afbcc2"
                                }
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "green",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#afbcc2",
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "subway",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "manmade",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "local",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "arterial",
                                "elementType": "labels",
                                "stylers": {
                                    "visibility": "off"
                                }
                            },
                            {
                                "featureType": "boundary",
                                "elementType": "geometry.fill",
                                "stylers": {
                                    "color": "#afbcc2"
                                }
                            },
                            {
                                "featureType": "building",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#f1ebdd"
                                }
                            },
                            {
                                "featureType": "label",
                                "elementType": "all",
                                "stylers": {
                                    "visibility": "off"
                                }
                            }
                        ]
                    }
                },
                series : [
                    {
                        name: '',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        data: that.convertData(data),
                        encode: {
                            value: 2
                        },
                        symbolSize: 15,
                        showEffectOn: 'emphasis',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            formatter: p => {
                                let labelDom = '';
                                if(p.data.dataList.length>1) {
                                    labelDom = p.data.dataList.length + ' mirrors are selected here';
                                }else if(p.data.dataList.length === 1) {
                                    labelDom = p.data.name;
                                }
                                return labelDom;
                            },
                            position: 'right',
                            show: true
                        },
                        itemStyle: {
                            color: '#fff285',
                            shadowBlur: 10,
                            shadowColor: '#f9762d'
                        },
                        zlevel: 1
                    }
                ]
            };

            option && myChart.setOption(option);
            //获取百度地图实例
            this.baiduMapObj = myChart.getModel().getComponent('bmap').getBMap();
            this.setMapStyle(this.baiduMapObj);
        },
        setMapStyle(baiduMap) {
            setTimeout(()=>{
                var point;
                if(this.centerPoint && this.centerPoint.length) {
                    point = new BMap.Point(this.centerPoint[0],this.centerPoint[1]);
                    const myicon = new BMap.Icon("/img/download/position.png",new BMap.Size(24,24));
                    const marker = new BMap.Marker(point,{icon:myicon});
                    baiduMap.addOverlay(marker);
                }else {
                    point = new BMap.Point(109.5878,34.115);
                }
                baiduMap.centerAndZoom(point, 1);
                baiduMap.addControl(new BMap.NavigationControl(
                    {
                        type : BMAP_NAVIGATION_CONTROL_ZOOM, //缩放控件类型 仅包含缩放按钮
                        anchor : BMAP_ANCHOR_BOTTOM_RIGHT //右下角
                    }
                ));
            },100);
        },
        convertData(data) {
            let res = [];
            let geoCoordMap = {};
            this.mapData.forEach(item=>{
                geoCoordMap[item.Name] = [item.Longitude,item.Latitude];
            });
            for (let i = 0; i < data.length; i++) {
                let geoCoord = geoCoordMap[data[i].name];
                let index = -1;
                if (geoCoord) {
                    for (let j = 0; j < res.length; j++) {
                        if(res[j].Latitude === geoCoord[0] && res[j].Longitude === geoCoord[1]) {
                            index = j;
                        }
                    }
                    if(index === -1) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord,
                            country: data[i].country,
                            dataList: [{name: data[i].name,link: data[i].link}],
                            Latitude: geoCoord[0],
                            Longitude: geoCoord[1],
                        });  
                    }else {
                        res[index].dataList.push({
                            name: data[i].name,
                            link: data[i].link
                        });
                    }                
                }else {
                    return
                }
            }
            return res;
        },
        resetPosition() {
            this.baiduMapObj.reset();
        }
    }

}
</script>

<style lang="less" scoped>
    #baidu-map {
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
</style>