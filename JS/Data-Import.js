let data = [];

// 读取文本文件并解析XYZ数据
function readTextFile(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            var lines = contents.split('\n');
            data = [];
            for (var i = 0; i < lines.length; i++) {
                var values = lines[i].trim().split(',');
                var x = parseFloat(values[0]);
                var y = parseFloat(values[1]);
                var z = parseFloat(values[2]);
                data.push({ x: x, y: y, z: z });
            }
            resolve(data);
        };
        reader.onerror = function(e) {
            reject(e.target.error);
        };
        reader.readAsText(file);
    });
}

var chart

//对应画图按钮
function ChartPlot() {
    // 显示弹出框
    document.getElementById('chartModal').style.display = 'block';

    // 创建或更新图表
    chart = chart || echarts.init(document.getElementById('chartContainer'));
    chart.setOption(plotChart(data));
}
// 绘制图表
function plotChart(data) {
    var xData = [];
    var zData = [];

    // 提取X和Y的数据
    for (var i = 0; i < 15; i++) {
        xData.push((data[i].x % 1) * 1000);
        zData.push((data[i].z % 1) * 1000);
    }
    console.log(xData)
    console.log(zData)

    return {
        title: {
            text: 'X and Z Points',
            textStyle: {
                fontWeight: 'normal',
                color: 'Black'
            },
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['X', 'Y'],
            symbol: 'circle',
            symbolSize: 0
        },
        xAxis: {
            type: 'value',
            name: 'X',
        },
        yAxis: {
            type: 'value',
            name: 'Y'
        },
        series: [{
            name: '数值',
            type: 'line',
            symbol: 'circle',
            symbolSize: 0,
            data: zData
        }]

    };
}

// 查找具有最大X值的点
function findMaxXPoint(data) {
    var maxXPoint = data[0];
    for (var i = 1; i < data.length; i++) {
        if (data[i].x > maxXPoint.x) {
            maxXPoint = data[i];
        }
    }
    return maxXPoint;
}

// 查找具有最小X值的点
function findMinXPoint(data) {
    var minXPoint = data[0];
    for (var i = 1; i < data.length; i++) {
        if (data[i].x < minXPoint.x) {
            minXPoint = data[i];
        }
    }
    return minXPoint;
}

// 处理文件上传事件
function handleFileUpload(event) {
    var file = event.target.files[0];
    readTextFile(file).then(function(data) {
        // 打印所有点的数据
        console.log(data);

        // 找到具有最大X值的点
        var maxXPoint = findMaxXPoint(data);
        console.log('Max X Point:', maxXPoint);

        // 找到具有最小X值的点
        var minXPoint = findMinXPoint(data);
        console.log('Min X Point:', minXPoint);

        //test测试用
        const crossSectionPoints = generateCrossSectionPoints(data, gaocheng, interval);
        console.log("纵横断面采样点:", crossSectionPoints);
        //test测试用

    }).catch(function(error) {
        console.error('Error:', error);
    });
}

var gaocheng; //设计高程
var interval; //采样间隔

function generateCrossSectionPoints(data, designElevation, interval) {
    const crossSectionPoints = [];
    const n = data.length;

    // 找到最小和最大的X坐标，确定横截面的宽度
    let minX = data[0].x;
    let maxX = data[0].x;
    for (let i = 1; i < n; i++) {
        if (data[i].x < minX) minX = data[i].x;
        if (data[i].x > maxX) maxX = data[i].x;
    }

    // 在横截面宽度范围内进行采样
    for (let x = minX; x <= maxX; x += interval) {
        let crossSectionPoint = { X: x, Y: 0, Z: designElevation };

        // 找到距离当前x坐标最近的两个点
        let point1 = data[0];
        let point2 = data[1];
        for (let i = 1; i < n; i++) {
            if (data[i].x >= x) {
                point1 = data[i - 1];
                point2 = data[i];
                break;
            }
        }

        // 根据两个点之间的斜率来计算在x坐标处的高程值
        const slope = (point2.Z - point1.Z) / (point2.X - point1.X);
        crossSectionPoint.Z = point1.Z + (x - point1.X) * slope;

        crossSectionPoints.push(crossSectionPoint);
    }

    return crossSectionPoints;
}