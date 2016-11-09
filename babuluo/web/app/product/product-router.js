
//商品新增
$import('product/product/productAdd',undefined,true);

//商品修改
$import('product/product/productModify', {productId: undefined},true);

//商品列表
$import('product/product/productList',{keyword:''});

//商品分类列表
$import('product/class/classList');

//商品分类排序
$import('product/class/classOrder');

//商品单位列表
$import('product/unit/unitList');

//商品标签列表
$import('product/tag/tagList');









