//导入的点云
function loadPointCloud() {
    viewer.flyTo(pointCloudTileset)
}

//汽车模型
function loadModel() {
    viewer.flyTo(viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(113.008, 28.06775, 63.0),
        model: {
            uri: 'qiche.gltf'
        }
    }))
}

// 回到在线点云模型
function backModel() {
    viewer.flyTo(tilesets)
}