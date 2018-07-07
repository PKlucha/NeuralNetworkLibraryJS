class Topology {
	constructor(netOutNum) {
		this.netOutNum = netOutNum;
		this.topology = [];
	}
}

class NeuralNetwork {
	constructor(topology){
		if(topology instanceof Topology){
			this.output = [];
			// Constructing 2D net of Neurons
			this.net = [];
			let i = 0;
			while(i < topology.topology.length) {
				this.net[i] = [];
				for(let j = 0; j < topology.topology[i]; j++){
					if(i === 0) {
						this.net[i].push(new Neuron(0));
					} else {
						this.net[i].push(new Neuron(topology.topology[i-1]));
					}
				}
				i++;
			}
			this.net[i] = [];
			for(let j = 0; j < topology.netOutNum; j++){
				this.net[i].push(new Neuron(topology.topology[i-1]));
			}
			this.error = new Array(this.net.length - 1);
		} else {
			console.log("Wrong input parameter in NN constructor!");
			return undefined;
		}
	}

	feedForward(input_array){
		if(this.net[0].length != input_array.length) {
			console.log("Input arrays length must be equal to first layers length (NN.feedForward)");
			return udefined;
		} else {
		// Seting inputs in first layer
			let inputs = Matrix.fromArray(input_array);
			let output = [];
			if(inputs.rows === this.net[0].length) {
				for(let i = 0; i < inputs.rows; i++) {
					this.net[0][i].setOutputValue(inputs.data[i][0]);
				}
			} else {
				console.log("Wrong inputs array size!");
				return undefined;
			}
			// Calling feedForward for every single neuron starting from second layer (first are inputs)
			for(let i = 1; i < this.net.length; i++) {
				for(let j = 0; j < this.net[i].length; j++) {
					this.net[i][j].feedForward(this.net[i-1]);
				}
			}
		}
	}
	calculateError(input_array, answer) {
		if(this.net[0].length != input_array.length) {
			console.log("Input arrays length must be equal to first layers length (NN.train)");
			return undefined;
		} else if(this.net[this.net.length - 1].length != answer.length) {
			console.log("Known answer array must be the same length as last layers length (NN.train)");
			return undefined;
		} else {
			this.feedForward(input_array);
			for(let i = 0; i < this.net[this.net.length - 1].length; i++) {
				this.output.push(this.net[this.net.length - 1][i].outValue);
			}

			console.log("Output:");
			console.table(this.output);

			// Calculating error for every layer exept input layer
			for(let i = 0; i < this.error.length; i++) {
				this.error[i] = [];
			}
			for(let i = 0; i < this.net[this.net.length - 1].length; i++) {
				this.error[this.error.length - 1].push(answer[i] - this.output[i]);
			}
			for(let i = this.net.length - 2; i > 0; i--) {
				for(let j = 0; j < this.net[i].length; j++) {
					let err = 0;
					for(let k = 0; k < this.net[i+1].length; k++) {
						err += this.error[i][k] * this.net[i+1][k].inputWeights[j];
					}
					this.error[i - 1].push(err);
				}
			}

			console.log("Error:");
			console.table(this.error);
		}
	}
}