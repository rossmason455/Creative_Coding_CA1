






class PopulationPyramid{
    constructor(obj) {

       
        this.data = obj.data
        //this.yValue1 = obj.yValue1
        //this.yValue2 = obj.yValue2
        this.yValues = obj.yValues
        this.chartWidth = obj.chartWidth || 400
        this.chartHeight = obj.chartHeight || 400
        this.barHeight = this.chartHeight/this.data.length
        this.chartX = obj.chartX || 200
        this.chartY = obj.chartY || 600
        this.axisThickness = obj.axisThickness || 2
        this.margin = obj.margin || 2
        this.valuesArray = obj.valuesArray;
        this.xValue = obj.xValue;
        
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2))/(this.data.length - 1);
        let maxSum = max(this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));

        console.log(maxSum)
        this.scaler = this.chartWidth * 0.8 / maxSum;     
        
        console.log(this.scaler)
        this.axisTextColour = color(255)
        this.axisColour = color(250, 0, 56)
        
        this.barColour1 = obj.barColour1
        this.barColour2 = obj.barColour2
        this.barColours = [];
        
        this.barColours.push(this.barColour1)
        this.barColours.push(this.barColour2)
      

    }


    render() {
        push();
        translate(this.chartX, this.chartY);
        
        noFill();
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, this.chartWidth, 0);
    
        push();  
        translate(this.margin, 0);
     
        for (let i = 0; i < this.data.length; i++) {
            let yPos = -i * this.barHeight - this.barHeight;
            
            
            for (let j =0; j<this.yValues.length; j++){
                noStroke();
                fill(this.barColours[j])
                let positioner = [this.data[i][this.yValues[j]], -this.data[i][this.yValues[j]]]
                rect(this.chartWidth /2, yPos,positioner[j] * this.scaler, this.barHeight);
               
            }
            //noStroke()
            //fill(this.maleBarColour);
            //rect(this.chartWidth / 2, yPos, this.data[i][this.yValue1] * this.scaler, this.barHeight);
        //
            //
            //fill(this.femaleBarColour);
            //rect(this.chartWidth / 2, yPos, -this.data[i][this.yValue2] * this.scaler, this.barHeight);
//
            push();
            noStroke();
            textAlign(CENTER,CENTER)
            translate(-this.chartWidth/10,yPos)
            
            text(this.data[i][this.xValue], 0,this.barHeight/1.5)
            console.log(this.data[i][this.xValue])
//             
            pop();
           
        }
    
        pop();  


        push();
       

      



        pop();


    
        push();  
        let maxPop = Math.max(...this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));  
        let scaleFactor = maxPop / 10;  
        
        
        let labels = [];
        for (let i = -6; i <= 6; i += 2) {
            labels.push(i * scaleFactor);  
        }
        
        for (let i = 0; i < labels.length; i++) {
            let xPos = (this.chartWidth * i) / (labels.length - 1); 
        
            textSize(10);
            textAlign(CENTER, CENTER);
            
            noStroke();  
           
            fill(this.barColours[1])
            let labelText = labels[i] === 0 ? '0' : (Math.abs(labels[i]) / 1000000).toFixed(0) + 'M';
            
            text(labelText, xPos, 10);
        }
        
        

        
        
        pop();  
    
        pop();
        
        
        
    }

    
    
}
