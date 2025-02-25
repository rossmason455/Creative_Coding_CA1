class BarChart {
    constructor(obj) {
        
        //Data Propoerties
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue1 = obj.yValue1 || null
        this.yValue2 = obj.yValue2 || null;
        this.yValues = obj.yValues || null;

        
  
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
        this.barHeight = this.chartHeight/this.data.length
        
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1);
        this.chartType = obj.chartType;
        
        this.barColour1 = obj.barColour1
        this.barColour2 = obj.barColour2
        this.barColours = [];
        
        this.barColours.push(this.barColour1)
        this.barColours.push(this.barColour2)
      

      
     


        


        
        //Scalers
        this.scalerNormalBars = this.chartHeight / (max(this.data.map(row => row[this.yValues[0]])));
        this.scalerBars100 = this.chartHeight / 100;
       
        if (this.chartType === "stacked" || this.chartType === "100"){
            let maxSum = max(this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));
            this.scalerStackedBars = this.chartHeight / maxSum;
        }
     
        if(this.chartType === "populationpyramid"){
            let maxSum = max(this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));
            this.scalerPopulationPyramid = this.chartWidth * 0.8 / maxSum;   
        }
        
        




        //Tick Properties
        this.numTicks = obj.numTicks || 5;
        this.tickLenght = obj.tickLenght || this.chartWidth;
        
        
        // Title Properties
        this.chartTitle = obj.chartTitle || "Japan Population";
        this.titleXOffset = obj.titleXOffset || this.chartWidth / 2;
        this.titleYOffset = obj.titleYOffset || this.chartHeight + this.chartHeight / 10;
        this.titleSize = obj.titleSize || 20;
        this.titleColour = obj.titleColour || color(0);
        

        //Data Label Properties
        this.verticalBarDataLabelRotation = obj.verticalBarDataLabelRotation || 90
        this.horizontlBarDataLabelRotation = obj.horizontlBarDataLabelRotation || 0
        this.dataLabelTextSize = obj.dataLabelTextSize || 15;
        this.dataLabelColour = obj.dataLabelColour || color(0);
        

        //Axis Label Properties
        this.axisLabelRotation = obj.axisLabelRotation || 90;
        this.axisLabelTextSize = obj.axisLabelTextSize || 20;
        this.axisLabelColour = obj.axisLabelColour || color(0);
        this.axisLabelName1 = obj.axisLabelName1 || "Population"
        this.axisLabelName2 = obj.axisLabelName2 || "Age Group"


        //Legend Label Properties
        this.legendLabelTextSize = obj.legendLabelTextSize || 15
    }


    render() {
        push();
        
        translate(this.chartX, this.chartY);  

        this.renderAxis();  
        this.renderLabels(); 
        this.renderTitle();
        this.renderBars();
        this.renderLegend();
        
        pop(); 



      
    }

    renderAxis() {
        
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); 
        line(0, 0, this.chartWidth, 0);  
        
    }

    renderTitle(){
       push();
        textSize(this.titleSize); 
        textAlign(CENTER, CENTER);  
        fill(this.titleColour); 
        text(this.chartTitle, this.titleXOffset,-this.titleYOffset);
    pop();
    
}

    renderLegend(){
        push();
        textSize(this.legendLabelTextSize);
        textAlign(CENTER, TOP);
        
        let legendTextX = this.chartWidth - -this.chartWidth / 5;
        let legendTextY = -this.chartHeight - -this.chartHeight / 10;
        
        for (let i = 0; i < this.yValues.length; i++) {
            fill(this.barColours[i]);
            rect(legendTextX - legendTextX / 10, legendTextY + (legendTextY / 20) * i, 10, 10);
            noStroke();
            text(this.yValues[i], legendTextX, legendTextY + (legendTextY / 20) * i);
        }
        
        pop();
    }

    renderLabels() {
        
        let yPos;
        let jump = this.chartHeight / this.numTicks;
     
        let maxY = max(this.data.map(row => row[this.yValues[0]]));
        let ylabelJump = maxY / this.numTicks;

       
   
        for (let i = 0; i <= this.numTicks; i++) {
            
            yPos = jump * i;
            let yLabel = ylabelJump * i;
       

            if(this.chartType === "100"){
                let yLabel = (i / this.numTicks) * 100; 
                let formattedLabel = yLabel.toFixed(0) + '%'; 
                noStroke();
                textSize(this.dataLabelTextSize)
                fill(this.dataLabelColour);
                text(formattedLabel, -30, -yPos); 
                
                push();
                
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                translate(-this.chartWidth/5, -this.chartHeight/2)
                rotate(-90)
                noStroke();
                fill(this.axisLabelColour)
                text(this.axisLabelName1,0,0)
                pop();
             }
            else if (this.chartType === "ybars"){
                
                
                let formattedLabel = (yLabel / 1000000).toFixed(0) + 'M';

                noStroke();
                textSize(this.dataLabelTextSize);
                push();
                    
                fill(this.dataLabelColour);
                translate(yPos, 20); 
                rotate(this.horizontalBarDataLabelRotation);
                text(formattedLabel, 0, 0); 
                pop();
                
                push();
                textAlign(CENTER);  
                textSize(this.axisLabelTextSize);
                translate(this.chartWidth / 2, this.chartHeight / 8); // Adjust axis label position
                fill(this.axisLabelColour)
                text(this.axisLabelName1, 0, 0);
                pop();
                
            
                
    
            } else if(this.chartType === "stacked"){
                let formattedLabel = ((yLabel * 2) / 1000000).toFixed(0) + 'M';
                noStroke();
                textSize(this.dataLabelTextSize)
                fill(this.dataLabelColour);
                text(formattedLabel, -30, -yPos); 

                push();
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                translate(-this.chartWidth/5, -this.chartHeight/2)
                rotate(-90)
                noStroke();
                fill(this.axisLabelColour)
                text(this.axisLabelName1,0,0)
                pop();
            }



            else if(this.chartType === "populationpyramid"){
                let maxPop = Math.max(...this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));  
                let scaleFactor = maxPop / 10;  
                
                
                let labels = [];
                for (let i = -6; i <= 6; i += 2) {
                    labels.push(i * scaleFactor);  
                }
                
                for (let i = 0; i < labels.length; i++) {
                    let xPos = (this.chartWidth * i) / (labels.length - 1); 
                    
                    textSize(this.dataLabelTextSize)
                    textAlign(CENTER, CENTER);
                    
                    push();
                    noStroke();  
                    fill(this.dataLabelColour);
                    
                    let formattedLabel = labels[i] === 0 ? '0' : (Math.abs(labels[i]) / 1000000).toFixed(0) + 'M';
                    
             
                    translate(xPos, 10); 
                    
                
                    rotate(this.horizontalBarDataLabelRotation);  
                    
               
                    text(formattedLabel, 0, 0);
                    
                    pop(); 
                    
                    push();
            textAlign(CENTER)  
            textSize(this.axisLabelTextSize)
            
            translate(this.chartWidth/2, 0 - -this.chartHeight/8)
            rotate(0)
            noStroke();
            fill(this.axisLabelColour)
            text(this.axisLabelName1,0,0)
            pop();

                }
            }
            else {
                let formattedLabel = (yLabel / 1000000).toFixed(0) + 'M';
                noStroke();
                textSize(this.dataLabelTextSize)
                fill(this.dataLabelColour);
                text(formattedLabel, -30, -yPos); 

                push();
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                translate(-this.chartWidth/5, -this.chartHeight/2)
                rotate(-90)
                noStroke();
                fill(this.axisLabelColour)
                text(this.axisLabelName1,0,0)
                pop();

               
             }
            
         
            if(i != 0) {
                strokeWeight(1);
                stroke(240);
                line(0, -yPos, this.tickLenght, -yPos); 
            }

      
            for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;    
            
            if(this.chartType === "ybars" || this.chartType === "populationpyramid" ){ 
                
                noStroke();
                textSize(this.dataLabelTextSize);
                
                fill(this.dataLabelColour);
                text(this.data[i][this.xValue], -this.chartWidth/8, -xPos -this.margin * 2); 
                push();
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                
                translate(-this.chartWidth/4, -this.chartHeight/2)
                rotate(-90)
                fill(this.axisLabelColour)
                text(this.axisLabelName2,0,0)
                pop();
            }
            
            else{
                push();

                textSize(this.dataLabelTextSize);
                fill(this.dataLabelColour);
            
               
                push(); 
                translate(xPos + (this.barWidth / 2), 10);  
                rotate(this.verticalBarDataLabelRotation);  
                text(this.data[i][this.xValue], 0, 0); 
            
                pop(); 
            
                pop();  

                push();
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                
                translate(this.chartWidth/2, 0 + this.chartHeight/5)
                fill(this.axisLabelColour)
                text(this.axisLabelName2,0,0)
                pop();
            }
            
            
           
            }

            
         
            
        
        }
    }

    

