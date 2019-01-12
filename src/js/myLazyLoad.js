/**
 * 实例化 懒加载
 * loadList 是外层id
 * obj包含      itemClass: ".load_item", // 加载item
                data: {
                     cata_id: '1',
                     page: 1
                },// 传输数据
                url: url, //请求地址
                success(data):{} //请求成功后的回调
 */
class LazyLoad {
    constructor(loadList, obj) {
        this.loadList = loadList;
        this.obj = obj
        // 开关
        this.switch = 0
        // 页码
        // this.pageNum = 2
        // 加载控制
        this.finish = 0
        // 触发补齐一页
        this.onePage = 0
        this.autoPage()
        // 检测滚动加载
        // console.log(this.switch)
    }

    // 检测是否满屏
    autoPage() {
        // 500ms监听一次
        console.log('清空', $(this.loadList))
        $(this.loadList).empty()
        var setDefault = setInterval(() => {
            $('.loadover').remove()
            if (this.switch == 1)
                clearInterval(setDefault)
            else if ($(this.loadList).height() < $(window).height())
                // 执行
                this.loadMore($(window)),
                clearInterval(setDefault)
            else
                clearInterval(setDefault)
        }, 10);
    }

    // ajax加载
    loadMore(obj) {
        let scrollTop = $(obj).scrollTop()
        let scrollHeight = $(document).height()
        let windowHeight = $(obj).height()
        // 完整一个页面
        if (this.switch == 0 && this.finish == 0 && this.onePage == 0) {
            if (scrollTop + windowHeight - scrollHeight <= 50) {
                this.finish = 1
                this.obj.data.page++
                // ajax请求接口
                $.ajax({
                    url: this.obj.url,
                    type: "GET",
                    data: this.obj.data,
                    dataType: "JSON",
                    beforeSend: this.loading(),
                    success: this.obj.success,
                    // https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/lasyLoad?page=2
                })
            }
        }
        // 滚动加载
        if (this.switch == 0 && this.finish == 0) {
            if (scrollTop > scrollHeight - windowHeight - 50) {
                this.finish = 1
                this.obj.data.page++
                // console.log(2222,this.obj.data)
                // ajax请求接口
                $.ajax({
                    url: this.obj.url,
                    type: "GET",
                    data: this.obj.data,
                    dataType: "JSON",
                    beforeSend: this.loading(),
                    success: this.obj.success,
                    // https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/lasyLoad?page=2
                })
            }
        }
    }

    render(curPage, totlePage, itemHtml, callback) {
        // console.log('aaa', curPage, totlePage)
        clearTimeout(window.timer2)
        window.timer2 = setTimeout(() => {
            $(".load-more-bx").remove();
            $("#myList").append(itemHtml)
            callback()
            if (curPage >= totlePage) {
                this.switch = 1
                this.overLoading()
            }
            this.finish = 0
            this.onePage = 1
        }, 200);
    }

    // 加载动画
    loading() {
        var loadHmtl = `  
        <div class="load-more-bx">
            <div class="load-more-one">
                <span class="loading"></span>
                <span>
                    加载中..
                </span>
            </div>
        </div>
        `
        $(this.loadList).append(loadHmtl);
    }

    // 加载动画
    overLoading() {
        clearTimeout(window.timer1)
        if (this.switch == 1) {
            var overtext = "Duang~到底了    ";
            var overHtml = `
                <div class="load-more-bx">
                    <div class="loadover"><span class='over-text'>${overtext}</span></div>
                </div>
            `
            window.timer1 = setTimeout(() => {
                $(this.loadList).append(overHtml);
            }, 1000);
        }
    }

    // error
    error() {
        aler("哎呀，加载失败啦~~")
    }
}