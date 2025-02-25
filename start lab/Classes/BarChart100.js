


class BarChart100 {
    constructor(_chartWidth, _chartHeight, _barWidth, _chartX, _chartY, _axisThickness, _margin, _data, _yValue1, _yValue2, _xValue) {
        this.data = _data;
        console.log(this.data)
        this.xValue = _xValue;
        this.yValue1 = _yValue1;
        this.yValue2 = _yValue2;
        this.chartWidth = _chartWidth
        this.chartHeight = _chartHeight
        this.barWidth = _barWidth
        this.chartX = _chartX
        this.chartY = _chartY
    
        this.axisThickness = _axisThickness;
        this.margin = _margin;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2))/(this.data.length - 1);
        let maxSum = max(this.data.map(row => row[this.yValue1] + row[this.yValue2]));

      
        this.scaler = this.chartHeight / 100;
            
        this.axisTextColour = color(255)
        this.axisColour = color(250, 0, 56)
        this.barColour = color(0, 250, 10)
    }
    


    render() {
       

        push();
        translate(this.chartX, this.chartY);
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, - this.chartHeight)
        line(0, 0, this.chartWidth, 0)

        push()
        
        
        
        translate(this.margin, 0)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;

            let firstValue;
            let secondValue;
            let totalValue;
            let firstHeight;
            let secondHeight;
            let firstPercent;
            let secondPercent;

            firstValue = this.data[i][this.yValue1]
            secondValue = this.data[i][this.yValue2]

            totalValue = firstValue + secondValue;

            firstPercent = (firstValue / totalValue) * 100;
            secondPercent = (secondValue / totalValue) * 100;

            firstHeight = firstPercent * this.scaler
            secondHeight = secondPercent * this.scaler
            
            fill(this.barColour)
            noStroke();
            rect(xPos, 0, this.barWidth, -firstHeight)

            push();
            fill(255, 0, 0)
            rect(xPos, -firstHeight, this.barWidth, -secondHeight)

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

