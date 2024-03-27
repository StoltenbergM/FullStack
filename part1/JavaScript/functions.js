const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result)

const square = p => {
    console.log(p)
    return p * p
}
const res_square = square(7)
console.log(res_square)

// For simple functions with only 1 expression, leave the {} out:
const square2 = p => p * p

// This is helpful when using map:

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)

console.log(tSquared)

// 2 ways to reference a function
function product(a, b) {
    return a * b
}
const func_result = product(3, 4)
console.log(func_result)

const average = function(a, b) {
    return (a + b) / 2
}
const aver_result = average(3, 4)
console.log(aver_result)