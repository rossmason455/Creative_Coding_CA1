
let data1;
let data2;
let data3;
let cleanData1 = [];
let cleanData2 = [];

let charts =[];

function preload(){
    data1 = loadTable('data/japan_population_data.csv','csv','header');
    data2 = loadTable('data/japan_population_prefecture.csv','csv','header');

}
 
function setup(){
    createCanvas(2000,2000);
    angleMode(DEGREES);
    noLoop();
    cleanDataFunction1();
    cleanDataFunction2();





  //Normal Barchart 1
    let verticalChart1 = {
      data: cleanData1,
     xValue: "Age_Group",
    yValues: ["Male"],
    chartX: 300,
    chartY:700,
    chartHeight:500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Male Population",
    chartType: "normal",
    barColour1: color(25, 111, 250)
};


    //Normal Barchart 2
    let verticalChart2 = {
    data: cleanData2,
    xValue: "Prefecture",
    yValues: ["Population"],
    chartX: 300,
    chartY:700,
    chartHeight:500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Population by Prefecture - 2023",
    axisLabelName2: "Prefecture",
    chartType: "normal",
    barColour1: color(252, 157, 3)
};



//Horizontal Barchart 1
let horizontalChart1 = {
data: cleanData1,
xValue: "Age_Group",
yValues: ["Female"],
chartX: 300,
    chartY:700,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Female Population - 2020",
chartType: "ybars",
barColour1: color(25, 111, 250)
};

//Horizontal Barchart 2
let horizontalChart2 = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Male"],
chartX: 300,
    chartY:700,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Male Population - 2020",
chartType: "ybars",
barColour1: color(252, 157, 3)
};


//Stacked Barchart 
let stackedChart = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Female", "Male"],
chartX: 300,
    chartY:700,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Census - 2020",
chartType: "stacked",
barColour1: color(235, 12, 12),
barColour2: color(12, 97, 235)

};


//100% Barchart
let oneHundredPercent = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Female", "Male"],
chartX: 300,
    chartY:700,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Census 2020 by Percentage",
chartType: "100",
barColour1: color(235, 12, 12),
barColour2: color(12, 97, 235)

};


//Population Pyramid
let populationPyramid = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Female", "Male"],
chartX: 300,
    chartY:700,
chartHeight:500,
chartWidth: 500,
chartTitle: "Japan Census - 2020",
chartType: "populationpyramid",

barColour1: color(235, 12, 12),
barColour2: color(12, 97, 235)
};










    


 //charts.push(new BarChart(verticalChart1));
//charts.push(new BarChart(verticalChart2));
 //charts.push(new BarChart(horizontalChart1));
 //charts.push(new BarChart(horizontalChart2));
//charts.push(new BarChart(stackedChart));
charts.push(new BarChart(oneHundredPercent));
//Charts.push(new BarChart(populationPyramid));







  

}
 
function draw(){

background(255);




  charts.forEach(chart => chart.render());

  
   
 // background(25,90,200)
 
 // push();
 // translate(chartX, chartY);
 // noFill();
//  stroke(axisColour);
 // strokeWeight(axisThickness);
 // line(0,0,0,-chartHeight)
 // line(0,0,chartWidth,0)
 
 // push()
 // translate(margin, 0)
  //for(let i=0; i<femaleScores.length; i++){
  //    let xPos = (barWidth + gap) *i;
  //    fill(barColour);
  //    noStroke();
  //    rect(xPos,0,barWidth,-femaleScores[i] * scaler);

    //  textAlign(LEFT, CENTER);
  //    textSize(10);
    //  push();
    //  rotate(90);
    //  text(ageGroups[i], 10, -(xPos + (barWidth / 2 )));
   //   pop();

 // }
  //pop()
  //pop()
    








   
}
 

 function cleanDataFunction1(){
  for(let i = 0; i < data1.rows.length; i++){
    cleanData1.push(data1.rows[i].obj)
  };


  for(let i = 0; i < cleanData1.length; i++){
    cleanData1[i].Female = parseInt(cleanData1[i].Female);
    cleanData1[i].Male = parseInt(cleanData1[i].Male);

    console.log( cleanData1[i].Male)
  };

  
  
 };


 function cleanDataFunction2(){
  for(let i = 0; i < data2.rows.length; i++){
    cleanData2.push(data2.rows[i].obj)
  };


  for(let i = 0; i < cleanData2.length; i++){
    cleanData2[i].Female = parseInt(cleanData2[i].Female);
    cleanData2[i].Male = parseInt(cleanData2[i].Male);

    console.log( cleanData2[i].Male)
  };

  
  
 };


 