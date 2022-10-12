<!--数据球-->
<template>
    <div :class="['round',styleParams.backcolor]">
        <img :class="isOsv?'osv':''" :src="image" alt="" />
        <p>{{ value }}</p>
        <p :class="$lang === 'en'?'en-font':''">{{ description }}</p>
    </div>
</template>

<script>
export default {
    name: "round",
    data() {
        return {
            isOsv: null
        }
    },
    props:['image','value','description','styleParams'],
    mounted() {
        if(this.image.indexOf("osv") > -1) {
            this.isOsv = true;
        }else {
            this.isOsv = false;
        }
    }
}
</script>

<style lang="less" scoped>
.blue {
    box-shadow: 0px 6px 30px 0px rgba(0, 66, 190, 0.25);
}
.pink { 
    box-shadow: 0px 6px 30px 0px rgba(255, 120, 187, 0.25);
}
.yellow {
    box-shadow: 0px 6px 30px 0px rgba(253, 201, 110, 0.25);
}
.round{
    background: #FFFFFF;
    border-radius: 50%;
    width: 220px;
    height: 220px;
    img{
        display: block;
        width: 66px;
        height: 59px;
        margin: 45px auto 0 auto;
    }
    .osv{
        width: 73px;
        height: 49px;
    }
    p{
        
        font-weight: normal;
        margin-top: 4px;
        text-align: center;
        &:first-of-type{
            font-size: 28px;
            color: #0B162B;
            line-height: 40px;
        }
        &:last-of-type{
            font-size: 18px;
            color: rgba(0, 0, 0, 0.5);
            line-height: 21px;
            width: 200px;
            margin: 0 auto;
        }      
    }
}
@media screen and (max-width: 1000px){
    .round{
        width: 100px;
        height: 100px;
        img{
            display: block;
            width: 33px;
            height: 33px;
            margin: 18px auto 0 auto;
        }
        .osv{
            width: 40px;
            height: 28px;
        }
        p{
            
            font-weight: normal;
            margin-top: 4px;
            text-align: center;
            &:first-of-type{
                color: #0B162B;
                font-size: 14px;
                line-height: 16px;
            }
            &:last-of-type{
                color: rgba(0, 0, 0, 0.5);
                font-size: 9px;
                line-height: 8px;
                width: 80px;
            }      
        }
    }
}
</style>