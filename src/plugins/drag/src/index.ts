import { Event } from 'src/base-class/Event'
import { createNode } from 'src/util/dom-tool'
import { DragData } from '../interface'

function setStyle(elm: HTMLElement, attribute: string, val: string){
    console.log(elm, attribute, val);
    
    let style = elm.style
    console.log(style);
    
    if(style[attribute]) {
    }
}

/**
 * @author hxk
 * @link	链接
 * @namespace	Drag
 * @return	Drag
 * @param data	Object 生成拖拽框需要的配置
 *  @param id 	
 * @version 1.0
 */
export default class Drag extends Event {
    data: DragData
    dragBox: HTMLDivElement
    dragMinWidth: number
    dragMinHeight: number
    constructor(data: DragData) {
        super();
        this._init(data);
    }

    _init (data: DragData) {
        this.dragBox = null;
        this.data = data;
        this._newDrag(this.data);
        this.dragMinWidth = data.dragMinWidth || 300;
        this.dragMinHeight = data.dragMinHeight || 300;
    }

    _newDrag (data: DragData) {
        try {
            this._creatElm(data); //根据配置创建窗口
            console.log(111);
            this._changeSize(data);
            this._dragElm(data);
            // this._openDrag(data)
        } catch (error) {
            console.log(error);
        }
    }

    _creatElm (data: DragData) {
        this.dragBox = document.createElement("div");
        this.dragBox.className = "dragBox";
        // this.dragBox.setAttribute('style', `width: 100%; height: 100%;`)
        this.dragBox.style.cssText = 'width: 100%; height: 100%;'
        setStyle(this.dragBox, 'style', `width: 100%; height: 100%;`)
        let arr = []
        for (let i in this.data.buttonSet) {
            this.data.buttonSet[i].contentHTML = this.data.buttonSet[i].icon
            this.data.buttonSet[i].buttonEvent = this.data.buttonSet[i].callBack
            this.data.buttonSet[i].className = this.data.buttonSet[i].class
            this.data.buttonSet[i].nodeType = 'a'
            arr.push(this.data.buttonSet[i]); //属性
            //arr.push(obj[i]); //值
        }
        arr.push({
            contentHTML: `<svg t="1642731525215" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2174" width="15" height="15"><path d="M511.333 127.333c51.868 0 102.15 10.144 149.451 30.15 45.719 19.337 86.792 47.034 122.078 82.321 35.287 35.286 62.983 76.359 82.321 122.078 20.006 47.3 30.15 97.583 30.15 149.451s-10.144 102.15-30.15 149.451c-19.337 45.719-47.034 86.792-82.321 122.078-35.286 35.287-76.359 62.983-122.078 82.321-47.3 20.006-97.583 30.15-149.451 30.15s-102.15-10.144-149.451-30.15c-45.719-19.337-86.792-47.034-122.078-82.321-35.287-35.286-62.983-76.359-82.321-122.078-20.006-47.3-30.15-97.583-30.15-149.451s10.144-102.15 30.15-149.451c19.337-45.719 47.034-86.792 82.321-122.078 35.286-35.287 76.359-62.983 122.078-82.321 47.301-20.006 97.583-30.15 149.451-30.15m0-64c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448z" fill="#515151" p-id="2175"></path><path d="M557.254 512l147.373-147.373c12.497-12.497 12.497-32.758 0-45.255-12.496-12.497-32.758-12.497-45.254 0L512 466.746 364.627 319.373c-12.497-12.497-32.758-12.497-45.255 0s-12.497 32.758 0 45.255L466.746 512 319.373 659.373c-12.497 12.496-12.497 32.758 0 45.254C325.621 710.876 333.811 714 342 714s16.379-3.124 22.627-9.373L512 557.254l147.373 147.373C665.621 710.876 673.811 714 682 714s16.379-3.124 22.627-9.373c12.497-12.496 12.497-32.758 0-45.254L557.254 512z" fill="#515151" p-id="2176"></path></svg>`,
            buttonEvent: this._closeDrag,
            className: 'close',
            nodeType: 'a'
        });

        /*
        * nodeType String 可选 渲染dom元素的标签 默认div
        * className String 可选 渲染dom元素的类名 默认为空
        * contentHTML String 可选 元素内容 默认为空
        * buttonEvent Object 可选 元素事件，listen为事件名称，fn为事件方法，默认为点击事件
        * childrenNode Array 可选 递归创建子元素
        */
        let createNodeList = [
            {
                className: 'dragBox-title',
                childrenNode: [
                    {
                        nodeType: 'h2',
                        contentHTML: data.title ? data.title : "拖动窗口"
                    },
                    {
                        className: '',
                        childrenNode: arr
                    },
                ]
            },
            {
                className: 'resizeL'
            }, {
                className: 'resizeT'
            }, {
                className: 'resizeR'
            }, {
                className: 'resizeB'
            }, {
                className: 'resizeLT'
            }, {
                className: 'resizeTR'
            }, {
                className: 'resizeBR'
            }, {
                className: 'resizeLB'
            }, {
                className: 'content',
                contentHTML: this.data.content
            }]

        createNode(createNodeList, this.dragBox)

        document
            .querySelector(data.id ? "#" + data.id : "." + data.class)
            .appendChild(this.dragBox);

        this.emit('drag:create-over')
    }

    /*
    * 关闭按钮的默认点击
    */
    _closeDrag () {
        // let drag: HTMLDivElement = document.querySelector("#drag")
        // drag.style.display = "none"
    }

