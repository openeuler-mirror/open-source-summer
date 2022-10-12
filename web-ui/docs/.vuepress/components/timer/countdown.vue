<template>
    <div class="count-down" :style="{ backgroundImage: 'url(' + timeImage + ')'}">
        <div class="starting" v-if="isCountDown">
            <p class="timeText" v-if="isShowText">{{ i18n.timer.TIMETEXT.COUNT_DOWN }}</p>
            <p :class="['timeValue',isShowText?'':'value-margin']" >
                <span class="day">{{ showTime.day }}</span>
                <span>:</span>
                <span class="hour">{{ showTime.hour }}</span>
                <span>:</span>
                <span class="minute">{{ showTime.minute }}</span>
                <span>:</span>
                <span class="second">{{ showTime.second }}</span>
            </p>
            <p :class="$lang === 'en'?'enDesc':'zhDesc'" v-if="isShowText">
                <span v-for="(item,index) in i18n.timer.TIMEDESC">{{ item }}</span>
            </p>
        </div>
        <div class="notstart" v-if="!isCountDown">{{ i18n.timer.TIMETEXT.NOTSTARTED }}</div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            timeText: '',
            showTime: {
                day: '',
                hour: '',
                minute: '',
                second: ''
            },
            timer: null,
            targetValue: 0,
            startValue: 0,
            isCountDown: false
        }
    },
    //开始时间和结束时间形式：2020-(年|/|.)12-(月|/|.)23(日) 12:(时)00(分)
    props: ["targetTime","startTime","isShowText","timeImage"],
    created() {
        this.getRange();
    },
    mounted() {
        this.calculateTime();
        this.timer = setInterval(()=> {
            this.calculateTime();
        },1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods:{
        getRange() {
            //new Date(year,month,day,hour,min,sec) 得到某日期的日期对象 month:0~11
            let targetArr = this.targetTime.split(" ");
            let target_year = targetArr[0].slice(0,4);
            let target_month = 0;
            let target_day = 0;
            let target_hour = 0;
            let target_min = 0;
            if(isNaN(targetArr[0].slice(6,7))) {
                target_month = targetArr[0].slice(5,6) - 1;
                target_day = isNaN(targetArr[0].slice(8,9))?targetArr[0].slice(7,8):targetArr[0].slice(7,9);
            }else {
                target_month = targetArr[0].slice(5,7) - 1;
                target_day = isNaN(targetArr[0].slice(9,10))?targetArr[0].slice(8,9):targetArr[0].slice(8,10);
            }
            if(isNaN(targetArr[1].slice(1,2))) {
                target_hour = targetArr[1].slice(0,1);
                target_min = targetArr[1].slice(2,4);
            }else {
                target_hour = targetArr[1].slice(0,2);
                target_min = targetArr[1].slice(3,5);
            }
            console.log(target_day);
            let target_time = new Date(target_year,target_month,target_day,target_hour,target_min,0);
            this.targetValue = parseInt(target_time.getTime());
            if(this.startTime) {
                let startArr = this.startTime.split(" ");
                let start_year = startArr[0].slice(0,4);
                let start_month = 0;
                let start_day = 0;
                let start_hour = 0;
                let start_min = 0;
                if(isNaN(startArr[0].slice(6,7))) {
                    start_month = startArr[0].slice(5,6) - 1;
                    start_day = isNaN(startArr[0].slice(8,9))?startArr[0].slice(7,8):startArr[0].slice(7,9);
                }else {
                    start_month = startArr[0].slice(5,7) - 1;
                    start_day = isNaN(startArr[0].slice(9,10))?startArr[0].slice(8,9):startArr[0].slice(8,10);
                }
                if(isNaN(startArr[1].slice(1,2))) {
                    start_hour = startArr[1].slice(0,1);
                    start_min = startArr[1].slice(2,4);
                }else {
                    start_hour = startArr[1].slice(0,2);
                    start_min = startArr[1].slice(3,5);
                }
                let start_time = new Date(start_year,start_month,start_day,start_hour,start_min,0);
                this.startValue = parseInt(start_time.getTime());
            }else {
                this.startValue = 0;
            }
        },
        calculateTime() {
            let currentTime = new Date().getTime();
            if(this.startValue - currentTime <= 0) {
                this.isCountDown = true;
            }else{
                this.isCountDown = false;
            }
            let result = (this.targetValue - currentTime) / 1000;
            if(result <= 0) {
                this.showTime.day = 0;
                this.showTime.hour = 0;
                this.showTime.minute = 0;
                this.showTime.second = 0;
                clearInterval(this.timer);
            }else {
                let resDay = Math.floor(result / (3600 * 24));
                result = result % (3600 * 24);
                let resHour = Math.floor(result / 3600);
                result = result % 3600;
                let resMinute = Math.floor(result / 60);
                result = result % 60;
                let resSecond = result;
                this.showTime.day = this.addZero(resDay);
                this.showTime.hour = this.addZero(resHour);
                this.showTime.minute = this.addZero(resMinute);
                this.showTime.second = this.addZero(Math.floor(resSecond));
            }
        },
        addZero(value) {
            return Math.abs(value) < 10? '0' + value:value;
        }
    }
}
</script>

<style lang='less' scoped>
.count-down {
    width: 594px;
    height: 182px;
    margin: 0 auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    color: white;
    overflow: hidden;
    .starting {
        .value-margin{
            margin-top: 60px;
        }
        p{
        margin-bottom: 20px;
        text-align: center;
        }
        .timeText{
            font-size: 18px;
        }
        .timeValue{
            span{
                font-size: 30px;
                display: inline-block;
                margin-right: 9px;
                color: #002a7f;
            }
        }
        .zhDesc{
            span{
                font-size: 16px;
                display: inline-block;
                margin-right: 35px;
            }
        }
        .enDesc{
            span{
                font-size: 16px;
                display: inline-block;
                margin-right: 15px;
                &:nth-of-type(3) {
                    margin-right: 28px;
                }
            }
        }
    }
}
 @media screen and (max-width: 1000px) {
    .count-down {
        width: 297px;
        height: 91px;
        .starting {
            .value-margin{
                margin-top: 25px;
            }
        }
    }
 }
</style>