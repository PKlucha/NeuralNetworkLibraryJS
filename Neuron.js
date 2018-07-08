class Neuron {
	constructor(prevLayerSize) {
		this.outValue = 0;
		this.bias = Math.random() * 2 - 1; // OR = 1 ??

		// Creating random weights array
		if(prevLayerSize != 0) {
			this.inputWeights = new Array(prevLayerSize);
			for(let i = 0; i < prevLayerSize; i++) {
				this.inputWeights[i] = Math.random() * 2 - 1;
			}
		}
	}

	activactionFunction(n) {
		return Math.tanh(n);
	}
	static activactionFunctionD(n) {
		return n + (1 - n);
	}
	feedForward(layer) {
		if(layer instanceof Array) {
			// Weighted sum
			let sum = 0;
			for(let i = 0; i < layer.length; i++) {
				sum += layer[i].outValue * this.inputWeights[i] + this.bias;
			}
			this.outValue = this.activactionFunction(sum);
		} else {
			console.log("Wrong parameter type! (Neuron.feedForward)");
		}
	}
	setOutputValue(n) {
		this.outValue = n;
	}

}