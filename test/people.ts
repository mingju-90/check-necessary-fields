class People {
    name: any
    age: any
    friends: People[]
    constructor({name, age}) {
        this.name = name
        this.age = age
        this.friends = []
    }
}

const peopleType: People = {
    name: 'string',
    age: 'number',
    friends: []
}
peopleType.friends = [peopleType]


const a = new People({name: 'a', age: 11})
const b = new People({name: 'b', age: 12})
const c = new People({name: 'c', age: 12})
const d = new People({name: 'd', age: '12'})

a.friends.push(b, c, d)

export default {
    peopleType,
    peopleData: a,
}