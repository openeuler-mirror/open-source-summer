<!-- 沙龙 -->
<template>
    <div class="meetUps-content">
        <common-banner
          :pc-src="'/img/meetups/meetup-banner.png'"
          :mobile-src="'/img/meetups/meetup-banner.png'"
          :inside-name="'CONNECT'"
          :outside-name="i18n.interaction.MEETUPS.MEETUPS"
        ></common-banner>
        <div class="meetUps-list">
            <div class="meetUps-year-content" v-for="(items,indexs) in showMeetsList">
                <span class="meetUps-year">{{ indexs.slice(0,4) }}</span>
                <div class="meetUps-items" v-for="(item,index) in items">
                    <div class="meetUps-month">
                        <span>{{ index }}</span>
                    </div>
                    <div class="meetUps-item" v-for="(value,key) in item">
                        <div @click="goDetail(value)" class="meetUps-img card-hover">
                          <img :src="value.MEETUPS_IMG" alt />
                          <span v-if="value.IS_MINI" class="banner-title">{{value.MEETUPS_TITLE}}</span>
                        </div>
                        <div class="meetUps-info meetUps-info-item">
                            <div class="meetUps-time">
                                <p>
                                    <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
                                    <span class="meetUps-date">{{ value.MEETUPS_DATE }}</span>
                                </p>
                            </div>
                          	<div @click="goDetail(value)" class="meetUps-title word-hover">{{ value.MEETUPS_TITLE }}</div>
							<div class="meetUps-time-mobile">
								<p>
									<span class="meetUps-date">{{ value.MEETUPS_DATE }}</span>
								</p>
							</div>
                          	<div class="meetUps-summary">
								<p>
									<span v-for="(values,keys) in value.MEETUPS_DESC" :key="keys">{{ values }}</span>
								</p>	  
							</div>
                        </div>
                    </div>
                </div>
            </div>
			<div class="paginationClass">
				<el-pagination
					background
					@current-change="handleCurrentChange"
					:page-size="PAGESIZE"
					:layout="paginationLayout"
					:total="totalSize"
				></el-pagination>
			</div>
        </div>
    </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
import {eventsList} from "./../../api/meetup";
export default {
  data() {
      return {
          totalSize: 0,
          currentPage: 1,
          PAGESIZE: 6,
          allMeetsList: [],  
          showMeetsList: {},
          currentMeetsList: [],
          mapping: {
              '01': '一月',
              '02': '二月',
              '03': '三月',
              '04': '四月',
              '05': '五月',
              '06': '六月',
              '07': '七月',
              '08': '八月',
              '09': '九月',
              '10': '十月',
              '11': '十一月',
              '12': '十二月'
          }
      };
  },
  components: {
    commonBanner,
  },
  mounted() {

    eventsList().then(res => {
        let tempArr = [];
        res.forEach(item => {
            tempArr.push({
                MEETUPS_IMG: `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`,
                MEETUPS_DATE: item.date,
                MEETUPS_TITLE: item.title,
                MEETUPS_DESC: [item.synopsis],
                IS_MINI: 1,
                ID: item.id,
                MEETUPS_MONTH: this.mapping[item.date.split('-')[1]]
            })
        })
        
        let allList = this.i18n.interaction.MEETUPS.MEETUPS_DATA.concat(tempArr);
        this.totalSize = allList.length;
        this.allMeetsList = this.sortMeetsList(allList);
        this.handleCurrentChange(1);
    })
  },
  methods: {
    handleCurrentChange(val) {
		this.currentMeetsList = this.allMeetsList.slice(
			(val - 1) * this.PAGESIZE,
			val * this.PAGESIZE
		);
		let listObj = {};
        this.currentMeetsList.forEach((item)=>{
            if(!listObj[item.fullYear]){
                listObj[item.fullYear] = {};
            }
            if(!listObj[item.fullYear][item.fullMonth]){
                listObj[item.fullYear][item.fullMonth] = [];
            }
            listObj[item.fullYear][item.fullMonth].push(item);
        });
		this.showMeetsList = listObj;
		scrollTo(0, 0);
    },
    sortMeetsList(array) {
        let temp = array;
        temp.forEach((item)=>{
            item.number = item.MEETUPS_DATE.slice(0,4) + item.MEETUPS_DATE.slice(5,7) + item.MEETUPS_DATE.slice(8);
            item.fullYear = item.MEETUPS_DATE.slice(0,4) + "year";
            item.fullMonth = item.MEETUPS_MONTH;
        });
        temp.sort((a,b) =>{
            return b.number - a.number;
        });
		return temp;
    },
    goDetail(item) {
        let query = null;
        if(item.IS_MINI){
            query = {
                id: item.ID,
                isMini: 1
            }
        } else {
            query = {
                id: item.ID
            }
        }
        this.$router.push(
          {
              path:'/' + this.$lang + '/interaction/salon-list/detail/',
              query
          });
    }
  },
};
</script>

