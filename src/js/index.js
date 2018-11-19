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
    (function ($, root) {}(window.$, window.wangjiao || (window.wangjiao = {})));

    /****************************************************************************** */
    /**
     * 渲染
     * render.js
     */
    (function ($, root) {}(window.$, window.wangjiao || (window.wangjiao = {})));

    /****************************************************************************** */
    /**
     * 初始化
     * init.js
     */
    (function ($, root) {}(window.$, window.wangjiao || (window.wangjiao = {})));


    /****************************************************************************** */
    /**
     * 获取
     * getData.js
     */
    (function ($, root) {}(window.$, window.wangjiao || (window.wangjiao = {})));
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
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });


        } else if (0) {

        }
    }(window.$, window.wangjiao || (window.wangjiao = {})));

}())