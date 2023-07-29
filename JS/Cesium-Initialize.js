// Cesium官网
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTIyZmYwNC1lOWZlLTRmN2ItYTA0YS1jMTAxZWIyOGY3ZWEiLCJpZCI6MTIwNzU1LCJpYXQiOjE2NzMyNjMzMDl9.Jkr5hkEYBr4y5Wr9PrbJ1VQIj1eSiMAesFeT6KUrf28";

// Cesium地球的相关设置
const viewer = new Cesium.Viewer(cesiumContainer, {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    }), //底图数据提供
    animation: false, //动画小组件
    baseLayerPicker: true, //底图组件，选择三维数字地球的地图（imagery and terrain）
    timeline: false, //是否显示时间轴，底部
    homeButton: true, //是否显示Home按钮,右上角按钮
    infoBox: false, //是否显示信息框
    fullscreenButton: false, //是否显示全屏按钮,右下角按钮
    selectionIndicator: false, //是否显示选取指示器组件，绿色选中框
    vrButton: false, //VR按钮
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //     url: Cesium.IonResource.fromAssetId(1),
    //     requestVertexNormals: true,
    //     requestWaterMask: true //水面流动的效果
    // }),
});

// 将Cesium logo去掉
viewer._cesiumWidget._creditContainer.style.display = "none";

let measure = new Cesium.Measure(viewer)
let clampToGround = true

// 设置模型位置
var longitude1 = 113.09944222222;
var latitude1 = 23.0174401222222;
var height1 = -5.1;
var rotation1 = 0; //rotation degrees
var url1 = Cesium.IonResource.fromAssetId(1935056);
var modelMatrix1 = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude1, latitude1, height1));
Cesium.Matrix4.multiplyByMatrix3(modelMatrix1, Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotation1)), modelMatrix1);
var pointCloudTileset = new Cesium.Cesium3DTileset({
    url: url1, //文件路径
    modelMatrix: modelMatrix1, //模型位置以及旋转角度高度设置
    luminanceAtZenith: 0.2, //太阳光照在天顶的亮度，以每平方米千坎德拉为单位，用于该模型的过程环境图。
    lightColor: new Cesium.Cartesian3(0.3, 0.3, 0.3), //着色模型时的浅色。当undefined现场的灯光颜色来代替。
    backFaceCulling: true //是否剔除背面几何。如果为true，则背面剔除由glTF材料的doubleSided属性决定；如果为假，则禁用背面剔除。
});
// 异步加载模型
pointCloudTileset.readyPromise.then(function(tileset) {
    viewer.scene.primitives.add(tileset);
    // 飞入模型位置
    viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));
}).otherwise(function(error) {
    console.log(error);
});

// 设置模型位置
var longitude2 = 116.3;
var latitude2 = 39.9;
var height2 = -5.1;
var rotation2 = 0; //rotation degrees
var url2 = Cesium.IonResource.fromAssetId(1819811);
var modelMatrix2 = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude2, latitude2, height2));
Cesium.Matrix4.multiplyByMatrix3(modelMatrix2, Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotation2)), modelMatrix2);
var tilesets = new Cesium.Cesium3DTileset({
    url: url2, //文件路径
    modelMatrix: modelMatrix2, //模型位置以及旋转角度高度设置
    luminanceAtZenith: 0.2, //太阳光照在天顶的亮度，以每平方米千坎德拉为单位，用于该模型的过程环境图。
    // lightColor: new Cesium.Cartesian3(0.3, 0.3, 0.3), //着色模型时的浅色。当undefined现场的灯光颜色来代替。
    backFaceCulling: true //是否剔除背面几何。如果为true，则背面剔除由glTF材料的doubleSided属性决定；如果为假，则禁用背面剔除。
});
// 异步加载模型
tilesets.readyPromise.then(function(tileset) {
    viewer.scene.primitives.add(tileset);
    //飞入模型位置
    //     viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));
    // }).otherwise(function(error) {
    //     console.log(error);
});

// //官网自带的tileset
// var tilesets = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//     url: 'http://earthsdk.com/v/last/Apps/assets/dayanta/tileset.json'
//         // url: Cesium.IonResource.fromAssetId(1819921),
// }));