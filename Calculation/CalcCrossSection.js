// var gaocheng; //设计高程
// var n; //横断面段数
// var interval; //采样间隔
// var fangwei = []; //纵断面方位角和横断面方位角
// var licheng = []; //纵断面长度（里程）
// var K = []; //关键点
// // var M = []; //横断面中心点
// var point1 = []; //所有散点s
// var ZDM = []; //纵断面的点
// var HDM1 = []; //单个横断面内的点
// var HDM = []; //多个横断面内插点信息

// //================纵断面算法================//
// function ZongCrossSection(data) {
//     gaocheng = document.getElementById('DesignHeight').value;
//     interval = (parseInt(document.getElementById('SamplingInterval').value) + 1) * 5;
//     const crossSectionPoints = [];

//     // 找到最小和最大的X坐标，确定横截面的宽度
//     let minX = data[0].X;
//     let maxX = data[0].X;
//     for (let i = 1; i < n; i++) {
//         if (data[i].X < minX) minX = data[i].X;
//         if (data[i].X > maxX) maxX = data[i].X;
//     }

//     // 在横截面宽度范围内进行采样
//     for (let x = minX; x <= maxX; x += interval) {
//         let crossSectionPoint = { X: x, Y: 0, Z: designElevation };

//         // 找到距离当前x坐标最近的两个点
//         let point1 = data[0];
//         let point2 = data[1];
//         for (let i = 1; i < n; i++) {
//             if (data[i].X >= x) {
//                 point1 = data[i - 1];
//                 point2 = data[i];
//                 break;
//             }
//         }

//         // 根据两个点之间的斜率来计算在x坐标处的高程值
//         const slope = (point2.Z - point1.Z) / (point2.X - point1.X);
//         crossSectionPoint.Z = point1.Z + (x - point1.X) * slope;

//         crossSectionPoints.push(crossSectionPoint);
//     }
//     return crossSectionPoints;
// }

// //================横断面算法================//
// function hengCrossSection(data) {
//     for (var i = 0; i < n; i++) {
//         M[i] = new Point1();
//         M[i].pointName = "M " + (i + 1);
//         M[i].licheng = 25;
//         M[i].X = (K[i].X + K[i + 1].X) / 2;
//         M[i].Y = (K[i].Y + K[i + 1].Y) / 2;

//         fangwei[i] = fangwei[i] - Math.PI / 2;
//         //加或者减pi/2都可以，正向和反向的排列，只影响横断面里点的排列往返
//     }
//     for (var i = 0; i < n; i++) {
//         var k = 0;
//         for (var j = -25; j <= 25; j = j + 5) //延伸25米
//         {
//             if (j != 0) {
//                 var p = new Point1();
//                 p.pointName = "C" + (j / 5);
//                 p.licheng = k;
//                 p.X = M[i].X + j * Math.Cos(fangwei[i]);
//                 p.Y = M[i].Y + j * Math.Sin(fangwei[i]);
//                 HDM1.push(p);
//             } else {
//                 HDM1.push(M[i]);
//             }
//             k = k + 5;
//         }
//         //MessageBox.Show(HDM1[10].X.ToString());
//         HDM.push(HDM1);
//         //MessageBox.Show(HDM[0][10].X.ToString());
//     }
//     for (var i = 0; i < n; i++) //n个横断面
//     {
//         var d;
//         var dianhao = 0;
//         for (var j = 0; j < HDM[i].Count; j++) //对每个断面的所有内插点都进行遍历
//         {
//             var dmin1 = 0;
//             var HD = 0,
//                 LD = 0; //计算插值点高程
//             for (var q = 0; q < 5; q++) //寻找最近的5个点
//             {
//                 var dmin = 1000000000000;
//                 for (var k = 0; k < data.length; k++) //遍历所有散点
//                 {
//                     d = CalDistance(HDM[i][j], point1[k]);
//                     if (dmin > d && d > dmin1) {
//                         dmin = d;
//                         dianhao = k;
//                     }
//                 }
//                 dmin1 = dmin; //存储最小值，次小值，方便排序
//                 //MessageBox.Show(dmin.ToString());
//                 HD = HD + point1[dianhao].Z / dmin;
//                 LD = LD + 1 / dmin;
//             }
//             HDM[i][j].Z = HD / LD;
//         }
//     }
//     var S = new double[n];
//     for (var i = 0; i < n; i++) //横断面个数 每个循环求每个横断面面积
//     {
//         for (var j = 0; j < HDM[i].Count - 1; j++) {
//             S[i] = S[i] + ((HDM[i][j].Z + HDM[i][j + 1].Z - 2 * gaocheng) * 5 / 2);
//         }
//     }
// }