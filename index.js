/**
 * Project 5 of Creative Algorithms
 * By IENGROUND (Hyunwoo Rhee 20201131)
 * on github.com/ienground
 */

let tables = [];
let level = 13;
let easycam;
let data_ready = false;

let stations = [

    '도림천', '양천구청', '신정네거리', '까치산',

    '신도림', '대림(구로구청)', '구로디지털단지',
    '신대방', '신림', '봉천',
    '서울대입구(관악구청)', '낙성대(강감찬)', '사당',
    '방배', '서초', '교대(법원.검찰청)',
    '강남', '역삼',

    // '뚝섬', '한양대', '왕십리(성동구청)',
    // '상왕십리', '신당', '동대문역사문화공원(DDP)',
    // '을지로4가', '을지로3가', '을지로입구',
    // '시청', '충정로(경기대입구)',

    '충정로(경기대입구)', '시청',
    '을지로입구', '을지로3가', '을지로4가',
    '동대문역사문화공원(DDP)', '신당', '상왕십리',
    '왕십리(성동구청)', '한양대', '뚝섬','성수',

    '아현', '이대', '신촌',
    '홍대입구', '합정', '당산',
    '영등포구청', '문래',
    '용답', '신답', '용두(동대문구청)', '신설동',

    '선릉',
    '삼성(무역센터)', '종합운동장', '잠실새내',
    '잠실(송파구청)', '잠실나루', '강변(동서울터미널)',
    '구의(광진구청)', '건대입구',
];

// lt_x, rt_x, t_y, lb_x, lb_x, b_y
let axis = [

    [-336.41,-303.32,-341.02,-342.43,-308.74,-322.58],[-403.37,-369.29,-309.91,-410.81,-394.1,-290.33], [-421.48,-385.86,-262.25,-429.61,-393.31,-240.85],[-441.29,-404,-210.1,-450.21,-412.17,-186.62],

    [-259.2, -226.11, -341.02, -263.84, -230.16, -322.58], [-266.53, -232.5, -311.88, -271.43, -236.778, -292.37], [-274.28, -239.27, -281.05, -279.48, -243.8, -260.38],
    [-282.5, -246.44, -248.37, -288.02, -251.25,-226.43], [-291.23,-254.05,-213.67,-297.09,-259.17,-190.34], [-300.51,-262.15,-176.76,-306.76,-267.6, -151.9],
    [-310.4,-270.78,-137.41,-317.08,-276.6,-110.87], [-320.97,-280,-95.39,-328.11,-286.23,-66.99], [-332.28,-289.87,-50.41,-339.95,-296.55,-19.95],
    [-344.42,-300.46,-2.13, -352.66,-307.64,30.62], [-357.48,-311.85,49.8,-366.37,-319.6,85.12], [-371.57,-324.14,105.82,-381.18,-332.52,144.02],
    [-386.82,-337.44,166.45,-397.24,-346.53,207.88], [-403.37,-351.88,232.26,-414.72,-361.77,277.37],

    // [343.89,394.22,195.87, 353.34, 405.05, 238.93], [327.7,375.66,122.06,336.27,385.48,161.1], [312.96,358.76,54.88,320.77,367.71,90.45],
    // [299.49,343.32,-6.52,306.63,351.51,26.02], [287.14,329.16,-62.85,293.69,336.67,-32.97], [275.76,316.11,-114.71,281.8,323.04,-87.18],
    // [265.25,304.06,-162.63,270.83,310.46,-137.17], [255.51,292.9,-207.02,260.69,298.83,-183.42], [246.46,282.52,-248.27,251.27,288.04,-226.32],
    // [238.03,272.86,-286.69,242.52,278.01,-266.24], [230.16,263.84,-322.58,234.35,268.64,-303.47],

    [230.16,263.84,-322.58,234.35,268.64,-303.47],[238.03,272.86,-286.69,242.52,278.01,-266.24],
    [246.46,282.52,-248.27,251.27,288.04,-226.32],[255.51,292.9,-207.02,260.69,298.83,-183.42],[265.25,304.06,-162.63,270.83,310.46,-137.17],
    [275.76,316.11,-114.71,281.8,323.04,-87.18],[287.14,329.16,-62.85,293.69,336.67,-32.97],[299.49,343.32,-6.52,306.63,351.51,26.02],
    [312.96,358.76,54.88,320.77,367.71,90.45],[327.7,375.66,122.06,336.27,385.48,161.1],[343.89,394.22,195.87, 353.34, 405.05, 238.93],[361.77,414.72,277.37,372.24,426.72,325.09],

    [193.02,226.11,-341.02,196.47,230.16,-322.58], [136.49,169.58,-341.02,138.94,172.62,-322.58], [79.97,113.05,-341.02,81.4,115.08,-322.58],
    [23.44,56.53,-341.02,23.86,57.54,-322.58], [-33.09,0,-341.02,-33.68,0,-322.58], [-89.62,-56.53,-341.02,-91.22,-57.54,-322.58],
    [-146.14,-113.05,-341.02,-148.76,-115.08,-322.58], [-202.67,-169.58,-341.02,-206.3,-172.62,-322.58],

    [485.31,538.25,277.37,499.35,553.82,325.09], [547.86,598.43,203.53,562.99,614.95,247.02],[515.03,562.58,109.14,528.38,577.15,147.51],[485.92,530.77,25.43,497.78,543.73,59.53],

        [-361.77,-308.83,277.37,-372.24,-317.77,325.09],
    [-281.38,-228.44,277.37,-289.52,-235.05,325.09], [-200.99,-148.04,277.37,-206.8,-152.33,325.09], [-120.59,-67.65,277.37,-124.08,-69.61,325.09],
    [-40.2,12.75,277.37,-41.36,13.11, 325.09], [40.2,93.14,277.37,41.36,95.83,325.09], [120.59,173.53,277.37,124.08,178.58,325.09],
    [200.99,253.93,277.37,206.8,261.28,325.09], [281.38,334.32,277.37,289.52,344,325.09],

]

