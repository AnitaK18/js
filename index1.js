add = function (numbers) {
        return numbers.reduce((a, b) => a + b, 0);
    };
    const numbers = [8,20,3,5,1];

const sum = add(numbers);
console.log(sum)

const max = Math.max.apply(null, numbers);
console.log(max);

const min = Math.min.apply(null, numbers);
console.log(min);

numbers.sort(function(a, b) {
return b - a;
});
console.log(numbers);




