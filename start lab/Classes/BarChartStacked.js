


class BarChartStacked {
    constructor(obj) {
        
        //Data Propoerties
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues
        
  
        //Position and Size Properties
        this.chartX = obj.chartX || 200;
        this.chartY = obj.chartY || 700;
        this.chartWidth = obj.chartWidth || 400;  
        this.chartHeight = obj.chartHeight || 400;
        
        //Axis Properties
        this.axisThickness = obj.axisThickness || 2;
        this.axisTextColour = color(0);
        this.axisColour = color(0);
        
        //Bar Properties
        this.margin = obj.margin || 5;
        this.barWidth = obj.barWidth || 15;
        this.barColour1 = color(0, 105, 212 );
        this.barColour2 = color(0, 105, 212 );
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        
        
        
        
        //Scalers
        this.scalerNormalBars = this.chartHeight / (max(this.data.map(row => row[this.yValue1])));
        this.scalerBars100 = this.chartHeight / 100;
        
        let maxSum = max(this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));
        this.scalerStackedBars = this.chartHeight / maxSum;
        
        console.log(maxSum)




        //Tick Properties
        this.numTicks = obj.numTicks || 5;
        this.tickLenght = obj.tickLenght || this.chartWidth;
        
        
        // Title Properties
        this.chartTitle = obj.chartTitle || "Japan Population";
        this.titleXOffset = obj.titleXOffset || this.chartWidth / 2;
        this.titleYOffset = obj.titleYOffset || this.chartHeight + this.chartHeight / 10;
        this.titleSize = obj.titleSize || 16;
        this.titleColour = obj.titleColour || color(64, 235, 52);
        

        //Label Properties
        this.labelRotation = obj.labelRotation || 90;
        this.labelTextSize = obj.labelTextSize || 10;
        this.labelColour = obj.labelColour || color(242, 129, 36);
        

        this.barColours = [];
    }
    


    render() {
       

        push();
        translate(this.chartX, this.chartY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, - this.chartHeight)
        line(0, 0, this.chartWidth, 0)

        this.barColours.push(color(125,34,56));
        this.barColours.push(color(225,34,56));

        push()
        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            push();
            for(let j = 0; j < this.yValues.length; j++){
               
                fill(this.barColours[j])
                rect (xPos,0,this.barWidth, -this.data[i][this.yValues[j]]*this.scalerStackedBars);
                translate(0,-this.data[i][this.yValues[j]]*this.scalerStackedBars - 1)
                console.log(this.data[i][this.yValues[j]])
               
            }
            pop();
            fill(this.axisTextColour)

            noStroke();
            textAlign(LEFT, CENTER);

            textSize(10);

            push();
            translate(xPos + (this.barWidth / 2), 10);
            rotate(90);
            text(this.data[i][this.xValue], 0, 0);
            pop();

            push();
           // let minY = min(this.data.map(row => row[this.yValue]));
           // let maxY = max(this.data.map(row => row[this.yValue])); 
           // let numIntervals = this.data.length;
          //  let step = (maxY - minY) / numIntervals;
            
          //  for (let i = 0; i <= numIntervals; i++) {
          //      let yLabel = minY + step * i; 
          //      let yPos = (this.chartHeight * i) / numIntervals; 
            
          //      textSize(10);
         //       textAlign(RIGHT, CENTER);
          //      text(Math.round(yLabel), -20, -yPos); 
           // }
           // push();
            //translate( -100, -xPos + (this.barWidth / 2));
            
           
          //  pop();
            
            pop();



        }
        pop()
        pop()

    }





}

