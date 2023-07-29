var chart

//关闭
function closeChartModal() {
    // 清除 便于重载
    chart.clear();
    // 隐藏弹出框
    document.getElementById('chartModal').style.display = 'none';
}

//断面图1
function EchartsDraw() {
    // 显示弹出框
    document.getElementById('chartModal').style.display = 'block';

    // 创建或更新图表
    chart = chart || echarts.init(document.getElementById('chartContainer'));
    chart.setOption(getChartOptions());
}
//断面图1内容的设置
function getChartOptions() {
    return {
        title: { text: '断面图', textStyle: { fontWeight: 'normal', color: 'Black' }, left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['D', 'H'], symbol: 'circle', symbolSize: 0 },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            name: '里程/m',
            axisLine: { lineStyle: { color: 'black' } },
            axisLabel: { color: 'blue' },
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
            smooth: true,
            areaStyle: {},
            data: [
                [140, 35.676],
                [150, 24.268],
                [160, 34.081],
                [170, 23.844],
                [325, 46.338],
                [340, 38.391],
                [360, 45.855],
                [380, 38.637],
                [385, 29.002],
                [400, 29.577],
                [415, 32.891]
            ]
        }],
    };
    6
}

//断面图2
function DuanDraw() {
    // 显示弹出框
    document.getElementById('chartModal').style.display = 'block';

    // 创建或更新图表
    chart = chart || echarts.init(document.getElementById('chartContainer'));
    chart.setOption(getDuanChartOptions());
}
//断面图2的图表设置
function getDuanChartOptions() {
    return {
        title: {
            text: '断面图',
            textStyle: {
                fontWeight: 'normal',
                color: 'Black'
            },
            left: 'center'
        },
        tooltip: {
            // trigger: 'item',
            // formatter: function(params) {
            //     return 'X: ' + params.value[0] + '<br>H: ' + params.value[1];
            // }
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'
                    // 默认为直线，可选为：‘line‘ | ‘shadow‘
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
            },
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
            smooth: true,
            areaStyle: {},
            data: [
                [-25, 28.730],
                [-20, 32.339],
                [-15, 37.255],
                [-10, 38.517],
                [-5, 38.560],
                [0, 35.839],
                [5, 33.759],
                [10, 27.436],
                [15, 25.436],
                [20, 25.436],
                [25, 26.063]
            ]
        }],
    };
}