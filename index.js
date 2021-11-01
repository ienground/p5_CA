/**
 * Project 2 of Creative Algorithms
 * By IENGROUND (Hyunwoo Rhee 20201131)
 * on github.com/ienground
 */

let tables = [];
let level = 0;

function preload() {
    for (let i = 0; i < 7; i++) {
        let filename1 = "CARD_SUBWAY_MONTH_20{0}0{1}.csv".format(15 + i, 3);
        let filename2 = "CARD_SUBWAY_MONTH_20{0}0{1}.csv".format(15 + i, 9);
        tables.push(loadTable('data/' + filename1, 'csv', 'header'));
        tables.push(loadTable('data/' + filename2, 'csv', 'header'));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    angleMode(DEGREES);
    print(tables);
}

function draw() {
    background(0);

}

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};