//
    //renderBars() {
    //    if(this.chartType === "ybars"){
    //        translate(0, -this.margin) 
    //        console.log("this is margin", this.margin)
    //    } else{
    //        translate(this.margin,0)
    //    }
    //    
//
    //    
    //    for (let i = 0; i < this.data.length; i++) {
    //        let xPos = (this.barWidth + this.gap) * i;
//
//
    //       
//
    //        if (this.chartType === "normal") {
    //            this.renderNormalBar(xPos, i);
    //            
    //        } else if (this.chartType === "ybars") {
    //           
    //            this.renderYBar(xPos, i);
    //           
    //           
    //           
    //        } else if (this.chartType === "stacked") {
    //            this.renderStackedBar(xPos, i);
    //            
    //        } else if (this.chartType === "100") {
    //            this.renderBar100(xPos, i);
    //            
    //        }
    //    
    //    
    //    }
    //}
//
    //renderNormalBar(xPos, i) {
    //    fill(this.barColour1);
    //    noStroke();
    //    rect(xPos, 0, this.barWidth, -this.data[i][this.yValue1] * this.scalerNormalBars);
    //}
//
    //renderYBar(xPos, i) {
    //    fill(this.barColour1);
    //    noStroke();
    //    rect(0, -xPos - this.barWidth, this.data[i][this.yValue1] * this.scalerNormalBars, this.barWidth);
    //}