    /*
    * 绑定所有拖拽事件
    */
    _changeSize (data) {
        console.log(data);
        
        let oDrag: HTMLDivElement = document.querySelector("#drag");
        let oLT: HTMLDivElement = document.querySelector(".resizeLT");
        let oTR: HTMLDivElement = document.querySelector(".resizeTR");
        let oBR: HTMLDivElement = document.querySelector(".resizeBR");
        let oLB: HTMLDivElement = document.querySelector(".resizeLB");
        let oL: HTMLDivElement = document.querySelector(".resizeL");
        let oT: HTMLDivElement = document.querySelector(".resizeT");
        let oR: HTMLDivElement = document.querySelector(".resizeR");
        let oB: HTMLDivElement = document.querySelector(".resizeB");
        //四角
        this.resize(oDrag, oLT, true, true, false, false);
        this.resize(oDrag, oTR, false, true, false, false);
        this.resize(oDrag, oBR, false, false, false, false);
        this.resize(oDrag, oLB, true, false, false, false);
        //四边
        this.resize(oDrag, oL, true, false, false, true);
        this.resize(oDrag, oT, false, true, true, false);
        this.resize(oDrag, oR, false, false, false, true);
        this.resize(oDrag, oB, false, false, true, false);
        // oDrag.setAttribute('style',
        //     `left: ${(document.documentElement.clientWidth - 200) / 2} px; 
        //     top: ${(document.documentElement.clientHeight - 400) / 2} px`
        // )
        oDrag.style.left =
            (document.documentElement.clientWidth - 200) / 2 + "px";
        oDrag.style.top =
            (document.documentElement.clientHeight - 400) / 2 + "px";

        //  oDrag.style.left =
        //     (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
        //   oDrag.style.top =
        //     (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
    }

    /*
    *拖拽函数
    */
    _dragElm (data) {
        console.log(111);
        
        let oDrag: HTMLElement = document.querySelector("#drag")
        let handle: HTMLElement = document.querySelector(".dragBox-title")
        var disX = 0;
        var disY = 0;

        handle = handle || oDrag;
        handle.setAttribute('style','cursor: move')
        // handle.style.cursor = "move";
        handle.onmousedown = function (event) {
            var event: MouseEvent = event;
            disX = event.clientX - oDrag.offsetLeft;
            disY = event.clientY - oDrag.offsetTop;

            const mask = document.createElement('div')
            const maskWidth = window.innerWidth
            const maskHeight = window.innerWidth
            // console.log(`position: fixed;top: 0;left: 0;width: ${maskWidth}px;height: ${maskHeight}px;z-index: 9999;`);
            // mask.style.cssText = `position: absolute;top: 0;left: 0;width: ${maskWidth}px;height: ${maskHeight}px;z-index: 9999;`
            // mask.setAttribute('style', `position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999` )
            mask.style.cssText = `
              position:fixed;
              top:0;
              left:0;
              right:0;
              bottom:0;
              z-index: 99999`
            mask.setAttribute('id', 'mousemoveMask')
            document.body.append(mask)

            mask.onmousemove = function (event) {
                var event: MouseEvent = event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
                iL <= 0 && (iL = 0);
                iT <= 0 && (iT = 0);
                iL >= maxL && (iL = maxL);
                iT >= maxT && (iT = maxT);
                // oDrag.setAttribute('style', `left: ${iL}px; top: ${iT}px`)
                oDrag.style.left = iL + "px";
                oDrag.style.top = iT + "px";
                return false;
            };
            mask.onmouseup = function () {
                const mask = document.getElementById('mousemoveMask')
                // mask && mask.removeEventListener('mousemove', this.handleMousemove)
                mask && mask.remove()
                mask.onmousemove = null;
                mask.onmouseup = null;
                // this.releaseCapture && this.releaseCapture();
            };
            // this.setCapture && this.setCapture();
            return false;
        };
    }

    /*
    *改变大小函数
    */
    resize (oParent: HTMLDivElement, handle: HTMLDivElement, isLeft: boolean, isTop: boolean, lockX: boolean, lockY: boolean) {
        console.log(oParent);
        let dragMinWidth = this.dragMinWidth
        let dragMinHeight = this.dragMinHeight

        handle.onmousedown = function (event) {

            var event: MouseEvent = event;
            var disX = event.clientX - handle.offsetLeft;
            var disY = event.clientY - handle.offsetTop;
            var iParentTop = oParent.offsetTop;
            var iParentLeft = oParent.offsetLeft;
            var iParentWidth = oParent.offsetWidth;
            var iParentHeight = oParent.offsetHeight;

            const mask = document.createElement('div')
            mask.style.cssText = 'position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 99999999999;'
            mask.setAttribute('id', 'mousemoveMask')
            document.body.append(mask)
            // mask.addEventListener('mousemove', this.handleMousemove)

            mask.onmousemove = function (event) {
                var event: MouseEvent = event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxW =
                    document.documentElement.clientWidth - oParent.offsetLeft - 2;
                var maxH =
                    document.documentElement.clientHeight - oParent.offsetTop - 2;
                var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
                isLeft && (oParent.style.left = iParentLeft + iL + "px");
                isTop && (oParent.style.top = iParentTop + iT + "px");
                iW < dragMinWidth && (iW = dragMinWidth);
                iW > maxW && (iW = maxW);
                lockX || (oParent.style.width = iW + "px");
                iH < dragMinHeight && (iH = dragMinHeight);
                iH > maxH && (iH = maxH);
                lockY || (oParent.style.height = iH + "px");
                if (
                    (isLeft && iW == dragMinWidth) ||
                    (isTop && iH == dragMinHeight)
                )
                    document.onmousemove = null;
                return false;
            };
            mask.onmouseup = function () {
                const mask = document.getElementById('mousemoveMask')
                // mask && mask.removeEventListener('mousemove', this.handleMousemove)
                mask && mask.remove()
                mask.onmousemove = null;
                mask.onmouseup = null;
            };
            return false;
        };
    }
}