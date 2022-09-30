<template>
    <div class="container devday">
        <div class="banner">
            <a href="https://e-campaign.huawei.com/m/mIzQFr" target="_blank"><img :src="i18n.interaction.DEVDAY_2021.PC_BANNER" alt="" /></a>
        </div>
        <div class="h5-banner">
            <div class="title">峰会</div>
            <a href="https://e-campaign.huawei.com/m/mIzQFr" target="_blank"><img :src="i18n.interaction.DEVDAY_2021.H5_BANNER" alt="" /></a>
        </div>
        <titlenav v-show="isShowNav" :currentIndex="activeIndex" :dataList="navList"></titlenav>
        <div class="text-wrapper">
            <p class="text">openEuler Developer Day 2021 是由 openEuler 社区发起，面向社区开发者的一场技术盛会。旨在推动 openEuler 社区在多样性计算、云原生全栈、全场景协同等技术发展方向的持续探索和创新。本次大会以开放工作会议以及小组讨论等形式，让开发者找到关注的技术小组、快速融入社区、围绕下一版本发布，热点技术方向，用户核心需求，展开面对面的头脑风暴。每一个开发者都是 openEuler 社区的一颗星，一滴水，最终点点滴滴汇聚成科技创新的星辰大海。</p>
            <liveroom :liveData="liveList" :isPass="true" class="devday"></liveroom>
            <div id="agenda">
                <div class="title">
                    <img v-lazy="'/img/summit/devday-2021/agenda/agenda-h5.png'" alt="" v-if="isShowH5" />
                    <img v-lazy="'/img/summit/devday-2021/agenda/agenda-web.png'" alt="" v-else />
                </div>
                <div class="time-box">
                    <el-radio-group v-model="currentTime">
                        <el-radio-button label="forenoon">上午</el-radio-button>
                        <el-radio-button label="afternoon">下午</el-radio-button>
                        <el-radio-button label="evening">晚上</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="calendar-content" v-if="currentTime === 'forenoon'">
                    <img v-lazy="'/img/summit/devday-2021/agenda/mo_agenda.png'" alt="" v-if="isShowH5"/>
                    <img v-lazy="'/img/summit/devday-2021/agenda/web_agenda.png'" alt="" v-else/>
                </div>
                <carousel :agendaData="agenda_obj" :sigData="sig_obj" v-else-if="currentTime === 'afternoon'">
                    <img :src="otherSrc" alt="" class="other-sig" slot="othersig" />
                </carousel>
                <div class="party-box" v-else>
                    <img v-lazy="'/img/summit/devday-2021/agenda/party-h5.png'" alt="" v-if="isShowH5"/>
                    <img v-lazy="'/img/summit/devday-2021/agenda/party-web.png'" alt="" v-else/>
                </div>
            </div>
        </div>
        <div class="lecturer" id="lecturer">
            <div class="title">
                <img v-lazy="lecturerBanner.mobile" alt="" v-if="isShowH5" />
                <img v-lazy="lecturerBanner.web" alt="" v-else />
            </div>
            <div class="lecturer-box" v-fade v-if="lecturerList.length && !isShowH5">
                <div class="item fade-in"  v-for="(item,index) in lecturerList" :key="index">
                    <img v-lazy="item.IMG" alt="" />
                    <p>{{ item.NAME }}</p>
                    <p>{{ item.POSITION }}</p>
                </div>
            </div>
            <div class="lecturer-box" v-fade v-if="lecturerList.length && isShowH5">
                <div :class="['item','fade-in',index > 7 && flag?'hidden':'']"  v-for="(item,index) in lecturerList" :key="index">
                    <img v-lazy="item.IMG" alt="" />
                    <p>{{ item.NAME }}</p>
                    <p>{{ item.POSITION }}</p>
                </div>
            </div>
            <div class="show-all" @click="showAll" v-if="isShowH5">
                <p>{{ flag?i18n.home.EXPAND:i18n.home.RETRACT }}</p>
                <img v-if="flag" v-lazy="'/img/home/arrow.svg'" alt="">
                <img v-if="!flag" v-lazy="'/img/home/arrowUp.svg'" alt="">
            </div>
        </div>
        <div class="lecturer community" id="community">
            <div class="title">
                <img v-lazy="communityBanner.mobile" alt="" v-if="isShowH5" />
                <img v-lazy="communityBanner.web" alt="" v-else />
            </div>
            <div class="lecturer-box" v-fade v-if="communityList.length">
                <div class="item fade-in"  v-for="(item,index) in communityList" :key="index">
                    <img v-lazy="item.IMG" alt="" />
                    <p>{{ item.NAME }}</p>
                    <p>{{ item.POSITION }}</p>
                </div>
            </div>
        </div>
        <div class="host-unit" id="host-unit">
            <div class="title">
                <img v-lazy="hostUnitObj.mobile" alt="" v-if="isShowH5" />
                <img v-lazy="hostUnitObj.web" alt="" v-else />
            </div>
            <div class="img-list">
                <img v-lazy="item.IMG" alt="" v-for="(item,index) in hostUnitList" @click="go(item.LINK)" />
            </div>
        </div>
        <div class="co-organizer">
            <div class="title">
                <img v-lazy="coOrgObj.mobile" alt="" v-if="isShowH5" />
                <img v-lazy="coOrgObj.web" alt="" v-else />
            </div>
            <div class="img-list">
                <img v-lazy="item.IMG" alt="" v-for="(item,index) in coOrgList" @click="go(item.LINK)" />
            </div>
        </div>
        <div class="foundation">
            <div class="title">
                <img v-lazy="foundationObj.mobile" alt="" v-if="isShowH5" />
                <img v-lazy="foundationObj.web" alt="" v-else />
            </div>
            <div class="img-list">
                <img v-lazy="item.IMG" alt="" v-for="(item,index) in foundationList" @click="go(item.LINK)" />
            </div>
        </div>
        <div class="media">
            <div class="title">
                <img v-lazy="mediaObj.mobile" alt="" v-if="isShowH5" />
                <img v-lazy="mediaObj.web" alt="" v-else />
            </div>
            <div class="media-box">
                <img v-lazy="'/img/summit/devday-2021/infoq.png'" alt="" @click="go('https://www.geekbang.org/')" />
            </div>
        </div>
        <div class="review-wrapper">
            <div class="top">
                <span>精彩回顾</span>
                <img src="/img/summit/devday-2021/review.png">
            </div>
            <div @click="go('/interaction/summit-list/')" class="link">openEuler Summit 2020</div>
            <div @click="go('/interaction/summit-list/list/')" class="link">openEuler Virtual Summit 2020</div>
        </div>
    </div>
</template>

