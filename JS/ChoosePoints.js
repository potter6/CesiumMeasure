var ClickedPoints = []; // 存储点击点的 高斯平面x,y及h
var positions = []; // 存储点击点的坐标
var isSelecting = false; // 是否正在进行选择
var clickHandler = null; // 点击事件处理程序
var TestPoints = []; // 测试用的点
var TempX; // 间隔X轴 画图用
var chart; // 表格
var pathPoints = []; // 路径点
var Interval; // 采样间隔
var sectionl; // 横断面长度
var designheight; // 设计高程

//开始选点
function Start() {
    isSelecting = true;
    startButton.disabled = true;
    cancelButton.disabled = false;
    TempX = 0;

    //读取采样间隔
    Interval = (parseInt(document.getElementById('SamplingInterval').value) + 1) * 5;
    console.log(Interval)

    //横断面长度
    sectionl = parseInt(document.getElementById('SectionL').value);
    console.log(sectionl)

    //读取设计高程
    designheight = parseInt(document.getElementById('DesignHeight').value);
    console.log(designheight)

    // 移除之前的点击事件处理程序
    viewer.canvas.removeEventListener("click", clickHandler, false);

    //高程信息
    var terrainProvider = Cesium.createWorldTerrain();

    try {
        // 添加新的点击事件处理程序
        clickHandler = viewer.canvas.addEventListener("click", function(event) {
            if (isSelecting) {
                var mousePosition = new Cesium.Cartesian2(
                    event.clientX,
                    event.clientY
                );
                var ellipsoid = viewer.scene.globe.ellipsoid;
                var cartesian = viewer.camera.pickEllipsoid(
                    mousePosition,
                    ellipsoid
                );
                console.log(cartesian);

                if (cartesian) {
                    var cartographic = ellipsoid.cartesianToCartographic(
                        cartesian
                    );
                    var longitude = Cesium.Math.toDegrees(
                        cartographic.longitude
                    );
                    var latitude = Cesium.Math.toDegrees(
                        cartographic.latitude
                    );

                    positions.push([longitude, latitude]); // 存储点的经纬度坐标

                    let position = Cesium.Cartographic.fromDegrees(longitude, latitude);
                    let promise = Cesium.sampleTerrainMostDetailed(terrainProvider, [position]);

                    Cesium.when(promise, function(updatedPositions) {
                        elevation = updatedPositions[0].height;

                        TempX = TempX + Interval;

                        clickedPoint = {
                            B: longitude,
                            L: latitude,
                            H: elevation,
                            X: TempX,
                        }
                        ClickedPoints.B = longitude;
                        ClickedPoints.L = latitude;
                        ClickedPoints.H = elevation;

                        TestPoints.push(clickedPoint);
                        console.log(TestPoints);
                    });

                    // 创建点实例
                    var pointEntity = viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(
                            longitude,
                            latitude
                        ),
                        point: {
                            pixelSize: 8,
                            color: Cesium.Color.BLUE,
                        },
                    });

                    // 创建连线
                    if (positions.length > 1) {
                        var lineEntity = viewer.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArray(
                                    [].concat.apply([], positions)
                                ),
                                width: 2,
                                material: Cesium.Color.RED,
                            },
                        });
                    }

                }
            }
        });
    } catch {
        alert("出现错误，请检查数据输入");
    }
}

// 对应画图按钮
function ChoosePointPlot() {
    // 显示弹出框
    document.getElementById('chartModal').style.display = 'block';

    // 创建或更新图表
    chart = chart || echarts.init(document.getElementById('chartContainer'));
    chart.setOption(ChoosePointChart());
}
// 绘制图表
function ChoosePointChart() {
    try {
        // 将数据转换为ECharts所需的格式
        var seriesData = TestPoints.map(function(item) {
            return [item.X, item.H + designheight]
        })

        // 返回图表的配置项和数据
        return {
            title: {
                text: '选点高程',
                textStyle: {
                    fontWeight: 'normal',
                    color: 'Black'
                },
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['D', 'H'],
                symbol: 'circle',
                symbolSize: 0
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                name: '里程/m',
                axisLine: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                axisLabel: {
                    color: 'blue'
                }
            },
            yAxis: {
                type: 'value',
                name: '高程/m',
                axisLine: {
                    lineStyle: {
                        color: 'black'
                    }
                },
                axisLabel: {
                    color: 'blue'
                }
            },
            series: [{
                name: '数值',
                type: 'line',
                itemStyle: {
                    color: 'orange'
                },
                symbol: 'circle',
                symbolSize: 0,
                data: seriesData,
                smooth: true,
                areaStyle: {}
            }],
        };
    } catch {
        alert('选择不正确，请重新选择点');
    }
}

//结束选点
function Cancel() {
    isSelecting = false;
    startButton.disabled = false;
    cancelButton.disabled = true;

    // 移除点击事件处理程序
    viewer.canvas.removeEventListener("click", clickHandler, false);
}

//清除所有选点及数据
function ClearSelection() {
    isSelecting = false;
    startButton.disabled = false;
    cancelButton.disabled = true;

    // 清除控制台
    console.clear();

    // 清除变量
    TestPoints = [];
    TempX = 0;

    // 图表更新
    chart.clear();

    // 移除点击事件处理程序
    viewer.canvas.removeEventListener("click", clickHandler, false);

    // 移除所有的实体对象
    viewer.entities.removeAll();

    // 清空存储点的数组
    positions = [];

    //关闭画图显示窗口
    closeChartModal();
}

// 计算断面的累计距离
function calculateCrossSectionDistance(points) {
    let distance = 0;
    const n = points.length;

    for (let i = 1; i < n; i++) {
        distance += calculateDistance(points[i - 1], points[i]);
    }

    return distance;
}

// 示例
const crossSectionDistance = calculateCrossSectionDistance(crossSectionPoints);
console.log("纵横断面距离:", crossSectionDistance);