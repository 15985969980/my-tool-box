/*
  * 动态创建元素 
  * @param {Array} optionList 必填 渲染的元素列表
  * @param {HTMLNode} parentNode 必填 要插入的父元素
  */
export function createNode(optionList, parentNode) {
  if (!parentNode) return
  optionList.forEach((option) => {
      if (option.isNoRender) return
      const node = document.createElement(option.nodeType || "div")
      node.className = option.className || ""
      node.innerHTML = option.contentHTML || ""
      if (option.buttonEvent) {
          node.addEventListener('click', option.buttonEvent)
          node.onmousedown = function (event) {
              this.onfocus = function () { this.blur() };
              (event || window.event).cancelBubble = true
          };
      }
      parentNode.appendChild(node)
      if (option.childrenNode) {
          createNode(option.childrenNode, node)
      }
  })
}