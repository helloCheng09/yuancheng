/**
 * 全局数据
 * data.js
 */
(function () {

    // 定义变量
    let root = window.wangjiao;

    /****************************************************************************** */
    /**
     * 点击
     * click.js
     */
    (function ($, root) {
        // 确认加入学习
        function jionStudy(text) {
            $(".join_btn").on("click", function () {
                // #feca52
                var index = layer.confirm(text, {
                    btn: ['确定', '取消'] //可以无限个按钮
                        ,
                    yes: function (index, layero) {
                        //按钮【按钮一】的回调
                        console.log(lessonGet, lessonData)
                        root.modeAjaxPost(lessonGet, lessonData)
                        layer.close(index);
                    },
                    btn1: function () {

                        return false
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
                layer.title('', index)
            })
        }

        // 打开评分
        function clickPingf() {
            $(".pf_btn").on("click", function () {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    var index = layer.open({
                        type: 1,
                        shadeClose: true,
                        content: pingfenHtml //这里content是一个普通的String
                    });
                    root.clickStart()
                    layer.title('课程评分', index)
                });

            })

        }
        // 点击星星
        function clickStart() {
            var fansid = lessonData.fansid
            var videos_id = lessonData.videos_id
            var dataObj = {
                fansid: fansid,
                videos_id: videos_id,
                scores: 10,
                content: "超赞",
            }
            $('.stars_btn').on("click", function (e) {
                var holyWidth = Number($(this).css('width').split('p')[0])
                var clickWidth = e.offsetX
                var percent = Math.ceil(clickWidth / holyWidth * 100)
                var yushu = percent % 10

                if (0 <= percent && percent < 10) {
                    percent = 0
                } else if (90 < percent && percent <= 100) {
                    percent = 100
                } else {
                    percent = percent - yushu + 10
                }
                
                var pfText = ''
                // 一般 还行 不错 满意 超赞
                switch (percent) {
                    case 0:
                        pfText = "一般"
                        break;
                    case 10:
                        pfText = "一般"
                        break;
                    case 20:
                        pfText = "还行"
                        break;
                    case 30:
                        pfText = "还行"
                        break;
                    case 40:
                        pfText = "不错"
                        break;
                    case 10:
                        pfText = "不错"
                        break;
                    case 50:
                        pfText = "不错"
                        break;
                    case 60:
                        pfText = "满意"
                        break;
                    case 70:
                        pfText = "满意"
                        break;
                    case 80:
                        pfText = "满意"
                        break;
                    case 90:
                        pfText = "满意"
                        break;
                    case 100:
                        pfText = "超赞"
                        break;

                }
                // var lessonData = {
                //     fansid: "40861",
                //     froms: "2",
                //     lesson_id: "2",
                //     traffic_coin: "100",
                //     videos_id: "2"
                // }
                // 讲0 -100转为 0 -10
                var scores = percent / 10
                $(".star-tc .text-con").text(pfText)
                var eleWidth = holyWidth * percent / 100 + 'px'
                // console.log( holyWidth * percent / 100 + 'px')
                $(".stars_btn .stars-top .stars").css("width", eleWidth)
                // 获取评分数据传后台
                dataObj.scores = scores
                dataObj.content = pfText
                console.log(dataObj)
                root.subPf(dataObj)
            })
        }

        // 提交评分
        function subPf(data) {
            $(".pj-btn-b .pj-btn").off("click")
            $(".pj-btn-b .pj-btn").on("click", function () {
                // pfUrl定义在html
                console.log(123124)
                root.modeAjaxPostSec(pfUrl, data)
            })
        }

        // 标签切换
        let newTagToggle = (btn, styleEle, panels) => {
            let curIndex
            let lastIndex = 0
            let dataid
            $(btn).unbind()
            $(btn).on("click", function (event) {
                curIndex = $(this).index()
                console.log(curIndex)
                if (curIndex === lastIndex) {
                    // 不变
                    // console.log(123)
                    return false;
                } else {
                    // 样式  
                    if ($(this).attr("data-id")) {
                        dataid = $(this).attr("data-id")
                    }
                    $(this).find(styleEle).toggleClass("select")
                    $(btn).eq(lastIndex).find(styleEle).toggleClass("select")
                    // 展示
                    $(panels).eq(lastIndex).hide()
                    $(panels).eq(curIndex).show()
                    lastIndex = curIndex;

                    if (document.getElementById('centerClass')) {
                        // 课程中心页面回调
                        root.getMenuData()
                        root.renderSearch(dataid)
                    } else if (document.getElementById('chargeLl')) {
                        // 充值中心回调
                        console.log($(this).find(".money-num"))
                        let cgNum = $(this).find(".money-num").text().split("元")[0]
                        $(".l-text span").text(cgNum)
                    }
                }

            })
        }

        // 搜索页面展示 菜单栏
        let showMn = () => {
            $(".img-b").on("click", function () {
                $(".hid-menu").animate({
                    left: '0'
                }, "fast")
                $(".hid-menu").show()
                $(".left-list").animate({
                    left: '0'
                }, "fast")
                $(".close-p").on("click", function () {
                    $(".left-list").animate({
                        left: '-64px'
                    }, "fast")
                    setTimeout(() => {
                        $(".hid-menu").animate({
                            left: '-100vw'
                        }, "fast")
                    }, 0);
                    return false
                })
            })
        }
        // 发送二维码
        let sendCode = () => {
            $("#sendCode").on("click", function () {
                $(this).text("60s后重发")
                let ele = $(this)
                let num = 60
                root.getCode()
                ele.unbind()
                let timer = setInterval(() => {
                    num--
                    ele.text(num + "s后重发")
                    if (num <= 0) {
                        clearInterval(timer)
                        ele.text("发送验证码")
                        root.sendCode()
                    }
                }, 1000);
            })
        }

        // 注册发送表单
        let sendForm = (btnClass, formClass) => {
            $(btnClass).on("click", function () {
                let formData = $(formClass).serializeArray()
                console.log(formData)
                root.dealFormData(formData)
            })
        }

        root.subPf = subPf
        root.jionStudy = jionStudy
        root.clickPingf = clickPingf
        root.clickStart = clickStart
        root.sendForm = sendForm
        root.sendCode = sendCode
        root.showMn = showMn
        root.newTagToggle = newTagToggle
    }(window.$, window.wangjiao || (window.wangjiao = {})));

    /****************************************************************************** */
    /**
     * 渲染
     * render.js
     */
    (function ($, root) {
        // 提交评分成功
        let renderPf = (result) => {
            if (result.msg == "success") {
                layer.msg('评分提交成功')
            } else {
                layer.msg('评分提交失败')
            }
        }
        root.renderPf = renderPf
        // 渲染课程搜索的 一级分类
        let renderSearch = (id) => {
            // 关闭隐藏
            $(".left-list").animate({
                left: '-64px'
            }, "fast")
            setTimeout(() => {
                $(".hid-menu").animate({
                    left: '-100vh'
                }, "fast")
            }, 0);

            console.log(id)
        }
        // 加入学习 反馈
        let msgDet = (response) => {

            switch (response) {
                case 1:
                    $(".pre_play_b").remove()
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg('成功加入学习');
                    });
                    break;
                case 2:
                    root.appendDetVideoBtn()
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg('失败，你已经有该课程');

                    });
                    break;
                case 3:
                    root.appendDetVideoBtn()
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg('失败，流量币不足');
                    });
                    break;
                case 4:
                    root.appendDetVideoBtn()
                    layui.use('layer', function () {
                        var layer = layui.layer;
                        layer.msg('失败，交易失败');
                    });
                    break;
            }
        }

        let appendDetVideoBtn = () => {
            var html = `
                <div class="ts-b">
                    <div class="ts-text">
                        立刻加入学习观看！~
                    </div>
                </div>
                <div class="btn-b">
                     <div class="join-btn join_btn">
                    <div>加入学习</div>
                    </div> 
                    <div class="charge-btn">
                        <a>充流量币</a>
                    </div> 
                    </div>
            `
            $(".pre_play_b").empty()
            $(".pre_play_b").append(html)
            // 购买失败，在购买
            var money = $("")
            var text = '本课程88流量币，是否确认购买？'
            root.jionStudy(text)
        }
        root.appendDetVideoBtn = appendDetVideoBtn
        root.msgDet = msgDet
        root.renderSearch = renderSearch
    }(window.$, window.wangjiao || (window.wangjiao = {})));

    /****************************************************************************** */
    /**
     * 初始化
     * init.js
     */
    (function ($, root) {
        // 处理表单数据
        let dealFormData = (formData) => {
            // console.log(444)
            let value
            let name
            for (var i = 0; i < formData.length; i++) {
                name = formData[i].name
                value = formData[i].value
                console.log(name)
                if (value == "") {
                    layer.confirm('请完善信息~', {
                        btn: ['好的'],
                        yes: function (index) {
                            layer.close(index)
                            // 聚焦空值
                            let eleClass = "input[name= " + "'" + name + "'" + "]"
                            $(eleClass).focus()
                        }
                    })
                    break
                }
            }
            if (i >= formData.length) {
                // 非空发送后台ajax
                root.sendDataRegister(formData)
            }
        }

        let ifBuyLes = (status, callback) => {
            if (status != 1) {
                var html = `
                <div class="prevent-play pre_play_b">
                    <div class="ts-b">
                        <div class="ts-text">
                            立刻加入学习观看！~
                        </div>
                    </div>
                    <div class="btn-b">
                         <div class="join-btn join_btn">
                        <div>加入学习</div>
                        </div> 
                        <div class="charge-btn">
                            <a>充流量币</a>
                        </div> 
                        </div>
                </div>
                `
                $("body").append(html)
            } else {

            }
            callback()

        }
        root.ifBuyLes = ifBuyLes

        root.dealFormData = dealFormData
    }(window.$, window.wangjiao || (window.wangjiao = {})));

    /****************************************************************************** */
    /**
     * 获取
     * getData.js
     */
    (function ($, root) {
        let modeAjaxPost = (url, data) => {
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "JSON",
                beforeSend: beforeFn,
                success: function (result) {
                    console.log(result)
                    if (document.getElementById('videoDet')) {
                        var res = result.code
                        root.msgDet(res)
                    }
                },
                error: error
            })
        }
        let modeAjaxPostSec = (url, data) => {
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "JSON",
                beforeSend: beforeFnSec,
                success: function (result) {
                    console.log(result)
                    if (document.getElementById('videoDet')) {
                        root.renderPf(result)
                    }
                },
                error: error
            })
        }
        // error
        let error = () => {
            layer.msg("网络错误~~")
        }
        let beforeFn = () => {
            if (document.getElementById('videoDet')) {
                $(".pre_play_b").empty()
                $(".pre_play_b").append(loadingOne)
            }
        }
        let beforeFnSec = () => {
            if (document.getElementById('videoDet')) {
                $(".pj-btn-b").empty()
                $(".pj-btn-b").append(loadingTwos)
            }
        }
        // 课程搜索
        let getMenuData = () => {
            let url = "hhh"
            modeAjaxPost(url)
        }

        // 获取验证码
        let getCode = () => {
            let url = "hhh"
            modeAjaxPost(url)
        }

        // 提交注册表单
        let sendDataRegister = (formData) => {
            let url = "hhh"
            modeAjaxPost(url, formData)
        }

        root.modeAjaxPostSec = modeAjaxPostSec
        root.modeAjaxPost = modeAjaxPost
        root.sendDataRegister = sendDataRegister
        root.getCode = getCode
        root.getMenuData = getMenuData
    }(window.$, window.wangjiao || (window.wangjiao = {})));
    /****************************************************************************** */
    /**
     * 入口
     * index.js
     */
    (function ($, root) {

        if (document.getElementById('indexWrap')) {
            // 实例化轮播
            var swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 150,
                    modifier: 1,
                    slideShadows: true,
                },
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        } else if (document.getElementById('centerClass')) {
            // 课程中心
            // 实例化轮播
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 2,
                spaceBetween: 10,
                freeMode: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
            root.newTagToggle(".bar-item", ".item-text")
            root.newTagToggle(".hid-item", ".hid-item-b")
            root.showMn()


        } else if (document.getElementById('centerUser')) {
            // 个人中心

        } else if (document.getElementById('lessonSearch')) {
            // 课程搜索
            root.newTagToggle(".bar-item", ".item-text")
            // root.newTagToggle(".hid-item", ".hid-item-b")
            // root.showMn()

        } else if (document.getElementById('videoDet')) {
            // 判断是否买了课程
            root.ifBuyLes(is_buy_lesson, function () {
                // 如果没有购买课程，提示购买
                var text = '本课程88流量币，是否确认购买？'
                root.jionStudy(text)
            })

            // 观看课程
            var player = new Aliplayer({
                "id": "player-con",
                "source": viedoSrc,
                "width": "100%",
                "height": "250px",
                "autoplay": false,
                "isLive": false,
                "cover": coverSrc,
                "rePlay": false,
                "playsinline": true,
                "preload": false,
                "language": "zh-cn",
                "controlBarVisibility": "click",
                "showBarTime": 5000,
                "useH5Prism": true,
                "skinLayout": [{
                        "name": "bigPlayButton",
                        "align": "blabs",
                        "x": 30,
                        "y": 80
                    },
                    {
                        "name": "H5Loading",
                        "align": "cc"
                    },
                    {
                        "name": "errorDisplay",
                        "align": "tlabs",
                        "x": 0,
                        "y": 0
                    },
                    {
                        "name": "infoDisplay"
                    },
                    {
                        "name": "tooltip",
                        "align": "blabs",
                        "x": 0,
                        "y": 56
                    },
                    {
                        "name": "thumbnail"
                    },
                    {
                        "name": "controlBar",
                        "align": "blabs",
                        "x": 0,
                        "y": 0,
                        "children": [{
                                "name": "progress",
                                "align": "blabs",
                                "x": 0,
                                "y": 44
                            },
                            {
                                "name": "playButton",
                                "align": "tl",
                                "x": 15,
                                "y": 12
                            },
                            {
                                "name": "timeDisplay",
                                "align": "tl",
                                "x": 10,
                                "y": 7
                            },
                            {
                                "name": "fullScreenButton",
                                "align": "tr",
                                "x": 10,
                                "y": 12
                            },
                            {
                                "name": "volume",
                                "align": "tr",
                                "x": 5,
                                "y": 10
                            }
                        ]
                    }
                ]
            }, function (player) {
                console.log("播放器创建了。");
            });
            // 确认加入学习

            root.clickPingf()
            root.newTagToggle(".nav-item", ".nav-text", ".det-panel")
        } else if (document.getElementById('login')) {
            // 登陆页面

        } else if (document.getElementById('register')) {
            // 注册页面
            // 发送验证码
            root.sendCode()
            // 发送表单
            root.sendForm(".submit-btn input", ".form-item")
        } else if (document.getElementById('forget')) {
            // 忘记密码
            console.log("忘记密码")
            // 发送验证码
            root.sendCode()
            // 发送表单
            root.sendForm(".submit-btn input", ".form-item")
        } else if (document.getElementById('lessonList')) {
            // 我的课程页面
            // 标签切换
            root.newTagToggle(".bar-item", ".item-text")
        } else if (document.getElementById('chargeLl')) {
            // 充值
            // 充值标签切换
            root.newTagToggle(".card-item", ".card-item-b")
        }
    }(window.$, window.wangjiao || (window.wangjiao = {})));

}());