//
    //renderStackedBar(xPos, i) {
    //    fill(this.barColour1);
    //    noStroke();
    //    rect(xPos, 0, this.barWidth, -this.data[i][this.yValue1] * this.scalerStackedBars);
    //    
    //    push();
    //    fill(255, 100, 50);
    //    rect(xPos, -this.data[i][this.yValue1] * this.scalerStackedBars, this.barWidth, -this.data[i][this.yValue2] * this.scalerStackedBars);
    //    pop();
    //}
//
    //renderBar100(xPos, i) {
    //    let firstValue = this.data[i][this.yValue1];
    //    let secondValue = this.data[i][this.yValue2];
    //    let totalValue = firstValue + secondValue;
//
    //    let firstPercent = (firstValue / totalValue) * 100;
    //    let secondPercent = (secondValue / totalValue) * 100;
//
    //    let firstHeight = firstPercent * this.scalerBars100;
    //    let secondHeight = secondPercent * this.scalerBars100;
//
    //    fill(this.barColour1);
    //    noStroke();
    //    rect(xPos, 0, this.barWidth, -firstHeight);
//
    //    push();
    //    fill(255, 0, 0);
    //    rect(xPos, -firstHeight, this.barWidth, -secondHeight);
    //    pop();
    //}


    renderBars() {


        if (this.chartType === "normal"){
            this.renderNormalBar();
        }
       
        if (this.chartType === "ybars"){ 
       this.renderYBar();
        }
        if (this.chartType === "stacked"){
        this.renderStackedBar();
        }
       
        if (this.chartType === "100"){
        this.renderBar100();
        }
        if (this.chartType === "populationpyramid"){
            this.renderBarPopulationPyramid();
            }
    }

    renderNormalBar() {
        translate(this.margin,0)

        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;


            for(let j=0; j<this.yValues.length; j++){
                fill(this.barColours[j]);
                console.log(this.barColours[j])
                noStroke();
                rect(xPos, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scalerNormalBars);
            }

    }
}

    renderYBar() {
        translate(0, -this.margin) 

        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;

           for (let j =0; j<this.yValues.length; j++){
            fill(this.barColours[j]);
            noStroke();
            rect(0, -xPos - this.barWidth, this.data[i][this.yValues[j]] * this.scalerNormalBars, this.barWidth);
            console.log(this.yValues[j])
           }

    }
}

    renderStackedBar() {

        translate(this.margin,0)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;


            push();
            for(let j = 0; j < this.yValues.length; j++){
                noStroke();
                fill(this.barColours[j])
                rect (xPos,0,this.barWidth, -this.data[i][this.yValues[j]]*this.scalerStackedBars);
                translate(0,-this.data[i][this.yValues[j]]*this.scalerStackedBars - 1)
            
               
            }
            pop();
    }
    }
    renderBar100() {


        translate(this.margin,0)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            let firstValue = this.data[i][this.yValues[0]];
            let secondValue = this.data[i][this.yValues[1]];
            let totalValue = firstValue + secondValue;
            let yOffset = 0; 

    push();
        for (let j = 0; j < this.yValues.length; j++) {
        let value = this.data[i][this.yValues[j]];
        let percent = (value / totalValue) * 100;
        let barHeight = percent * this.scalerBars100; 

        fill(this.barColours[j]);
        noStroke();
        rect(xPos, -yOffset, this.barWidth, -barHeight);

        yOffset += barHeight; 
    }


  

        



        //fill(this.barColour1);
        //noStroke();
        //rect(xPos, 0, this.barWidth, -firstHeight);
//
        //push();
        //fill(255, 0, 0);
        //rect(xPos, -firstHeight, this.barWidth, -secondHeight);
        //pop();
    }
}

renderBarPopulationPyramid(){
    for (let i = 0; i < this.data.length; i++) {
        let yPos = -i * this.barHeight - this.barHeight;
        
        
        for (let j =0; j<this.yValues.length; j++){
            noStroke();
            fill(this.barColours[j])
            let positioner = [this.data[i][this.yValues[j]], -this.data[i][this.yValues[j]]]
            rect(this.chartWidth /2, yPos,positioner[j] * this.scalerPopulationPyramid, this.barHeight);
            console.log(this.scalerPopulationPyramid)
           
           
        }
}













}
}



















