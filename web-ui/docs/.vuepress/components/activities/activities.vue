<template>
  	<div class="activities-content">
		<div class="activities-banner">
			<a @click="goTitle(1)">
				<img class="web" src="/img/activities/pc/banner_all.png" alt="">
				<img class="mobile" src="/img/activities/mobile/banner.png" alt="">
			</a>
		</div>
		 <div class="activities-title-nav" v-show="isShowNav">
            <div class="box-line">
                <img class="gif" v-lazy="'/img/summit/home/nav.gif'" alt="" />
                <img class="line" v-lazy="'/img/activities/line.png'" alt="" />
            </div>
            <div class="nav-text">
                <ul>
                    <li v-for="(item,index) in i18n.activities.NAV_TEXT" 
						:key="index" @click="goTitle(index)" 
						:class="index === activeIndex ? 'active' : ''">
                        <div><div class="inside"></div></div>
                        <div>{{ item }}</div>
                    </li>
                </ul>
            </div>
        </div>
  	  	<div class="activities-list-wrapper">
			<div class="activities-introduce">
				<p class="description">{{i18n.activities.DESCRIPTION_1}}</p>
				<p class="description">{{i18n.activities.DESCRIPTION_2}}</p>
				<!-- <br> -->
				<p class="description">{{i18n.activities.DESCRIPTION_3}}<span class="red">{{i18n.activities.DESCRIPTION_5}}</span>{{i18n.activities.DESCRIPTION_6}}</p>
				<div class="title">{{i18n.activities.STEP_TITLE}}</div>
				<div class="step-content">
					<div class="left">
						<div class="content">
							<p class="step-text">{{i18n.activities.STEP_1.CONTENT_1}}</p>
							<p class="step-text">
								{{i18n.activities.STEP_1.CONTENT_2}}<a @click="goTitle(1)">{{i18n.activities.STEP_1.A_LINK}}</a>{{i18n.activities.STEP_1.CONTENT_3}}
							</p>
							<p class="step-title">{{i18n.activities.STEP_1.TITLE}}</p>
							<p class="step-title">{{i18n.activities.STEP_1.TITLE_TITLE}}</p>
							<p class="step-text">{{i18n.activities.STEP_1.TITLE_CONTENT}}</p>
							<p class="step-title">{{i18n.activities.STEP_1.MAIL_TITLE}}</p>
							<p class="step-text">{{i18n.activities.STEP_1.MAIL_CONTENT_1}}</p>
							<p class="step-text">{{i18n.activities.STEP_1.MAIL_CONTENT_2}}</p>
						</div>
					</div>
					<div class="right">
						<div class="right-top">
							<div class="right-top-left">
								<div class="content">
									<p class="step-text">{{i18n.activities.STEP_2.CONTENT_1}}</p>
									<p class="step-text">
										{{i18n.activities.STEP_2.CONTENT_2}}<a 
											href="https://summer.iscas.ac.cn/help/assets/%E9%A1%B9%E7%9B%AE%E7%94%B3%E8%AF%B7%E6%A8%A1%E6%9D%BF.pdf" target="_blank"
										>{{i18n.activities.STEP_2.A_LINK}}</a>{{i18n.activities.PERIOD}}
									</p>
								</div>
							</div>
							<div class="right-top-right">
								<div class="content">
									<p class="step-text">
										{{i18n.activities.STEP_3.CONTENT_1}}<a 
											href="https://summer.iscas.ac.cn/#/org/projectlist" target="_blank"
										>{{i18n.activities.STEP_3.A_LINK}}</a>{{i18n.activities.STEP_3.CONTENT_2}}
									</p>
									<p class="step-title">{{i18n.activities.STEP_3.TITLE}}</p>
									<p class="step-text">{{i18n.activities.STEP_3.TIME}}</p>
								</div>
							</div>
						</div>
						<div class="right-bottom">
							<div class="right-bottom-left">
								<div class="content">
									<p class="step-text">{{i18n.activities.STEP_4.CONTENT}}</p>
									<p class="step-title">{{i18n.activities.STEP_4.TITLE}}</p>
									<p class="step-text">{{i18n.activities.STEP_4.TIME}}</p>
									<p class="step-title">{{i18n.activities.STEP_4.TITLE1}}</p>
									<p class="step-text">{{i18n.activities.STEP_4.TIME1}}</p>
								</div>
							</div>
							<div class="right-bottom-right">
								<div class="content">
									<p class="step-text"><span>{{i18n.activities.STEP_5.TIME}}</span>{{i18n.activities.STEP_5.CONTENT}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="guide">
					<div class="guide-box">
						<div class="guide-content">
							<p>
								{{i18n.activities.GUIDE_LABEL}}<a href="https://summer.iscas.ac.cn/help/student/" target="_blank">{{i18n.activities.GUIDE_LINK}}</a>{{i18n.activities.PERIOD}}
							</p>
							<p>
								{{i18n.activities.OFFICIAL_WEBSITE_LABLE}}<a href="https://summer.iscas.ac.cn/" target="_blank">{{i18n.activities.OFFICIAL_WEBSITE_LINK}}</a>{{i18n.activities.PERIOD}}
							</p>
							<p class="line">{{i18n.activities.DESCRIPTION_4}}</p>
						</div>
						<img class="guide-qr-code" src="/img/activities/WechatIMG329.jpg" />
					</div>
				</div>
				<div class="title">{{i18n.activities.FILTER_TITLE}}</div>
			</div>
      		<el-form :inline="true" :model="formData" class="activities-filter">
      		  	<el-form-item :label="i18n.activities.FILTER.LABEL_1">
					<el-select 
						v-model="formData.technologyDirection"
						@change="selectChange"
						placeholder multiple
					>
                        <el-option
                            v-for="(item, index) in technologyDirectionOptions"
                            :key="index"
                            :value="item"
                        ></el-option>
                    </el-select>
      		  	</el-form-item>
      		  	<el-form-item :label="i18n.activities.FILTER.LABEL_2">
					<el-select 
						v-model="formData.technologyLables"
						@change="selectChange"
						placeholder multiple
					>
                        <el-option
                            v-for="(item, index) in technologyLablesOptions"
                            :key="index"
                            :value="item"
                        ></el-option>
                    </el-select>
      		  	</el-form-item>
      		  	<el-form-item :label="i18n.activities.FILTER.LABEL_3">
					<el-select 
						v-model="formData.difficulty"
						@change="selectChange"
						placeholder multiple
					>
                        <el-option
                            v-for="(item, index) in difficultyOptions"
                            :key="index"
                            :value="item"
                        ></el-option>
                    </el-select>
      		  	</el-form-item>
      		  	<!-- <el-form-item class="video-btn-pc">
					<a target="_blank" href="https://www.bilibili.com/video/BV13v411V7KV">
						<img src="/img/activities/video_btn.png" />
					</a>
      		  	</el-form-item> -->
      		</el-form>
			<ul class="filter-tags">
        		<li v-for="(item, index) in filterTags" 
					:key="index"
					 v-show="
                        formData.technologyDirection.indexOf(item) > -1 ||
                        formData.technologyLables.indexOf(item) > -1 ||
                        formData.difficulty.indexOf(item) > -1
                    ">
     		    	{{ item }}
     		    	<span @click="delTag(item)">×</span>
     		  	</li>
     		</ul>
			 <!-- <div class="video-btn-mobile">
				<a target="_blank" href="https://www.bilibili.com/video/BV13v411V7KV">
					<img src="/img/activities/video_btn.png" />
				</a>
      		</div> -->
      		<div class="activities-list" v-if="filterList.length > 0">
				<a class="activities-list-item" 
					target="_blank"
				  	v-for="(item, index) in filterList"
					:key="index"
					:href="item.LINK">
					<div class="activities-list-item-title">{{item.NAME}}</div>
					<div class="activities-list-item-field"><span class="lable">{{ i18n.activities.ACTIVETIES_LIST_LABLE_1 }}：</span>{{item.TECHNOLOGY_FIELD}}</div>
					<div class="activities-list-item-labels"><span class="lable">{{ i18n.activities.ACTIVETIES_LIST_LABLE_2 }}：</span>{{item.TECHNICAL_LABELS}}</div>
					<div class="activities-list-item-info">
						<img src="/img/activities/low.png" v-if="item.DIFFICULTY === '进阶'" />
						<img src="/img/activities/medium.png" v-if="item.DIFFICULTY === '基础'" />
						<span>{{item.DIFFICULTY}}</span>
					</div>
				</a>
      		</div>
      		<div class="activities-list" v-if="filterList.length === 0">
				<div class="no-data-info">{{i18n.activities.NO_DATA_INFO}}</div>
      		</div>
			<el-pagination
                class="activities-pagination"
                background
				@current-change="currentChange"
                :page-size="formData.pageSize"
                :current-page="formData.page"
                :layout="paginationLayout"
                :total="total"
				:hide-on-single-page="pageValue"
            ></el-pagination>
  	  	</div>
  	</div>
</template>

<script>
import commonBanner from "./../common/banner.vue";

export default {
  	data () {
  	  	return {
  	  	  	formData: {
				technologyDirection: [],
				technologyLables: [],
				difficulty: [],
				page: 1,
                pageSize: 18
			},
			technologyDirectionOptions: [],
			technologyLablesOptions: [],
			difficultyOptions: [],
			lang: '',
			list: [],
			filterList: [],
			total: 0,
			pageValue: true,
			navTitleScroll: [780,1430],
			activeIndex: -1,
			isShowNav: false
  	  	};
  	},
  	components: {
  	  	commonBanner
  	},
  	created () {
		const filterFn = (arr, key, item) => {
  	        return arr.every((arrItem => {
  	            if(item[key] && arrItem !== item[key]){
  	                return true;
  	            }
  	        }))
  	    }
  	    this.i18n.activities.ACTIVITIES_LIST.forEach(item => {
  	        if(filterFn(this.technologyDirectionOptions, 'TECHNOLOGY_FIELD', item)){
				let newArr = item.TECHNOLOGY_FIELD.split(',');
				newArr.forEach((inner_item) => {
					let index = this.technologyDirectionOptions.indexOf(inner_item);
					if(index < 0) {
						this.technologyDirectionOptions.push(inner_item);
					}
				})
				let resultArray = this.technologyDirectionOptions.sort(
			    	function compareFunction(param1, param2) {
			        	return param1.localeCompare(param2, 'zh');
			    	}
				);
				this.technologyDirectionOptions = resultArray;
  	        }
  	        if(filterFn(this.technologyLablesOptions, 'TECHNICAL_LABELS', item)){
				let newArr = item.TECHNICAL_LABELS.split(',');
				newArr.forEach((inner_item) => {
					let index = this.technologyLablesOptions.indexOf(inner_item);
					if(index < 0) {
						this.technologyLablesOptions.push(inner_item);
					}
				})
				let resultArray = this.technologyLablesOptions.sort();
				this.technologyLablesOptions = resultArray;
  	        }
  	    })
  	},
  	mounted () {
  	  	this.list = this.i18n.activities.ACTIVITIES_LIST;
		this.lang = this.$lang;
		this.difficultyOptions = this.i18n.activities.FILTER.DIFFICULTY_OPTIONS;
		window.addEventListener('scroll',this.atuneScroll);
		this.pageChange(1);
  	},
	 computed: {
		filterTags () {
			let allTags = this.technologyDirectionOptions.concat(
				this.technologyLablesOptions,
				this.difficultyOptions
			);
			return allTags;
    	},
    	activitiesList () {
			if(
				!this.formData.technologyDirection.length &&
				!this.formData.technologyLables.length &&
				!this.formData.difficulty.length
			) {
				return this.list;
			} else if(
				!this.formData.technologyLables.length &&
				!this.formData.difficulty.length
			) {
				return this.list.filter(item => {
					return this.selectFilter(this.formData.technologyDirection, item.TECHNOLOGY_FIELD);
				})
			} else if(
				!this.formData.technologyDirection.length &&
				!this.formData.difficulty.length
			) {
				return this.list.filter(item => {
					return this.selectFilter(this.formData.technologyLables, item.TECHNICAL_LABELS);
				})
			} else if(
				!this.formData.technologyDirection.length &&
				!this.formData.technologyLables.length
			) {
				return this.list.filter(item => {
					return this.formData.difficulty.indexOf(item.DIFFICULTY) > -1
				})
			} else if(!this.formData.technologyDirection.length) {
				return this.list.filter(item => {
					return ( 
						this.selectFilter(this.formData.technologyLables, item.TECHNICAL_LABELS) &&
						this.formData.difficulty.indexOf(item.DIFFICULTY) > -1
						
					)
				})
			} else if(!this.formData.technologyLables.length) {
				return this.list.filter(item => {
					return ( 
						this.selectFilter(this.formData.technologyDirection, item.TECHNOLOGY_FIELD) && 
						this.formData.difficulty.indexOf(item.DIFFICULTY) > -1
					)
				})
			} else if(!this.formData.difficulty.length) {
				return this.list.filter(item => {
					return ( 
						this.selectFilter(this.formData.technologyDirection, item.TECHNOLOGY_FIELD)  && 
						this.selectFilter(this.formData.technologyLables, item.TECHNICAL_LABELS)
					)
				})
			} else {
				return this.list.filter(item => {
					return ( 
						this.selectFilter(this.formData.technologyDirection, item.TECHNOLOGY_FIELD)  && 
						this.selectFilter(this.formData.technologyLables, item.TECHNICAL_LABELS) &&
						this.formData.difficulty.indexOf(item.DIFFICULTY) > -1
					)
				})
			}
    	}
  },
  	methods: {
		pageChange(page) {
			let pageNum = page;
			this.total = this.activitiesList.length;
			let oldList = this.activitiesList;
			let newList = oldList.slice((pageNum-1)*18, pageNum*18);
			this.filterList = newList;
		},
		selectFilter(arr, str) {
			let labelArr =  str.split(',');
			var isTrue = false;
			labelArr.forEach((selectItem) => {
				if(arr.indexOf(selectItem) > -1) {
					isTrue =  true;
				}
			})
			return isTrue;
		},
		currentChange(value) {
			this.formData.page = value;
			this.pageChange(value);
		},
		selectChange() {
			this.formData.page = 1;
			this.pageChange(1);
		},
  	  	delTag(tag) {
			this.formData.page = 1;
      		const technologyDirectionIndex = this.formData.technologyDirection.indexOf(tag);
      		const technologyLablesIndex = this.formData.technologyLables.indexOf(tag);
      		const difficultyIndex = this.formData.difficulty.indexOf(tag);
			if(technologyDirectionIndex > -1) {
				this.formData.technologyDirection.splice(technologyDirectionIndex, 1);
			} else if(technologyLablesIndex > -1) {
				this.formData.technologyLables.splice(technologyLablesIndex, 1);
			} else if(difficultyIndex > -1) {
				this.formData.difficulty.splice(difficultyIndex, 1);
			}
			this.pageChange(1);
    	},
		atuneScroll(value) {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 600) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 750 && scrollTop < 1400) {
                this.activeIndex = 0;
            }else if(scrollTop > 1400){
                this.activeIndex = 1;
            }else {
                return false;
            }
        },
		goTitle(index) {
            document.documentElement.scrollTop = this.navTitleScroll[index];
        }
  	}
};
</script>
<style lang="less">
.activities-content {
  	.el-select__tags {
  	  	display: none;
  	}
  	.el-input__icon {
  	  	line-height: 32px;
  	}
  	.el-form-item__label {
  	  	line-height: 32px;
  	}
  	.el-form-item__content {
  	  	line-height: 32px;
  	  	width: 140px;
  	  	@media screen and (max-width: 1000px) {
  	  	  	width: 100%;
  	  	}
  	  	.el-checkbox__inner {
  	  	  	border-radius: 50%;
  	  	}
  	}
  	.el-input__inner {
  	  	height: 32px;
  	  	line-height: 32px;
  	  	border: 1px solid rgba(0, 0, 0, 0.5);
  	  	color: #000;
  	}
  	.el-select__tags {
  	  	min-width: 140px !important;
  	}
  	.el-form-item__label {
  	  font-size: 18px;
  	  color: #000;
  	}
  	.el-input__inner {
  	  	font-size: 14px;
  	  	color: #000;
  	}
  	.el-select-dropdown__item {
  	  	color: #000;
  	}
  	.el-form-item {
  	  	margin-right: 50px !important;
  	}
  	.el-form-item__content {
  	  	min-width: 140px;
  	  	min-height: 32px;
  	}
  	.el-button--primary {
  	  	background-color: #002fa7;
  	}
  	.el-button--primary:focus,
  	.el-button--primary:hover {
  	  	background-color: #002fa7;
  	}
  	.el-input {
  	  	width: unset;
  	  	margin: unset;
  	}
  	.el-pagination__editor {
    	line-height: 18px;
    	padding: 0 2px;
    	height: 28px;
    	text-align: center;
    	margin: 0 2px;
    	box-sizing: border-box;
    	border-radius: 3px;
	}
	.el-pagination__editor.el-input .el-input__inner {
    	height: 28px;
	}
	.el-pagination__editor.el-input{
		width: 50px;
	}
}
</style>

