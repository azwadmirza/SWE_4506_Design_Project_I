import { create, all, MathNumericType, max } from 'mathjs';

const math = create(all);

export const polynomialRegression=(input: number[], output: number[], degree: number): MathNumericType[][]|MathNumericType[] =>{
    try{
        let vander = input.map((x) => {
            let row=[];
            for (let i = 0; i <= degree; i++) {
                row.push(Math.pow(x, i));
            }
            return row;
        });
        const outputVector = math.matrix(output).resize([output.length, 1]);
        const vanderMatrix = math.matrix(vander);
        const resizedVanderMatrix=vanderMatrix.resize([max(vanderMatrix.size()[0], vanderMatrix.size()[1]), max(vanderMatrix.size()[0], vanderMatrix.size()[1])]);
        const coefficients = math.lusolve(resizedVanderMatrix, outputVector).toArray();
        return coefficients.reverse();
    }
    catch(error){
        console.log(error);
        return [];
    }
}
