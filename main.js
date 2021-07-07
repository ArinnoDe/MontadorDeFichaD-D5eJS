
let mycheckbox = document.querySelectorAll(".checkbox-death-test");
mycheckbox.forEach((valorAtual)=>{
    valorAtual.disabled = true;
    valorAtual.checked = true;
});

//Border bottom in name
let nome = document.getElementById("perso-name");
nome.addEventListener("change", removeBorderBottom);
function removeBorderBottom(){
    if(nome.value != ""){
        nome.style.borderBottom = 0;
    }else{
        nome.style.borderBottom = "1px black solid";
    }
}

window.addEventListener("load", definePersonagem);

document.addEventListener("change", definePersonagem);

//objetos
var classes = {
    guerreiro:{
        lifeDice: 10,
        lifeOne: 10,
        pericias:{
            q: 2,
            disponiveis: ["acrobacia", "adestraranimais", "atletismo", "historia","intuicao", "intimidacao", "percepcao",  "sobrevivencia"]
        }
    },

    ladino: {
        lifeDice:6,
        lifeOne:6,
        pericias:{
            q: 4,
            disponiveis: ["acrobacia", "atletismo", "atuacao", "enganacao", "furtividade", "intimidacao", "intuicao", "investigacao", "percepcao", "persuasao","prestidigitacao"]
        }
    }
}

var racas = {
    meioorc:{
        atributos: {
            forca: 2, 
            destreza: 0,
            constituicao: 1,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        },
        deslocamento: 9,

    },
    humano:{
        atributos: {
            forca: 1, 
            destreza: 1,
            constituicao: 1,
            inteligencia: 1,
            sabedoria: 1,
            carisma: 1
        },
        deslocamento: 9,

    }
}
    var antecedentes = {
        charlatao:{

            pericias:{
                q:2,
                disponiveis: ["enganacao", "prestidigitacao"]
            } 
            
        }

    }

//DEFINIR NOME
function defineName(){
    let nome = document.getElementById("perso-name");
    return nome.value;
}

//DEFINIR CLASSE
function defineClass(){
    let select = document.querySelector("#opt-class");
    let classe = select.options[select.selectedIndex].value;
    return classe;
}

//DEFINIR RACA
function defineRace(){
    let select = document.querySelector("#opt-race");
    let raca = select.options[select.selectedIndex].value;
    return raca;
}
//DEFINIR ANTECEDENTE
function DefineAntecedente(){
    let select = document.querySelector("#opt-antece");
    let antecedente = select.options[select.selectedIndex].value;
    
    return antecedente;
};
//DEFINIR ALINHAMENTO
function DefineAlinhamento(){
    let select = document.querySelector("#opt-alinhamento");
    let alinhamento = select.options[select.selectedIndex].value;
    return alinhamento;
}



//DEFINIR PERSONAGEM
var submit = document.querySelector("#submit");
submit.addEventListener("click", definePersonagem);

function definePersonagem(){
    let nome = defineName();
    let classe = defineClass();
    let raca = defineRace();
    let antecedente = DefineAntecedente();
    let alinhamento = DefineAlinhamento();
    
    personagem = {
        nome,
        classe,
        raca,
        antecedente,
        alinhamento,
        atributos: {
            forca: 0, 
            destreza: 0,
            constituicao: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        },
        deslocamento : 0,
        pericias: {
            q: 0,
            disponiveis: [],
            adquiridas: []
        },
        equipamentos: ['jorge', 'cleiton']
    };

    //dado de vida
    let dadoDeVida = document.querySelector(".life-dice");
    dadoDeVida.innerHTML = '1d' + classes[personagem.classe].lifeDice;
    
    //vida maxima
    let lifemax = document.querySelector(".life-max");
    lifemax.innerHTML = classes[personagem.classe].lifeOne
    

    //bonus de raça atributos
    Object.keys(personagem['atributos']).forEach(addAtributos => {
        personagem['atributos'][addAtributos] = racas[personagem.raca].atributos[addAtributos]
    });
    

    let displayBonus = ["bonus-forca", 
                        "bonus-destreza", 
                        "bonus-constituicao", 
                        "bonus-inteligencia", 
                        "bonus-sabedoria", 
                        "bonus-carisma"]

    j = 0;
    let status = document.querySelectorAll(".status");
    for(let i in personagem['atributos']){
        //render bonus
        document.getElementById(displayBonus[j]).innerHTML = '+' + personagem['atributos'][i];
        //add o input nos atributos
        if(status[j].value !== ""){
            personagem['atributos'][i] += parseInt(status[j].value);
        }
        j+=1;
    }
    //Modificadores
    j = 0;
    let modfire = document.querySelectorAll(".modfire");
    for(let i in personagem['atributos']){
        if( personagem['atributos'][i] !== "" ){
            modfire[j].innerHTML = Math.floor((personagem['atributos'][i]-10)/2);
        }else{
            modfire[j].innerHTML = "0";
        }
        j+=1;
    }

    //pericias
    //add pericias-q de classe em personagem
    personagem.pericias.q += classes[personagem.classe].pericias.q + antecedentes[personagem.antecedente].pericias.q;

    personagem.pericias.disponiveis = [...personagem.pericias.disponiveis,...classes[personagem.classe].pericias.disponiveis];

    personagem.pericias.adquiridas = [...personagem.pericias.adquiridas, ...antecedentes[personagem.antecedente].pericias.disponiveis];

    
    
    

    let checkboxPericia = document.getElementsByClassName("checkbox-pericia");

    

    for(let i in checkboxPericia){
        checkboxPericia[i].disabled = true;
    }

    for(let i in checkboxPericia){
        for(let j in personagem.pericias.disponiveis){
            if(checkboxPericia[i].value == personagem.pericias.disponiveis[j]){
                checkboxPericia[i].disabled = false
            }
        }
    }
    for(let i in checkboxPericia){
        for(let j in personagem.pericias.adquiridas){
            if(checkboxPericia[i].value == personagem.pericias.adquiridas[j]){
                checkboxPericia[i].checked = true;
                checkboxPericia[i].disabled = true;
            }
        }
    }

    for(let i in checkboxPericia){
            if(checkboxPericia[i].checked == true){
                personagem.pericias.q -= 1;
        }
    }
    for(let i in checkboxPericia){
        if(personagem.pericias.q <= 0){
            if(checkboxPericia[i].checked == false){
                checkboxPericia[i].disabled = true;
            }
        }
    }

    document.getElementById("pericias-num").innerHTML = personagem.pericias.q;



    let button = document.querySelectorAll(".choice-button");
    button.forEach((botao) =>{
        botao.addEventListener("click", choiceEquip);
    });



    renderEquip(personagem.equipamentos);

    console.log(personagem);
};

function renderEquip(array){
    const equips = document.querySelector("#list-equip");
    equips.innerHTML = '';

    array.forEach(item =>{
        let li = document.createElement("li");

        li.innerHTML = `<span class="txt-equip">${item}</span>
            <div>
                <button class="btn-action"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn-action"><i class="fas fa-times"></i></button>
            </div>`
        equips.appendChild(li);
    }
    );
};


function choiceEquip(){
    let button = this;
    
    let choiceDiv = button.parentNode.parentNode;
    personagem.equipamentos.push(button.parentNode.querySelector("span").innerHTML);
    choiceDiv.remove();

    

    console.log(personagem.equipamentos);
    renderEquip(personagem.equipamentos);
};