function fnA () {
    for (let i = 0; i < 10; i++) {
        console.log('a', i)
    }
}

function fnB() {
    let i = 0

    while(i < 10) {
        console.log('b', i)
        i++
    }
}

function fnC() {
    const obj = {
        a: 1,
        b: 2,
        c: 3
    }

    for (let key in obj) {
        console.log('c', key, obj[key])
    }
}

function fnD() {
    const arr = [1, 2, 3, 4, 5]

    for (const el of arr) {
        console.log('d', el)
    }
}

function fnE() {
    const num = Math.random() * 10

    if (num > 5) {
        console.log('e', num, '> 5')
    } else {
        console.log('e', num, '< 5')
    }
}

function fnF(a, b, ...rest) {
    const arr = [a, b, ...rest]

    const nums = arr.map((el, idx) => {
        if (typeof el === 'number') {
            if (Number.isNaN(el)) {
                throw new Error('Argument at index ' + idx + ' is not convertable to number')
            }

            return el
        }

        const num = parseFloat(el)

        if (Number.isNaN(num)) {
            throw new Error('Argument at index ' + idx + ' is not convertable to number')
        }

        return num
    })

    const initVal = 0
    const sum = nums.reduce((acc, el) => acc + el, initVal)

    console.log(sum)
}

function fnG() {
    const args = [...arguments]
    return args.reduce((acc, el) => acc + el, 0)
}

const fnG2 = (...args) => {
    return args.reduce((acc, el) => acc + el, 0)
}

function fnG3 (...args) {
    return args.reduce((acc, el) => acc + el, 0)
}

function fnH(arr, mapper) {
    const result = []

    for (const el of arr) {
        result.push(mapper(el))
    }

    return result
}
const fnHMapperX2 = (el) => el * 2
const fnHMapperX10 = (el) => el * 10
// fnH([1,2,3], fnHMapperX2)
// fnH([1,2,3], fnHMapperX10)

function I(num, str, bol) {
    if (typeof num !== 'number') {
        throw new Error('num i not number')
    }

    if (typeof str !== 'string') {
        throw new Error('str i not string')
    }

    if (typeof bol !== 'boolean') {
        throw new Error('bol i not boolean')
    }

    this.num = num
    this.str = str
    this.bol = bol

}

I.prototype.print = function () {
    console.log(this.num, this.str, this.bol)
}

// i = new I(1, 'a', true)
// i.print()

class J {
    constructor(num, str, bol) {
        // I.call(this, num, str, bol)
        if (typeof num !== 'number') {
            throw new Error('num i not number')
        }

        if (typeof str !== 'string') {
            throw new Error('str i not string')
        }

        if (typeof bol !== 'boolean') {
            throw new Error('bol i not boolean')
        }

        this.num = num
        this.str = str
        this.bol = bol
    }



    print() {
        console.log(this.num, this.str, this.bol)
    }
}


// j = new J(1, 'a', true)
// j.print()
