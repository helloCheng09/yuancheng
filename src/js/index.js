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
        // 回到顶部
        function toTop() {
            $('.go-top').on('click', function () {
                $('html,body').animate({
                    scrollTop: '0px'
                }, 100);
            })
        }
        root.toTop = toTop

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
                if (is_buy_lesson != 1) {
                    layui.use('layer', function () {
                        layer.msg('加入学习后才能评价哦~')
                    });
                    return false
                } else {
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
                }
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
            // 课程详情 默认1
            if (document.getElementById('videoDet')) {
                lastIndex = 1
            }
            if (document.getElementById('centerClass')) {
                lastIndex = $('.hid_item .select').parent('.hid_item').index()
                console.log(lastIndex)
            }
            $(btn).unbind()
            $(btn).on("click", function () {
                curIndex = $(this).index()
                if (curIndex === lastIndex) {
                    // 不变
                    return false;
                } else {
                    // 样式  
                    if ($(this).attr("data-id")) {
                        var dataid = $(this).attr("data-id")
                    }
                    $(btn).find(styleEle).removeClass("select")
                    $(this).find(styleEle).addClass("select")
                    // 展示
                    $(panels).eq(lastIndex).hide()
                    $(panels).eq(curIndex).show()
                    console.log(lastIndex, curIndex)
                    lastIndex = curIndex;
                    if (document.getElementById('centerClass')) {
                        // 课程中心页面回调
                        let mainTagText = $(this).find('.item-text').text()
                        $('.top_tag .menu-text').text(mainTagText)
                        root.closeMainTagP()
                        // 初始化 获取用户跳转过来的一级分类cate_id
                        var cateId = $(this).data('id')
                        console.log(cateId)
                        var fenleiDataObj = {
                            cate_id: cateId
                        }
                        root.modeAjaxGet(fenleiUrl, fenleiDataObj)
                        // root.getMenuData()
                        // root.renderSearch(dataid)
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
                        // obj.videos_id = ''
                        console.log(obj)
                        root.modeAjaxPost(searUrl, obj)
                    }
                }
            })
        }
        // 分类标签选择
        /**
         * 
         * @param {外層} panel 
         * @param {按鈕} btn 
         * @param {加樣式按鈕} styleEle 
         */
        // root.flTagChoice('.menu-bar', ".bar-item", ".item-text")
        function flTagChoice(panel, btn, styleEle) {

            $(panel).each(function () {
                let outIndex = $(this).index()
                let curIndex
                let lastIndex
                let dataid
                var that = $(this)
                that.find(btn).unbind()
                that.find(btn).on("click", function (e) {
                    // console.log('清空', $(this.loadList))
                    // $('#myList').empty()
                    curIndex = $(this).index()
                    console.log('最近点击按钮；' + curIndex)
                    if (curIndex === lastIndex) {
                        // 不变
                        return false;
                    } else {
                        // 样式  
                        if ($(this).attr("data-id")) {
                            dataid = $(this).attr("data-id")
                        }
                        // 展示
                        lastIndex = curIndex;
                        that.find(btn).find(styleEle).removeClass('select')
                        $(this).find(styleEle).addClass('select')
                        if (document.getElementById('centerClass')) {
                            // 课程中心页面回调
                            // 清除选中项以下的所有分类
                            for (var i = outIndex; i < $(panel).length; i++) {
                                $(panel).eq(outIndex + 1).remove()
                                console.log(i)
                            }
                            var fenleiDataObj = {
                                cate_id: dataid,
                            }
                            root.modeAjaxGetThd(fenleiUrl, fenleiDataObj)
                        }
                    }
                })
            })
        }

        root.flTagChoice = flTagChoice
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
                    root.closeMainTagP()
                })

            })
        }
        // 关闭展开的搜索页
        function closeMainTagP() {
            $(".left-list").animate({
                left: '-64px'
            }, "fast")
            setTimeout(() => {
                $(".hid-menu").animate({
                    left: '-100vw'
                }, "fast")
            }, 0);
            return false
        }
        root.closeMainTagP = closeMainTagP
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
                // 收费 试听课
                // if (shoufei == 1) {
                //     var sfText = '试听课'
                //     var shoufeiHtml = `
                //         <span class="tag tag-free">${sfText}</span>
                //     `
                // } else {
                //     var shoufeiHtml = ` `
                //     // shoufei = ''
                //     // teacher_name += '(' + school_name + ')'
                // }
                // 学习人数
                var learning = item.read_num + '人在学习'
                var learnHtml = `<span class="tag tag-free">${learning}</span> `
                // var shoufeiHtml = `<span class="tag">${learning}</span> `
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
                                        </div>
                                    <div class="les-item les-title">
                                        <div class="les-text three-ellipsis">
                                        ${title}                                      
                                        </div>
                                    </div>
                                    <div class="les-item les-title">
                                        <div class="les-text one-ellipsis les-author">${teacher_name}</div>
                                        ${learnHtml}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                `
            })
            $('.les_con_list').empty().append(lesConHtml)
            root.lcAddPadding()
        }
        root.renderLesCont = renderLesCont
        // 渲染课程中心的课程分类标签
        function renderFenleiTag(res, data) {
            // 取最后一类
            var len = res.length
            console.log(res)
            if (res.length == 0) {
                var finalId = data.cate_id
                var lesDataObj = {
                    cate_id: finalId,
                    page: 0,
                }
            } else {
                var lastTag = res[len - 1][0]
                var finalId = lastTag.id
                var lesDataObj = {
                    cate_id: finalId,
                    page: 0,
                }
            }

            $('.insert_con_list').empty()
            var tagListPanel = ''
            // 把最后一个标签id发送后台，渲染页面

            root.lazyLoadLesCenter(kechengUrl, lesDataObj)
            // root.modeAjaxGetSec(kechengUrl, lesDataObj)
            $.each(res, function (index, item) {
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
                    // console.log(item2)
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
                root.flTagChoice('.menu-bar', ".bar-item", ".item-text")
            })
        }
        root.renderFenleiTag = renderFenleiTag
        // 渲染课程中心的课程分类标签
        function renderFenleiTagSec(data) {
            console.log(data)
            // 取最后一类
            if (data.length != 0) {
                var len = data.length
                var lastTag = data[len - 1][0]
                var finalId = lastTag.id
            } else {
                // 如果没有下一级
                // 找到最后一个分类，被选中的分类dataid

                var finalId = $('.insert_con_list .menu-bar:last-child .select').parent('.bar-item').attr('data-id')
                console.log(777777777, finalId)
            }
            var lesDataObj = {
                cate_id: finalId,
                page: 0,
            }

            var tagListPanel = ''
            // 把最后一个标签id发送后台，渲染页面
            root.lazyLoadLesCenter(kechengUrl, lesDataObj)
            // root.modeAjaxGetSec(kechengUrl, lesDataObj)
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
                    // console.log(item2)
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
                $('.insert_con_list .menu-bar:last-child').find('.les_tag_list').append(tagListIn)
                // 绑定标签切换事件事件
                root.flTagChoice('.menu-bar', ".bar-item", ".item-text")
            })
        }
        root.renderFenleiTagSec = renderFenleiTagSec
        // 渲染搜索
        // let searchRender = (data) => {
        //     console.log(data)
        //     var searHtml = ''
        //     $.each(searList, function (index, item) {

        //     })
        // }
        // root.searchRender = searchRender
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
                        setTimeout(() => {
                            window.location.href = chargeSrc;
                        }, 2000);
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
            if ($('.det-box .none-text').length) {
                var lesInfo = '暂无课程介绍'
            } else {

            }

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
            var money = $('.off-price').text().split(' ')[1]
            console.log(money)
            var text = '本课程' + money + '流量币，是否确认购买？'
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
        function lcAddPadding() {
            // 判断手机型号
            var phonetype = root.phoneType()
            if (phonetype == 'ios') {
                // $('.les-item .tag-free').css('paddingTop', '2px')
            }
        }
        root.lcAddPadding = lcAddPadding
        // 判断手机类型
        function phoneType() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                //这个是安卓操作系统
                return 'android'
            } else if (isIOS) {
                //这个是ios操作系统
                return 'ios'
            } else {
                return 'other'
            }
        }
        root.phoneType = phoneType

        // 获取地址中的参数Id
        function getQueryString(id) {
            var reg = new RegExp("(^|&)" + id + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return r[2];
            return '';
        }
        root.getQueryString = getQueryString
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
                if ($('.det-box .none-text').length) {
                    var lesInfo = '暂无课程介绍'
                } else {

                }
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
                if ($('.det-box .none-text').length) {
                    var lesInfo = '暂无课程介绍'
                } else {}
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
                    console.log(result)
                    if (document.getElementById('centerClass')) {
                        console.log('课程中心')
                        root.renderFenleiTag(result, data)
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

        // 课程中心 懒加载
        let lazyLoadLesCenter = (url, data) => {
            let myLoad = new LazyLoad("#myList", {
                itemClass: ".load_item",
                data: data,
                // data: {
                //     cata_id: '1',
                //     page:0
                // },
                url: url,
                success(data) {
                    console.log(data)
                    // 获取数据内容
                    let ajaxData = data
                    let content = ajaxData.data //具体内容
                    let curPage = ajaxData.current_page // 当前页码
                    let totlePage = ajaxData.pages // 总共多少页 通过当前页码和总页码判断是否继续加载
                    // totlePage = 1
                    let itemHtml = ''
                    $.each(content, function (index, item) {
                        var id = item.id
                        var shoufei = item.froms
                        var img = item.img
                        var school_name = item.school_name
                        var name = item.name
                        var teacher_name = item.teacher_name
                        var title = item.title
                        var learning = item.read_num + '人在学习'
                        var learnHtml = `<span class="tag tag-free">${learning}</span> `
                        itemHtml +=
                            `
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
                                                </div>
                                            <div class="les-item les-title">
                                                <div class="les-text three-ellipsis">
                                                ${title}                                      
                                                </div>
                                            </div>
                                            <div class="les-item les-title">
                                                <div class="les-text one-ellipsis les-author">${teacher_name}</div>
                                                ${learnHtml}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                                `
                    });
                    myLoad.render(curPage, totlePage, itemHtml, function () {
                        root.lcAddPadding()
                    })
                }
            })
            // myLoad.removeContent()
            //页面滚动执行事件
            $(window).off()
            $(window).scroll(function () {
                myLoad.loadMore($(this));
            });
        }
        root.lazyLoadLesCenter = lazyLoadLesCenter
        // getMode3
        let modeAjaxGetThd = (url, data) => {
            $.ajax({
                type: "GET",
                url: url,
                data: data,
                dataType: "JSON",
                beforeSend: beforeFnSec,
                success: function (result) {
                    // console.log(result)
                    if (document.getElementById('centerClass')) {
                        console.log('更新课程中心分类')
                        root.renderFenleiTagSec(result)
                    }
                },
                error: error
            })
        }
        root.modeAjaxGetThd = modeAjaxGetThd
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
            var firstFlId
            // 课程中心页面回调
            let mainTagText = $(this).find('.item-text').text()
            $('.top_tag .menu-text').text(mainTagText)
            root.closeMainTagP()
            // 初始化 获取用户跳转过来的一级分类cate_id
            var cate_id = root.getQueryString('cate_id')
            // var cate_id = ''
            if (cate_id == '') {
                
                // 获取当前一级标签id
                var firstDataId = $('.hid-list .hid_item:first-child').data('id')
                var cateName = $('.hid-list .hid_item:first-child').find('.item-text').text()
                // console.log(1111111111)
                console.log(firstDataId, cateName)
                firstFlId = firstDataId
                $('.top_tag').find('.menu-text').text(cateName)
            } else {
                // 改变一级标签
                var curTag = $(".hid_item[data-id='"+ cate_id +"']").text()
                $('.top_tag .menu-text').text(curTag)
                console.log(curTag, $('.top_tag .menu-text'))
                var firstDataId = cate_id
                $('.hid-list select').removeClass('select')
                var cateName = $('.hid-list .select .item-text').text()
                firstFlId = firstDataId
            }
            var fenleiDataObj = {
                cate_id: firstFlId
            }
            console.log(fenleiDataObj)
            root.modeAjaxGet(fenleiUrl, fenleiDataObj)

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
            // 回到顶部
            root.toTop()
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
                var money = $('.off-price').text().split(' ')[1]
                console.log(money)
                var text = '本课程' + money + '流量币，是否确认购买？'
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
                "components": [{
                    "name": 'MemoryPlayComponent',
                    "type": AliPlayerComponent.MemoryPlayComponent,
                }],
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
                console.log(player);
                $('.prism-fullscreen-btn').hide()
                $('.prism-big-play-btn').on('click', function () {
                    $('.prism-fullscreen-btn').show()
                })
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