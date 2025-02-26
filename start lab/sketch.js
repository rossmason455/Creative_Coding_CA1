let data1;
let data2;
let cleanData1 = [];
let cleanData2 = [];
let charts = [];

let robotoFont;

function preload() {
  data1 = loadTable("data/japan_population_data.csv", "csv", "header");
  data2 = loadTable("data/japan_population_prefecture_data.csv", "csv", "header");
  //robotoFont = loadFont('assets/Montserrat/static/Montserrat-SemiBold.ttf'); 
   robotoFont = loadFont('assets/Roboto/static/Roboto-Regular.ttf'); 
  
}

function setup() {

  console.log("this is roboto", robotoFont);
  createCanvas(2000, 2000);

 textFont(robotoFont)
  
  angleMode(DEGREES);
  noLoop();
  cleanDataFunction1();
  cleanDataFunction2();



// Customizable - You can customize the following properties in the sketch:


// Data Properties: Data set (data), x-axis value (xValue), y-axis values (yValues)
// Position and Size Properties: Chart position (chartX, chartY), chart dimensions (chartWidth, chartHeight)
// Axis Properties: Axis thickness (axisThickness), axis text colour (axisTextColour), axis line colour (axisColour)
// Bar Properties: Margin between bars (margin), bar width (barWidth), bar height (calculated based on data length)
// Gap between bars (gap), chart type (chartType) for different chart styles (e.g., stacked, 100%, population pyramid)
// Custom Bar Colours: Bar colours (barColour1, barColour2) for each bar
// Scalers: Scalers for different chart types, including normal bars, stacked bars, and population pyramid
// Tick Properties: Number of ticks (numTicks), tick length (tickLenght)
// Title Properties: Chart title (chartTitle), title position (titleXOffset, titleYOffset), title size (titleSize), title colour (titleColour)
// Data Label Properties: Rotation of data labels on bars (verticalBarDataLabelRotation, horizontalBarDataLabelRotation), label text size (dataLabelTextSize), label text colour (dataLabelColour)
// Axis Label Properties: Axis label rotation (axisLabelRotation), label text size (axisLabelTextSize), label colour (axisLabelColour), axis labels (axisLabelName1, axisLabelName2)
// Legend Label Properties: Legend label text size (legendLabelTextSize), legend label text colour (legendLabelTextColour)



  // Vertical Barchart 1
  let verticalChart1 = {
    data: cleanData1,
    xValue: "Age_Group",
    yValues: ["Male"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Male Population",
    chartType: "normal",
    barColour1: color(25, 111, 250),
  };

  // Vertical Barchart 2
  let verticalChart2 = {
    data: cleanData2,
    xValue: "Prefecture",
    yValues: ["Population"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Population by Prefecture - 2023",
    axisLabelName2: "Prefecture",
    chartType: "normal",
    barColour1: color(252, 157, 3),
  };

  // Horizontal Barchart 1
  let horizontalChart1 = {
    data: cleanData1,
    xValue: "Age_Group",
    yValues: ["Female"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Female Population - 2020",
    chartType: "ybars",
    barColour1: color(25, 111, 250),
  };

  // Horizontal Barchart 2
  let horizontalChart2 = {
    data: cleanData1,
    xValue: "Age_Group",
    yValues: ["Male"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Male Population - 2020",
    chartType: "ybars",
    barColour1: color(252, 157, 3),
  };

  // Stacked Barchart
  let stackedChart = {
    data: cleanData1,
    xValue: "Age_Group",
    yValues: ["Female", "Male"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Census - 2020",
    chartType: "stacked",
    barColour1: color(235, 12, 12),
    barColour2: color(12, 97, 235),
  };

  // 100% Barchart
  let oneHundredPercent = {
    data: cleanData1,
    xValue: "Age_Group",
    yValues: ["Female", "Male"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    barWidth: 20,
    chartTitle: "Japan Census 2020 by Percentage",
    chartType: "100",
    barColour1: color(235, 12, 12),
    barColour2: color(12, 97, 235),
  };

  // Population Pyramid
  let populationPyramid = {
    data: cleanData1,
    xValue: "Age_Group",
    yValues: ["Female", "Male"],
    chartX: 300,
    chartY: 700,
    chartHeight: 500,
    chartWidth: 500,
    chartTitle: "Japan Census - 2020",
    chartType: "populationpyramid",
    barColour1: color(235, 12, 12),
    barColour2: color(12, 97, 235),
  };

  //charts.push(new BarChart(verticalChart1));
  //charts.push(new BarChart(verticalChart2));
  //charts.push(new BarChart(horizontalChart1));
  //charts.push(new BarChart(horizontalChart2));
  //charts.push(new BarChart(stackedChart));
  //charts.push(new BarChart(oneHundredPercent));
  charts.push(new BarChart(populationPyramid));
}

function draw() {
  background(255);

  charts.forEach((chart) => chart.render());
}

// Push data sets from csv files into arrays and parse the them
function cleanDataFunction1() {
  for (let i = 0; i < data1.rows.length; i++) {
    cleanData1.push(data1.rows[i].obj);
  }

  for (let i = 0; i < cleanData1.length; i++) {
    cleanData1[i].Female = parseInt(cleanData1[i].Female);
    cleanData1[i].Male = parseInt(cleanData1[i].Male);

    console.log(cleanData1[i].Male);
  }
}

function cleanDataFunction2() {
  for (let i = 0; i < data2.rows.length; i++) {
    cleanData2.push(data2.rows[i].obj);
  }

  for (let i = 0; i < cleanData2.length; i++) {
    cleanData2[i].Female = parseInt(cleanData2[i].Female);
    cleanData2[i].Male = parseInt(cleanData2[i].Male);

    console.log(cleanData2[i].Male);
  }
}
