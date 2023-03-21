单例设计 多个实例化只会生成一个loading实例

~~~js
let loading = new hxkToolBox.Loading();
let loading1 = new hxkToolBox.Loading();
console.log(loading === loading1);
// true
~~~