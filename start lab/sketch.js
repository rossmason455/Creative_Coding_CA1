
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
    createCanvas(5000,3000);
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
    chartX: 600,
    chartY:500,
    chartHeight:300,
    chartWidth: 300,
    barWidth: 20,
    chartTitle: "Japan Population by Prefecture",
    chartType: "normal",
    barColour1: color(0,255,0)
};



//Horizontal Barchart 1
let horizontalChart1 = {
data: cleanData1,
xValue: "Age_Group",
yValues: ["Female"],
chartX: 600,
chartY:500,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Population",
chartType: "ybars",
barColour1: color(0,0,255)
};

//Horizontal Barchart 2
let barChart4 = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Male"],
chartX: 1800,
chartY:500,
chartHeight:300,
chartWidth: 300,
chartTitle: "Japan Population",
chartType: "ybars",
barColour1: color(0,255,0)
};


//Stacked Barchart 
let barChart5 = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Female", "Male"],
chartX: 1200,
chartY:500,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Male Population",
chartType: "stacked",
barColour1: color(0,255,0),
barColour2: color(0,0,255)

};


//100% Barchart
let barChart6 = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Female", "Male"],
chartX: 1800,
chartY:500,
chartHeight:500,
chartWidth: 500,
barWidth: 20,
chartTitle: "Japan Male Population",
chartType: "100",
barColour1: color(0,255,0),
barColour2: color(0,0,255)

};


//Population Pyramid
let barChart7 = {
  data: cleanData1,
 xValue: "Age_Group",
yValues: ["Female", "Male"],
chartX: 0,
chartY:500,
chartHeight:300,
chartWidth: 300,
chartTitle: "Japan yaya Population",
chartType: "populationpyramid",
barColour1: color(0,255,0),
barColour2: color(0,0,255)

};










    


 //charts.push(new BarChart(barChart1));
//charts.push(new BarChart(barChart2));
 //charts.push(new BarChart(barChart3));
 //charts.push(new BarChart(barChart4));
// charts.push(new BarChart(barChart5));
//charts.push(new BarChart(barChart6));
//charts.push(new PopulationPyramid(barChart7));
//charts.push(new BarChart(barChart7));







  

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


 