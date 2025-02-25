


class BarChartY {
    constructor(_chartWidth, _chartHeight, _barWidth, _chartX, _chartY, _axisThickness, _margin, _data, _yValue, _xValue) {
        this.data = _data
        this.xValue = _xValue;
        this.chartWidth = _chartWidth
        this.chartHeight = _chartHeight
        this.barWidth = _barWidth
        this.chartX = _chartX
        this.chartY = _chartY
        this.yValue = _yValue;
        this.axisThickness = _axisThickness;
        this.margin = _margin;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2))/(this.data.length - 1);
        this.scaler = this.chartHeight / (max(this.data.map(row => row[this.yValue])))            
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
        for (let i = 1; i < this.data.length; i++) {
            let yPos = (this.barWidth + this.gap) * i;
          
            fill(this.barColour);
            noStroke();
            rect(-10, -yPos, this.data[i][this.yValue] * this.scaler, 10);
            fill(this.axisTextColour)

            noStroke();
            textAlign(LEFT, CENTER);

            textSize(10);
            push();
            translate( -100 , -yPos + (this.barWidth / 2));
            
            text(this.data[i][this.xValue], 0, 0);
            pop();


            push();
            let minY = min(this.data.map(row => row[this.yValue]));
            let maxY = max(this.data.map(row => row[this.yValue])); 
            
            let step = (maxY - minY) / this.data.length;
            
            for (let i = 0; i <= this.data.length; i++) {
                let xLabel = minY + step * i; 
                let xPos = (this.chartWidth * i) / this.data.length; 
            
                textSize(10);
                textAlign(RIGHT, CENTER);
                text(Math.round(xLabel), xPos, 10); 
            }
        

        }
        pop()
        pop()

    }





}

