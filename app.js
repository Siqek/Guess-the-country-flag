var main_json = []
var hp = 3
var correct_answer = 0
var pkt = 0

async function get_data(){
    const data = await fetch("https://restcountries.com/v2/all")
    main_json = await data.json()

    console.log(main_json)
}

function random_number(max){
    return Math.floor(Math.random() * max);
}

function create_divs(){
    const parent = document.getElementById("div_flags")
    parent.innerHTML = ""

    var country1 = main_json[random_number(main_json.length)]
    var country2 = main_json[random_number(main_json.length)]
    while (country2 == country1){
        country2 = main_json[random_number(main_json.length)]
    }
    var country3 = main_json[random_number(main_json.length)]
    while (country3 == country1 || country3 == country2){
        country3 = main_json[random_number(main_json.length)]
    }
    var country4 = main_json[random_number(main_json.length)]
    while (country4 == country1 || country4 == country2 || country4 == country3){
        country4 = main_json[random_number(main_json.length)]
    }

    correct_answer = random_number(4) + 1
    console.log(correct_answer)

    const country_name = document.createElement("h1")
    if (correct_answer == 1){
        country_name.innerHTML = country1.name
    } else if (correct_answer == 2){
        country_name.innerHTML = country2.name
    } else if (correct_answer == 3){
        country_name.innerHTML = country3.name
    } else if (correct_answer == 4){
        country_name.innerHTML = country4.name
    }
    document.getElementById("div_country_name").innerHTML = ""
    document.getElementById("div_country_name").appendChild(country_name)

    //tworzenie pierwszego diva
    const div1 = document.createElement("div")
    div1.setAttribute("id", "div_flag1")
    div1.classList.add("divs_flags")
    div1.setAttribute("onclick", `game(${1})`)

    const flag1 = document.createElement("img")
    flag1.setAttribute("src", country1.flag)
    flag1.classList.add("flags")

    div1.appendChild(flag1)
    
    //tworzenie drugiego diva
    const div2 = document.createElement("div")
    div2.setAttribute("id", "div_flag2")
    div2.classList.add("divs_flags")
    div2.setAttribute("onclick", `game(${2})`)

    const flag2 = document.createElement("img")
    flag2.setAttribute("src", country2.flag)
    flag2.classList.add("flags")

    div2.appendChild(flag2)
    
    //tworzenie trzeciego diva
    const div3 = document.createElement("div")
    div3.setAttribute("id", "div_flag3")
    div3.classList.add("divs_flags")
    div3.setAttribute("onclick", `game(${3})`)

    const flag3 = document.createElement("img")
    flag3.setAttribute("src", country3.flag)
    flag3.classList.add("flags")

    div3.appendChild(flag3)

    //tworzenie czwartego diva
    const div4 = document.createElement("div")
    div4.setAttribute("id", "div_flag4")
    div4.classList.add("divs_flags")
    div4.setAttribute("onclick", `game(${4})`)

    const flag4 = document.createElement("img")
    flag4.setAttribute("src", country4.flag)
    flag4.classList.add("flags")

    div4.appendChild(flag4)
    
    
    parent.appendChild(div1)
    parent.appendChild(div2)
    parent.appendChild(div3)
    parent.appendChild(div4)
}

function game(num_div){
    const fl_1 = document.getElementById("div_flag1")
    const fl_2 = document.getElementById("div_flag2")
    const fl_3 = document.getElementById("div_flag3")
    const fl_4 = document.getElementById("div_flag4")

    fl_1.removeAttribute("onclick")
    if (correct_answer == 1){
        fl_1.style.borderColor = "chartreuse"
    } else {
        fl_1.style.borderColor = "red"
    }
    fl_2.removeAttribute("onclick")
    if (correct_answer == 2){
        fl_2.style.borderColor = "chartreuse"
    } else {
        fl_2.style.borderColor = "red"
    }
    fl_3.removeAttribute("onclick")
    if (correct_answer == 3){
        fl_3.style.borderColor = "chartreuse"
    } else {
        fl_3.style.borderColor = "red"
    }
    fl_4.removeAttribute("onclick")
    if (correct_answer == 4){
        fl_4.style.borderColor = "chartreuse"
    } else {
        fl_4.style.borderColor = "red"
    }


    if (num_div == correct_answer){
        pkt++
        document.getElementById("p_pkt").innerHTML = "Twój wynik: " + pkt
    } else {
        hp = hp - 1
        const health_bar = document.getElementById("health_bar")
        health_bar.innerHTML = ""
        for (var i=0;i<hp;i++){
            health_bar.innerHTML += "❤"
        }
        if (hp <= 0){
            setTimeout(function(){
                document.getElementById("div_game").style.display = "none"
                document.getElementById("div_interface").style.display = "none"
                document.getElementById("div_end").style.display = "grid"
                document.getElementById("final_score").innerHTML = "Twój wynik: " + pkt
            }, 1500)
        }
    }

    setTimeout(create_divs, 1500)
}

async function start(){
    await get_data()
    create_divs()

    const health_bar = document.getElementById("health_bar")
    health_bar.innerHTML = ""

    for (var i=0;i<hp;i++){
        health_bar.innerHTML += "❤"
    }

    document.getElementById("div_start").style.display = "none"
    document.getElementById("div_game").style.display = "grid"
    document.getElementById("div_interface").style.display = "grid"
}

function restart(){
    const health_bar = document.getElementById("health_bar")
    health_bar.innerHTML = ""
    
    hp = 3
    pkt = 0
    
    for (var i=0;i<hp;i++){
        health_bar.innerHTML += "❤"
    }

    document.getElementById("div_game").style.display = "grid"
    document.getElementById("div_interface").style.display = "grid"
    document.getElementById("div_end").style.display = "none"
    document.getElementById("p_pkt").innerHTML = "Twój wynik: 0"
}
