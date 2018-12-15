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
        // 搜索页面获取 防抖
        /**
         * getSearchVal
         * @param {inputId, url , ajaxFn, delay} obj 
         */
        function getSearchVal(obj) {
            var inputId = obj.inputId
            var ajaxFn = obj.ajaxFn
            var delay = obj.delay
            var searUrl = obj.url
            var oInput = document.getElementById(inputId)
            var timer = null

            oInput.oninput = function (e) {
                var _self = this
                var _arg = arguments

                clearTimeout(timer)
                timer = setTimeout(() => {

                    // 把值和事件源传给ajax
                    var sentData = {
                        keywords: _self.value,
                        page: 1
                    }
                    console.log(sentData)
                    ajaxFn(searUrl, sentData)
                }, delay);
            }
        }
        root.getSearchVal = getSearchVal
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
            root.subPf(dataObj)
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
            console.log(123124)
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
                        let cgNum = $(this).find(".money-num").text().split("元")[0]
                        $(".l-text span").text(cgNum)
                        console.log('充值中西：' + curIndex)
                        var data_id = $(this).data('id')
                        $("#chargeLink").attr("href", chargeLink + "&data_id=" + data_id)
                    } else if (document.getElementById('lessonSearch')) {
                        console.log('课程搜索：' + curIndex)
                        // froms
                        // 取标签参数 发送后台 关键字 froms  page
                        var obj = {}
                        var froms = $(this).data('id')
                        obj.froms = froms
                        obj.page = 1
                        console.log(obj)
                        root.modeAjaxPost(searUrl, obj)
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
        // 渲染课程中心的课程
        function renderLesCont(data) {
            var data = data.data
            var lesConHtml = ''
            $.each(data, function (index, item) {
                var id = item.id
                var shoufei = item.froms
                var img = item.img
                var school_name = item.school_name
                var name = item.name
                var teacher_name = item.teacher_name
                var title = item.title
                if (shoufei == 1) {
                    shoufei = '公益课'
                } else {
                    shoufei = '付费课'
                    teacher_name += '(' + school_name + ')'
                }

                lesConHtml += `
                <li class="item-m  mob_1px_b" data-id="${id}">
                        <a href="http://www.mamawozaizhe.com/videos/videos/video_det.html?lesson_id=${id}" class="item-link">
                            <div class="item-b">
                                <div class="les-item-l">
                                    <div class="img-b">
                                    <div class="img-show" style="background-image:url(${img})"></div>
                                    </div>
                                </div>
                                <div class="les-item-r">
                                    <div class="les-item les-title">
                                        <h3 class="les-text one-ellipsis">${name}</h3>
                                                                                <span class="tag tag-free">${shoufei}</span>
                                                                            </div>
                                    <div class="les-item les-title">
                                        <div class="les-text three-ellipsis">
                                        ${title}                                      
                                        </div>
                                    </div>
                                    <div class="les-item les-title">
                                        <div class="les-text one-ellipsis les-author">${teacher_name}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                
                `
            })

            $('.les_con_list').empty().append(lesConHtml)
        }
        root.renderLesCont = renderLesCont
        // 渲染课程中心的课程分类标签
        function renderFenleiTag(data) {
            console.log(data)
            // 取最后一类
            var len = data.length
            var lastTag = data[len - 1][0]
            var finalId = lastTag.id
            var lesDataObj = {
                cate_id: finalId,
                page: 1,
            }

            var tagListPanel = ''
            // 把最后一个标签id发送后台，渲染页面
            root.modeAjaxGetSec(kechengUrl, lesDataObj)
            $.each(data, function (index, item) {
                tagListPanel = `
                        <div class="menu-bar">
                            <div class="bar-list">
                                <ul class="les_tag_list">
                                </ul>
                            </div>
                        </div>
                    `
                $('.insert_con_list').append(tagListPanel)
                var tagListIn = ''
                $.each(item, function (index2, item2) {
                    console.log(item2)
                    var id = item2.id
                    var name = item2.name
                    // var previd = item2.previd
                    if (index2 != 0) {
                        tagListIn += `
                        <li class="bar-item" data-id="${id}">
                            <div class="item-text">${name}</div>
                        </li>
                    `
                    } else {
                        tagListIn += `
                        <li class="bar-item" data-id="${id}">
                            <div class="item-text select">${name}</div>
                        </li>
                    `
                    }

                });
                $('.insert_con_list .menu-bar').eq(index).find('.les_tag_list').append(tagListIn)
                // 绑定标签切换事件事件
                // root (".bar-item", ".item-text")
            })
            var demo = `
                <div class="menu-bar">
                    <div class="bar-list">
                        <ul class="les_tag_list">
                            <li class="bar-item" data-id="0">
                                <div class="item-text select">全部</div>
                            </li>
                            <li class="bar-item" data-id="4">
                                <div class="item-text">书法</div>
                            </li>
                            <li class="bar-item" data-id="5">
                                <div class="item-text">国画</div>
                            </li>
                            <li class="bar-item" data-id="6">
                                <div class="item-text">古文</div>
                            </li>
                            <li class="bar-item" data-id="36">
                                <div class="item-text">汉字字源</div>
                            </li>
                            <li class="bar-item" data-id="39">
                                <div class="item-text">汉字的来源</div>
                            </li>
                        </ul>
                    </div>
                </div>
            `

        }
        root.renderFenleiTag = renderFenleiTag
        // 渲染搜索
        let searchRender = (data) => {
            console.log(data)
            var searHtml = ''
            $.each(searList, function (index, item) {

            })
        }
        root.searchRender = searchRender
        // 提交评分成功
        let renderPf = (result) => {
            if (result.msg == "success") {
                layer.msg('评分提交成功')
                setTimeout(function () {
                    layer.closeAll()
                }, 3000)
            } else {
                $(".pj_btn_b").empty()
                $(".pj_btn_b").append(`<input class='pj-btn' type='button' value = '提交'>`)
                layer.msg('评分失败~~111')
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
                        <a href='${chargeSrc}' class='charge_link'>充流量币</a>
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
                            <a href='${chargeSrc}' class='charge_link'>充流量币</a>
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
                    } else if (document.getElementById('lessonSearch')) {
                        console.log('搜索页面')
                        var data = result
                        root.searchRender(data)
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
            if (document.getElementById('videoDet')) {
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
                        a href='${chargeSrc}' class='charge_link'>充流量币</a>
                    </div> 
                    </div>
                `
                $(".pre_play_b").empty()
                $(".pre_play_b").append(html)
                $(".pj_btn_b").empty()
                $(".pj_btn_b").append(`<input class='pj-btn' type='button' value = '提交'>`)
                setTimeout(function () {
                    layer.closeAll()
                }, 3000)
            }
        }
        let beforeFn = () => {
            if (document.getElementById('videoDet')) {
                $(".pre_play_b").empty()
                $(".pre_play_b").append(loadingOne)
            }
        }
        let beforeFnSec = () => {
            if (document.getElementById('videoDet')) {
                $(".pj_btn_b").empty()
                $(".pj_btn_b").append(loadingTwo)
            }
        }
        // 课程搜索
        let getMenuData = () => {
            let url = "hhh"
            modeAjaxPost(url)
        }
        // getMode
        let modeAjaxGet = (url, data) => {
            $.ajax({
                type: "GET",
                url: url,
                data: data,
                dataType: "JSON",
                beforeSend: beforeFnSec,
                success: function (result) {
                    // console.log(result)
                    if (document.getElementById('centerClass')) {
                        console.log('课程中心')
                        root.renderFenleiTag(result)
                    }
                },
                error: error
            })
        }
        root.modeAjaxGet = modeAjaxGet
        // getMode2
        let modeAjaxGetSec = (url, data) => {
            $.ajax({
                type: "GET",
                url: url,
                data: data,
                dataType: "JSON",
                beforeSend: beforeFnSec,
                success: function (result) {
                    // console.log(result)
                    if (document.getElementById('centerClass')) {
                        console.log('课程内容')
                        root.renderLesCont(result)
                    }
                },
                error: error
            })
        }
        root.modeAjaxGetSec = modeAjaxGetSec

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
            // 默认第一个分类的id
            var firstFlId = $('.hid_item').data('id')
            var fenleiDataObj = {
                cate_id: "3"
            }
            console.log(fenleiDataObj)
            root.modeAjaxGet(fenleiUrl, fenleiDataObj)
            // 获取默认分类数据
            console.log(fenleiUrl)
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
            // root.newTagToggle(".bar-item", ".item-text")
            root.newTagToggle(".hid-item", ".hid-item-b")
            root.showMn()


        } else if (document.getElementById('centerUser')) {
            // 个人中心

        } else if (document.getElementById('lessonSearch')) {
            // 课程搜索
            root.newTagToggle(".bar-item", ".item-text")
            root.getSearchVal({
                inputId: 'searchInputOne',
                url: searUrl,
                ajaxFn: root.modeAjaxPost,
                delay: 1000
            })

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