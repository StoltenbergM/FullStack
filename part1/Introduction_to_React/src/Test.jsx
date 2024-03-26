const Test = () => {
    const friends = [
        { name: 'Bobby', age: 20},
        { name: 'Mamma', age: 47},
    ]
    const names = ['Mort', 'Kath']
    return (
        <div>
            <p>{friends[0].name} is {friends[0].age} years old </p>
            <p>{friends[1].name} {friends[1].age}</p>
            <p>{names}</p>
        </div>
    )
}
export default Test