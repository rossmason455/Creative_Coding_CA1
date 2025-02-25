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
        this.verticalBarDataLabelRotation = obj.verticalBarDataLabelRotation || 60
        this.horizontlBarDataLabelRotation = obj.horizontlBarDataLabelRotation || 0
        this.dataLabelTextSize = obj.dataLabelTextSize || 15;
        this.dataLabelColour = obj.dataLabelColour || color(0);
        

        //Axis Label Properties
        this.axisLabelRotation = obj.axisLabelRotation || -90;
        this.axisLabelTextSize = obj.axisLabelTextSize || 18;
        this.axisLabelColour = obj.axisLabelColour || color(0);
        this.axisLabelName1 = obj.axisLabelName1 || "Population"
        this.axisLabelName2 = obj.axisLabelName2 || "Age Group"


        //Legend Label Properties
        this.legendLabelTextSize = obj.legendLabelTextSize || 15
        this.legendLabelTextColour = obj.legendLabelTextColour || color(0)
    }


    render() {
        push();
        
        translate(this.chartX, this.chartY);  
        //Render methods
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
        
        // Positioning for legend items
        let legendTextX = this.chartWidth - -this.chartWidth / 5;
        let legendTextY = -this.chartHeight - -this.chartHeight / 10;
        
        for (let i = 0; i < this.yValues.length; i++) {
            fill(this.barColours[i]);
            // Draw a small colored square for each legend item
            rect(legendTextX - legendTextX / 10, legendTextY + (legendTextY / 20) * i, 10, 10);
            noStroke();
            fill(this.legendLabelTextColour)
            // Draw corresponding legend text
            text(this.yValues[i], legendTextX, legendTextY + (legendTextY / 20) * i);
        }
        
        pop();
    }

    renderLabels() {
        

        // Rendering Number Labels
       
        let yPos;
        let jump = this.chartHeight / this.numTicks;
        // Calculate maximum Y value and the jump for label positioning
        let maxY = max(this.data.map(row => row[this.yValues[0]]));
        let ylabelJump = maxY / this.numTicks;
        
        // Loop through each tick to render the labels
        for (let i = 0; i <= this.numTicks; i++) {
            
            yPos = jump * i; // Calculate Y position for each label
            let yLabel = ylabelJump * i; // Calculate the label value for each tick
       
            // Handle rendering for 100% stacked charts
            if(this.chartType === "100"){
                let yLabel = (i / this.numTicks) * 100; // Calculate percentage label for 100% chart
                let formattedLabel = yLabel.toFixed(0) + '%'; // Format label with percentage symbol
                noStroke();
                textSize(this.dataLabelTextSize)
                fill(this.dataLabelColour);
                text(formattedLabel, -30, -yPos); // Render the label
                
                push();
                
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                translate(-this.chartWidth/5, -this.chartHeight/2) // Position axis label
                rotate(-90)
                noStroke();
                fill(this.axisLabelColour)
                text(this.axisLabelName1,0,0) // Render axis label
                pop();
             } 
             // Handle rendering for Y-bar chart type
            else if (this.chartType === "ybars"){
                
                
                let formattedLabel = (yLabel / 1000000).toFixed(0) + 'M';

                noStroke();
                textSize(this.dataLabelTextSize);
                push();
                    
                fill(this.dataLabelColour);
                translate(yPos, 20); // Position Y-bar label
                rotate(this.horizontalBarDataLabelRotation);
                text(formattedLabel, 0, 0); // Render the label
                pop();
                
                push();
                textAlign(CENTER);  
                textSize(this.axisLabelTextSize);
                translate(this.chartWidth / 2, this.chartHeight / 8); // Adjust axis label position
                fill(this.axisLabelColour)
                text(this.axisLabelName1, 0, 0); // Position axis label
                pop();
                
            
                
            // Handle rendering for stacked bar chart type
            } else if(this.chartType === "stacked"){
                let formattedLabel = ((yLabel * 2) / 1000000).toFixed(0) + 'M'; // Format label in millions
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


            // Handle rendering for population pyramid chart type
            else if(this.chartType === "populationpyramid"){
                let maxPop = Math.max(...this.data.map(row => row[this.yValues[0]] + row[this.yValues[1]]));  
                let scaleFactor = maxPop / 10;  // Scale population values
                
                
                let labels = [];
                // Loop to create label values for the population pyramid chart, using a scaled range of values.
                for (let i = -6; i <= 6; i += 2) {
                    // Multiply the loop index by the scaleFactor to adjust for the chart's scale
    // Push the result into the 'labels' array. These will be the values shown on the X-axis.
                    labels.push(i * scaleFactor);  
                }
                
                for (let i = 0; i < labels.length; i++) {
                    let xPos = (this.chartWidth * i) / (labels.length - 1); 
                    
                    textSize(this.dataLabelTextSize)
                    textAlign(CENTER, CENTER);
                    
                    push();
                    noStroke();  
                    fill(this.dataLabelColour);
                    // Format the label value with "M" suffix for millions
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
            // Default rendering for other chart types
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
            
             // Draw ticks at every position except for the first (to avoid overlap with the axis)
            if(i != 0) {
                strokeWeight(1);
                stroke(240);
                line(0, -yPos, this.tickLenght, -yPos); 
            }

      
           
           
           
           
           
           
           
           
           
           
           
           // Rendering text labels
           // Calculate the x-position for each label in correspondence with the positioning of the bars
            for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;    
            
            // Check if the chart type is either "ybars" or "populationpyramid"
            if(this.chartType === "ybars" || this.chartType === "populationpyramid" ){ 
                
                noStroke();
                textSize(this.dataLabelTextSize);
                
                fill(this.dataLabelColour);
                 // Render the label for the x-value at a specific position
                text(this.data[i][this.xValue], -this.chartWidth/8, -xPos -this.margin * 2); 
                push();
                textAlign(CENTER)
                textSize(this.axisLabelTextSize)
                
                translate(-this.chartWidth/4, -this.chartHeight/2)
                rotate(this.axisLabelRotation)
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

    


    renderBars() {

        // Render different bar types depending on user input
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

        // Loop through the data to render each bar
        for (let i = 0; i < this.data.length; i++) {
            
            // Calculate the X position for each bar, adding gap between them
            let xPos = (this.barWidth + this.gap) * i;
            // Loop through each y-value for bar colour
            for(let j=0; j<this.yValues.length; j++){
                // Set the color for the current section of the bar
                fill(this.barColours[j]);
                console.log(this.barColours[j])
                noStroke();
                // Draw the bar using the data value, scaling the height based on scalerNormalBars
                rect(xPos, 0, this.barWidth, -this.data[i][this.yValues[j]] * this.scalerNormalBars);
            }

    }
}

    renderYBar() {
        translate(0, -this.margin) 
        // Loop for bar position
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            // Loop for bar color
           for (let j =0; j<this.yValues.length; j++){
            fill(this.barColours[j]);
            noStroke();
             // Draw the Y-bar using the data value, scaling the width based on scalerNormalBars, swapping x and y values for horizontal bars
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
            // Loop through each y-value for the current bar (stacking multiple sections of the bar)
            for(let j = 0; j < this.yValues.length; j++){
                noStroke();
                fill(this.barColours[j])
                // Draw the current section of the stacked bar using the data value,
                // scaling the height based on scalerStackedBars
                rect (xPos,0,this.barWidth, -this.data[i][this.yValues[j]]*this.scalerStackedBars);
                // Move the drawing origin up by the height of the current section to stack the next one
                translate(0,-this.data[i][this.yValues[j]]*this.scalerStackedBars)
            
               
            }
            pop();
    }
    }
    renderBar100() {


        translate(this.margin,0)
        for (let i = 0; i < this.data.length; i++) {
            let xPos = (this.barWidth + this.gap) * i;
            // Retrieve the first and second values from yValues
            let firstValue = this.data[i][this.yValues[0]];
            let secondValue = this.data[i][this.yValues[1]];
             // Calculate the total value for the bar
            let totalValue = firstValue + secondValue;
            // Initialize the Y offset (used to stack the bars)
            let yOffset = 0; 

         // Loop through each yValue (stacking bars)
        for (let j = 0; j < this.yValues.length; j++) {
         // Get the current value and calculate its percentage of the total
        let value = this.data[i][this.yValues[j]];
        let percent = (value / totalValue) * 100;
        // Calculate the height of the bar based on the percentage
        let barHeight = percent * this.scalerBars100; 

        fill(this.barColours[j]);
        noStroke();
         // Draw the current section of the bar using the calculated height
        rect(xPos, -yOffset, this.barWidth, -barHeight);
        // Update the Y offset to stack the next bar section on top
        yOffset += barHeight; 
    }
   
}
}

renderBarPopulationPyramid(){
    for (let i = 0; i < this.data.length; i++) {
        // Calculate the Y position for each bar
        let yPos = -i * this.barHeight - this.barHeight;
        
         // Loop through each yValue (to handle multiple data columns)
        for (let j =0; j<this.yValues.length; j++){
            noStroke();
            fill(this.barColours[j])
            // Create a positioner array for the bar postioning: 
            // one for positive values and one for negative values (for pyramid effect)
            let positioner = [this.data[i][this.yValues[j]], -this.data[i][this.yValues[j]]]
            // Draw the bar using rect() with the scaled width and the height for the pyramid bars
            rect(this.chartWidth /2, yPos,positioner[j] * this.scalerPopulationPyramid, this.barHeight);
           
           
           
        }
}













}
}



















