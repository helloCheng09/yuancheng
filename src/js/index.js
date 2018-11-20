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
                    // 搜索页面回调
                    if (document.getElementById('lessonSearch')) {
                        root.getMenuData()
                        root.renderSearch(dataid)
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
            console.log(555)
            $("#sendCode").on("click", function () {
                console.log(1234)
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
                url: "some.php",
                data: data,
                dataType: "JSON",
                // beforeSend :,
                success: function (msg) {
                    console.log("Data Saved: " + msg);
                    // 回调渲染入口


                },
                error: error
            })
        }
        // error
        let error = () => {
            layer.msg("网络错误~~")

        }

        // console.log($.param([{"value":"23", "name":"1"}]))

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


        } else if (document.getElementById('centerUser')) {
            // 个人中心

        } else if (document.getElementById('lessonSearch')) {
            // 课程搜索
            console.log("搜索")
            root.newTagToggle(".bar-item", ".item-text")
            root.newTagToggle(".hid-item", ".hid-item-b")
            root.showMn()

        } else if (document.getElementById('videoDet')) {
            // 观看课程
            // 实例化播放器
            var videoObject = {
                autoplay: false, //是否自动播放，默认true=自动播放，false=默认暂停状态
                poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542632828677&di=aa1ddfe45780a60ac39da7615c582a8f&imgtype=0&src=http%3A%2F%2Ftp.yiaedu.com%2Fshowimg.php%3Furl%3Dhttp%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1703%2F867-1F330164643.jpg', //封面图片地址
                container: '#video', //“#”代表容器的ID，“.”或“”代表容器的class
                variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
                video: '../video/video22.mp4', //视频地址
                volume: 0.6, //默认音量
                front: '', //前一集按钮点击触发函数，即点击前一集时调用的函数名称，默认为空
                next: '', //下一集按钮点击触发函数，即点击下一集时调用的函数名称，默认为空
                html5m3u8: true //hls为true
                //loop: true //是否循环播放
            };
            var player = new chplayer(videoObject);
            root.newTagToggle(".nav-item", ".nav-text")
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
        }
    }(window.$, window.wangjiao || (window.wangjiao = {})));

}());

// (function foo (x){
//     console.log(arguments)
//     return x
// }(1,2,3,4,5))
// // foo(1,2,3,4,5)

// charCodeAt()

// let stringBitLength = (str) => {
//     var bitLen = 0
//     for (var i = 0; i < str.length; i++) {
//         // bitLen +=  str.charCodeAt(i)
//         if (str.charCodeAt(i) > 255) {
//             bitLen += 2
//         } else {
//             bitLen++
//         }
//     }
//     console.log(bitLen)
//     return bitLen
// }

// var str = "我爱北京天安门abcde"
// stringBitLength(str)