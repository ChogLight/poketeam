// @ts-nocheck
function useChart(type1, type2) {
    let weaknesses = {
        normal: 1,
        fire: 1,
        water: 1,
        electric: 1,
        grass: 1,
        ice: 1,
        fighting: 1,
        poison: 1,
        ground: 1,
        flying: 1,
        pshychic: 1,
        bug: 1,
        rock: 1,
        ghost: 1,
        dragon: 1,
        dark: 1,
        steel: 1,
        fairy: 1
    }
    const calculateType = (type) => {
        switch(type){
            case "normal":
                weaknesses.fighting = weaknesses.fighting *2
                weaknesses.ghost = weaknesses.ghost * 0
                break
            case "fire":
                weaknesses.fire = weaknesses.fire*0.5
                weaknesses.water = weaknesses.water*2
                weaknesses.grass = weaknesses.grass*0.5
                weaknesses.ice = weaknesses.ice*0.5
                weaknesses.ground = weaknesses.ground*2
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.rock = weaknesses.rock*2
                weaknesses.steel = weaknesses.steel*0.5
                weaknesses.fairy = weaknesses.fairy*0.5
                break
            case "water":
                weaknesses.fire = weaknesses.fire*0.5
                weaknesses.water = weaknesses.water*0.5
                weaknesses.electric = weaknesses.electric*2
                weaknesses.grass = weaknesses.grass*2
                weaknesses.ice = weaknesses.ice*0.5
                weaknesses.steel = weaknesses.steel*0.5
                break
            case "electric":
                weaknesses.electric = weaknesses.electric*0.5
                weaknesses.ground = weaknesses.ground*2
                weaknesses.flying = weaknesses.flying*0.5
                weaknesses.steel = weaknesses.steel*0.5
                break
            case "grass":
                weaknesses.fire = weaknesses.fire*2
                weaknesses.water = weaknesses.water*0.5
                weaknesses.electric = weaknesses.electric*0.5
                weaknesses.grass = weaknesses.grass*0.5
                weaknesses.ice = weaknesses.ice*2
                weaknesses.poison = weaknesses.poison*2
                weaknesses.ground = weaknesses.ground*0.5
                weaknesses.flying = weaknesses.flying*2
                weaknesses.bug = weaknesses.bug*2
                break
            case "ice":
                weaknesses.fire = weaknesses.fire*2
                weaknesses.ice = weaknesses.ice*0.5
                weaknesses.fighting = weaknesses.fighting*2
                weaknesses.rock = weaknesses.rock*2
                weaknesses.teel = weaknesses.steel*2
                break
            case "fighting":
                weaknesses.flying = weaknesses.flying*2
                weaknesses.pshychic = weaknesses.pshychic*2
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.rock = weaknesses.rock*0.5
                weaknesses.dark = weaknesses.dark*0.5
                weaknesses.fairy = weaknesses.fairy*2
                break
            case "poison":
                weaknesses.grass= weaknesses.grass*0.5
                weaknesses.fighting = weaknesses.fighting*0.5
                weaknesses.poison = weaknesses.poison*0.5
                weaknesses.ground = weaknesses.ground*2
                weaknesses.pshychic = weaknesses.pshychic*2
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.fairy = weaknesses.fairy*0.5
                break
            case "ground":
                weaknesses.water = weaknesses.water*2
                weaknesses.electric = weaknesses.electric*0
                weaknesses.grass = weaknesses.grass*2
                weaknesses.ice = weaknesses.ice*2
                weaknesses.poison = weaknesses.poison*0.5
                weaknesses.rock = weaknesses.rock*0.5
                break
            case "flying":
                weaknesses.electric = weaknesses.electric*2
                weaknesses.grass = weaknesses.grass*0.5
                weaknesses.ice = weaknesses.ice*2
                weaknesses.fighting = weaknesses.fighting*0.5
                weaknesses.ground = weaknesses.ground*0
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.rock = weaknesses.rock*2
                break
            case "psychic":
                weaknesses.fighting = weaknesses.fighting*0.5
                weaknesses.pshychic = weaknesses.pshychic*0.5
                weaknesses.bug = weaknesses.bug*2
                weaknesses.ghost = weaknesses.ghost*2
                weaknesses.dark = weaknesses.dark*2
                break
            case "bug":
                weaknesses.fire = weaknesses.fire*2
                weaknesses.grass = weaknesses.grass*0.5
                weaknesses.fighting = weaknesses.fighting*0.5
                weaknesses.ground = weaknesses.ground*0.5
                weaknesses.flying = weaknesses.flying*2
                weaknesses.rock = weaknesses.rock*2
                break
            case "rock":
                weaknesses.normal = weaknesses.normal*0.5
                weaknesses.fire = weaknesses.fire*0.5
                weaknesses.water = weaknesses.water*2
                weaknesses.grass = weaknesses.grass*2
                weaknesses.fighting = weaknesses.fighting*2
                weaknesses.poison = weaknesses.poison*0.5
                weaknesses.ground = weaknesses.ground*2
                weaknesses.flying = weaknesses.flying*0.5
                weaknesses.steel = weaknesses.steel*2
                break
            case "ghost":
                weaknesses.normal = weaknesses.normal*0
                weaknesses.fighting = weaknesses.fighting*0
                weaknesses.poison = weaknesses.poison*0.5
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.ghost = weaknesses.ghost*2
                weaknesses.dragon = weaknesses.dragon*2
                weaknesses.dark = weaknesses.dark*2
                break
            case "dragon":
                weaknesses.fire = weaknesses.fire*0.5
                weaknesses.water = weaknesses.water*0.5
                weaknesses.electric = weaknesses.electric*0.5
                weaknesses.grass = weaknesses.grass*0.5
                weaknesses.ice = weaknesses.ice*2
                weaknesses.dragon = weaknesses.dragon*2
                weaknesses.fairy = weaknesses.fairy*2
                break
            case "dark":
                weaknesses.fighting = weaknesses.fighting*2
                weaknesses.pshychic = weaknesses.pshychic*0
                weaknesses.bug = weaknesses.bug*2
                weaknesses.ghost = weaknesses.ghost*0.5
                weaknesses.dark = weaknesses.dark*0.5
                weaknesses.fairy = weaknesses.fairy*2
                break
            case "steel":
                weaknesses.normal = weaknesses.normal*0.5
                weaknesses.fire = weaknesses.fire*2
                weaknesses.grass = weaknesses.grass*0.5
                weaknesses.ice = weaknesses.ice*0.5
                weaknesses.fighting = weaknesses.fighting*2
                weaknesses.poison = weaknesses.poison*0
                weaknesses.ground = weaknesses.ground*2
                weaknesses.flying = weaknesses.flying*0.5
                weaknesses.pshychic = weaknesses.pshychic*0.5
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.rock = weaknesses.rock*0.5
                weaknesses.dragon = weaknesses.dragon*0.5
                weaknesses.steel = weaknesses.steel *0.5
                weaknesses.fairy = weaknesses.fairy*0.5
                break
            case "fairy":
                weaknesses.fighting = weaknesses.fighting*0.5
                weaknesses.poison = weaknesses.poison*2
                weaknesses.bug = weaknesses.bug*0.5
                weaknesses.dragon = weaknesses.dragon*0
                weaknesses.dark = weaknesses.dark*0.5
                weaknesses.steel = weaknesses.steel *2
                break
    
        }
    }

    calculateType(type1)
    calculateType(type2)
    return [
        weaknesses.normal,
        weaknesses.fire,
        weaknesses.water,
        weaknesses.electric,
        weaknesses.grass,
        weaknesses.ice,
        weaknesses.fighting,
        weaknesses.poison,
        weaknesses.ground,
        weaknesses.flying,
        weaknesses.pshychic,
        weaknesses.bug,
        weaknesses.rock,
        weaknesses.ghost,
        weaknesses.dragon,
        weaknesses.dark,
        weaknesses.steel,
        weaknesses.fairy
    ]
    

}

export default useChart