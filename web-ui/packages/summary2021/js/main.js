// 背景音乐
let bgm = document.querySelector("#bgm");
let bgmOpen = document.querySelector(".bgm-open");
bgm.addEventListener('pause', function () {
    bgmOpen.classList.remove('run-bgm');
})
bgmOpen.addEventListener("touchstart", function () {
    bgm.paused ? bgm.play() : bgm.pause()
    bgmOpen.classList.add('run-bgm');
})
// 获取数据
axios.get('/2021summary/oauth2/userinfo').then(res => {
    getData(res.data.user)
})
.catch(err => {
    document.querySelector('.no-contribution .user-name').innerHTML = '';
    let data = {};
    data['contribution'] = 'none';
    intaPc(data)
    intaSwiper(data)
})
function getData(user) {
    let data = []
    axios.get(`https://omapi.osinfra.cn/query/newYear/2022?community=openeuler&user=${user}`).then(res => {
        if (res.data.data[0]) {
            data = res.data.data[0];
            let percentage = parseFloat(data.beat_percentage) * 100;
            let rank = 1;
            if (percentage <= 20) {
                rank = 1
            } else if (20 < percentage && percentage <= 40) {
                rank = 2
            } else if (40 < percentage && percentage <= 60) {
                rank = 3
            } else if (60 < percentage && percentage <= 70) {
                rank = 4
            } else if (70 < percentage) {
                rank = 5
            }
            data.total_time_of_exist_before == 1 ? data.total_time_of_exist_before = '一' : data.total_time_of_exist_before = '两';
            data['user_name'] = user;
            data['percentage'] = percentage;
            data['rank'] = rank;
            data['contribution'] = 'yes';
        } else {
            // 无贡献
            data['contribution'] = 'none';
            data['user_name'] = user;
        }
        intaPc(data)
        intaSwiper(data)
    })
}
function Contribution() {
    document.querySelector('.contribution').classList.remove('none');
    document.querySelector('.no-contribution').classList.add('none');
}
function timeChange(time) {
    if (time) {
        let EndTime = new Date(time);
        let y = EndTime.getFullYear();
        let m = EndTime.getMonth() + 1;
        let d = EndTime.getDate();
        let h = EndTime.getSeconds()
        let all = `${y}年${m}月${d}日`
        return all
    } else {
        return 'none'
    }

}
function isZero(num) {
    if (num == '0') {
        return 'none'
    } else {
        return num
    }
}
// pc端事件
function intaPc(data) {
    let front = document.querySelectorAll(".front");
    let back = document.querySelectorAll(".back");
    data.contribution == 'yes' ? Contribution() : document.querySelector('.no-contribution .user-name').innerHTML = data.user_name
    for (let i = 0; i < front.length; i++) {
        front[i].addEventListener('click', function () {
            if (data.first_time_of_enter_before) {
                back[0].innerHTML = `
                        <div class="contents">
                            <div class="page page-one">
                                <div class="text-box">
                                    <p class="euler-title">openEuler两周岁</p>
                                    <p class="euler-title2">遇见开源世界的自己</p>
                                    <p class="euler-title2 euler-title3">Dear <span class="pinkColor">${data.user_name}</span></p>
                                    <p class="one-text">openEuler 今天两周岁了！</p>
                                    <p class="one-text">在这两年的时光里，openEuler在惊喜地成长：</p>
                                    <p class="one-text">社区用户 <span class="yellow-color">370,000+</span>；</p>
                                    <p class="one-text">软件包<span class="yellow-color">8600+</span>；</p>
                                    <p class="one-text">社区贡献者<span class="yellow-color">8000+</span>；</p>
                                    <p class="one-text">商用OSV<span class="yellow-color">11家</span>；</p>
                                    <p class="one-text">企业成员<span class="yellow-color">300+家</span></p>
                                    <p class="one-text">······</p>
                                    <p class="one-text">openEuler 成长的过程记录着你奋斗的岁月</p>
                                    <p class="one-text">在今天这个特殊的日子里</p>
                                    <p class="one-text">请跟 openEuler 一起打开时间的匣子</p>
                                    <p class="one-text">看看你在 openEuler 开源社区中熠熠生辉的瞬间······</p>
                                </div>
                                <div class="pic">
                                    <section>
                                        <div class="rotate-item"><img src="images/pic1/screen-big.png" alt="" /></div>
                                        <div class="rotate-item"><img src="images/pic1/screen-m.png" alt="" /></div>
                                        <div class="rotate-item"><img src="images/pic1/screen-s.png" alt="" /></div>
                                        <div class="rotate-item"><img src="images/pic1/file-one.png" alt="" /></div>
                                        <div class="rotate-item"><img src="images/pic1/white-paper.png" alt="" /></div>
                                        <div class="person"></div>
                                    </section>
                                    <div class="desk">
                                    </div>
                                </div>
                            </div>
                        </div> `
                back[1].innerHTML = `
                    <div class="contents">
                        <div class="page page-three">
                            <div class="text-box">
                                <div class="head">
                                    <div class="bule"></div>
                                    <div class="yellow"></div>
                                    <div class="pink"></div>
                                </div>
                                <div class="body">
                                    <p class=" fade-time-1 ">我们在一起${data.total_time_of_exist_before}年了！</p>
                                    <p class=" fade-time-2 themeColor">${timeChange(data.first_time_of_enter_before)}，</p>
                                    <p class=" fade-time-3 ">你第一次走进我的世界</p>
                                    <p class=" fade-time-4 themeColor ${timeChange(data.first_time_of_contact)}">${timeChange(data.first_time_of_contact)}，</p>
                                    <p class=" fade-time-5 ${timeChange(data.first_time_of_contact)}">你与社区中的<span class="pinkColor">${data.first_user_login_of_contact}</span>第一次建立链接;</p>
                                    <p class=" fade-time-6 themeColor ${timeChange(data.first_time_of_comment_other)}">${timeChange(data.first_time_of_comment_other)},</p>
                                    <p class=" fade-time-7 ${timeChange(data.first_user_login_of_comment)}">你第一次在社区中评论了<span class="pinkColor">${data.first_user_login_of_comment}</span>；</p>
                                    <p class=" fade-time-8 themeColor ${timeChange(data.first_time_of_be_comment)}">${timeChange(data.first_time_of_be_comment)}，</p>
                                    <p class=" fade-time-9 ${timeChange(data.first_user_login_of_be_comment)}"><span class="pinkColor">${data.first_user_login_of_be_comment}</span>第一个给了你温暖的评论；</p>
                                    <p class=" fade-time-10 ${timeChange(data.first_time_of_contact)}">初来乍到,<span class="pinkColor">${data.first_user_login_of_contact}</span>第一个解决了你的问题；</p>
                                    <p class=" fade-time-11 ${timeChange(data.user_login_with_most_contact)}">回忆满满,你与<span class="pinkColor">${data.user_login_with_most_contact}</span>联系最多</p>
                                </div>
                            
                                <div class="three-bg">
                                    <div class="mirror"><img src="./images/pic3/mirror.png" alt=""></div>
                                </div>
                            </div>
                            <div class="more-text">
                                <p>时光悄然流逝，</p>
                                <p>但这些流光溢彩的回忆，</p>
                                <p>我铭记于心 ······</p>
                            </div>
                            <div class="three-bottom">
                                <img src="./images/pic3/bottom-item.png" alt="">
                            </div>
                            <div class="yellow-ball"><img src="./images/pic3/yellow-ball.png" alt=""></div>
                         </div>
                    </div>`
                back[2].innerHTML = `
                    <div class="contents">
                        <div class="page page-five">
                            <div class="bg-five">
                                <img src="./images/pic4/earth1.png" alt="">
                                <img src="./images/pic4/earth2.png" alt="">
                            </div>
                            <div class="text-box">
                                <p class="fade-time-1">回望2021，我快速成长</p>
                                <p class="fade-time-2">而你在这一年中</p>
                                <p class="${isZero(data.pr_num)} fade-time-3">提交了<span class="yellow-color">${data.pr_num}</span>个pr，</p>
                                <p class=" ${isZero(data.issue_num)} fade-time-4">提交了<span class="yellow-color">${data.issue_num}</span>个issue，</p>
                                <p class=" ${isZero(data.comment_num)} fade-time-5">提交了<span class="yellow-color">${data.comment_num}</span>条评论，</p>
                                <p class="${isZero(data.code_lines)} fade-time-6">贡献了<span class="yellow-color">${data.code_lines}</span>行代码，</p>
                                <p class=" ${isZero(data.sig_num)} fade-time-7">参与了<span class="yellow-color">${data.sig_num}</span>个sig组，</p>
                                <p class="${isZero(data.star_num)} fade-time-8">点亮了<span class="yellow-color">${data.star_num}</span>个仓库，</p>
                                <p>在这一年里，</p>
                                <p>你的贡献度击败了社区<span class="yellow-color">${data.percentage}%</span>开发者。</p>
                            </div>
                            <div class="hexagon2">
                                <img class="honor" src="./images/honor/honor${data.rank}.png" alt="">
                            </div>
                        </div>
                    </div>`
                back[3].innerHTML = `
                    <div class="contents">
                        <div class="page page-six">
                            <div class="main">
                                <div class="six-logo"><img src="./images/pic6/logo.png" alt=""></div>
                                <div class="text-box ">
                                    <p class="">你们从不同途径来到我的开源世界</p>
                                    <p class=" delay-time1">但却因相同的目的留了下来</p>
                                    <p class=" delay-time2">谢谢你们的坚持与贡献，</p>
                                    <p class=" delay-time3">才打造出我更好的模样！</p>
                                    <p class=" delay-time4">期待你我携手并肩，继续坚定向前！</p>
                                    <p class="">新年快乐！</p>
                                    <p class="bold">openEuler 社区</p>
                                    <p class="bold">呈上</p>
                                </div>
                            </div>
                            <div class="bg-six">
                                <div class="footer">
                                    <img src="./images/pic6/crowd.png" alt="">
                                </div>
                                <div class="border">
                                    <img src="./images/pic6/border.png" alt="">
                                </div>
                                <div class="email"><img src="./images/pic6/email.png" alt=""></div>
                                <div class="file"><img src="./images/pic6/file2.png" alt=""></div>
                                <div class="paper"><img src="./images/pic6/white-paper2.png" alt=""></div>
                            </div>
                        </div>
                    </div>`

            }
            for (let j = 0; j < front.length; j++) {
                front[j].style = "transform:rotateY(-180deg)";
                back[j].style = "transform:rotateY(0deg)";
            }
        })
        back[i].addEventListener('click', function () {
            for (let z = 0; z < back.length; z++) {
                back[z].style = "transform:rotateY(180deg)";
                front[z].style = "transform:rotateY(0deg)";
            }

        })
    }
}
// 移动端事件
let swper = null;
function intaSwiper(data) {
    let intaData = null;
    console.log(data.rank);
    let noContribution = [
        {
            content: `
<div class="page page-one">
    <div class="text-box">
        <p class="euler-title">openEuler两周岁</p>
        <p class="euler-title2">遇见开源世界的自己</p>
        <p class="euler-title2">Dear</p>
        <p class="user-name pinkColor">${data.user_name}</p>
        <p class="one-text">openEuler 今天两周岁了！</p>
        <p class="one-text">在这两年的时光里，openEuler在惊喜地成长：</p>
        <p class="one-text">社区用户 <span class="yellow-color">370,000+</span>；</p>
        <p class="one-text">软件包<span class="yellow-color">8600+</span>；</p>
        <p class="one-text">社区贡献者<span class="yellow-color">8000+</span>；</p>
        <p class="one-text">商用OSV<span class="yellow-color">11家</span>；</p>
        <p class="one-text">企业成员<span class="yellow-color">300+家</span></p>
        <p class="one-text">······</p>
    </div>
    <div class="pic">
        <div class="bg-screen"></div>
        <section>
            <div class="rotate-item"><img src="images/pic1/screen-big.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/screen-m.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/screen-s.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/file-one.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/white-paper.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/talk.png" alt="" /></div>
            <div class="person"></div>
        </section>
        <div class="desk">
        </div>
    </div>
</div>`
        },
        {
            content: `
<div class="page page-six noContribution">
    <div class="main">
        <div class="six-logo"><img src="./images/pic6/logo.png" alt=""></div>
        <div class="text-box ">
            <p class="">在这里有7900+的社区开发者</p>
            <p class=" delay-time1">与你并肩同行，</p>
            <p class=" delay-time2">在这里有90+个SIG组，</p>
            <p class="">相信你总能找到和你志趣相投的人；</p>
            <p class=" delay-time4">在这里会有</p>
            <p class=" ">遍及全球100+个国家、</p>
            <p class="">1200+城市的用户</p>
            <p class="">和你不期而遇</p>
            <p class="">期待2022年，</p>
            <p class="">会有属于我和你的故事发生······</p>
            <p class="">新年快来！</p>
            <p class="bold">openEuler 社区</p>
            <p class="bold">呈上</p>
        </div>
        <div class="qr-code"><img src="./images/pic5/qr-code.png" alt="">
            <p>查看您的社区年度报告</p>
        </div>
    </div>
    <div class="bg-six">
        <div class="footer">
            <!-- <img src="./images/pic6/crowd.png" alt=""> -->
        </div>
        <div class="border">
            <img src="./images/pic6/border.png" alt="">
        </div>
    </div>
</div>`
        }
    ]
    let list = [{
        content: `
<div class="page page-one">
    <div class="text-box">
      
        <p class="euler-title">openEuler两周岁</p>
        <p class="euler-title2">遇见开源世界的自己</p>
        <p class="euler-title2">Dear</p>
        <p class="user-name pinkColor">${data.user_name}</p>
        <p class="one-text">openEuler 今天两周岁了！</p>
        <p class="one-text">在这两年的时光里，openEuler在惊喜地成长：</p>
        <p class="one-text">社区用户 <span class="yellow-color">370,000+</span>；</p>
        <p class="one-text">软件包<span class="yellow-color">8600+</span>；</p>
        <p class="one-text">社区贡献者<span class="yellow-color">8000+</span>；</p>
        <p class="one-text">商用OSV<span class="yellow-color">11家</span>；</p>
        <p class="one-text">企业成员<span class="yellow-color">300+家</span></p>
        <p class="one-text">······</p>
    </div>
    <div class="pic">
        <div class="bg-screen"></div>
        <section>
            <div class="rotate-item"><img src="images/pic1/screen-big.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/screen-m.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/screen-s.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/file-one.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/white-paper.png" alt="" /></div>
            <div class="rotate-item"><img src="images/pic1/talk.png" alt="" /></div>
            <div class="person"></div>
        </section>
        <div class="desk">
        </div>
    </div>
</div>`
    }, {
        content: `
<div class="page page-tow">
    <div class="text-box">
        <p class="tow-text">openEuler 成长的过程记录着你奋斗的岁月</p>
        <p class="tow-text">在今天这个特殊的日子里</p>
        <p class="tow-text">请跟openEuler 一起打开时间的匣子</p>
        <p class="tow-text">看看你在 openEuler 开源社区中熠熠生辉的瞬间······</p>
        <p class="click-bob">跟着热气球一起查看你的</p>
        <p class="click-bob2">年度贡献吧！</p>
    </div>
    <div class="pic">
        <div class="cloud1"><img src="./images/pic2/cloud2.png" alt=""></div>
        <div class="cloud2"><img src="./images/pic2/cloud1.png" alt=""></div>
        <div class="cloud3"><img src="./images/pic2/cloud3.png" alt=""></div>
        <div class="cloud4"><img src="./images/pic2/cloud5.png" alt=""></div>
        <div class="cloud5"><img src="./images/pic2/cloud4.png" alt=""></div>
        <div class="green-ball"><img src="./images/pic2/green-balloon.png" alt=""></div>
        <div class="bule-ball"><img src="./images/pic2/blue-balloon.png" alt=""></div>
        <div class="pink-ball"><img src="./images/pic2/pink-balloon.png" alt=""></div>
        <div class="bird1"><img src="./images/pic2/bird1.png" alt=""></div>
    </div>
</div>`
    }, {
        content: `
        <div class="page page-three">
    <div class="text-box">
        <div class="head">
            <div class="bule"></div>
            <div class="yellow"></div>
            <div class="pink"></div>
        </div>
        <div class="body">
            <p class="fade-time-1 ">我们在一起${data.total_time_of_exist_before}年了！</p>
            <p class="fade-time-2 themeColor">${timeChange(data.first_time_of_enter_before)}，</p>
            <p class="fade-time-3 ">你第一次走进我的世界</p>
            <p class="fade-time-4 themeColor ${timeChange(data.first_time_of_contact)}">${timeChange(data.first_time_of_contact)}，</p>
            <p class=" fade-time-5 ${timeChange(data.first_user_login_of_contact)}">你与社区中的<span class="pinkColor">${data.first_user_login_of_contact}</span>第一次建立链接;</p>
            <p class=" fade-time-6 themeColor ${timeChange(data.first_time_of_comment_other)}">${timeChange(data.first_time_of_comment_other)},</p>
            <p class="fade-time-7 ${timeChange(data.first_user_login_of_comment)}">你第一次在社区中评论了<span class="pinkColor">${data.first_user_login_of_comment}</span>；</p>
            <p class="fade-time-8 themeColor ${timeChange(data.first_time_of_be_comment)}">${timeChange(data.first_time_of_be_comment)}，</p>
            <p class="fade-time-9 ${timeChange(data.first_user_login_of_be_comment)}"><span class="pinkColor">${data.first_user_login_of_be_comment}</span>第一个给了你温暖的评论；</p>
            <p class="fade-time-10 ${timeChange(data.first_user_login_of_contact)}">初来乍到,<span class="pinkColor">${data.first_user_login_of_contact}</span>第一个解决了你的问题；</p>
            <p class="fade-time-11 ${timeChange(data.user_login_with_most_contact)}">回忆满满,你与<span class="pinkColor">${data.user_login_with_most_contact}</span>联系最多</p>
        </div>
       
        <div class="three-bg">
            <div class="mirror"><img src="./images/pic3/mirror.png" alt=""></div>
        </div>
    </div>
    <div class="more-text">
        <p>时光悄然流逝，</p>
        <p>但这些流光溢彩的回忆，</p>
        <p>我铭记于心 ······</p>
    </div>
    <div class="three-bottom">
        <img src="./images/pic3/bottom-item.png" alt="">
    </div>
    <div class="yellow-ball"><img src="./images/pic3/yellow-ball.png" alt=""></div>
</div>`
    }, {
        content: `
<div class="page page-four">
    <div class="pic">
        <div class="earth"><img src="./images/pic4/earth1.png" alt=""></div>
        <div class="earth2"><img src="./images/pic4/earth2.png" alt=""></div>
        <div class="girl"><img src="./images/pic4/girl.png" alt=""></div>
        <div class="curtains"><img src="./images/pic4/center-logo.png" alt=""></div>
        <div class="pink2"><img src="./images/pic4/earth1.png" alt=""></div>
        <div class="green2"><img src="./images/pic4/green-2.png" alt=""></div>
    </div>
    <div class="text-box">
        <p class="fade-time-1">回望2021，我快速成长</p>
        <p class="fade-time-2">而你在这一年中</p>
        <p class="${isZero(data.pr_num)} fade-time-3">提交了<span class="yellow-color">${data.pr_num}</span>个pr，</p>
        <p class=" ${isZero(data.issue_num)} fade-time-4">提交了<span class="yellow-color">${data.issue_num}</span>个issue，</p>
        <p class=" ${isZero(data.comment_num)} fade-time-5">提交了<span class="yellow-color">${data.comment_num}</span>条评论，</p>
        <p class="${isZero(data.code_lines)} fade-time-6">贡献了<span class="yellow-color">${data.code_lines}</span>行代码，</p>
        <p class=" ${isZero(data.sig_num)} fade-time-7">参与了<span class="yellow-color">${data.sig_num}</span>个sig组，</p>
        <p class="${isZero(data.star_num)} fade-time-8">点亮了<span class="yellow-color">${data.star_num}</span>个仓库，</p>

    </div>
</div>`
    }, {
        content: `
<div class="page page-five">
    <div class="bg-five">
        <div class="person2"><img src="./images/pic5/person2.png" alt=""></div>
        <div class="person3"><img src="./images/pic5/person3.png" alt=""></div>
        <div class="bottom-item"><img src="./images/pic5/bottom-item2.png" alt=""></div>
        <div class="withe-logo"><img src="./images/pic5/logo.png" alt=""></div>
        <div class="qr-code"><img src="./images/pic5/qr-code.png" alt="">
            <p>查看您的社区年度报告</p>
        </div>
        <div class="tip"><img src="./images/pic5/talk2.png" alt=""></div>
    </div>
    <div class="text-box">
        <p class="user-name pinkColor">${data.user_name}</p>
        <p>在这一年里，</p>
        <p>你的贡献度击败了社区<span class="yellow-color">${data.percentage}%</span>开发者。</p>
    </div>
    <div class="hexagon2">
        <img class="honor" src="./images/honor/honor${data.rank}.png" alt="">
    </div>
</div>`
    }, {
        content: `
<div class="page page-six">
    <div class="main">
        <div class="six-logo"><img src="./images/pic6/logo.png" alt=""></div>
        <div class="text-box ">
            <p class="typing">你们从不同途径来到我的开源世界</p>
            <p class="typing delay-time1">但却因相同的目的留了下来</p>
            <p class="typing delay-time2">谢谢你们的坚持与贡献，</p>
            <p class="typing delay-time3">才打造出我更好的模样！</p>
            <p class="typing delay-time4">期待你我携手并肩，继续坚定向前！</p>
            <p class="typing delay-time5">新年快乐！</p>
            <p class="bold">openEuler 社区</p>
            <p class="bold">呈上</p>
        </div>
    </div>
    <div class="bg-six">
        <div class="footer">
            <img src="./images/pic6/crowd.png" alt="">
        </div>
        <div class="border">
            <img src="./images/pic6/border.png" alt="">
        </div>
        <div class="email"><img src="./images/pic6/email.png" alt=""></div>
        <div class="file"><img src="./images/pic6/file2.png" alt=""></div>
        <div class="paper"><img src="./images/pic6/white-paper2.png" alt=""></div>
    </div>
</div>`
    }]
    data.first_time_of_enter_before ? intaData = list : intaData = noContribution;
    let container = document.querySelector('#outer-container');
    swiper = new Swiper({
        container: container,
        data: intaData,
    });
}