let data = [];
let prev_data = [];

function preload() {
    for (let i = 0; i < 7; i++) {
        let filename1 = "CARD_SUBWAY_MONTH_20{0}0{1}.csv".format(15 + i, 3);
        let filename2 = "CARD_SUBWAY_MONTH_20{0}0{1}.csv".format(15 + i, 9);
        tables.push(loadTable('data/' + filename1, 'csv', 'header'));
        tables.push(loadTable('data/' + filename2, 'csv', 'header'));
    }
}

function setup() {
    print(stations.length);
    createCanvas(windowWidth, windowHeight);

    background(0);
    angleMode(DEGREES);

    data_ready = false;
    print(axis.length);

    for (let i = 0; i < stations.length; i++) {
        let result = tables[level].findRows(stations[i], "역명");
        let sum = 0;
        for (let j = 0; j < result.length; j++) {
            sum += parseInt(result[j].arr[3]);
        }
        data.push(sum / stations.length);
    }

    data_ready = true;
}

function draw() {
    background('#00a84d');

    // draw map
    push();
    translate(width / 2, height / 2);
    noStroke();

    fill(255);
    beginShape();
    vertex(-404.5445, -350);
    vertex(-474.0248, -174.5264);
    vertex(-397.1559, -174.5264);
    vertex(-351.1812, -313.1091);
    vertex(-283.2106, -313.1091);
    vertex(-460.6187, 350);
    vertex(681.7159, 350);
    vertex(546.6844, 8.9764);
    vertex(458.0329, 8.9764);
    vertex(539.4852, 254.4998);
    vertex(435.0687, 254.4998);
    vertex(273.3408, -350);
    endShape();

    fill('#00a84d');
    beginShape();
    vertex(-215.2401, -313.1091);
    vertex(215.2401, -313.1091);
    vertex(330.6521, 254.4998);
    vertex(-330.6521, 254.4998);
    endShape();

    textSize(400);
    fill(255);
    textAlign(CENTER);
    textStyle(BOLDITALIC);
    text('2', 0, 100);

    // print(tables[level].getRowCount());
    // let result = tables[level].findRow("이대", "역명");
    // print(result);
    // for (let i = 0; i < result.size; i++) {
    //     print(result[i]);
    // }

    for (let i = 0; i < stations.length; i++) {
        let result = tables[level].findRows(stations[i], "역명");
        let sum = 0;
        for (let j = 0; j < result.length; j++) {
            // print(result[i].arr[0] + "/" + result[i].arr[3]);
            sum += parseInt(result[j].arr[3]);
        }
        // print(sum / result.length);
    }

    beginShape();
    fill(255, 0, 0);
    // let leftBottom = [-41.3603, 325.0856];
    // let rightBottom = [13.1142, 325.0856];
    // let rightTop = [12.7508, 277.3676];
    // let leftTop = [-40.197, 277.3676];
    // vertex(leftTop[0], leftTop[1]);
    // vertex(rightTop[0], rightTop[1]);
    // vertex(rightBottom[0], rightBottom[1]);
    // vertex(leftBottom[0], leftBottom[1]);
    //
    // endShape();
    // let result = tables[level].findRows("강남", "역명");
    // let sum = 0;
    // for (let j = 0; j < result.length; j++) {
    //     // print(result[i].arr[0] + "/" + result[i].arr[3]);
    //     sum += parseInt(result[j].arr[3]);
    // }
    //
    // // print(sum / result.length);
    // let percent = (sum / result.length) * 1000 / 150000.0 * (rightBottom[1] - rightTop[1])/ 47.718;
    // // print(percent);
    //
    // beginShape();
    // vertex(leftTop[0], leftTop[1] - percent);
    // vertex(rightTop[0], rightTop[1] - percent);
    // vertex(rightBottom[0], rightBottom[1] - percent);
    // vertex(leftBottom[0], leftBottom[1] - percent);

    endShape();

    for (let i = 0; i < axis.length; i++) {
        fill('#00f470');
        beginShape();
        vertex(axis[i][0], axis[i][2]);
        vertex(axis[i][1], axis[i][2]);
        vertex(axis[i][4], axis[i][5]);
        vertex(axis[i][3], axis[i][5]);
        endShape();

        let result = tables[level].findRows(stations[i % axis.length], "역명");
        let sum = 0;
        for (let j = 0; j < result.length; j++) {
            sum += parseInt(result[j].arr[3]);
        }

        // print(sum / result.length);
        let percent = (sum / result.length) * 1000 / 150000.0 * (axis[i][5] - axis[i][2])/ 47.718;

        fill('#5bd994');
        beginShape();
        vertex(axis[i][1], axis[i][2]);
        vertex(axis[i][4], axis[i][5]);
        vertex(axis[i][4], axis[i][5] - percent);
        vertex(axis[i][1], axis[i][2] - percent);
        endShape();

        beginShape();
        vertex(axis[i][0], axis[i][2]);
        vertex(axis[i][3], axis[i][5]);
        vertex(axis[i][3], axis[i][5] - percent);
        vertex(axis[i][0], axis[i][2] - percent);
        endShape();

        fill('#00f470');
        beginShape();
        vertex(axis[i][0], axis[i][2] - percent);
        vertex(axis[i][1], axis[i][2] - percent);
        vertex(axis[i][4], axis[i][5] - percent);
        vertex(axis[i][3], axis[i][5] - percent);
        endShape();

        fill('#00c158');
        beginShape();
        vertex(axis[i][3], axis[i][5]);
        vertex(axis[i][4], axis[i][5]);
        vertex(axis[i][4], axis[i][5] - percent);
        vertex(axis[i][3], axis[i][5] - percent);
        endShape();



    }


    
    pop();

    

}

function mouseWheel(event) {
    // print(event.delta);

    if (event.delta > 0) {
        if (level < 13) {
            level++;

            prev_data = data.slice();
            data = [];

            data_ready = false;

            for (let i = 0; i < stations.length; i++) {
                let result = tables[level].findRows(stations[i], "역명");
                let sum = 0;
                for (let j = 0; j < result.length; j++) {
                    sum += parseInt(result[j].arr[3]);
                }
                data.push(sum / stations.length);
            }

            data_ready = true;
        }
    } else if (event.delta < 0) {
        if (level > 1) {
            level--;

            prev_data = data.slice();
            data = [];

            data_ready = false;

            for (let i = 0; i < stations.length; i++) {
                let result = tables[level].findRows(stations[i], "역명");
                let sum = 0;
                for (let j = 0; j < result.length; j++) {
                    sum += parseInt(result[j].arr[3]);
                }
                data.push(sum / stations.length);
            }

            data_ready = true;
        }
    }
}

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};