<style lang="less" scoped>
.red {
	color:red;
}
.web {
  @media screen and (max-width: 1120px) {
    display: none;
  }
}
.mobile {
  display: none;
  @media screen and (max-width: 1120px) {
    display: inline-block;
  }
}
.activities-content {
  	margin: 0 auto;
	padding-bottom: 200px;
	color: #000;
	@media screen and (max-width: 1000px) {
  	  	width: 100%;
		padding-bottom: 80px;
  	}
	.activities-list-wrapper {
		margin: 0 auto;
		width: 1120px;
		@media screen and (max-width: 1000px) {
  	  		width: 100%;
  	  		padding: 0 30px;
  		}
	}
	.activities-banner {
		display: flex;
		justify-content: center;
		height: 380px;
		margin-bottom: 60px;
		@media screen and (max-width: 1000px) {
			width: 100%;
			height: 300px;
			margin-bottom: 20px;
  		}
		a {
			cursor: pointer;
			display: block;
			max-width: 1920px;
			overflow: hidden;
			width:100%;
			img {
				width: 100%;
			}
			@media screen and (max-width: 1120px) {
			width: 100%;
			height: 300px;
			margin-bottom: 20px;
			text-align: center;
			img {
				max-width: 375px;
			}
			}
		}
	}
	.activities-title-nav {
    	position: fixed;
    	cursor: pointer;
    	top: 170px;
    	right: 70px;
    	z-index: 1000;
    	display: block;
		@media screen and (max-width: 1520px) {
			display: none;
  		}
    	.box-line {
    	    width: 70px;
    	    margin-left: -26px;
    	    .gif {
    	        width: 60px;
    	        height: 60px;
    	        margin: 0 auto -30px 5px;
    	        position: relative;
    	        z-index: 20;
    	    }
    	    .line {
    	        display: block;
    	        width: 3px;
    	        height: 252px;
    	        margin: 0 auto;
    	    }
    	}
    	.nav-text {
    	    position: relative;
    	    margin-top: -200px;
    	    ul li>div {
    	        display: inline-block;
    	        &:first-of-type {
    	            margin-right: 17px;
    	            border-radius: 50%;
    	            width: 18px;
    	            position: relative;
    	            background: #FFFFFF;
    	            height: 18px;
    	            border: 1px solid #979797;
    	            div {
    	                width: 14px;
    	                height: 14px;
    	                border-radius: 50%;
						background: #D8D8D8;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-left: -7px;
						margin-top: -7px;
                	}
            	}
            	&:last-of-type {
            	    font-size: 20px;
            	    color: #000000;
            	    line-height: 30px;
            	}
        	}
        	ul li {
        	    margin-bottom: 30px;
        	    display: flex;
        	    align-items: center;
        	}
        	ul .active {
        	    &>div {
        	        color: #002FA7 !important;
        	    }
        	    .inside {
        	        background: #002FA7;
        	    }
        	}
    	}
	}
	.activities-introduce {
		.description {
			font-size: 18px;
			line-height: 40px;
			font-weight: 400;
			@media screen and (max-width: 1000px) {
				font-size: 16px;
				line-height: 35px;
  			}
		}
		.title {
			font-size: 36px;
			width: 206px;
			height: 52px;
			margin: 60px auto 30px;
			line-height: 52px;
			text-align: center;
			background-image: url('/img/activities/pc/title.png');
			@media screen and (max-width: 1000px) {
				width: 112px;
				height: 34px;
				font-size: 18px;
				line-height: 34px;
				text-align: center;
				margin: 50px auto 30px;
  			  	background-image: url('/img/activities/mobile/title_bg.png');
  			}
		}
		.step-content {
			display: flex;
			text-align: justify;
			@media screen and (max-width: 1000px) {
  			  	display: block;
  			}
			.left {
				width: 445px;
				height: 295px;
				padding: 15px 15px 15px 100px;
				background-image: url('/img/activities/pc/step_1.png');
				@media screen and (max-width: 1000px) {
					width: 325px;
					height: 367px;
					padding: 40px 20px 40px 60px;
  			  		background-image: url('/img/activities/mobile/step_1.png');
					margin: 0 auto;
  				}
				.content {
					line-height: 24px;
					@media screen and (max-width: 1000px) {
						line-height: 24px;
  					}
				}
			}
			.right {
				.right-top {
					display: flex;
					margin-bottom: 10px;
					justify-content: space-between;
					@media screen and (max-width: 1000px) {
  					  	display: block;
  					}
					.right-top-left {
						width: 265px;
						height: 130px;
						padding: 15px 15px 15px 100px;
						background-image: url('/img/activities/pc/step_2.png');
						@media screen and (max-width: 1000px) {
							width: 325px;
							height: 127px;
							margin-top: 30px;
							padding: 40px 20px 40px 60px;
  			  				background-image: url('/img/activities/mobile/step_2.png');
							margin: 0 auto;
  						}
					}
					.right-top-right {
						width: 345px;
						height: 130px;
						padding: 15px 15px 15px 100px;
						background-image: url('/img/activities/pc/step_3.png');
						@media screen and (max-width: 1000px) {
							width: 325px;
							height: 175px;
							margin-top: 30px;
							padding: 40px 20px 40px 60px;
  			  				background-image: url('/img/activities/mobile/step_3.png');
							margin: 0 auto;
  						}

					}
				}
				.right-bottom {
					display: flex;
					justify-content: space-between;
					@media screen and (max-width: 1000px) {
  					  	display: block;
  					}
					.right-bottom-left {
						width: 367px;
						height: 155px;
						padding: 15px 15px 15px 100px;
						background-image: url('/img/activities/pc/step_4.png');
						@media screen and (max-width: 1000px) {
							width: 325px;
							height: 223px;
							margin-top: 30px;
							padding: 40px 20px 40px 60px;
  			  				background-image: url('/img/activities/mobile/step_4.png');
							margin: 0 auto;
  						}
					}
					.right-bottom-right {
						width: 297px;
						height: 155px;
						padding: 15px 15px 15px 100px;
						background-image: url('/img/activities/pc/step_5.png');
						@media screen and (max-width: 1000px) {
							width: 325px;
							height: 151px;
							margin-top: 30px;
							padding: 40px 20px 40px 60px;
  			  				background-image: url('/img/activities/mobile/step_5.png');
							margin: 0 auto;
  						}
					}
				}
			}
			.content {
				font-size: 14px;
				line-height: 20px;
				color: rgba(0, 0, 0, 0.5);
				.step-title {
					color: rgba(0, 0, 0, 0.85);
				}
				a {
					text-decoration: none;
            		color: #002fa7;
					cursor: pointer;
				}
				span {
					color: rgba(0, 0, 0, 0.85);
				}
			}
		}
		.guide {
			margin-top: 38px;
			width: 1120px;
			height: 251px;
			background: url('/img/activities/pc/bg.png') no-repeat;
			background-size: 100% 100%;
			@media screen and (max-width: 1000px) {
				width: 100%;
				height: auto;
  			  	background: none;
			}
			.guide-box {
				padding: 20px 210px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				@media screen and (max-width: 1000px) {
					display: block;
					padding: 0;
					text-align: center;
				}
				.guide-content {
					text-align: left;
					p {
						line-height: 40px;
						color: #000;
						font-size: 18px;
						font-weight: 400;
						@media screen and (max-width: 1000px) {
							line-height: 26px;
							font-size: 16px;
						}
					}
					a {
						text-decoration: none;
            			color: #002fa7;
						cursor: pointer;
					}
					.line {
						margin-top: 10px;
						width: 445px;
						@media screen and (max-width: 1000px) {
							width: 100%;
						}
					}
				}
				.guide-qr-code {
					width: 170px;
					height: 170px;
					@media screen and (max-width: 1000px) {
						margin-top: 20px;
					}
				}
			}
		}
	}
	.activities-filter {
		padding-top: 20px;
		 @media (max-width: 1000px) {
            display: none;
        }
		.label-font{
            span{
                font-size: 15px;
            }
        }
        .el-form-item {
            margin-bottom: 0;
            margin-right: 20px;
            @media (max-width: 1000px) {
                margin-bottom: 20px;
                margin-right: 0;
				width: 100%;
            }
            /deep/ .el-form-item__content {
                @media (max-width: 1000px) {
                    width: 100%;
                } 
            }
            /deep/ .el-form-item__label {
            	color: #000;
            	font-size: 18px;
            	font-size: 18px;
            	vertical-align: center;
            	@media (max-width: 1000px) {
            	    display: none !important;
            	}
        	}
        }
	}
	.filter-tags {
      	@media screen and (max-width: 1000px) {
      	  	display: none;
      	}
      	margin-top: 9px;
      	li {
      	  	display: inline-block;
      	  	font-size: 14px;
      	  	line-height: 14px;
      	  	padding: 9px 16px;
      	  	border: 1px solid #002fa7;
      	  	border-radius: 32px 32px 32px 32px;
      	  	margin-right: 20px;
			margin-top: 10px;
      	  	span {
      	  	  	margin-left: 10px;
      	  	  	color: #002fa7;
      	  	  	cursor: pointer;
      	  	}
    	}
	}
	.activities-list {
		margin-top: 30px;
		.no-data-info {
			text-align: center;
		}
		.activities-list-item {
			position: relative;
			width: 350px;
        	margin: 0 25px 30px 0;
        	box-sizing: border-box;
        	box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
        	border-radius: 8px;
        	display: inline-block;
        	padding: 36px 20px 24px 20px;
			text-decoration: none;
			cursor: pointer;
			&:hover {
				box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2);
			}
			@media screen and (max-width: 1000px) {
  			  	width: 100%;
				height: auto;
          		padding: 30px 22px 35px 23px;
  			}
			
			.activities-list-item-title {
				font-size: 20px;
				line-height: 30px;
				height: 90px;
				text-overflow: ellipsis;
          		overflow: hidden;
          		display: -webkit-box;
          		-webkit-line-clamp: 3;
          		-webkit-box-orient: vertical;
				margin-bottom: 20px;
				color:rgba(0, 0, 0, 1);
				@media screen and (max-width: 1000px) {
  			  		font-size: 16px;
					line-height: 26px;
					height: 72px;
  				}
			}
			.activities-list-item-field {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin-bottom: 14px;
				font-size: 14px;
				color: rgba(0, 0, 0, 0.5);
				.lable {
					color: rgba(0, 0, 0, 0.5);
				}
			}
			.activities-list-item-labels {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 14px;
				color: rgba(0, 0, 0, 0.5);
				.lable {
					color: rgba(0, 0, 0, 0.5);
				}
			}
			.activities-list-item-info {
				position: absolute;
				right: 0;
				top: 0;
				color: #fff;
				font-size: 16px;
				img {
					width: 51px;
					height: 32px;
				}
				span {
					position: absolute;
					top: 6px;
					right: 6px;
					line-height: 18px;
				}
			}
		}
		.activities-list-item:nth-child(3n) {
        	margin-right: 0;
      	}
	}
	.video-btn-pc {
		float: right;
		margin-right: 0;
		img {
			width: 152px;
			height: 40px;
		}
		@media (max-width: 1000px) {
            display: none;
        }
	}
	.video-btn-mobile {
		display: none;
		@media (max-width: 1000px) {
			display: block;
			text-align: center;
			img {
				width: 91px;
				height: 24px;
			}   
        }
	}
}

</style>