<style lang="less" scoped>
.card-hover:hover {
    box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2);
}
.meetUps-list {
	width: 1120px;
	margin: 0 auto;
}
.meetUps-year-content {
  	position: relative;
	&:first-of-type {
		margin-bottom: 85px;
		@media screen and (max-width: 1000px) {
			margin-bottom: 0;
		}
	}
	
}
.meetUps-year {
	position: absolute;
	font-size: 60px;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.05);
	height: 60px;
	line-height: 60px;
	top: -35px;
}
.paginationClass {
  	margin: 20px 0 200px 0;
}
.meetUps-items {
  	margin: 50px 0;
}
.meetUps-item {
 	margin-top: 30px;
}
.word-hover{
    &:hover{
        color: #002FA7;
    }
}
.meetUps-img {
	cursor: pointer;
	width: 400px;
	display: inline-block;
	border-radius:8px;
    height: 200px;
    position: relative;
	@media screen and (max-width: 1000px) {
		box-shadow:none;
    }
    .banner-title {
        position: absolute;
        width: 400px;
        text-align: center;
        font-size: 24px;
        line-height: 37px;;
        height: 20px;
        top: 80px;
        left: 0;
        color: #fff;
        @media screen and (max-width: 1000px) {
            width: 100%;
            font-size: 16px;
            height: 20px;
            top: 68px;
            left: 0;
            color: #fff;
        }
    }
	img {
		width: 400px;
		height:200px;
		box-shadow:0 6px 20px 0 rgba(0,0,0,0.1);
		border-radius: 8px;
		@media screen and (max-width: 1000px) {
			width: 270px;
			height: 150px;
			box-shadow: none;
		}
	}
}
.meetUps-month {
  	font-size: 24px;
}
.meetUps-info {
	display: inline-block;
	margin-left: 60px;
	width: calc(100% - 480px);
	vertical-align: top;
}
.meetUps-time {
  	margin-top: 5px;
	p {
		display: inline-block;
		margin-right: 51px;
		.mobile-middle-img {
			display: inline-block;
			margin-bottom: -2px;
		}
	}
}
.meetUps-time-mobile {
  	display: none;
}
.meetUps-date {
	color: rgba(0, 0, 0, 0.4);
	font-size: 12px;
	@media screen and (max-width: 1000px) {
		line-height: 16px;
	}
}
.meetUps-info-item {
    .meetUps-title {
        cursor: pointer;
        font-size: 24px;
        margin: 21px 0 16px 0;
        @media screen and (max-width: 1000px) {
			font-size: 16px;
			margin: 0;
        }
    }   
}

.meetUps-summary {
	font-size: 14px;
	color: rgba(0, 0, 0, 0.5);
	line-height: 24px;
	p {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		height: 72px;
	}
}
@media screen and (max-width: 1000px) {
	.meetUps-content {
		padding: 40px 30px 80px 30px;
	}
	.meetUps-list {
		width: 100%;
	}
	.meetUps-year {
		display: none;
	}
	.paginationClass {
		margin: 40px 0 0 0;
	}
	.meetUps-items {
		margin: 0;
	}
	.meetUps-item {
		margin-top: 40px;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
	}
	.meetUps-img {
		cursor: pointer;
		width: 100%;
		height: 150px;
		margin: 22px 0;
		text-align: center;
		img {
			max-width: 270px;
		}
	}
	.meetUps-month {
		display: none;
	}
	.meetUps-info {
		display: inline-block;
		margin-left: 0px;
		padding: 0 22px 30px;
		width: 100%;
		vertical-align: top;
	}
	.meetUps-time {
		display: none;
	}
	.meetUps-time-mobile {
		display: inline-block;
		margin-top: 10px;
		p {
		display: inline-block;
			margin-right: 17px;
		}
	}
	.meetUps-date {
		color: rgba(0, 0, 0, 0.4);
		font-size: 12px;
	}
	.meetUps-title {
		cursor: pointer;
		font-size: 16px;
		margin: 0px 0 10px 0;
	}
	.meetUps-summary {
		display: none;
	}
}
</style>
