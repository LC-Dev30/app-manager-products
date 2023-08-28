export function convetionPrice(price:string):string{
    const convertionInt = parseInt(price)
    let convertionString = convertionInt.toLocaleString(undefined,{minimumFractionDigits:2}) as string
    return convertionString
}

export const optionsCategory = [
    {
        value: 1,
        name:'Technology'
    },
    {
        value: 2,
        name:'Electronics'
    },
    {
        value: 3,
        name:'Home'
    },
    {
        value: 4,
        name:'Footwear'
    },
    {
        value: 5,
        name:'Books'
    },
]