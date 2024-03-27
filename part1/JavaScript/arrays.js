const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each on its own line
})      

const t2 = t.concat(5)  // creates new array

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed

const m1 = t.map(value => value * 2)
console.log(m1) // [2, 4, 6] is printed

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2) // [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

const [first, second, ...rest] = t
console.log(first, second)
console.log(rest)

