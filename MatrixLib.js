class Matrix {
	constructor(rows, cols){
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		for(var i = 0; i < this.rows; i++) {
			this.data[i] = [];
			for(var j = 0; j < this.cols; j++) {
				this.data[i][j] = 0;
			}
		}
	}
 
	randomize() {
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				this.data[i][j] = Math.floor(Math.random() * 10);
			}	
		}
	}
	multiply(n) {
		if(n instanceof Matrix){
			if(this.rows === n.rows && this.cols === n.cols) {
				for(var i = 0; i < this.rows; i++) {
					for(var j = 0; j < this.cols; j++) {
						this.data[i][j] *= n.data[i][j];
					}	
				}
			} else {console.log("Matrixes dimensions must be equal! (multiply())")}
		} else {
			for(var i = 0; i < this.rows; i++) {
				for(var j = 0; j < this.cols; j++) {
					this.data[i][j] *= n;
				}	
			}
		}
	}
	static dotProduct(a, b){
		if(a instanceof Matrix && b instanceof Matrix){
			if(a.rows != b.cols){
				console.lot("Inappropriate Matrixes dimesions(dotProduct())");
				return undefined;
			}
			let result = new Matrix(a.rows, b.cols);
			for(let i = 0; i < result.rows; i++){
				for(let j = 0; j < result.cols; j++){
					let sum = 0;
					for(let k = 0; k < a.cols; k++){
						sum += a.data[i][k] * b.data[k][j];
					}
					result.data[i][j] = sum;
				}
			}
			return result;
		} else {
			console.log("Paramiters must be Matrixes (dotProduct())");
		}
	}
	add(n) {
		if(n instanceof Matrix){
			if(this.rows === n.rows && this.cols === n.cols) {
				for(var i = 0; i < this.rows; i++) {
					for(var j = 0; j < this.cols; j++) {
						this.data[i][j] += n.data[i][j];
					}	
				}
			} else {console.log("dataes dimensions must be equal! (data.add())")}
		} else {
			for(var i = 0; i < this.rows; i++) {
				for(var j = 0; j < this.cols; j++) {
					this.data[i][j] += n;
				}	
			}
		}
	}
	static transpose(a) {
		let result = new Matrix(a.cols, a.rows);
		for(var i = 0; i < a.rows; i++) {
			for(var j = 0; j < a.cols; j++) {
				result.data[j][i] = a.data[i][j]; 
			}
		}	
		return result;
	}
	map(fun) { // Applies function to every single element in data
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				let val = this.data[i][j];
				this.data[i][j] = fun(val);
			}	
		}
	}
	print(){
		console.table(this.data);
	}
}