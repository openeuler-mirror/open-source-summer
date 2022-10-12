<template>
    <div class="mooc">
        <common-banner
        :pc-src="'/img/learn/mooc-banner.png'"
        :mobile-src="'/img/learn/mooc-banner.png'"
        :inside-name="'MOOC'"
        :outside-name="i18n.learn.MOOC"
        ></common-banner>
        <div class="course-list">
            <div class="course-item" v-for="(item,index) in i18n.learn.MOOC_COURSE">
                <img :src="item.IMG" alt="" @click="toDetail(item.ID)" />
                <div class="course-info">
                    <p @click="toDetail(item.ID)">{{ item.TITLE }}</p>
                    <p>{{ item.DESC }}</p>
                    <div class="btn">
                        <div @click="toDetail(item.ID)">{{ i18n.learn.BTN_LEARN }}</div>
                        <div @click="go(item.APPLY_LINK)">{{ i18n.learn.BTN_APPLY }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        toDetail(id) {
            this.$router.push(
            {
                path:'/' + this.$lang + '/learn/mooc/detail/',
                query: {
                    id: id
                }
            });
        },
        go(path) {
            if(path) {
                window.open(path);
            }
        }
    }

}
</script>

<style lang="less" scoped>
.mooc .course-list {
    width: 1120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .course-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 60px;
        img {
            width: 400px;
            height: 200px;
            display: block;
            cursor: pointer;
        }
        .course-info {
            width: 660px;
            padding: 31px 0;
            p {
                font-size: 14px;
                line-height: 24px;
                color: rgba(0, 0, 0, 0.5);
                margin-bottom: 31px;
                &:first-of-type {
                    font-size: 24px;
                    line-height: 34px;
                    color: #000000;
                    margin-bottom: 16px;
                    cursor: pointer;
                }
            }
            .btn {
                div {
                    width: 104px;
                    height: 32px;
                    display: inline-block;
                    text-align: center;
                    background: #002FA7;
                    border-radius: 4px;
                    font-size: 16px;
                    line-height: 32px;
                    color: #ffffff;
                    cursor: pointer;
                    &:last-of-type {
                        margin-left: 40px;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .mooc .course-list {
        flex-direction: column;
        width: 100%;
        margin-top: 40px;
        .course-item {
            flex-direction: column;
            padding: 22px;
            width: 315px;
            height: 274px;
            background: #FFFFFF;
            box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            margin: 0 auto 40px auto;
            img {
                width: 270px;
                height: 150px;
            }
            .course-info {
                padding: 0;
                width: 100%;
                p {
                    &:first-of-type {
                        font-size: 16px;
                        line-height: 26px;
                        margin: 20px 0 10px 0;
                    }
                    &:last-of-type {
                        display: none;
                    }
                }
                .btn {
                    div {
                        background: #ffffff;
                        border-radius: 0;
                        font-size: 12px;
                        color: #002FA7;
                        line-height: 16px;
                        width: auto;
                        height: auto;
                    }
                }
            }
        }
    }
}
</style>