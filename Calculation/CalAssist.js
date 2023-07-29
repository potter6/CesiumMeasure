//算两点方位角
function CalAngle(x1, y1, x2, y2) {
    return 180 - 90 * Math.abs((y2 - y1) / (y2 - y1) + Math.pow(10, -10)) -
        Math.Atan((x2 - x1) / (y2 - y1 + Math.Pow(10, -10))) * 180 / Math.PI;
}

//算距离
function CalDistance(x1, y1, x2, y2) {
    return Math.Sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}