<script>
import carousel from './carousel.vue';
import titlenav from './titleNav.vue';
import liveroom from './liveroom.vue';
export default {
    data() {
        return {
            liveList: {
               RENDERDATA:[
                    {
                    ID: 8765,
                    THEME: 'openEuler developer day 2021',
                    TIME: '9:10 - 12:00',
                    OPTION: '9:10 - 12:00 openEuler developer day 2021',
                    LIVEURL: 'https://vhall.huawei.com/v2/watch/8765?lang=zh&thirdId='
                },
                {
                    ID: 8766,
                    THEME: 'Linux内核',
                    TIME: '13:30 - 15:30',
                    OPTION: '13:30 - 15:30 Linux内核',
                    LIVEURL: 'https://vhall.huawei.com/v2/watch/8766?lang=zh&thirdId='
                },
                {
                    ID: 8767,
                    THEME: '云原生&虚拟化',
                    TIME: '13:30 - 15:50',
                    OPTION: '13:30 - 15:50 云原生&虚拟化',
                    LIVEURL: 'https://vhall.huawei.com/v2/watch/8767?lang=zh&thirdId='
                },
                {
                    ID: 8768,
                    THEME: '安全',
                    TIME: '13:30 - 15:50',
                    OPTION: '13:30 - 15:50 安全',
                    LIVEURL: 'https://vhall.huawei.com/v2/watch/8768?lang=zh&thirdId='
                },
                {
                    ID: 8769,
                    THEME: '兼容性',
                    TIME: '13:30 - 15:30',
                    OPTION: '13:30 - 15:30 兼容性',
                    LIVEURL: 'https://vhall.huawei.com/v2/watch/8769?lang=zh&thirdId='
                },
                {
                    ID: 8770,
                    THEME: '多样性算力',
                    TIME: '13:30 - 15:30',
                    OPTION: '13:30 - 15:30 多样性算力',
                    LIVEURL: 'https://vhall.huawei.com/v2/watch/8770?lang=zh&thirdId='
                }
               ],
               LIVETITLE: "峰会直播间"
            },
            isShowNav: false,
            activeIndex: 0,
            otherSrc: '',
            navList: [
                {
                    key: '#liveroom',
                    name: '精彩回顾'
                },
                {
                    key: '#agenda',
                    name: '大会日程'
                },
                {
                    key: '#lecturer',
                    name: '演讲嘉宾'
                },
                {
                    key: '#community',
                    name: '社区天团'
                },
                {
                    key: '#host-unit',
                    name: '合作伙伴'
                }
            ],
            currentTime: 'forenoon',
            agenda_obj: {
                TIME_LIST: ['13:30-13:40','13:40-14:10','14:10-14:30','14:30-14:50','14:50-15:10','15:10-15:30','15:30-15:50'],
                CARD_LIST: [
                    {
                        TITLE: ['Session 1','Linux内核'],
                        ITEM_LIST: [
                            {
                                TIME: '13:30-13:40',
                                THEME: '联合出品人开场致辞',
                                SPEAKER: ['郭寒军 openEuler社区技术委员会委员','李勇 Linux bcache Maintainer','胡松 麒麟软件内核核心开发者'],
                            },
                            {
                                TIME: '13:40-14:10',
                                THEME: 'openEuler 21.03创新版本特性介绍 – Seamless kernel update & 千核调度释放多样性算力',
                                SPEAKER: ['朱玲 华为技术有限公司研发工程师','谢秀奇 openEuler kernel Maintainer'],
                                DESC: ['目前内核代码量巨大，BUG CVE频发，热补丁和热迁移都有其局限性，希望通过热升级来达到升级内核而不影响用户业务的效果，']
                            },
                            {
                                TIME: '14:10-14:30',
                                THEME: '麒麟软件InfiniBand Network Block Device 分享',
                                SPEAKER: ['江国庆 麒麟软件内核资深技术专家']
                            },
                            {
                                TIME: '14:30-14:50',
                                THEME: 'bcache并行IO处理框架',
                                SPEAKER: ['李勇 Linux bcache Maintainer'],
                                DESC: ['bcache是block层的cache，在分布式文件系统中有着越来越广泛的应用。本topic介绍bcache的并行IO框架closure的技术原理，以及使用closure的场景和性能优势。']
                            },
                            {
                                TIME: '14:50-15:10',
                                THEME: 'CPU积分特性的应用和实践',
                                SPEAKER: ['涂国义 中国电信虚拟化高级工程师'],
                                DESC: ['天翼云云主机的规格决定了其基准性能（基准性能是云主机可以持续稳定提供的CPU性能）。针对特定规格的云主机，云平台会限定其cpu使用率，使其不超过基准性能。然而对于一些有突发性性能需求的应用场景（比如云主机内部负载大部分时间比较低，偶尔有突发的高CPU使用率业务），用户不得不选择高规格的云主机来满足需求，这样不仅增加了用户成本，还降低了资源利用率。在基准性能限制的基础上，天翼云提供一种cpu积分机制，可以将云主机闲时的cpu算力通过积分方式累计起来，在需要突发性能的时间段内通过消耗cpu积分允许超额使用cpu算力。当积分耗尽时，再限制云主机cpu算力，使其恢复至基准cpu性能范围内。']
                            },
                            {
                                TIME: '15:10-15:30',
                                THEME: '麒麟信安基于Linux内核PRP并行冗余高可用性网络',
                                SPEAKER: ['秦云高 麒麟信安科技股份有限公司内核研发工程师'],
                                DESC: ['网络通信的高可靠性在越来越多的领域被重视，PRP并行冗余网络技术已广泛应用于军事、金融、国家电网等安全关键领域。PRP从理论上实现了零自愈时间和零丢包率的无缝切换效果。','本次演讲主要内容包括：','1、 PRP总体架构','2、PRP并行冗余实现原理','3、当前Linux内核PRP实现去重算法的问题','4、新的基于滑动窗口和位图表的去重算法']
                            }
                        ]
                    },
                    {
                        TITLE: ['Session 2','云原生&虚拟化'],
                        ITEM_LIST: [
                            {
                                TIME: '13:30-13:40',
                                THEME: '联合出品人开场致辞',
                                SPEAKER: ['蔡灏旻 兼容性SIG组maintainer','沈翔 普华基础软件事业部总经理'],
                            },
                            {
                                TIME: '13:40-14:10',
                                THEME: '普华的云原生构建之路',
                                SPEAKER: ['董自强 普华基础软件事业部 产品部总经理'],
                                DESC: ['云方向的新版本发布']
                            },
                            {
                                TIME: '14:10-14:30',
                                THEME: '华为云云原生应用与实践',
                                SPEAKER: ['马达 华为技术有限公司华为云批量计算首席架构师'],
                                DESC: ['华为云推出了以应用为中心的云原生2.0理念；该理念是华为云云原生团队实践的结果。该议题主要介绍华为云云原生团队在 网络，计算 (引擎)，调度 方面的实践经验。并对未来技术展望']
                            },
                            {
                                TIME: '14:30-14:50',
                                THEME: '虚拟机迁移特性分享',
                                SPEAKER: ['黄勇 中国电信虚拟化高级工程师'],
                                DESC: ['围绕如何计算内存脏页速率、如何通过减少数据传输总量，增大数据传输吞吐来加速迁移。如下：','1. 增大数据传输吞吐可以加速吞吐，介绍一种基于multifd实现迁移加速的方法','2. kvm新的内存标脏技术介绍，dirty ring','3. 通过减少传输量来提升迁移效率的可行性介绍']
                            },
                            {
                                IME: '14:50-15:10',
                                THEME: '基于云原生OS的生物信息平台服务',
                                SPEAKER: ['周中元 华为技术有限公司开源软件工程师，OpenEuler sig-bio 主要负责人','蒋庆华 哈尔滨工业大学生命科学与技术学院教授、博士生导师、国家优青'],
                                DESC: ['生物信息技术是未来高性能计算和云计算的主要应用领域之一，市场潜力巨大。而基于云原生的生物信息学研究是未来生信分析的重要发展趋势。OpenEuler的sig-bio组致力于打造基于OpenEuler的云原生OS的生信软件仓库，集成60+高频生信开源软件包，解决生信环境部署的软件依赖和版本问题。依托云原生OS，提供开箱即用、方便复现的生信开发环境配置，实现计算资源的弹性分配，以吸纳当前传统生信用户向OpenEuler迁移。']
                            },
                            {
                                IME: '15:10-15:30',
                                THEME: '快人一步！云宏升级虚拟化基础架构，应用全面提速',
                                SPEAKER: ['罗云 云宏信创云产品经理'],
                                DESC: ['面向数字化转型、指数级裂变的创新应用需求，客户需要更可靠、更弹性的虚拟化云平台保证多样化算力性能和业务平滑过渡，云宏携手openEuler、鲲鹏boostkit解决方案为用户带来更快、更放心的云基础设施，为全行业信息应用创新全面提速！']
                            },
                            {
                                IME: '15:30-15:50',
                                THEME: '基于openEuler的虚拟化技术优化方法和实践',
                                SPEAKER: ['邸津 广州市品高软件股份有限公司生态总监']
                            }
                        ]
                    },
                    {
                        TITLE: ['Session 3','安全'],
                        ITEM_LIST: [
                            {
                                TIME: '13:30-13:40',
                                THEME: '联合出品人开场致辞',
                                SPEAKER: ['管延杰 ','石勇 openEuler社区技术委员会委员'],
                            },
                            {
                                TIME: '13:40-14:10',
                                THEME: '基于openEuler实现E2E系统完整性保护',
                                SPEAKER: ['魏刚 华为技术有限公司安全技术专家','朱健伟 华为技术有限公司操作系统安全架构师'],
                                DESC: ['整体介绍openEuler安全技术在社区应用及未来规划的情况，包括IMA、SecGear，介绍新的孵化项目鲲鹏安全库（kunpengsecl）在可信计算方面的初步规划和整体架构设想，欢迎社区开发者积极参与各个环节的贡献。']
                            },
                            {
                                TIME: '14:10-14:30',
                                THEME: '麒麟信安基于LSM框架完整性和多级安全模块实现',
                                SPEAKER: ['戴宏剑 麒麟信安科技股份有限公司研发工程师'],
                                DESC: ['系统安全作为信息安全的基石在各行各业都有着至关重要的作用，Linux下LSM框架具有很好的扩展性，完整性安全模块就是基>于此框架下实现了系统完整性控制要求，从而增强了系统的安全管控达到定制需求。'] 
                            },
                            {
                                TIME: '14:30-14:50',
                                THEME: '360安全大脑赋能“新”终端安全',
                                SPEAKER: ['魏小强 360未来安全研究院副院长'],
                                DESC: ['介绍在 openEuler 系统上虚拟化性能的优化分享，包括存储、计算等性能的优化技术'] 
                            },
                            {
                                TIME: '14:50-15:10',
                                THEME: '蓬莱TEE与openEuler的整合',
                                SPEAKER: ['杜东 上海交大并行与分布式系统实验室博士生，蓬莱可信执行环境项目负责人'],
                                DESC: ['蓬莱TEE是RISC-V上主流的国内自研的开源隔离执行环境系统。与国内外同类优秀系统的对比，在可扩展性（隔离环境数、安全内存）和系统性能方面具有数量级的优势，并且能够支持如无服务计算等高并发低时延场景。蓬莱目前已完成和openEuler（RISC-V架构）的初步整合。'] 
                            },
                            {
                                TIME: '15:10-15:30',
                                THEME: 'Linux生态中应用程序安全检测工具及实践',
                                SPEAKER: ['王衍豪 奇安信技术研究院安全研究员'],
                            },
                            {
                                TIME: '15:30-15:50',
                                THEME: '容器安全的应用与实践',
                                SPEAKER: ['凌杰 绿盟科技云原生安全资深架构师'],
                            }
                        ]
                    },
                    {
                        TITLE: ['Session 4','兼容性'],
                        ITEM_LIST: [
                            {
                                TIME: '13:30-13:40',
                                THEME: '联合出品人开场致辞',
                                SPEAKER: ['杜开田 openEuler社区兼容性SIG组maintainer','叶青龙 统信服务器欧拉版研发负责人'],
                            },
                            {
                                TIME: '13:40-14:10',
                                THEME: '共建openEuler分布式测试生态',
                                SPEAKER: ['吴峰光 华为技术有限公司openEuler技术专家'],
                                DESC: ['本议题方向确保各个派生OS在各自发挥创造性的同时，保持基础兼容性，以便从统一生态中持续获益。通过持续集成测试是长期、实时确保兼容性的最佳途径。','同时我们将介绍Compass CI的基本特点，并探讨如何构建统一的openEuler分布式测试生态。']
                            },
                            {
                                TIME: '14:10-14:30',
                                THEME: '统信软件：携手共进，丰富国产操作系统生态',
                                SPEAKER: ['高冲 统信软件资深研发工程师'],
                                DESC: ['介绍统信软件在UOS操作系统生态建设的成果，主要包括开源或商业软件适配中的经典案例以及未来在软件生态适配中的规划。分享实战案例总结出的典型问题、解决方案，期望能够对openEuler生态适配提供更多的帮助。']
                            },
                            {
                                TIME: '14:30-14:50',
                                THEME: 'openEuler系统硬件兼容性生态建设',
                                SPEAKER: ['姚伟 华为技术有限公司高级工程师','莫良伟 深圳市宝德计算机系统有限公司软件开发部总监']
                            },
                            {
                                TIME: '14:50-15:10',
                                THEME: 'OS UEFI 接口兼容性探索与实践',
                                SPEAKER: ['陈亭岳 华为技术有限公司OS兼容性验证技术专家 ','周晓虎 Ampere Principle Engineer']
                            },
                            {
                                TIME: '15:10-15:30',
                                THEME: '开源社区三方补丁智能洞察',
                                SPEAKER: ['华为云研发效能专家魏昭'],
                                DESC: [' 针对开源生态上游仓中补丁维护的问题，提出一种社区补丁智能洞察技术来及时准确的分析开源仓提交的补丁及其关联补丁，将BugFix补丁及时、完整的合入内部仓的主干分支来修复漏洞、缺陷等，并减少编译问题，从而保障代码的安全和可信。']
                            }
                        ]
                    },
                    {
                        TITLE: ['Session 5','多样性算力'],
                        ITEM_LIST: [
                            {
                                TIME: '13:30-13:40',
                                THEME: '联合出品人开场致辞',
                                SPEAKER: ['张旭舟 华为操作系统高级开发工程师','刘勇鹏 飞腾信息技术有限公司软件生态部总经理'],
                            },
                            {
                                TIME: '13:40-14:10',
                                THEME: '拥抱智能时代的Arm基础软件开源生态',
                                SPEAKER: ['周杰 Linaro中国区负责人'],
                                DESC: ['本演讲将从Arm架构的新特性出发，从人工智能、安全、云端一体等维度来介绍Linaro如何与合作伙伴一起推动Arm基础软件开源生态的发展。同时，本演讲也将介绍Linaro和openEuler社区的相关合作。']
                            },
                            {
                                TIME: '14:10-14:30',
                                THEME: '从端到云，飞腾构建数字经济的算力底座',
                                SPEAKER: ['刘勇鹏 飞腾信息技术有限公司软件生态部总经理 ']
                            },
                            {
                                TIME: '14:30-14:50',
                                THEME: '在OS中使能服务器特性过程中的一些探索',
                                SPEAKER: ['费斐 Ampere Principle Engineer']
                            },
                            {
                                TIME: '14:50-15:10',
                                THEME: '基于RISC-V架构的多样性算力软生态',
                                SPEAKER: ['方华启 芯来科技软件总监'],
                                DESC: ['随着开放的RISC-V处理器架构技术在全世界范围内的广泛应用，越来越多的RISC-V处理器应运而生，在物联网，AI技术，5G等新技术领域也得到广泛的应用，这也就意味着RISC-V的软件生态也需要不断的发展壮大。本演讲将重点介绍基于RISC-V的（1）软件开源平台；（2）RISC-V算力生态；（3）开源社区建设。']
                            },
                            {
                                TIME: '15:10-15:30',
                                THEME: '开源如何加速软硬件协同开发',
                                SPEAKER: ['王路业 优矽总经理']
                            }
                        ]
                    }
                ]
            },
            sig_obj: {
                TITLE: 'SIG 组开放工作会议',
                SIG2_TIME: '16:00 – 18:00',
                SIG2_DETAIL: [
                    {
                        THEME: 'SIG-CloudNative & iSulad',
                        CONTENT: ['1）CloudNative SIG 成果回顾和孵化项目盘点','2）对 openEuler CloudNative SIG 的诉求收集','3）探讨 CloudNative SIG 的发展和规划'],
                        DESC: ['CloudNative SIG 致力于为广大用户、开发者、爱好者提供便捷、易用的云原生基础设施，提供简单、高效的云原生应用开发托管环境，共建云原生生态。']
                    },
                    {
                        THEME: 'SIG-security-facility & sig-confidential-computing  & security-committee',
                        CONTENT: ['1）openEuler 社区安全技术需求讨论','2）OS 及机密计算的可信执行环境中，国密算法的支持','3）机密计算新技术规划讨论','4）openEuler 社区 CVE 处理流程介绍和演示'],
                        DESC: ['security-facility SIG 通过使能主流的 Linux 安全特性，提供系统安全工具、库、基础设施等，提升系统安全性，改善现有安全技术在 openEuler 上的应用体验。','confidential-computing SIG 致力于机密计算技术在 openEuler 社区的探索和落地，包括提供统一的机密计算开发框架、支持硬件机密技术（如 Intel SGX 和 ARM Trustzone）、中间件和服务，以及面向未来的机密计算讨论和规划。','security-committee SIG 负责 openEuler 社区安全问题的管理，包括接受和响应 openEuler 安全问题报告、提供安全指导、开展安全治理等，为 openEuler 用户提供最安全的产品和开发环境。']
                    },
                    {
                        THEME: 'Infrastructure',
                        CONTENT: ['1）openEuler 基础设施社区工作回顾','2）openEuler 基础设施典型应用：','      CLA 系统实践与成长；OBS 构建系统应用与挑战；CI-Bot 现状与优化','3）openEuler 基础设施需求收集'],
                        DESC: ['Infrastructure SIG 致力于为 openEuler 社区提供稳定、可信、易用的基础设施平台和服务，包括 CI 门禁构建、OBS 包构建、邮件列表服务、门户网站等。']
                    },
                    {
                        THEME: 'SIG-openstack',
                        CONTENT: ['1）OpenStack Q&R 版本适配进度审查与讨论','2）openEuler 21.09 适配计划讨论与确定','3）OpenStack SIG 诉求收集'],
                        DESC: ['openEuler OpenStack SIG 致力于结合多样性算力为 OpenStack 社区贡献更适合行业发展的平台功能增强，并且定期组织会议为社区发展提供建议和回馈。']
                    },
                    {
                        THEME: 'SIG-release-management',
                        CONTENT: ['1）LTS 版本组件升级、软件衰退后维护策略、版本变更报告模板讨论','2）需求收集、分支管理和代码同步、版本发布等环节问题及流程讨论','3）release-management SIG 运作讨论，包括会议主持、关键特性进展汇报等'],
                        DESC: ['release-management SIG 协调社区各 SIG 完成 openEuler 社区版本开发、发布，包括规划版本发布时间表、收集管理需求、管理过程风险和问题协调、组织版本构建/转测试/发布。']
                    },
                    {
                        THEME: 'Virt',
                        CONTENT: ['1）Virt SIG 技术成果和实践总结','2）Virt SIG 技术规划讨论','3）对 Virt SIG 的诉求收集和讨论，如新增特性、开发流程、问题解决等'],
                        DESC: ['Virt SIG 致力于打造面向全场景、支撑多样性算力的虚拟化解决方案，提供高性能、高可靠和高安全的虚拟化组件。']
                    },
                    {
                        THEME: 'SIG-Migration'
                    },
                    {
                        THEME: 'SIG-ops',
                        CONTENT: ['1）以 OS 为中心的 a-ops 架构探讨','2）架构感知方案分享','3）混合补丁 & 升级机制介绍'],
                        DESC: ['ops SIG 旨在推动系统运维的可视化、自动化、智能化；构建系统数据信息体系，实现操作系统的全栈运维；提供基础设施热补丁、热替换等技术，保证基础设施服务不中断，并在运维过程中提供问题诊断、性能分析、系统调优等技术和工具。']
                    },
                    {
                        THEME: 'SIG-Compatibility-Infra'
                    },
                    {
                        THEME: 'SIG-QA',
                        CONTENT: ['1）openEuler 社区质量度量体系如何构建讨论','2）openEuler 社区如何开展众测活动探讨','3）QA SIG 未来规划讨论'],
                        DESC: ['Quality assurance，not just test! 持续构建各类质量保证能力，不断提升 openEuler 社区质量!']
                    },
                    {
                        THEME: 'Kernel',
                        CONTENT: ['需求和场景:','a）openEuler 默认采用 xfs 文件系统讨论','b）openEuler 支持实时内核讨论','c）内存可靠性问题及应对策略讨论','d）openEuler 5.10 kernel 特性规划及需求讨论','操作系统评测：','a）如何评测操作系统性能和稳定性','社区运作:','a）网讯设备对 openEuler 社区的支持讨论','b）openEuler kernel SIG 会议运作','c）kernel 合作开发、committer 运作机制'],
                        DESC: ['内核是操作系统的基础，终有一天，openEuler Kernel 将支撑着各行各业运行的 openEuler 系统及 openEuler 的衍生系统。期待您的参与能让 openEuler 运行的更好，让各行各业受益。']
                    },
                    {
                        THEME: 'SIG-UKUI',
                        CONTENT: ['1）openEuler 社区 UKUI 目前的进展和规划','2）评估在社区引入麒麟影音和麒麟音乐的可行性'],
                        DESC: ['UKUI SIG 小组致力于将 UKUI 桌面环境提供到 openEuler 社区中，为用户带来简单易用，便捷高效的桌面使用体验。']
                    },
                    {
                        THEME: 'SIG-OKD',
                        CONTENT: ['1）讨论制定 OKD 引进 openEuler 社区的计划','2）探讨 OKD 底层容器引擎切换为 isulad 的可行性','3）介绍 OKD 原生社区最新发行版兼容 aarch64 的情况'],
                        DESC: ['OKD 是基于 kubernetes 的企业级 PaaS 平台，openEuler OKD SIG 致力于依托 openEuler 社区生态，发展多引擎、多平台的 OKD 衍生版本。']                       
                    },
                    {
                        THEME: 'SIG-Ha',
                        CONTENT: ['1）HA SIG 当前技术及实践总结','2）HA SIG 发展规划和路标讨论','3）用户 HA 需求收集和讨论'],
                        DESC: ['openEuler HA SIG 致力于将 HA 这个业界知名的开源企业级高可用解决方案引入至 openEuler 社区中，并进行相关适配、迁移和优化，帮助用户解决生产环境的实际问题。']     
                    },
                    {
                        THEME: 'DB',
                        CONTENT: ['1）DB SIG 近期工作规划，含配合 openEuler 发布周期的软件包引入，版本策略以及优化相关事宜','2）DB SIG 维护和开发责任梳理和划分','3）现有成员及开源贡献组织投入建议和计划等','4）DB 未来技术演进讨论'],
                        DESC: ['openEuler DB SIG 致力于推动 openEuler 开源操作系统与各主流开源数据库的适配与融合，推动基础软件根技术发展，打造开放可靠的开源数据库技术栈。'] 
                    },
                    {
                        THEME: 'SIG-RISC-V',
                        CONTENT: ['1）openEuler RISC-V SIG 当前特性介绍和未来版本规划','2）未来技术路标讨论','3）轮值会议机制讨论'],
                        DESC: ['openEuler RISC-V SIG 持续构建发布 openEuler RISC-V 版本，作为提供支持 RISC-V 南北向生态的统一稳定的创新平台，并为广大企业、组织、技术爱好者提供 openEuler RISC-V 的软件包编译、系统构建等指导，推动 openEuler 更好的完成对于多样化算力的支持。']
                    },
                    {
                        THEME: 'Compiler',
                        CONTENT: ['1）Compiler SIG 成果回顾','2）Compiler SIG 技术路标','3）Compiler 诉求收集'],
                        DESC: ['Compiler SIG 专注于编译优化技术，目前覆盖的产品包括：JVM、LLVM 和 GCC。在 openEuler 社区中积极演化编译技术的发展，同时回馈到上游社区。']   
                    }
                ]
            },
            flag: true,
            lecturerBanner:{
                web: '/img/summit/home/lecturer/zh-pc-lecturer.png',
                mobile: '/img/summit/home/lecturer/zh-mobile-lecturer.png'
            },
            lecturerList: [
                {
                    IMG: '/img/summit/devday-2021/lecturer/niguangnan.png',
                    NAME: '倪光南',
                    POSITION: '中国工程院院士'
                },
                {
                    IMG: '/img/summit/home/lecturer/dujunping.png',
                    NAME: '堵俊平',
                    POSITION: '开放原子开源基金会TOC主席 / 云与计算开源业务总经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/chehab.png',
                    NAME: 'Mauro Carvalho  Chehab',
                    POSITION: 'Linux 社区 Maintainer'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/tuguoyi.png',
                    NAME: '涂国义',
                    POSITION: '中国电信虚拟化高级工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/wangyao.png',
                    NAME: '王耀',
                    POSITION: '百度云总架构师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhongxin.png',
                    NAME: '钟忻',
                    POSITION: '中国建行金科首席技术官'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/weixiaoqiang.png',
                    NAME: '魏小强',
                    POSITION: '360未来安全研究院副院长'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/huangyong.png',
                    NAME: '黄勇',
                    POSITION: '中国电信虚拟化高级工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/lijiansheng.png',
                    NAME: '李建盛',
                    POSITION: '开源之道主创 / Linux基金会 APAC 开源布道者 '
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/huotaiwen.png',
                    NAME: '霍太稳',
                    POSITION: '极客邦科技创始人 & CEO'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/wangyunbo.png',
                    NAME: '王蕴博',
                    POSITION: '滴滴开源技术负责人'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/liujunwei.png',
                    NAME: '刘军卫',
                    POSITION: '中国移动云能力中心laaS产品部总经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/fangbingyi.png',
                    NAME: '房秉毅',
                    POSITION: '联通数科云计算研发部负责人'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zouqiubo.png',
                    NAME: '邹秋波',
                    POSITION: '光大银行信息科技部云技术管理处技术专家'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/liuwenzong.png',
                    NAME: '刘文宗',
                    POSITION: '国电南瑞北京科东公司平台架构师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/weizhao.png',
                    NAME: '魏昭',
                    POSITION: '华为云研发效能专家'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/chentingyue.png',
                    NAME: '陈亭岳',
                    POSITION: '华为OS兼容性验证技术专家'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/caihaomin.png',
                    NAME: '蔡灏旻',
                    POSITION: '华为容器团队架构师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/yaowei.png',
                    NAME: '姚伟',
                    POSITION: '华为高级工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhangxuzhou.png',
                    NAME: '张旭舟',
                    POSITION: '华为操作系统高级开发工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/mada.png',
                    NAME: '马达',
                    POSITION: '华为云批量计算首席架构师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhulin.png',
                    NAME: '朱玲',
                    POSITION: '华为研发工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/yeqinglong.png',
                    NAME: '叶青龙',
                    POSITION: '统信服务器欧拉版研发负责人'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/gaochong.png',
                    NAME: '高冲',
                    POSITION: '统信软件资深研发工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/daihongjian.png',
                    NAME: '戴宏剑',
                    POSITION: '麒麟信安科技 股份有限公司研发工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/shenxiang.png',
                    NAME: '沈翔',
                    POSITION: '普华基础软件事业部总经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/wujingzheng.png',
                    NAME: '吴敬征',
                    POSITION: '中国科学院软件研究所研究员'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/dongziqiang.png',
                    NAME: '董自强',
                    POSITION: '普华基础软件事业部 产品部总经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhoujie.png',
                    NAME: '周杰',
                    POSITION: 'Linaro 中国区负责人'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/liuyongpeng.png',
                    NAME: '刘勇鹏',
                    POSITION: '飞腾信息技术有限公司软件生态部总经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/feifei.png',
                    NAME: '费斐',
                    POSITION: 'Ampere Principle Engineer'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhouxiaohu.png',
                    NAME: '周晓虎',
                    POSITION: 'Ampere Principle Engineer'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/fanghuaqi.png',
                    NAME: '方华启',
                    POSITION: '芯来科技软件 总监'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/wangluye.png',
                    NAME: '王路业',
                    POSITION: '优矽总经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/wangyanhao.png',
                    NAME: '王衍豪',
                    POSITION: '奇安信技术研究院安全研究员'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/dijin.png',
                    NAME: '邸津',
                    POSITION: '广州市品高软件 股份有限公司 生态总监'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/luoyun.png',
                    NAME: '罗云',
                    POSITION: '云宏信创云 产品经理'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/linjie.png',
                    NAME: '凌杰',
                    POSITION: '绿盟科技云原生安全资深架构师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/moliangwei.png',
                    NAME: '莫良伟',
                    POSITION: '深圳市宝德 计算机系统有限公司 软件开发部总监'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/dudong.png',
                    NAME: '杜东',
                    POSITION: '上海交大并行与分布式系统实验室博士生/蓬莱可信执行环境项目负责人'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/gaokun.png',
                    NAME: '高琨',
                    POSITION: 'openEuler合规SIG maintainer'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/lizi.png',
                    NAME: '李自',
                    POSITION: '华为开源能力中心主任工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/yangcong.png',
                    NAME: '杨聪',
                    POSITION: '华为开源能力中心工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhengzhipeng.png',
                    NAME: '郑志鹏',
                    POSITION: '华为开源能力中心高级工程师'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/jiangqinghua.png',
                    NAME: '蒋庆华',
                    POSITION: '哈尔滨工业大学 教授'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/liyong.png',
                    NAME: '李勇',
                    POSITION: 'Linux bcache maintainer'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/jiangguoqing.png',
                    NAME: '江国庆',
                    POSITION: '麒麟软件内核资深技术专家'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/husong.png',
                    NAME: '胡松',
                    POSITION: '麒麟软件 内核核心开发者'
                },
                {
                    IMG: '/img/summit/devday-2021/lecturer/zhouzhongyuan.png',
                    NAME: '周中元',
                    POSITION: '华为开源软件工程师'
                }
            ],
            communityBanner:{
                web: '/img/summit/devday-2021/community/community-web.png',
                mobile: '/img/summit/devday-2021/community/community-mobile.png'
            },
            communityList: [
                {
                    IMG: '/img/summit/devday-2021/community/jiangdayong.png',
                    NAME: '江大勇',
                    POSITION: 'openEuler社区理事长'
                },
                {
                    IMG: '/img/summit/devday-2021/community/qiuchengfeng.png',
                    NAME: '邱成峰',
                    POSITION: 'openEuler社区副理事长'
                },
                {
                    IMG: '/img/summit/devday-2021/community/huxinwei.png',
                    NAME: '胡欣蔚',
                    POSITION: 'openEuler社区技术委员会主席'
                },
                {
                    IMG: '/img/summit/devday-2021/community/xiongwei.png',
                    NAME: '熊伟',
                    POSITION: 'openEuler社区技术委员会委员'
                },
                {
                    IMG: '/img/summit/devday-2021/community/liujingang.png',
                    NAME: '刘金刚',
                    POSITION: 'openEuler社区技术委员会委员'
                },
                {
                    IMG: '/img/summit/devday-2021/community/wufengguang.png',
                    NAME: '吴峰光',
                    POSITION: 'openEuler社区技术委员会委员'
                },
                {
                    IMG: '/img/summit/devday-2021/community/guohanjun.png',
                    NAME: '郭寒军',
                    POSITION: 'openEuler社区内核 Maintainer'
                },
                {
                    IMG: '/img/summit/devday-2021/community/maquanyi.png',
                    NAME: '马全一',
                    POSITION: 'openEuler社区技术委员会委员'
                },
                {
                    IMG: '/img/summit/devday-2021/community/xiexiuqi.png',
                    NAME: '谢秀奇',
                    POSITION: 'openEuler kernel Commiter'
                },
                {
                    IMG: '/img/summit/devday-2021/community/dukaitian.png',
                    NAME: '杜开田',
                    POSITION: 'openEuler社区 兼容性SIG组 maintainer'
                },
                {
                    IMG: '/img/summit/devday-2021/community/liangbin.png',
                    NAME: '梁冰',
                    POSITION: 'openEuler社区品牌委员会主席'
                },
                {
                    IMG: '/img/summit/devday-2021/community/gaowei.png',
                    NAME: '高巍',
                    POSITION: 'openEuler社区用户委员会主席'
                },
                {
                    IMG: '/img/summit/devday-2021/community/shiyong.png',
                    NAME: '石勇',
                    POSITION: 'openEuler社区技术委员会委员'
                }
            ],
            hostUnitObj: {
                web: '/img/summit/devday-2021/host-unit/host-unit-web.png',
                mobile: '/img/summit/devday-2021/host-unit/host-unit-mobile.png'
            },
            hostUnitList: [
                {
                    IMG: '/img/summit/devday-2021/host-unit/huawei.png',
                    LINK: 'https://www.huawei.com/cn/'
                },
                {
                    IMG: '/img/summit/devday-2021/host-unit/baidu.png',
                    LINK: 'https://cloud.baidu.com/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/feiteng.png',
                    LINK: 'https://www.phytium.com.cn/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/cetc.png',
                    LINK: 'http://www.i-soft.com.cn/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/qilin.png',
                    LINK: 'https://www.kylinos.cn/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/xinan.png',
                    LINK: 'http://www.kylinsec.com.cn/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/tongxin.png',
                    LINK: 'https://www.uniontech.com/'
                }
            ],
            coOrgObj: {
                web: '/img/summit/home/co-organizer/zh-co-organizer.png',
                mobile: '/img/summit/home/co-organizer/zh-mobile-xieban.png'
            },
            coOrgList: [
                {
                    IMG: '/img/summit/devday-2021/co-organizer/baolande.png',
                    LINK: 'https://www.bessystem.com/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/baode.png',
                    LINK: 'http://www.powerleader.com.cn/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/turbolinux.png',
                    LINK: 'https://www.turbolinux.com.cn/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/huasheng.png',
                    LINK: 'http://www.teamsun.com.cn'
                },
                {
                    IMG: '/img/summit/home/co-organizer/huayun.png',
                    LINK: 'https://huayun.com/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/liantong.png',
                    LINK: 'https://www.cubigdata.cn/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/lvmengkeji.png',
                    LINK: 'https://www.nsfocus.com.cn/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/pingao.png',
                    LINK: 'https://www.bingocloud.cn/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/qihu360.png',
                    LINK: 'https://www.360.com/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/qianxin.png',
                    LINK: 'https://www.qianxin.com/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/runhe.png',
                    LINK: 'http://www.hopeinfra.com/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/wuxi.png',
                    LINK: 'http://www.wxiat.com/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/xinlaikeji.png',
                    LINK: 'https://www.nucleisys.com/index.php'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/youxikeji.png',
                    LINK: 'https://www.uctechip.com/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/yunhong.png',
                    LINK: 'http://www.winhong.com/'
                },
                {
                    IMG: '/img/summit/devday-2021/co-organizer/zhaoxin.png',
                    LINK: 'http://www.zhaoxin.com/'
                },
                {
                    IMG: '/img/summit/home/co-organizer/iscas.png',
                    LINK: 'http://www.iscas.ac.cn/'
                },
            ],
            foundationObj: {
                web: '/img/summit/home/foundation/zh-pc-foundation.png',
                mobile: '/img/summit/home/foundation/zh-mobile-foundation.png'
            },
            foundationList: [
                {
                    IMG: '/img/summit/home/foundation/yuanzi.png',
                    LINK: 'https://www.openatom.org/#/'
                },
                {
                    IMG: '/img/summit/home/foundation/linaro.png',
                    LINK: 'https://www.linaro.org/'
                },
                {
                    IMG: '/img/summit/home/foundation/linux.png',
                    LINK: 'https://www.linuxfoundation.org/'
                },
                {
                    IMG: '/img/summit/home/foundation/open.png',
                    LINK: 'https://openinfra.dev/'
                }
            ],
            mediaObj: {
                web: '/img/summit/home/media/zh-pc-media.png',
                mobile: '/img/summit/home/media/zh-mobile-media.png'
            }
        }
    },
    mounted() {
        window.addEventListener('scroll',this.scroTop);
        this.otherSrc = this.isShowH5 ? '/img/summit/devday-2021/agenda/h5_other_sig.png':'/img/summit/devday-2021/agenda/web_other_sig.png';
    },
    methods: {
        go(url) {
            if(url && url.includes("http")) {
                window.open(url);
            }else {
                const routeUrl = this.$router.resolve(this.resolvePath(url));
                window.open(routeUrl.href);
            }
        },
        showAll() {
            this.flag = !this.flag;
        },
        scroTop() {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            let value = this.ifAddValue();
            if(scrollTop < 500) {
                this.isShowNav = false;
            }else {
                this.isShowNav = true;
            }
            if(scrollTop > 650 && scrollTop < 1700) {
                this.activeIndex = 0;
            }else if(scrollTop > 1720 && scrollTop < 3800 + value) {
                this.activeIndex = 1;
            }else if(scrollTop > 3820 + value && scrollTop < 7100 + value) {
                this.activeIndex = 2;
            }else if(scrollTop > 7120 + value && scrollTop < 8300 + value) {
                this.activeIndex = 3;
            }else if(scrollTop > 8320 + value){
                this.activeIndex = 4;
            }else {
                return false;
            }
        },
        ifAddValue() {
            //上午、下午、晚上日程盒子的高度不一致，计算误差值使得滚动时能够准确
            let value = 0;
            if(this.currentTime === 'afternoon') {
                value = 400;
            }else if(this.currentTime === 'evening') {
                value = -1600;
            }else {
                return 0;
            }
            return value;
        },
    },
    components: {
        carousel,
        titlenav,
        liveroom
    },
    destroyed () { 
        window.removeEventListener('scroll', this.scroTop)
    } 
}
</script>
<style>
.time-box .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none !important;
}
.devday .agenda-carousel .sig-2 .shade-remind {
    height: 92%;
    top: 86px;
    width: 100%;
    left: 0;
}
.devday .sig-content .other-sig {
    width: 1120px;
    height: 349px;
    display: block;
    margin: 30px 0;
}
.devday .agenda-carousel .sig-content .sig-2 .time {
    display: none;
}
.devday .web-box .item-box .live-item {
    width: 200px;
}
@media screen and (max-width: 1000px) {
    .text-wrapper .agenda-carousel .sig-content .sig-2 {
        border-bottom: 0 !important;
    }
    .devday .sig-content .other-sig {
        width: 315px;
        margin: 20px auto; 
        height: 541px;
    }
    .devday .agenda-carousel .sig-content .sig-2 .shade-remind {
        top: 0;
        height: 100%;
    }
    .devday .agenda-carousel .sig-content .sig-2 .detail {
        width: 315px;
        margin: 0 auto; 
    }
    .devday .agenda-carousel .sig-content .sig-2 .detail div:last-of-type {
        margin-bottom: 0;
    }
}
</style>
<style lang="less" scoped>
.container {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 100px;
    @media screen and (max-width: 1000px) {
        margin-bottom: 60px;
        padding: 0 10px;
        width: 100%;
    }
    .img-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 920px;
        margin: 0 auto;
        img {
            width: 280px;
            height: 80px;
            display: block;
            margin: 0 40px 40px 0;
            cursor: pointer;
            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
        @media screen and (max-width: 1000px) {
            width: 100%;
            flex-direction: column;
            img {
                width: 140px;
                height: 40px;
                margin: 20px auto 0 auto;
                &:nth-of-type(3n) {
                    margin-right: auto;
                }
                &:first-of-type {
                    margin-top: 0;
                }
            }
        }
    }
    .title {
        margin: 100px 0 50px 0;
        img {
            display: block;
            margin: 0 auto;
            width: 900px;
            height: 76px;
        }
        @media screen and (max-width: 1000px) {
            margin: 40px 0 30px 0;
            img {
                width: 335px;
                height: 38px;
            }
        }
    }
    .banner {
        @media screen and (max-width: 1000px) {
            display: none;
        }
        height: 380px;
        width: 100%;
        margin-bottom: 50px;
        img {
            width: 1120px;
            height: 380px;
        }
    }
    .h5-banner {
        display: none;
        margin-bottom: 40px;
        .title {
            text-align: center;
            font-size: 24px;
            line-height: 34px;
            margin-top: 40px;
            margin-bottom: 10px;
        }
        img {
            width: 291px;
            height: 200px;
            margin: 0 auto;
            display: block;
        }
        @media screen and (max-width: 1000px) {
            display: block;
        }
    }
    .text-wrapper {
        color: #000;
        font-size: 20px;
        line-height: 40px;
        .calendar-content img {
            max-width: 1120px;
        }
        .agenda-carousel {
            margin-top: -40px;
        }
        .time-box {
            margin: 0 0 40px 0;
            @media screen and (max-width: 1000px) {
                /deep/ .el-radio-group .el-radio-button__inner {
                    padding: 6px 15px;
                }
            }
        }
        .mobile-table {
            .item {
                width: 100%;
                display: flex;
                flex-direction: row;
                margin-bottom: 20px;
                border-bottom: 1px solid  rgba(0, 0, 0, 0.15);
                &:first-of-type {
                    .agenda {
                        margin: 20px 0 0 0;
                    }
                }
                &:last-of-type {
                    border-bottom: 0;
                }
                .time {
                    width: 82px;
                    height: 20px;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.5);
                    line-height: 20px;
                    margin: 20px 29px 0 0;
                }
                .agenda {
                    p {
                        color: #000000;
                        line-height: 20px;
                        font-size: 12px;
                        margin-bottom: 20px;
                        &:first-of-type {
                            width: 209px;
                        }
                        span {
                            &:first-of-type {
                                margin-right: 25px;
                                width: 41px;
                                vertical-align: top;
                            }
                            &:first-of-type,&:last-of-type {
                                display: inline-block;
                            }
                            &:last-of-type {
                                width: 139px;
                            }
                        }
                    }
                }
            }
        }
        @media screen and (max-width: 1000px) {
            font-size: 14px;
            line-height: 26px;
            .calendar-content img {
                width: 325px;
                margin: 0 auto;
                display: block;
            }
        }
    }
    .lecturer {
        width: 1029px;
        margin: 0 auto;
        .lecturer-box {
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            .item {
                width: 180px;
                margin: 0 103px 30px 0;
                &:nth-of-type(4n) {
                    margin-right: 0;
                }
                img {
                    width: 120px;
                    height: 120px;
                    margin: 0 auto;
                    display: block;
                }
                p {
                    font-size: 16px;
                    
                    color: #002FA7;
                    line-height: 16px;
                    margin-top: 20px;
                    width: 180px;
                    text-align: center;
                    &:last-of-type {
                        font-size: 14px;
                        
                        font-weight: 400;
                        color: #000000;
                        line-height: 20px;
                    }
                }
            }
        }
        @media screen and (max-width: 1000px) {
            width: 345px;
            .lecturer-box {
                margin-top: 20px;
                .hidden {
                    display: none;
                }
                .item {
                    width: 140px;
                    margin-right: 65px;
                    &:nth-of-type(2n) {
                        margin-right: 0;
                    }
                    p {
                        width: 140px;
                    }
                }
            }
            .show-all {
                display: block;
                text-align: center;
                margin-top: 20px;
                p{
                    color: #002fa7;
                }
            }
        }
        @media screen and (min-width: 1000px) and (max-width: 1120px) {
            width: 1020px;
            .lecturer-box {
                .item {
                    margin-right: 100px;
                }
            }
        }
    }
    .media {
        .media-box {
            img {
                width: 280px;
                height: 80px;
                display: block;
                margin:  0 auto;
                cursor: pointer;
            }
        }
        @media screen and (max-width: 1000px) {
            .media-box {
                img {
                    width: 140px;
                    height: 40px;
                }
            }
        }
    }
    .review-wrapper {
        margin-top: 100px;
        @media screen and (max-width: 1000px) {
            margin-top: 40px;
        }
        .top {
            font-size: 26px;
            margin-bottom: 32px;
            @media screen and (max-width: 1000px) {
                margin-bottom: 10px;
            }
            span {
                vertical-align: middle;
                @media screen and (max-width: 1000px) {
                    font-size: 16px;
                }
            }
            img {
                @media screen and (max-width: 1000px) {
                    display: none;
                }
                width: 28px;
                height: 28px;
                vertical-align: middle;
            }
        }
        .link {
            color: #002fa7;
            font-size: 20px;
            line-height: 24px;
            margin-bottom: 24px;
            cursor: pointer;
            @media screen and (max-width: 1000px) {
                margin-bottom: 12px;
                font-size: 14px;
            }
        }
    }
}
@media screen and (max-width: 370px) {
    // 适配iphone5
    .container .text-wrapper .title img,
    .container .text-wrapper .calendar-content img {
        width: 280px;
    }
    .container .text-wrapper .party-box img{
        width: 270px;
    }
    .container .lecturer {
        width: 300px !important;
    }
    .container .title img {
        width: 300px !important;
        height: 34px !important;
    }
    .container .lecturer .lecturer-box .item {
        margin-right: 20px !important;
    }
    .container .lecturer .lecturer-box .item:nth-of-type(2n) {
        margin-right: 0 !important;
    }
}
@media screen and (min-width: 1000px) and (max-width: 1120px) {
    // 适配ipad Pro
    .container,.container .banner img {
        width: 100% !important;
    }
}
</style>